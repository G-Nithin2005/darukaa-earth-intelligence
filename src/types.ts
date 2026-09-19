/**
 * DARUKAA EARTH INTELLIGENCE
 * Core Type Definitions
 */

export interface EnvironmentalData {
  location: {
    region: string;
    country: string;
    latitude?: number | string;
    longitude?: number | string;
    biome?: string;
  };
  soil: {
    ph?: number | string;
    organicCarbonPercent?: number | string;
    moisturePercent?: number | string;
    soilType?: string;
  };
  land: {
    landUse?: string;
    cropType?: string;
    isMonoculture?: boolean | string;
    habitatAreaHa?: number | string;
    fragmentation?: 'Low' | 'Moderate' | 'High' | string;
    slopePercent?: number | string;
    tillageType?: string;
  };
  biodiversity: {
    speciesRichness?: 'Low' | 'Moderate' | 'High' | string;
    habitatDiversity?: 'Low' | 'Moderate' | 'High' | string;
    nativeSpecies?: 'Low' | 'Moderate' | 'High' | string;
    nativeSpeciesCount?: number | string;
    invasiveSpecies?: 'None' | 'Low' | 'Moderate' | 'Severe' | string;
    pollinatorAbundance?: 'Low' | 'Moderate' | 'High' | string;
    soilMicrobialBiomassIndex?: string;
    canopyCoverPercent?: number | string;
  };
  climate: {
    temperature?: 'Low' | 'Moderate' | 'High' | 'Extreme' | string;
    rainfall?: 'Low' | 'Moderate' | 'High' | string;
    rainfallVariability?: 'Low' | 'Moderate' | 'High' | string;
    seasonality?: string;
    annualRainfallMm?: number | string;
    maxSummerTempC?: number | string;
    temperatureSeasonality?: string;
  };
  humanImpact: {
    pollution?: 'Low' | 'Moderate' | 'High' | string;
    deforestation?: 'Low' | 'Moderate' | 'High' | string;
    pesticidePressure?: 'Low' | 'Moderate' | 'High' | string;
    urbanPressure?: 'Low' | 'Moderate' | 'High' | string;
    chemicalFertilizerKgHa?: number | string;
    pesticideApplicationsPerYear?: number | string;
    grazingIntensity?: string;
    conservationPractices?: string;
  };
  water: {
    availability?: 'Abundant' | 'Moderate' | 'Seasonal scarcity' | 'Critical scarcity' | string;
    quality?: 'High' | 'Moderate' | 'Degraded' | string;
    seasonalStress?: 'Low' | 'Moderate' | 'High' | 'Severe' | string;
    waterTableDepthM?: number | string;
    surfaceWaterAvailability?: string;
    irrigationType?: string;
    droughtFrequencyMonths?: number | string;
  };
}

export type MetricCategory = 'SOIL' | 'CLIMATE' | 'BIODIVERSITY' | 'LAND' | 'HUMAN IMPACT' | 'WATER';

export interface ExtractedVariable {
  key: string;
  label: string;
  rawValue: string | number | boolean;
  normalizedLevel: 'low' | 'moderate' | 'high' | 'neutral' | 'critical';
  category: MetricCategory;
  unit?: string;
  indicatorContext?: string;
}

export interface RelationshipChain {
  id: string;
  title: string;
  variables: string[];
  dimensions: MetricCategory[];
  mechanism: string;
  ecologicalConsequence: string;
  confidence: 'High' | 'Moderate' | 'Preliminary';
  supportingEvidenceIds: string[];
  chainSteps: string[];
  ecologicalImpact: string;
  scientificExplanation: string;
  severity: 'critical' | 'high' | 'moderate' | 'low';
}

export type SourceType =
  | 'peer_reviewed'
  | 'peer_reviewed_research'
  | 'institutional_report'
  | 'assessment_report'
  | 'technical_manual'
  | 'government_guidance'
  | 'government_report'
  | 'research_synthesis'
  | 'dataset'
  | 'other';

export interface EvidenceStatement {
  claim: string;
  supportedVariables: string[];
  supportedRelationships: string[];
}

export interface RetrievalExplanation {
  sourceId: string;
  matchScore: number;
  scoreType: 'deterministic_demo_match';
  matchedVariables: string[];
  matchedDimensions: MetricCategory[];
  matchedRelationships: string[];
  matchReasons: string[];
}

