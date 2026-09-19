/**
 * DARUKAA EARTH INTELLIGENCE
 * Conversational Intelligence & Memory Management Engine
 *
 * Implements:
 * 1. Multi-turn environmental memory & context accumulation
 * 2. Natural language biophysical variable extraction & correction tracking
 * 3. 3+ environmental dimension sufficiency gatekeeper
 * 4. Context-aware evidence retrieval (no slice(0, 3))
 * 5. Distinction between Direct Scientific Evidence and Derived System Inference
 * 6. Bounded conversational history window for Gemini API prompting
 * 7. Complete deterministic fallback when offline or without API key
 */

import {
  EnvironmentalData,
  ExtractedVariable,
  KnowledgeRecord,
  MetricCategory,
  RelationshipChain,
  ChatMessage,
  AnalysisResult,
  Recommendation
} from '../types';
import {
  extractVariables,
  detectMultiMetricRelationships,
  retrieveRelevantKnowledge,
  checkSufficientInformation,
  generateRecommendations
} from './reasoningEngine';
import { SCIENTIFIC_KNOWLEDGE_BASE } from '../data/scientificKnowledge';

export interface ContextUpdateResult {
  updatedContext: EnvironmentalData;
  extractedVariables: ExtractedVariable[];
  activeDimensions: MetricCategory[];
  dimensionCount: number;
  isSufficientContext: boolean;
  correctionsDetected: string[];
  newlyDetectedFields: string[];
}

export interface ConversationalScientistResponse {
  reply: string;
  detectedVariables: EnvironmentalData;
  activeDimensions: MetricCategory[];
  dimensionCount: number;
  isSufficientContext: boolean;
  targetedQuestions?: string[];
  evidenceSources: KnowledgeRecord[];
  directEvidence?: string;
  systemInference?: string;
  mode: 'gemini_live' | 'demo_deterministic';
  compactContextSummary: string;
}

/**
 * Initializes a clean, empty environmental data context
 */
export function createEmptyEnvironmentalData(): EnvironmentalData {
  return {
    location: { region: '', country: '' },
    soil: {},
    climate: {},
    land: {},
    biodiversity: {},
    water: {},
    humanImpact: {}
  };
}

/**
 * Deep-clones and standardizes environmental context
 */
export function cloneEnvironmentalContext(source?: Partial<EnvironmentalData>): EnvironmentalData {
  const base = createEmptyEnvironmentalData();
  if (!source) return base;

  return {
    location: { ...base.location, ...(source.location || {}) },
    soil: { ...base.soil, ...(source.soil || {}) },
    climate: { ...base.climate, ...(source.climate || {}) },
    land: { ...base.land, ...(source.land || {}) },
    biodiversity: { ...base.biodiversity, ...(source.biodiversity || {}) },
    water: { ...base.water, ...(source.water || {}) },
    humanImpact: { ...base.humanImpact, ...(source.humanImpact || {}) }
  };
}

/**
 * Extracts biophysical variables from natural language messages,
 * updating the active environmental context incrementally while
 * preserving prior context and detecting corrections.
 */