export interface KnowledgeRecord {
  id: string;
  title: string;
  organization: string;
  author: string;
  year: number;
  category: MetricCategory;
  sourceType: SourceType;
  doi?: string;
  source_url?: string;
  verificationRequired?: boolean;
  summary: string;
  relevant_variables: string[];
  supportedDimensions: MetricCategory[];
  supportedVariables: string[];
  supportedRelationshipTypes: string[];
  evidenceStatements: EvidenceStatement[];
  content: string;
  relevanceScore?: number;
  matchScore?: number;
  scoreType?: 'deterministic_demo_match';
  matchedVariables?: string[];
  matchedDimensions?: MetricCategory[];
  matchedRelationships?: string[];
  matchReasons?: string[];
  retrievalRationale?: string;
  retrievalExplanation?: RetrievalExplanation;
}

export interface EcologicalInterpretation {
  summary: string;
  primaryDrivers: string[];
  interactingVulnerabilities: string[];
  resilienceAssessment: string;
  cautiousObservations: string[];
}

export interface Recommendation {
  id: string;
  title: string;
  category: string;
  whatToDo: string;
  whyItMayWork: string;
  scientificMechanism: string;
  directEvidence?: string;
  systemInference?: string;
  connectedVariables: string[];
  impactedMetrics: string[];
  expectedDirection: string;
  timeHorizon: 'Short-term (1-2 seasons)' | 'Medium-term (2-5 years)' | 'Long-term (5-10+ years)' | string;
  confidence: 'Moderate' | 'High' | 'Preliminary' | string;
  evidenceIds: string[];
  evidence: KnowledgeRecord[];
  risksAndTradeoffs: string;
  monitoringPlan: string;
  priority?: 'High' | 'Medium' | 'Low' | string;
  timeHorizonMonths?: number;
}

export interface MonitoringPlanItem {
  id: string;
  metric: string;
  category: MetricCategory;
  expectedDirection: 'Increase' | 'Improve' | 'Reduce' | 'Stabilize' | string;
  measurementMethod: string;
  timeHorizon: 'Short-term (seasonal)' | 'Medium-term (1-3 yrs)' | 'Long-term (3-7 yrs)' | string;
  scientificRationale: string;
  frequency?: string;
  indicator?: string;
  method?: string;
  timeframe?: string;
}

export interface UncertaintyAndLimitations {
  missingInformation: string[];
  geographicUncertainty: string;
  dataQualityNotice: string;
  evidenceLimitations: string;
  fieldValidationRequirements: string;
  fieldValidationNote?: string;
}

export interface CompositeResilienceIndicator {
  score: number; // 0 to 100
  label: string;
  status: 'critical' | 'warning' | 'moderate' | 'optimal';
  disclaimer: string;
  breakdown: {
    soilResilience: number;
    climateAdaptation: number;
    biodiversityIntegrity: number;
    landStructure: number;
    waterBuffer: number;
    humanPressureOffset: number;
  };
}

export interface AnalysisResult {
  id: string;
  timestamp: string;
  inputData: EnvironmentalData;
  extractedVariables: ExtractedVariable[];
  environmentalDimensions: MetricCategory[];
  dimensionCount: number;
  dimensionCoverage: number;
  insufficientDimensions?: boolean;
  clarificationPrompt?: MissingInfoPrompt;
  relationships: RelationshipChain[];
  retrievalQuery: string;
  retrievedSources: KnowledgeRecord[];
  interpretation: EcologicalInterpretation;
  recommendations: Recommendation[];
  monitoringPlan: MonitoringPlanItem[];
  uncertainty: UncertaintyAndLimitations;
  compositeIndicator: CompositeResilienceIndicator;
  executionMode: 'demo_deterministic' | 'gemini_enhanced';
}

export interface MissingInfoPrompt {
  isNeeded: boolean;
  message: string;
  missingFields: {
    fieldKey: string;
    category: MetricCategory;
    promptQuestion: string;
  }[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: string;
  detectedVariables?: Partial<EnvironmentalData>;
  evidenceSources?: KnowledgeRecord[];
  targetedQuestions?: string[];
  directEvidence?: string;
  systemInference?: string;
  activeDimensions?: MetricCategory[];
  correctionsDetected?: string[];
}