export function updateContextFromMessage(
  message: string,
  existingContext?: Partial<EnvironmentalData>
): ContextUpdateResult {
  const context = cloneEnvironmentalContext(existingContext);
  const msg = message.toLowerCase();
  const corrections: string[] = [];
  const newlyDetected: string[] = [];

  // ==========================================
  // 1. SOIL VARIABLES
  // ==========================================

  // Soil Organic Carbon (SOC)
  const socMatch =
    msg.match(/(?:soc|soil\s+organic\s+carbon|carbon)\s*(?:is|=|:)?\s*([0-9.]+)\s*%/i) ||
    msg.match(/([0-9.]+)\s*%\s*(?:soc|soil\s+organic\s+carbon|carbon)/i) ||
    msg.match(/(?:soc|soil\s+organic\s+carbon)\s*(?:is|=|:)?\s*([0-9.]+)/i);

  if (socMatch) {
    const val = parseFloat(socMatch[1]);
    if (!isNaN(val)) {
      if (context.soil.organicCarbonPercent !== undefined && context.soil.organicCarbonPercent !== val) {
        corrections.push(`Updated Soil Organic Carbon from ${context.soil.organicCarbonPercent}% to ${val}%`);
      } else if (context.soil.organicCarbonPercent === undefined) {
        newlyDetected.push(`Soil Organic Carbon: ${val}%`);
      }
      context.soil.organicCarbonPercent = val;
    }
  } else if (msg.includes('0.3%') || msg.includes('0.3 percent')) {
    context.soil.organicCarbonPercent = 0.3;
    newlyDetected.push('Soil Organic Carbon: 0.3%');
  }

  // Soil Moisture
  const moistMatch =
    msg.match(/(?:soil\s+)?moisture\s*(?:is|=|:)?\s*([0-9.]+)\s*%/i) ||
    msg.match(/([0-9.]+)\s*%\s*(?:soil\s+)?moisture/i);

  if (moistMatch) {
    const val = parseFloat(moistMatch[1]);
    if (!isNaN(val)) {
      if (context.soil.moisturePercent !== undefined && context.soil.moisturePercent !== val) {
        corrections.push(`Updated Soil Moisture from ${context.soil.moisturePercent}% to ${val}%`);
      } else if (context.soil.moisturePercent === undefined) {
        newlyDetected.push(`Soil Moisture: ${val}%`);
      }
      context.soil.moisturePercent = val;
    }
  } else if (
    msg.includes('soil moisture is low') ||
    msg.includes('low soil moisture') ||
    msg.includes('soil moisture is dry') ||
    msg.includes('moisture is low')
  ) {
    context.soil.moisturePercent = 12;
    newlyDetected.push('Soil Moisture: 12% (Low)');
  }

  // Soil pH
  const phMatch = msg.match(/(?:soil\s+)?ph\s*(?:is|=|:)?\s*([0-9.]+)/i);
  if (phMatch) {
    const val = parseFloat(phMatch[1]);
    if (!isNaN(val)) {
      context.soil.ph = val;
      newlyDetected.push(`Soil pH: ${val}`);
    }
  }

  // Soil Type
  if (msg.includes('sandy loam')) {
    context.soil.soilType = 'Sandy Loam';
    newlyDetected.push('Soil Classification: Sandy Loam');
  } else if (msg.includes('clay loam')) {
    context.soil.soilType = 'Clay Loam';
    newlyDetected.push('Soil Classification: Clay Loam');
  } else if (msg.includes('sandy')) {
    context.soil.soilType = 'Sandy';
    newlyDetected.push('Soil Classification: Sandy');
  } else if (msg.includes('clay')) {
    context.soil.soilType = 'Clay';
    newlyDetected.push('Soil Classification: Clay');
  }

  // ==========================================
  // 2. CLIMATE VARIABLES & CORRECTIONS
  // ==========================================

  // Check for rainfall corrections first: e.g. "rainfall isn't low. It's actually moderate"
  const correctionMatch =
    msg.match(/rainfall\s+(?:isn't|is\s+not)\s+([a-z]+)[^.]*?(?:it's\s+actually|actually\s+it's|actually|is\s+actually)\s+([a-z]+)/i) ||
    msg.match(/(?:actually|in\s+fact)\s+(?:the\s+)?rainfall\s+is\s+([a-z]+)/i) ||
    msg.match(/rainfall\s+is\s+actually\s+([a-z]+)/i);

  if (correctionMatch) {
    const newRain = (correctionMatch[2] || correctionMatch[1]).toLowerCase();
    if (newRain.includes('mod') || newRain.includes('medium')) {
      corrections.push(`Corrected rainfall from "${context.climate.rainfall || 'Low'}" to "Moderate"`);
      context.climate.rainfall = 'Moderate';
    } else if (newRain.includes('high') || newRain.includes('wet')) {
      corrections.push(`Corrected rainfall from "${context.climate.rainfall || 'Low'}" to "High"`);
      context.climate.rainfall = 'High';
    } else if (newRain.includes('low') || newRain.includes('dry')) {
      corrections.push(`Corrected rainfall to "Low"`);
      context.climate.rainfall = 'Low';
    }
  } else {
    // Normal rainfall detection
    if (
      msg.includes('rainfall is low') ||
      msg.includes('low rainfall') ||
      msg.includes('rainfall is dry') ||
      msg.includes('dryland') ||
      msg.includes('semi-arid')
    ) {
      if (context.climate.rainfall && context.climate.rainfall !== 'Low') {
        corrections.push(`Updated rainfall to "Low"`);
      } else if (!context.climate.rainfall) {
        newlyDetected.push('Precipitation: Low');
      }
      context.climate.rainfall = 'Low';
    } else if (
      msg.includes('rainfall is moderate') ||
      msg.includes('moderate rainfall') ||
      msg.includes('rainfall is medium')
    ) {
      if (context.climate.rainfall && context.climate.rainfall !== 'Moderate') {
        corrections.push(`Updated rainfall to "Moderate"`);
      } else if (!context.climate.rainfall) {
        newlyDetected.push('Precipitation: Moderate');
      }
      context.climate.rainfall = 'Moderate';
    } else if (
      msg.includes('rainfall is high') ||
      msg.includes('high rainfall') ||
      msg.includes('wet climate')
    ) {
      if (context.climate.rainfall && context.climate.rainfall !== 'High') {
        corrections.push(`Updated rainfall to "High"`);
      } else if (!context.climate.rainfall) {
        newlyDetected.push('Precipitation: High');
      }
      context.climate.rainfall = 'High';
    }
  }

  // Rainfall numeric mm
  const mmMatch = msg.match(/([0-9.]+)\s*mm/i);
  if (mmMatch) {
    const mm = parseFloat(mmMatch[1]);
    if (!isNaN(mm)) {
      context.climate.rainfall = mm < 300 ? 'Low' : mm < 600 ? 'Moderate' : 'High';
      newlyDetected.push(`Annual Rainfall: ${mm}mm`);
    }
  }

  // Temperature
  const tempMatch = msg.match(/(?:temperature|temp)\s*(?:is|=|:)?\s*([0-9.]+)\s*°?c/i);
  if (tempMatch) {
    const t = parseFloat(tempMatch[1]);
    context.climate.temperature = t > 32 ? 'High' : t > 20 ? 'Moderate' : 'Low';
    newlyDetected.push(`Summer Temperature: ${t}°C`);
  } else if (
    msg.includes('high temperature') ||
    msg.includes('hot summer') ||
    msg.includes('high heat') ||
    msg.includes('elevated temperature')
  ) {
    context.climate.temperature = 'High';
    newlyDetected.push('Thermal Regime: High');
  }

  // Variability
  if (
    msg.includes('rainfall variability is high') ||
    msg.includes('erratic rainfall') ||
    msg.includes('sporadic rainfall') ||
    msg.includes('variable rainfall')
  ) {
    context.climate.rainfallVariability = 'High';
    newlyDetected.push('Rainfall Variability: High');
  }

  // ==========================================
  // 3. LAND USE & CROPPING ARCHITECTURE
  // ==========================================

  // Crop Type
  if (msg.includes('wheat')) {
    context.land.cropType = 'Wheat';
    newlyDetected.push('Primary Crop: Wheat');
  } else if (msg.includes('barley')) {
    context.land.cropType = 'Barley';
    newlyDetected.push('Primary Crop: Barley');
  } else if (msg.includes('maize') || msg.includes('corn')) {
    context.land.cropType = 'Maize';
    newlyDetected.push('Primary Crop: Maize');
  } else if (msg.includes('soybean')) {
    context.land.cropType = 'Soybean';
    newlyDetected.push('Primary Crop: Soybean');
  } else if (msg.includes('cereal')) {
    context.land.cropType = 'Cereal';
    newlyDetected.push('Primary Crop: Cereal');
  }

  // Monoculture vs Diversified
  if (
    msg.includes('monoculture') ||
    msg.includes('single crop') ||
    msg.includes('continuous wheat') ||
    msg.includes('continuous cropping')
  ) {
    context.land.isMonoculture = true;
    context.land.landUse = 'Continuous cereal monoculture';
    newlyDetected.push('Cropping Regime: Continuous Monoculture');
  } else if (
    msg.includes('rotation') ||
    msg.includes('intercropping') ||
    msg.includes('diversified')
  ) {
    context.land.isMonoculture = false;
    context.land.landUse = 'Diversified rotation';
    newlyDetected.push('Cropping Regime: Diversified');
  }

  // Fragmentation
  if (msg.includes('fragmented') || msg.includes('fragmentation is high')) {
    context.land.fragmentation = 'High';
    newlyDetected.push('Landscape Fragmentation: High');
  }

  // ==========================================
  // 4. BIODIVERSITY INTEGRITY
  // ==========================================

  // Species Richness
  if (
    msg.includes('species richness is low') ||
    msg.includes('low species richness') ||
    msg.includes('species richness is poor') ||
    msg.includes('biodiversity is declining') ||
    msg.includes('low biodiversity') ||
    msg.includes('biodiversity decline') ||
    msg.includes('declining biodiversity') ||
    msg.includes('loss of species')
  ) {
    context.biodiversity.speciesRichness = 'Low';
    newlyDetected.push('Biodiversity: Low Species Richness');
  } else if (
    msg.includes('species richness is high') ||
    msg.includes('high species richness') ||
    msg.includes('high biodiversity') ||
    msg.includes('rich biodiversity')
  ) {
    context.biodiversity.speciesRichness = 'High';
    newlyDetected.push('Biodiversity: High Species Richness');
  }

  // Habitat Diversity
  if (
    msg.includes('habitat diversity is poor') ||
    msg.includes('habitat diversity is low') ||
    msg.includes('poor habitat diversity') ||
    msg.includes('low habitat diversity') ||
    msg.includes('no trees') ||
    msg.includes('no native floral') ||
    msg.includes('lack of habitats') ||
    msg.includes('no hedgerows')
  ) {
    context.biodiversity.habitatDiversity = 'Low';
    newlyDetected.push('Habitat Diversity: Poor / Low');
  } else if (
    msg.includes('habitat diversity is high') ||
    msg.includes('high habitat diversity')
  ) {
    context.biodiversity.habitatDiversity = 'High';
    newlyDetected.push('Habitat Diversity: High');
  }

  // ==========================================
  // 5. WATER RESOURCES
  // ==========================================

  if (
    msg.includes('no irrigation') ||
    msg.includes('irrigation is unavailable') ||
    msg.includes('rainfed') ||
    msg.includes('dryland farming')
  ) {
    context.water.availability = 'None / Rainfed';
    context.water.seasonalStress = 'High';
    newlyDetected.push('Hydrological Buffer: Rainfed (No irrigation)');
  } else if (
    msg.includes('water availability is seasonal') ||
    msg.includes('seasonal and unreliable') ||
    msg.includes('water is seasonal') ||
    msg.includes('unreliable water') ||
    msg.includes('seasonal water') ||
    msg.includes('water scarcity') ||
    msg.includes('water is scarce') ||
    msg.includes('water deficit')
  ) {
    context.water.availability = 'Seasonal scarcity';
    context.water.seasonalStress = 'High';
    newlyDetected.push('Hydrological Buffer: Seasonal Scarcity / Unreliable');
  }

  // ==========================================
  // 6. HUMAN IMPACT & AGROCHEMICALS
  // ==========================================

  if (
    msg.includes('pesticide pressure is moderate to high') ||
    msg.includes('moderate to high pesticide') ||
    msg.includes('pesticide pressure is moderate') ||
    msg.includes('moderate pesticide') ||
    msg.includes('chemical spraying') ||
    msg.includes('synthetic pesticides')
  ) {
    context.humanImpact.pesticidePressure = 'Moderate';
    newlyDetected.push('Chemical Disturbance: Moderate Pesticide Pressure');
  } else if (
    msg.includes('pesticide pressure is high') ||
    msg.includes('high pesticide') ||
    msg.includes('heavy spraying')
  ) {
    context.humanImpact.pesticidePressure = 'High';
    newlyDetected.push('Chemical Disturbance: High Pesticide Pressure');
  } else if (msg.includes('no pesticides') || msg.includes('organic')) {
    context.humanImpact.pesticidePressure = 'Low';
    newlyDetected.push('Chemical Disturbance: Low / Organic');
  }

  // ==========================================
  // 7. GEOGRAPHIC / BIOME CONTEXT
  // ==========================================

  if (
    msg.includes('semi-arid') ||
    msg.includes('dryland region') ||
    msg.includes('arid')
  ) {
    if (!context.location.biome) {
      context.location.biome = 'Semi-arid agricultural region';
      newlyDetected.push('Biome: Semi-arid agricultural region');
    }
  }

  // ==========================================
  // 8. EVALUATE DISTINCT DIMENSIONS & SUFFICIENCY
  // ==========================================

  const extracted = extractVariables(context);
  const distinctDimensions = Array.from(new Set(extracted.map(v => v.category))) as MetricCategory[];
  const isSufficient = distinctDimensions.length >= 3;

  return {
    updatedContext: context,
    extractedVariables: extracted,
    activeDimensions: distinctDimensions,
    dimensionCount: distinctDimensions.length,
    isSufficientContext: isSufficient,
    correctionsDetected: corrections,
    newlyDetectedFields: newlyDetected
  };
}

/**
 * Builds a compact summary of active environmental variables
 */
export function buildCompactContextSummary(context: EnvironmentalData, activeDimensions: MetricCategory[]): string {
  const lines: string[] = [];

  lines.push(`Active Dimensions (${activeDimensions.length}/6): ${activeDimensions.join(', ') || 'None'}`);

  if (context.soil.organicCarbonPercent !== undefined || context.soil.moisturePercent !== undefined || context.soil.ph !== undefined) {
    const soilParts: string[] = [];
    if (context.soil.organicCarbonPercent !== undefined) soilParts.push(`SOC: ${context.soil.organicCarbonPercent}%`);
    if (context.soil.moisturePercent !== undefined) soilParts.push(`Moisture: ${context.soil.moisturePercent}%`);
    if (context.soil.ph !== undefined) soilParts.push(`pH: ${context.soil.ph}`);
    if (context.soil.soilType) soilParts.push(`Type: ${context.soil.soilType}`);
    lines.push(`• Soil: ${soilParts.join(' | ')}`);
  }

  if (context.climate.rainfall || context.climate.temperature || context.climate.rainfallVariability) {
    const climParts: string[] = [];
    if (context.climate.rainfall) climParts.push(`Rainfall: ${context.climate.rainfall}`);
    if (context.climate.temperature) climParts.push(`Temp: ${context.climate.temperature}`);
    if (context.climate.rainfallVariability) climParts.push(`Variability: ${context.climate.rainfallVariability}`);
    lines.push(`• Climate: ${climParts.join(' | ')}`);
  }

  if (context.land.cropType || context.land.landUse || context.land.isMonoculture !== undefined) {
    const landParts: string[] = [];
    if (context.land.cropType) landParts.push(`Crop: ${context.land.cropType}`);
    if (context.land.isMonoculture !== undefined) landParts.push(context.land.isMonoculture ? 'Monoculture' : 'Diversified');
    if (context.land.landUse) landParts.push(`Regime: ${context.land.landUse}`);
    lines.push(`• Land: ${landParts.join(' | ')}`);
  }

  if (context.biodiversity.speciesRichness || context.biodiversity.habitatDiversity) {
    const bioParts: string[] = [];
    if (context.biodiversity.speciesRichness) bioParts.push(`Richness: ${context.biodiversity.speciesRichness}`);
    if (context.biodiversity.habitatDiversity) bioParts.push(`Habitat Diversity: ${context.biodiversity.habitatDiversity}`);
    lines.push(`• Biodiversity: ${bioParts.join(' | ')}`);
  }

  if (context.water.availability || context.water.seasonalStress) {
    lines.push(`• Water: Availability: ${context.water.availability || 'Unknown'} | Stress: ${context.water.seasonalStress || 'Unknown'}`);
  }

  if (context.humanImpact.pesticidePressure) {
    lines.push(`• Human Impact: Pesticide Pressure: ${context.humanImpact.pesticidePressure}`);
  }

  return lines.join('\n');
}

/**
 * Intelligent Clarification Generator
 * Asks targeted, bounded questions when fewer than 3 environmental dimensions are known.
 */
export function generateClarificationPrompt(
  context: EnvironmentalData,
  activeDimensions: MetricCategory[],
  userMessage: string
): { reply: string; targetedQuestions: string[] } {
  const missingCategories: { category: MetricCategory; label: string; question: string }[] = [];

  if (!activeDimensions.includes('SOIL')) {
    missingCategories.push({
      category: 'SOIL',
      label: 'Soil Chemistry & Carbon',
      question: 'What is your approximate Soil Organic Carbon (SOC) percentage (e.g., 0.3% vs >1.5%) or soil texture?'
    });
  }

  if (!activeDimensions.includes('CLIMATE')) {
    missingCategories.push({
      category: 'CLIMATE',
      label: 'Precipitation & Temperature',
      question: 'What is your rainfall regime (e.g. low, moderate, erratic) or typical summer heat window?'
    });
  }

  if (!activeDimensions.includes('LAND')) {
    missingCategories.push({
      category: 'LAND',
      label: 'Cropping Architecture & Land Use',
      question: 'What is your primary cropping architecture (e.g., continuous wheat monoculture vs diversified rotation)?'
    });
  }

  if (!activeDimensions.includes('WATER') && missingCategories.length < 3) {
    missingCategories.push({
      category: 'WATER',
      label: 'Hydrological Buffer',
      question: 'Do you have supplemental irrigation or is the parcel strictly rainfed with seasonal dry spells?'
    });
  }

  if (!activeDimensions.includes('BIODIVERSITY') && missingCategories.length < 3) {
    missingCategories.push({
      category: 'BIODIVERSITY',
      label: 'Non-Crop Floral & Microhabitats',
      question: 'Are there native perennial floral margins, hedgerows, or insect shelterbelts present?'
    });
  }

  if (!activeDimensions.includes('HUMAN IMPACT') && missingCategories.length < 4) {
    missingCategories.push({
      category: 'HUMAN IMPACT',
      label: 'Agrochemical & Disturbance Pressure',
      question: 'What is the chemical disturbance regime (e.g. synthetic pesticide spraying frequency, tillage history)?'
    });
  }

  // Pick top 2-3 most critical missing dimensions
  const selectedMissing = missingCategories.slice(0, 3);
  const questionsList = selectedMissing.map(m => m.question);

  const knownList = activeDimensions.length > 0
    ? activeDimensions.map(d => `✓ ${d}`).join('\n')
    : 'None yet established';

  const reply = `I can assess your inquiry, but rigorous ecological diagnosis requires evaluating at least 3 distinct environmental dimensions before formulating recommendations. Single-variable diagnosis risks prescribing generic or maladaptive interventions.

Currently known:
${knownList}

Useful next inputs:
${selectedMissing.map(m => `• ${m.question}`).join('\n')}

These will allow me to connect your biophysical constraints (e.g., coupling moisture retention, thermal stress, and trophic stability) rather than treating your observations in isolation.`;

  return { reply, targetedQuestions: questionsList };
}

/**
 * Retrieves context-aware evidence based on current environmental variables,
 * detected relationship chains, AND specific user inquiries (e.g. cover crops, trees, monitoring).
 * Strictly avoids arbitrary SCIENTIFIC_KNOWLEDGE_BASE.slice(0, 3).
 */
export function retrieveConversationalEvidence(
  extracted: ExtractedVariable[],
  chains: RelationshipChain[],
  userMessage: string
): KnowledgeRecord[] {
  // 1. Run deterministic retrieval based on multi-metric features
  const { sources } = retrieveRelevantKnowledge(extracted, chains);

  const msg = userMessage.toLowerCase();
  const isCoverCrops = msg.includes('cover crop') || msg.includes('stubble') || msg.includes('residue');
  const isAgroforestry = msg.includes('tree') || msg.includes('windbreak') || msg.includes('hedgerow') || msg.includes('agroforestry');
  const isWaterHarvesting = msg.includes('swale') || msg.includes('water harvest') || msg.includes('bund') || msg.includes('contour');
  const isMonocultureDiversify = msg.includes('monoculture') || msg.includes('diversif');

  // 2. Adjust scoring if user asks about specific interventions or biophysical processes
  const reScored = sources.map(record => {
    let bonus = 0;
    const additionalReasons: string[] = [];

    if (isCoverCrops && (record.id === 'agee-soil-carbon-2015' || record.id === 'fao-soc-2020' || record.id === 'usda-nrcs-2021')) {
      bonus += 25;
      additionalReasons.push('Directly evaluates cover crops and organic residue retention in semi-arid soils');
    }

    if (isAgroforestry && (record.id === 'nature-diversification-2020' || record.id === 'wmo-drylands-2021')) {
      bonus += 25;
      additionalReasons.push('Substantiates microclimatic windbreaks, multi-tier canopy architecture, and shelterbelts');
    }

    if (isWaterHarvesting && (record.id === 'eea-water-retention-2021' || record.id === 'unep-drylands-2022')) {
      bonus += 25;
      additionalReasons.push('Grounds passive water harvesting swales, contour infiltration, and runoff attenuation');
    }

    if (isMonocultureDiversify && (record.id === 'ipbes-global-2019' || record.id === 'nature-diversification-2020')) {
      bonus += 20;
      additionalReasons.push('Quantifies trophic simplification risks and spatial diversification benefits');
    }

    const finalScore = Math.min((record.relevanceScore || 50) + bonus, 99);

    return {
      ...record,
      relevanceScore: finalScore,
      matchScore: finalScore,
      matchReasons: [...(record.matchReasons || []), ...additionalReasons]
    };
  });

  return reScored.sort((a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0));
}

/**
 * Builds the comprehensive analysis explanation prompt for Gemini API (/api/analyze)
 * Grounded in the authoritative deterministic reasoning assessment.
 */
export function constructAnalysisGeminiPrompt(
  inputData: EnvironmentalData,
  analysisResult: AnalysisResult
): string {
  const {
    environmentalDimensions,
    dimensionCount,
    extractedVariables,
    relationships,
    retrievedSources,
    recommendations,
    monitoringPlan,
    uncertainty
  } = analysisResult;

  const formattedVariables = extractedVariables
    .map(v => `- ${v.label} (Category: ${v.category}): raw value "${v.rawValue}", normalized level "${v.normalizedLevel}"${v.indicatorContext ? ` (${v.indicatorContext})` : ''}`)
    .join('\n');

  const formattedRelationships = relationships
    .map(r => `• ${r.title} [Dimensions: ${r.dimensions.join(', ')} | Variables: ${r.variables.join(', ')} | Confidence: ${r.confidence}]
    Mechanism: ${r.mechanism}
    Ecological Consequence: ${r.ecologicalConsequence}
    Supporting Evidence IDs: ${r.supportingEvidenceIds.join(', ')}`)
    .join('\n\n');

  const formattedEvidence = retrievedSources
    .slice(0, 6)
    .map(s => `• [${s.id}] ${s.organization} (${s.year}): "${s.title}"
    Key Findings: ${s.evidenceStatements.map(e => e.claim).join(' ')}`)
    .join('\n\n');

  const formattedRecommendations = recommendations
    .map(rec => `• ${rec.title} [Category: ${rec.category}]
    Action: ${rec.whatToDo}
    Mechanism: ${rec.scientificMechanism}
    Direct Evidence: ${rec.directEvidence || 'Grounded in ecological baseline'}
    System Inference: ${rec.systemInference || 'Derived from compound indicator couplings'}
    Trade-offs: ${rec.risksAndTradeoffs}`)
    .join('\n\n');

  const formattedMonitoring = monitoringPlan
    .map(m => `• ${m.metric} [Category: ${m.category} | Method: ${m.measurementMethod} | Frequency: ${m.frequency || 'Seasonal'}] - ${m.scientificRationale}`)
    .join('\n');

  const formattedLimitations = [
    uncertainty.dataQualityNotice ? `• Data Quality: ${uncertainty.dataQualityNotice}` : '',
    uncertainty.geographicUncertainty ? `• Geographic: ${uncertainty.geographicUncertainty}` : '',
    uncertainty.evidenceLimitations ? `• Evidence Scope: ${uncertainty.evidenceLimitations}` : '',
    uncertainty.fieldValidationRequirements ? `• Field Validation: ${uncertainty.fieldValidationRequirements}` : '',
    ...(uncertainty.missingInformation || []).map(m => `• Missing Variable: ${m}`)
  ].filter(Boolean).join('\n');

  return `You are a senior environmental scientist at DARUKAA EARTH INTELLIGENCE explaining a completed multidimensional ecological assessment.

CRITICAL ARCHITECTURAL DIRECTIVE:
You are explaining an existing deterministic environmental assessment. Do not create new environmental measurements, relationships, recommendations, citations, percentages, or evidence that are not present in the supplied structured assessment.

SUPPLIED STRUCTURED ASSESSMENT:

1. ASSESSED LOCATION & INPUTS:
Location: ${inputData.location.region || 'Regional Agroecosystem'}, ${inputData.location.country || 'Global Landscape'}
Biome: ${inputData.location.biome || 'Not specified'}

2. ENVIRONMENTAL DIMENSIONS & COVERAGE:
Established Dimensions (${dimensionCount}/3 required): ${environmentalDimensions.join(', ')}
Status: ${dimensionCount >= 3 ? 'Sufficient multidimensional context established.' : 'Insufficient dimensions (<3); restricted to preliminary assessment.'}

3. EXTRACTED BIOPHYSICAL VARIABLES:
${formattedVariables}

4. DETECTED MULTI-METRIC RELATIONSHIPS & MECHANISMS:
${formattedRelationships || 'Baseline environmental interactions.'}

5. DETERMINISTICALLY RETRIEVED SCIENTIFIC EVIDENCE:
${formattedEvidence}

6. GROUNDED RECOMMENDATIONS & TRADE-OFFS:
${formattedRecommendations}

7. EMPIRICAL MONITORING PLAN:
${formattedMonitoring}

8. UNCERTAINTIES & LIMITATIONS:
${formattedLimitations}

MANDATORY SCIENTIFIC GUARDRAILS & INSTRUCTIONS:
1. EVIDENCE BOUNDARY:
   - Clearly distinguish between DIRECT SCIENTIFIC EVIDENCE (empirical findings documented by the cited scientific and institutional sources) and SYSTEM INFERENCE (conclusions deduced by combining the user's specific field variables).
   - Never state or imply that a cited study investigated the user's specific parcel (e.g., do NOT say "Study X proved this user's field has moisture stress"; say "Taken together, these field conditions may increase vulnerability to moisture stress as supported by soil-water principles in [Source]").
2. QUANTITATIVE CLAIM GUARDRAIL:
   - Never invent percentages, improvement estimates, time estimates, yield values, biodiversity counts, carbon sequestration rates, or rainfall thresholds unless that exact value is present in the supplied assessment above.
   - If quantitative metrics are absent, use qualitative, scientifically grounded descriptions.
3. CITATION GUARDRAIL:
   - Only reference the sources supplied above in Section 5. Never invent author names, paper titles, DOIs, journals, or publication years.
4. SYNTHESIS TASK:
   - Provide a 2-3 paragraph coherent, cautious, and authoritative scientific synthesis explaining how these multi-metric factors couple together, highlighting the biophysical mechanisms and communicating inherent limitations and trade-offs.`;
}

/**
 * Builds the bounded conversation prompt for Gemini API (/api/chat)
 * Strictly enforces context persistence, 3+ dimension sufficiency, and evidence boundaries.
 */
export function constructGeminiPrompt(
  userMessage: string,
  history: ChatMessage[],
  context: EnvironmentalData,
  extracted: ExtractedVariable[],
  chains: RelationshipChain[],
  sources: KnowledgeRecord[],
  activeDimensions: MetricCategory[],
  corrections: string[]
): string {
  // Bounded history window: last 12 messages to balance context retention with prompt efficiency
  const boundedHistory = (history || []).slice(-12);

  const formattedHistory = boundedHistory
    .map(msg => {
      const senderTag = msg.sender === 'user' ? 'USER MESSAGE' : 'ASSISTANT RESPONSE';
      return `${senderTag}: ${msg.text.trim()}`;
    })
    .join('\n\n');

  const compactSummary = buildCompactContextSummary(context, activeDimensions);

  const formattedVariables = extracted.length > 0
    ? extracted.map(v => `- ${v.label} [${v.category}]: raw "${v.rawValue}", normalized "${v.normalizedLevel}"${v.indicatorContext ? ` (${v.indicatorContext})` : ''}`).join('\n')
    : 'No active variables extracted yet.';

  const evidenceBlock = sources.slice(0, 5).map(s => {
    return `- [${s.id}] ${s.organization} (${s.year}) "${s.title}" (Type: ${s.sourceType})
  Evidence Statements:
  ${s.evidenceStatements.map(e => `  * Claim: ${e.claim}`).join('\n')}`;
  }).join('\n\n');

  const chainsBlock = chains.length > 0
    ? chains.map(c => `• ${c.title} [Variables: ${c.variables.join(', ')} | Dimensions: ${c.dimensions.join(', ')} | Confidence: ${c.confidence}]
  Mechanism: ${c.mechanism}
  Ecological Consequence: ${c.ecologicalConsequence}
  Supporting Evidence IDs: ${c.supportingEvidenceIds.join(', ')}`).join('\n\n')
    : 'Baseline environmental coupling';

  const isSufficient = activeDimensions.length >= 3;

  // If context is insufficient, generate the specific targeted questions to pass into the prompt
  let clarificationSection = '';
  if (!isSufficient) {
    const clarification = generateClarificationPrompt(context, activeDimensions, userMessage);
    clarificationSection = `CLARIFICATION REQUIREMENTS (INSUFFICIENT CONTEXT: ${activeDimensions.length}/3 DIMENSIONS):
Because fewer than 3 distinct environmental dimensions are established, you MUST NOT provide a complete environmental recommendation or action plan.
You must acknowledge what the user has provided, explain that responsible ecological diagnosis requires cross-referencing at least 3 distinct environmental dimensions, and ask these targeted questions:
${clarification.targetedQuestions.map(q => `• ${q}`).join('\n')}`;
  } else {
    // If context is sufficient, provide the existing deterministic recommendation context
    const recommendations = generateRecommendations(extracted, chains, sources);
    clarificationSection = `SUFFICIENT MULTI-METRIC CONTEXT (${activeDimensions.length} DIMENSIONS ESTABLISHED):
Existing Grounded Recommendations for this context:
${recommendations.map(r => `• ${r.title} (${r.category}): ${r.whatToDo} | Mechanism: ${r.scientificMechanism}`).join('\n')}`;
  }

  return `You are the AI Environmental Scientist at DARUKAA EARTH INTELLIGENCE.
You are interacting with a land manager, researcher, or agricultural practitioner.

1. CURRENT USER INQUIRY:
"${userMessage}"

${corrections.length > 0 ? `RECENT USER CORRECTIONS DETECTED:\n${corrections.map(c => `✓ ${c}`).join('\n')}\n` : ''}
2. BOUNDED RECENT CONVERSATION HISTORY:
${formattedHistory || '(Start of conversation)'}

3. ESTABLISHED STRUCTURED ENVIRONMENTAL CONTEXT:
${compactSummary}

4. DETECTED BIOPHYSICAL VARIABLES:
${formattedVariables}

5. ENVIRONMENTAL DIMENSIONS & COVERAGE:
Established Dimensions: ${activeDimensions.join(', ') || 'None'}
Dimension Count: ${activeDimensions.length} / 3 required for full recommendations

6. DETECTED MULTI-METRIC RELATIONSHIPS:
${chainsBlock}

7. CURATED SCIENTIFIC AND AUTHORITATIVE INSTITUTIONAL EVIDENCE (Retrieved Deterministically):
${evidenceBlock}

8. CONTEXT SUFFICIENCY & RECOMMENDATION CONTEXT:
${clarificationSection}

==================================================
MANDATORY SCIENTIFIC GUARDRAILS & SYSTEM INSTRUCTIONS:
==================================================

1. DETERMINISTIC AUTHORITY:
   The structured environmental context and relationships provided above are authoritative. Do not invent new measurements or discard established variables. If the user previously established 0.3% SOC, low rainfall, and wheat monoculture, reference them naturally—do NOT ask them to repeat known data.

2. EVIDENCE BOUNDARY:
   Strictly distinguish between:
   - DIRECT SCIENTIFIC EVIDENCE: Empirical findings documented by the retrieved knowledge-base records.
   - SYSTEM INFERENCE: Deductions produced by combining multiple environmental variables through the deterministic reasoning engine.
   - GEMINI EXPLANATION: Your conversational synthesis.
   Never turn a system inference into a direct scientific finding. Never claim that a study proved anything about this specific user's parcel (e.g. do not say "Study X proved this user's field has moisture stress"; say "Taken together, these conditions may increase vulnerability to moisture stress as supported by principles in [Source]").

3. QUANTITATIVE CLAIM GUARDRAIL:
   Never invent percentages, improvement estimates, time horizons, yield values, biodiversity counts, carbon sequestration numbers, or rainfall thresholds unless that exact value is supplied in the context or evidence above. If quantitative figures are absent, use qualitative scientific language.

4. CITATION GUARDRAIL:
   Only reference the sources supplied in Section 7. Do not invent paper titles, authors, journals, DOIs, URLs, or publication years. If the user asks for evidence or studies that are not present in the supplied knowledge base, state explicitly: "The current curated knowledge base does not contain a directly supporting source for that specific query" rather than fabricating one.

5. INSUFFICIENT CONTEXT GUARDRAIL:
   If fewer than 3 distinct environmental dimensions are established (${activeDimensions.length}/3), you MUST NOT generate a complete environmental recommendation or prescription. Acknowledge what is known, explain why multi-metric coupling across 3+ dimensions is needed, and present the targeted clarification questions.

6. TONE & EPISTEMOLOGY:
   Use cautious, professional scientific prose ("evidence suggests", "meta-analyses indicate", "is coupled with"). Avoid dogmatic certainty and highlight known trade-offs and uncertainties.`;
}

/**
 * Deterministic Conversational Reasoning Engine
 * Operates when Gemini is offline, unavailable, or in demo fallback mode.
 */
export function generateDeterministicResponse(
  userMessage: string,
  context: EnvironmentalData,
  extracted: ExtractedVariable[],
  chains: RelationshipChain[],
  sources: KnowledgeRecord[],
  activeDimensions: MetricCategory[],
  corrections: string[]
): ConversationalScientistResponse {
  const msg = userMessage.toLowerCase();
  const compactSummary = buildCompactContextSummary(context, activeDimensions);

  // 1. If fewer than 3 dimensions are known, enforce clarification gate
  if (activeDimensions.length < 3) {
    const clarification = generateClarificationPrompt(context, activeDimensions, userMessage);
    return {
      reply: clarification.reply,
      detectedVariables: context,
      activeDimensions,
      dimensionCount: activeDimensions.length,
      isSufficientContext: false,
      targetedQuestions: clarification.targetedQuestions,
      evidenceSources: sources.slice(0, 2),
      mode: 'demo_deterministic',
      compactContextSummary: compactSummary
    };
  }

  // 2. Sufficient Context (>= 3 dimensions): Process query with context awareness
  const isUngroundedQuantitativeQuery =
    msg.includes('37%') ||
    (msg.includes('paper') && (msg.includes('proving') || msg.includes('proves') || msg.includes('exact'))) ||
    (msg.includes('exact') && (msg.includes('percentage') || msg.includes('percent') || msg.includes('yield'))) ||
    (msg.includes('prove') && msg.includes('biodiversity'));

  const isCoverCropsQuery =
    msg.includes('cover crop') ||
    msg.includes('stubble') ||
    msg.includes('residue') ||
    msg.includes('would cover crops work') ||
    msg.includes('what about cover crops');

  const isTreeQuery =
    msg.includes('tree') ||
    msg.includes('windbreak') ||
    msg.includes('agroforestry') ||
    msg.includes('hedgerow') ||
    msg.includes('shelterbelt');

  const isMonitoringQuery =
    msg.includes('monitor') ||
    msg.includes('what should i measure') ||
    msg.includes('indicators');

  const isConnectionQuery =
    msg.includes('connected') ||
    msg.includes('how are') ||
    msg.includes('relationship') ||
    msg.includes('coupling');

  let reply = '';
  let directEvidence = '';
  let systemInference = '';

  const soc = context.soil.organicCarbonPercent;
  const rain = context.climate.rainfall;
  const crop = context.land.cropType || 'cereal';
  const isMono = context.land.isMonoculture || false;

  if (isUngroundedQuantitativeQuery) {
    directEvidence = 'Curated scientific literature and institutional assessments (e.g., IPBES Global Assessment 2019; Tamburini et al., Nature Ecology & Evolution 2020) establish qualitative directional gains and functional ecological mechanisms resulting from diversification and habitat corridors, rather than fixed universal percentages.';

    systemInference = `No empirical study or curated knowledge-base record proves a universal 37% (or other fixed numerical) increase in biodiversity for your specific parcel. Biological response magnitudes are non-linear and governed by local rainfall variability, baseline degradation, landscape matrix connectivity, and seasonal climate cycles. The platform strictly rejects fabricating citations or asserting unsupported quantitative metrics.`;

    reply = `${corrections.length > 0 ? `*${corrections.join('. ')}*\n\n` : ''}Scientific Evidence & Guardrail Notice:

Direct Scientific Evidence:
${directEvidence}

Derived System Inference:
${systemInference}

What the Curated Evidence Actually Substantiates:
1. **Directional Trophic Enhancement**: Diversifying monocultures and establishing semi-natural perennial field margins significantly enhances beneficial arthropod diversity, parasitoid abundance, and natural pest predation (IPBES 2019, CBD 2022).
2. **Context-Dependent Magnitude**: Quantitative yield stabilization and biodiversity recovery rates depend on annual precipitation timing, soil organic carbon status, and surrounding native vegetation patches.
3. **Absence of Exact Fixed Claims**: Any claim of an exact "37% increase" in an unstudied field is scientifically ungrounded. We evaluate directional ecological trends supported by traceable evidence.`;
  } else if (isCoverCropsQuery) {
    directEvidence = 'FAO ITPS technical manuals (2021), USDA-NRCS guidance, and published research syntheses (e.g. Poeplau & Don 2015) demonstrate that retaining crop residues and seeding low-water-demand cover crops in semi-arid rotations systematically enhances water infiltration, builds particulate organic carbon, and buffers extreme soil surface temperatures.';

    systemInference = `Given your established context of ${soc !== undefined ? `${soc}% SOC` : 'depleted soil carbon'}, ${rain ? `${rain.toLowerCase()} rainfall` : 'seasonal water limitation'}, and ${isMono ? `${crop} monoculture` : `${crop} cropping`}, the primary bottleneck is evaporative desiccation and low aggregate stability during high-heat intervals. Bare fallows accelerate carbon oxidation.`;

    reply = `${corrections.length > 0 ? `*${corrections.join('. ')}*\n\n` : ''}Evaluating cover crops in the context of your farm (${soc !== undefined ? `${soc}% SOC` : 'low SOC'}, ${rain || 'low'} rainfall, and ${isMono ? `${crop} monoculture` : crop}):

Direct Scientific Evidence:
${directEvidence}

Derived System Inference:
${systemInference}

Management Recommendation:
1. **Residue Stubble Retention**: Maintain cereal stubble post-harvest to reduce solar insolation and lower topsoil temperature spikes.
2. **Drought-Hardy Legume / Brassica Mix**: Seed low-water-demand multi-species blends (such as drought-adapted vetch or deep-rooting tillage radish) to stimulate arbuscular mycorrhizal fungi and glomalin production without exhausting deep subsoil moisture.
3. **Agronomic Tradeoff Caution**: In acute drought seasons, terminate the cover crop early (at bud/early flowering) to prevent competition with subsequent cash crops for shallow root-zone moisture.

Suggested Monitoring:
Track shallow infiltration rates (ring infiltrometer) and biennial active carbon fractions before and after rainy windows.`;
  } else if (isTreeQuery) {
    directEvidence = 'Nature Ecology & Evolution meta-analyses and WMO dryland micrometeorology syntheses substantiate that sparse, multi-tier shelterbelts and native woody corridors substantially reduce horizontal wind velocities, lower boundary layer vapor pressure deficit (VPD), and create structural overwintering refugia for beneficial parasitoids.';

    systemInference = `In your ${rain ? `${rain.toLowerCase()} rainfall` : 'semi-arid'} landscape, high summer temperatures amplify atmospheric evaporative demand. Establishing sparse windbreaks along prevailing wind corridors creates microclimatic humidity buffers without competing excessively with central field rows.`;

    reply = `${corrections.length > 0 ? `*${corrections.join('. ')}*\n\n` : ''}Evaluating windbreaks and agroforestry shelterbelts for your system (${crop}, ${rain || 'low'} rainfall):

Direct Scientific Evidence:
${directEvidence}

Derived System Inference:
${systemInference}

Management Recommendation:
1. **Contour Shelterbelts**: Plant single-row windbreaks of native, drought-adapted woody species (e.g., Acacia, carob, or native scrub oaks) perpendicular to prevailing dry winds.
2. **Flowering Boundary Strips**: Incorporate deep-rooted perennial flowering vegetation along field edges or uncropped tracks (scaled to field parcel boundaries) to provide continuous floral nectar for predatory hoverflies and ground beetles.
3. **Operational Tradeoffs**: Ensure spacing allows harvesting machinery maneuverability and align with contour lines to prevent surface runoff channeling.`;
  } else if (isMonitoringQuery) {
    reply = `${corrections.length > 0 ? `*${corrections.join('. ')}*\n\n` : ''}Based on your established environmental parameters (${activeDimensions.join(', ')}), prioritize these biophysical metrics:

1. **Hydraulic Infiltration Rate**: Measure water absorption in seconds using a single-ring infiltrometer on topsoil under residue vs bare areas (EEA / USDA metric).
2. **Active Soil Organic Carbon Pool**: Test permanganate-oxidizable carbon (POXC) biennially rather than waiting 5 years for total SOC shifts (FAO ITPS guidelines).
3. **Natural Predator-to-Pest Ratio**: Conduct seasonal sweep-net or yellow sticky trap surveys along field margins versus field interiors (IPBES trophic monitoring).
4. **Subsoil Moisture Persistence**: Utilize soil moisture sensors at 20cm and 50cm to observe whether rainfall penetrates beyond topsoil evaporative depths.`;
  } else if (isConnectionQuery) {
    reply = `${corrections.length > 0 ? `*${corrections.join('. ')}*\n\n` : ''}In your agroecosystem, soil chemistry, climate variability, and biodiversity are coupled in direct biological feedback loops:

1. **The Carbon-Water Coupling**: Severely depleted soil organic carbon (such as 0.3% SOC) prevents the formation of water-stable macro-aggregates. When rainfall is low and temperatures are elevated, bare topsoil tends to crust and shed water as runoff instead of absorbing it.
2. **The Rhizosphere-Microbial Loop**: A continuous monoculture exposes below-ground microbial communities to uniform root exudates. Without floral diversity or residue armor, beneficial mycorrhizae and earthworms collapse during dry periods.
3. **Multi-Trophic Stability**: When soil organic matter rises, microbial life flourishes, feeding soil micro-arthropods which sustain ground beetles and parasitic wasps—providing natural pest control for your ${crop}.`;
  } else {
    // General synthesis response synthesizing all active dimensions
    reply = `${corrections.length > 0 ? `*${corrections.join('. ')}*\n\n` : ''}I have synthesized your multi-metric environmental profile across ${activeDimensions.length} dimensions (${activeDimensions.join(', ')}):

• **Soil Condition**: ${soc !== undefined ? `${soc}% SOC` : 'Carbon depleted'}, ${context.soil.moisturePercent ? `${context.soil.moisturePercent}% moisture` : 'moisture constrained'}
• **Climate Regime**: ${rain || 'Low'} rainfall, ${context.climate.temperature || 'High'} thermal regime
• **Landscape Architecture**: ${isMono ? `${crop} monoculture` : crop}
${context.biodiversity.speciesRichness ? `• **Biodiversity Integrity**: ${context.biodiversity.speciesRichness} richness\n` : ''}
Scientific Interpretation:
Your biophysical bottlenecks interact non-linearly. Depleted topsoil carbon magnifies rainfall deficits by impeding infiltration and accelerating solar baking. Continuous monoculture cultivation further contracts microhabitats, rendering the system vulnerable to pest resurgences.

Evidence-Grounded Priorities:
1. **Armor the Topsoil**: Retain post-harvest stubble and incorporate drought-tolerant cover crop mixtures (FAO/USDA).
2. **Establish Native Field Margins**: Establish native perennial boundary corridors or habitat buffers (adapted to farm parcel geometry) to restore beneficial predator populations (IPBES 2019).
3. **Harvest Episodic Water**: Where topography permits, implement contour swales to capture sporadic storm runoff (UNEP/EEA).

Would you like to explore specific implementation details for cover crops, native field margins, or water harvesting swales?`;
  }

  return {
    reply,
    detectedVariables: context,
    activeDimensions,
    dimensionCount: activeDimensions.length,
    isSufficientContext: true,
    evidenceSources: sources.slice(0, 4),
    directEvidence: directEvidence || undefined,
    systemInference: systemInference || undefined,
    mode: 'demo_deterministic',
    compactContextSummary: compactSummary
  };
}
