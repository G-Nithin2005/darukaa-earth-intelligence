import React, { useState } from 'react';
import {
  Layers,
  Sparkles,
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  Play,
  FileText,
  Compass,
  Database,
  ArrowRight,
  Sun,
  Droplets,
  Activity,
  Sprout,
  UserCheck,
  Plus
} from 'lucide-react';
import { EnvironmentalData, MetricCategory } from '../types';
import { DEMO_CASE_INPUT } from '../data/scientificKnowledge';
import { DIMENSION_THEMES, DimensionKey } from '../utils/theme';

interface AnalyzeViewProps {
  onExecuteAnalysis: (data: EnvironmentalData) => void;
  initialData?: EnvironmentalData;
  isLoading: boolean;
}

export const AnalyzeView: React.FC<AnalyzeViewProps> = ({
  onExecuteAnalysis,
  initialData,
  isLoading
}) => {
  const [formData, setFormData] = useState<EnvironmentalData>(initialData || DEMO_CASE_INPUT);
  const [inputMode, setInputMode] = useState<'structured' | 'natural'>('structured');
  const [naturalText, setNaturalText] = useState<string>('');
  const [showInsufficientModal, setShowInsufficientModal] = useState<boolean>(false);

  const handleInputChange = (group: keyof EnvironmentalData, field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [group]: {
        ...(prev[group] as any),
        [field]: value
      }
    }));
  };

  const handleLoadDemo = () => {
    setFormData({ ...DEMO_CASE_INPUT });
    setShowInsufficientModal(false);
  };

  const handleClearForm = () => {
    setFormData({
      location: { region: '', country: '', biome: '' },
      soil: {},
      climate: {},
      land: {},
      biodiversity: {},
      humanImpact: {},
      water: {}
    });
    setShowInsufficientModal(false);
  };

  // Determine active dimensions from current form state
  const hasSoil = Boolean(
    formData.soil?.organicCarbonPercent !== undefined && formData.soil?.organicCarbonPercent !== null && formData.soil?.organicCarbonPercent !== ('' as any) ||
    formData.soil?.ph ||
    formData.soil?.moisturePercent !== undefined && formData.soil?.moisturePercent !== null ||
    formData.soil?.soilType
  );

  const hasClimate = Boolean(
    formData.climate?.rainfall ||
    formData.climate?.annualRainfallMm ||
    formData.climate?.maxSummerTempC ||
    formData.climate?.temperatureSeasonality
  );

  const hasLand = Boolean(
    formData.land?.landUse ||
    formData.land?.cropType ||
    formData.land?.slopePercent ||
    formData.land?.tillageType
  );

  const hasBiodiversity = Boolean(
    formData.biodiversity?.pollinatorAbundance ||
    formData.biodiversity?.soilMicrobialBiomassIndex ||
    formData.biodiversity?.nativeSpeciesCount ||
    formData.biodiversity?.canopyCoverPercent
  );

  const hasWater = Boolean(
    formData.water?.waterTableDepthM ||
    formData.water?.irrigationType ||
    formData.water?.surfaceWaterAvailability ||
    formData.water?.droughtFrequencyMonths
  );

  const hasHumanImpact = Boolean(
    formData.humanImpact?.chemicalFertilizerKgHa ||
    formData.humanImpact?.pesticideApplicationsPerYear ||
    formData.humanImpact?.grazingIntensity ||
    formData.humanImpact?.conservationPractices
  );

  const activeDimensionMap: Record<DimensionKey, boolean> = {
    SOIL: hasSoil,
    CLIMATE: hasClimate,
    LAND: hasLand,
    BIODIVERSITY: hasBiodiversity,
    WATER: hasWater,
    'HUMAN IMPACT': hasHumanImpact
  };

  const activeDimensionsList = (Object.keys(activeDimensionMap) as DimensionKey[]).filter(k => activeDimensionMap[k]);
  const dimensionCount = activeDimensionsList.length;
  const isSufficient = dimensionCount >= 3;

  const handleNaturalParse = () => {
    const text = naturalText.toLowerCase();
    const updated = { ...formData };

    if (text.includes('0.3%') || text.includes('0.3 percent') || text.includes('low carbon')) {
      updated.soil = { ...updated.soil, organicCarbonPercent: 0.3 };
    }
    if (text.includes('low rainfall') || text.includes('arid') || text.includes('dry')) {
      updated.climate = { ...updated.climate, rainfall: 'Low' };
    }
    if (text.includes('wheat') || text.includes('monoculture')) {
      updated.land = { ...updated.land, cropType: 'Wheat', landUse: 'Continuous wheat monoculture' };
    }
    if (text.includes('pollinator') || text.includes('low biodiversity')) {
      updated.biodiversity = { ...updated.biodiversity, pollinatorAbundance: 'Low' };
    }
    if (text.includes('rainfed') || text.includes('no irrigation')) {
      updated.water = { ...updated.water, irrigationType: 'None / Rainfed' };
    }
    if (text.includes('tillage') || text.includes('fertilizer')) {
      updated.humanImpact = { ...updated.humanImpact, chemicalFertilizerKgHa: 80 };
    }

    setFormData(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMode === 'natural' && naturalText.trim()) {
      handleNaturalParse();
    }

    if (dimensionCount < 3) {
      setShowInsufficientModal(true);
      return;
    }

    setShowInsufficientModal(false);
    onExecuteAnalysis(formData);
  };

  return (
    <div className="py-6 max-w-7xl mx-auto px-4 text-[#F2F5F3] space-y-6">
      {/* Top Header */}
      <div className="border-b border-white/[0.08] pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="rounded-sm bg-white/[0.06] px-2 py-0.5 text-[10px] font-mono font-bold text-emerald-400 uppercase border border-white/[0.08]">
              ENVIRONMENTAL CONTEXT
            </span>
            <span className="text-xs font-mono text-[#9BA7A0]">
              Multi-Metric Data Ingestion Protocol
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#F2F5F3] tracking-tight">
            Analyze My Land
          </h1>
          <p className="text-xs text-[#9BA7A0]">
            Supply physical soil metrics, climate variability, and land use parameters to formulate compound causal diagnosis.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleClearForm}
            className="rounded-md bg-[#141A17] px-3 py-1.5 text-xs font-mono text-[#9BA7A0] hover:bg-[#1A221E] hover:text-[#F2F5F3] transition border border-white/[0.08] cursor-pointer"
          >
            Clear Form
          </button>
          <button
            type="button"
            onClick={handleLoadDemo}
            className="flex items-center gap-1.5 rounded-md bg-[#1B2B22] px-3.5 py-1.5 text-xs font-semibold text-[#F2F5F3] hover:bg-[#23382D] transition border border-emerald-600/30 cursor-pointer"
          >
            <Sparkles className="h-3.5 w-3.5 text-amber-300" />
            <span>Load Benchmark Case</span>
          </button>
        </div>
      </div>

      {/* 2. REAL-TIME DIMENSION SUFFICIENCY COUNTER */}
      <div className="rounded-md border border-white/[0.08] bg-[#101512] p-4 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#9BA7A0]">
              ENVIRONMENTAL CONTEXT
            </span>
            <div className="text-sm font-bold font-mono text-[#F2F5F3]">
              {dimensionCount} / 3 Dimensions Detected
            </div>
          </div>

          <div>
            {isSufficient ? (
              <span className="inline-flex items-center gap-1.5 rounded-sm bg-emerald-950/60 px-2.5 py-1 text-xs font-mono text-emerald-300 border border-emerald-800/40">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                3 / 3+ Multi-metric analysis available
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-sm bg-amber-950/60 px-2.5 py-1 text-xs font-mono text-amber-300 border border-amber-800/40">
                <AlertTriangle className="h-3.5 w-3.5 text-amber-400" />
                Add {3 - dimensionCount} more environmental dimension{3 - dimensionCount > 1 ? 's' : ''} to unlock multi-metric analysis.
              </span>
            )}
          </div>
        </div>

        {/* 6 Dimension Status Chips */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 pt-1">
          {Object.entries(activeDimensionMap).map(([key, isActive]) => {
            const theme = DIMENSION_THEMES[key as DimensionKey];
            return (
              <div
                key={key}
                className={`rounded-sm p-2 text-xs font-mono flex items-center justify-between border ${
                  isActive
                    ? `${theme.badgeBg} ${theme.textColor} border-${theme.badgeBorder}`
                    : 'bg-white/[0.02] text-[#6D7B74] border-white/[0.04]'
                }`}
              >
                <span>{theme.label}</span>
                <span className={`h-1.5 w-1.5 rounded-full ${isActive ? theme.dotColor : 'bg-gray-600'}`} />
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. INSUFFICIENT CONTEXT WARNING PANEL (Visible when < 3 submitted) */}
      {showInsufficientModal && (
        <div className="rounded-md border border-amber-800/60 bg-[#16120E] p-5 space-y-4 shadow-lg">
          <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold uppercase">
            <AlertTriangle className="h-4 w-4 shrink-0" />
            <span>Insufficient Environmental Context ({dimensionCount}/3 Dimensions)</span>
          </div>

          <p className="text-xs text-[#D9CFC4] leading-relaxed">
            Darukaa strictly refuses to formulate ecological recommendations on isolated metrics. Single-variable reasoning leads to ecological misdiagnosis (e.g. prescribing fertilizer or tilled cover crops without accounting for rainfall evaporation or native trophic corridors).
          </p>

          <div className="space-y-1.5 text-xs font-mono">
            <span className="text-[#9BA7A0] text-[11px] uppercase block">Missing Dimensions to Provide:</span>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(activeDimensionMap) as DimensionKey[])
                .filter(k => !activeDimensionMap[k])
                .map(missingKey => (
                  <span key={missingKey} className="rounded-sm bg-amber-950/40 px-2 py-1 text-amber-300 border border-amber-800/40">
                    + {missingKey}
                  </span>
                ))}
            </div>
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleLoadDemo}
              className="rounded-md bg-amber-950/80 px-3.5 py-1.5 text-xs font-mono text-amber-200 hover:bg-amber-900 transition border border-amber-700/50 cursor-pointer"
            >
              Load Full Benchmark Case (All 6 Dimensions)
            </button>
            <button
              type="button"
              onClick={() => setShowInsufficientModal(false)}
              className="text-xs font-mono text-[#9BA7A0] hover:text-white transition"
            >
              Continue editing fields below
            </button>
          </div>
        </div>
      )}

      {/* Input Mode Selector */}
      <div className="flex items-center gap-2 border-b border-white/[0.06] pb-3">
        <button
          type="button"
          onClick={() => setInputMode('structured')}
          className={`rounded-sm px-3 py-1.5 text-xs font-mono transition cursor-pointer ${
            inputMode === 'structured'
              ? 'bg-[#18231C] text-[#F2F5F3] border border-emerald-500/50'
              : 'text-[#9BA7A0] hover:bg-[#141A17]'
          }`}
        >
          Structured Dimensions Form
        </button>
        <button
          type="button"
          onClick={() => setInputMode('natural')}
          className={`rounded-sm px-3 py-1.5 text-xs font-mono transition cursor-pointer ${
            inputMode === 'natural'
              ? 'bg-[#18231C] text-[#F2F5F3] border border-emerald-500/50'
              : 'text-[#9BA7A0] hover:bg-[#141A17]'
          }`}
        >
          Natural Language Field Notes
        </button>
      </div>

      {/* Main Ingestion Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {inputMode === 'natural' ? (
          <div className="rounded-md border border-white/[0.08] bg-[#101512] p-5 space-y-3">
            <label className="text-xs font-mono text-[#9BA7A0] block">
              Describe your land, soil tests, crop regime, and climate observations in plain English:
            </label>
            <textarea
              id="analyze-natural-input"
              rows={6}
              value={naturalText}
              onChange={(e) => setNaturalText(e.target.value)}
              placeholder="e.g. My farm is 50ha in a dry semi-arid valley. Soil organic carbon was tested at 0.3% with high compaction. Rainfall is low at 320mm per year. We have grown continuous wheat monoculture with heavy synthetic fertilizer and no cover crops. Pollinators and birdlife have noticeably vanished."
              className="w-full rounded-md border border-white/[0.08] bg-[#141A17] p-3 text-xs text-[#F2F5F3] placeholder-[#6D7B74] focus:border-emerald-600/60 focus:outline-none"
            />
            <button
              type="button"
              onClick={handleNaturalParse}
              className="rounded-md bg-[#18231C] px-3.5 py-1.5 text-xs font-mono text-[#F2F5F3] border border-white/[0.1] hover:bg-[#202E24] cursor-pointer"
            >
              Parse Parameters into Biophysical State
            </button>
          </div>
        ) : (
          /* Structured Grid across the 6 Dimensions */
          <div className="space-y-4">
            {/* Geographic Context */}
            <div className="rounded-md border border-white/[0.08] bg-[#101512] p-4 space-y-3">
              <span className="text-[10px] font-mono uppercase text-[#9BA7A0] font-semibold">
                Landscape & Geographic Location
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-[10px] font-mono text-[#6D7B74] block mb-1">Region / Farm Name</label>
                  <input
                    type="text"
                    id="loc-region"
                    value={formData.location?.region || ''}
                    onChange={(e) => handleInputChange('location', 'region', e.target.value)}
                    placeholder="e.g. Alentejo Valley"
                    className="w-full rounded-sm border border-white/[0.06] bg-[#141A17] px-2.5 py-1.5 text-xs text-[#F2F5F3] focus:border-emerald-600/60 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono text-[#6D7B74] block mb-1">Country</label>
                  <input
                    type="text"
                    id="loc-country"
                    value={formData.location?.country || ''}
                    onChange={(e) => handleInputChange('location', 'country', e.target.value)}
                    placeholder="e.g. Portugal"
                    className="w-full rounded-sm border border-white/[0.06] bg-[#141A17] px-2.5 py-1.5 text-xs text-[#F2F5F3] focus:border-emerald-600/60 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono text-[#6D7B74] block mb-1">Biome</label>
                  <input
                    type="text"
                    id="loc-biome"
                    value={formData.location?.biome || ''}
                    onChange={(e) => handleInputChange('location', 'biome', e.target.value)}
                    placeholder="e.g. Mediterranean Dryland"
                    className="w-full rounded-sm border border-white/[0.06] bg-[#141A17] px-2.5 py-1.5 text-xs text-[#F2F5F3] focus:border-emerald-600/60 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* The 6 Environmental Dimensions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* 1. SOIL */}
              <div className="rounded-md border border-amber-900/30 bg-[#101512] p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-white/[0.05] pb-2">
                  <div className="flex items-center gap-1.5 text-amber-400 font-mono text-xs font-bold uppercase">
                    <Layers className="h-3.5 w-3.5" />
                    <span>SOIL</span>
                  </div>
                  <span className={`h-1.5 w-1.5 rounded-full ${hasSoil ? 'bg-amber-500' : 'bg-gray-600'}`} />
                </div>
                <div className="space-y-2 text-xs">
                  <div>
                    <label className="text-[10px] font-mono text-[#9BA7A0] block">Organic Carbon (SOC %)</label>
                    <input
                      type="number"
                      step="0.1"
                      id="soil-soc"
                      value={formData.soil?.organicCarbonPercent ?? ''}
                      onChange={(e) => handleInputChange('soil', 'organicCarbonPercent', e.target.value === '' ? undefined : parseFloat(e.target.value))}
                      placeholder="e.g. 0.3"
                      className="w-full rounded-sm border border-white/[0.06] bg-[#141A17] px-2 py-1 text-xs text-[#F2F5F3] focus:border-amber-600/60 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono text-[#9BA7A0] block">Soil pH</label>
                    <input
                      type="number"
                      step="0.1"
                      id="soil-ph"
                      value={formData.soil?.ph ?? ''}
                      onChange={(e) => handleInputChange('soil', 'ph', e.target.value === '' ? undefined : parseFloat(e.target.value))}
                      placeholder="e.g. 7.6"
                      className="w-full rounded-sm border border-white/[0.06] bg-[#141A17] px-2 py-1 text-xs text-[#F2F5F3] focus:border-amber-600/60 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono text-[#9BA7A0] block">Soil Texture / Type</label>
                    <input
                      type="text"
                      id="soil-type"
                      value={formData.soil?.soilType || ''}
                      onChange={(e) => handleInputChange('soil', 'soilType', e.target.value)}
                      placeholder="e.g. Sandy Loam"
                      className="w-full rounded-sm border border-white/[0.06] bg-[#141A17] px-2 py-1 text-xs text-[#F2F5F3] focus:border-amber-600/60 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* 2. CLIMATE */}
              <div className="rounded-md border border-orange-900/30 bg-[#101512] p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-white/[0.05] pb-2">
                  <div className="flex items-center gap-1.5 text-orange-400 font-mono text-xs font-bold uppercase">
                    <Sun className="h-3.5 w-3.5" />
                    <span>CLIMATE</span>
                  </div>
                  <span className={`h-1.5 w-1.5 rounded-full ${hasClimate ? 'bg-orange-500' : 'bg-gray-600'}`} />
                </div>
                <div className="space-y-2 text-xs">
                  <div>
                    <label className="text-[10px] font-mono text-[#9BA7A0] block">Precipitation Regime</label>
                    <select
                      id="climate-rainfall"
                      value={formData.climate?.rainfall || ''}
                      onChange={(e) => handleInputChange('climate', 'rainfall', e.target.value)}
                      className="w-full rounded-sm border border-white/[0.06] bg-[#141A17] px-2 py-1 text-xs text-[#F2F5F3] focus:border-orange-600/60 focus:outline-none"
                    >
                      <option value="">Select regime...</option>
                      <option value="Low">Low (&lt;400mm / Arid)</option>
                      <option value="Moderate">Moderate (400-800mm)</option>
                      <option value="High">High (&gt;800mm)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-mono text-[#9BA7A0] block">Annual Rainfall (mm)</label>
                    <input
                      type="number"
                      id="climate-annual"
                      value={formData.climate?.annualRainfallMm ?? ''}
                      onChange={(e) => handleInputChange('climate', 'annualRainfallMm', e.target.value === '' ? undefined : parseFloat(e.target.value))}
                      placeholder="e.g. 350"
                      className="w-full rounded-sm border border-white/[0.06] bg-[#141A17] px-2 py-1 text-xs text-[#F2F5F3] focus:border-orange-600/60 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono text-[#9BA7A0] block">Max Summer Temp (°C)</label>
                    <input
                      type="number"
                      id="climate-temp"
                      value={formData.climate?.maxSummerTempC ?? ''}
                      onChange={(e) => handleInputChange('climate', 'maxSummerTempC', e.target.value === '' ? undefined : parseFloat(e.target.value))}
                      placeholder="e.g. 38"
                      className="w-full rounded-sm border border-white/[0.06] bg-[#141A17] px-2 py-1 text-xs text-[#F2F5F3] focus:border-orange-600/60 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* 3. LAND */}
              <div className="rounded-md border border-lime-900/30 bg-[#101512] p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-white/[0.05] pb-2">
                  <div className="flex items-center gap-1.5 text-lime-400 font-mono text-xs font-bold uppercase">
                    <Sprout className="h-3.5 w-3.5" />
                    <span>LAND</span>
                  </div>
                  <span className={`h-1.5 w-1.5 rounded-full ${hasLand ? 'bg-lime-500' : 'bg-gray-600'}`} />
                </div>
                <div className="space-y-2 text-xs">
                  <div>
                    <label className="text-[10px] font-mono text-[#9BA7A0] block">Land Use Pattern</label>
                    <input
                      type="text"
                      id="land-use"
                      value={formData.land?.landUse || ''}
                      onChange={(e) => handleInputChange('land', 'landUse', e.target.value)}
                      placeholder="e.g. Continuous cereal monoculture"
                      className="w-full rounded-sm border border-white/[0.06] bg-[#141A17] px-2 py-1 text-xs text-[#F2F5F3] focus:border-lime-600/60 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono text-[#9BA7A0] block">Crop Type</label>
                    <input
                      type="text"
                      id="land-crop"
                      value={formData.land?.cropType || ''}
                      onChange={(e) => handleInputChange('land', 'cropType', e.target.value)}
                      placeholder="e.g. Winter Wheat"
                      className="w-full rounded-sm border border-white/[0.06] bg-[#141A17] px-2 py-1 text-xs text-[#F2F5F3] focus:border-lime-600/60 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono text-[#9BA7A0] block">Tillage Practice</label>
                    <select
                      id="land-tillage"
                      value={formData.land?.tillageType || ''}
                      onChange={(e) => handleInputChange('land', 'tillageType', e.target.value)}
                      className="w-full rounded-sm border border-white/[0.06] bg-[#141A17] px-2 py-1 text-xs text-[#F2F5F3] focus:border-lime-600/60 focus:outline-none"
                    >
                      <option value="">Select tillage...</option>
                      <option value="Conventional Inversion">Conventional Inversion Tillage</option>
                      <option value="Reduced Tillage">Reduced Tillage / Chisel</option>
                      <option value="No-Till">Direct Drill / No-Till</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* 4. BIODIVERSITY */}
              <div className="rounded-md border border-purple-900/30 bg-[#101512] p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-white/[0.05] pb-2">
                  <div className="flex items-center gap-1.5 text-purple-300 font-mono text-xs font-bold uppercase">
                    <Activity className="h-3.5 w-3.5" />
                    <span>BIODIVERSITY</span>
                  </div>
                  <span className={`h-1.5 w-1.5 rounded-full ${hasBiodiversity ? 'bg-purple-500' : 'bg-gray-600'}`} />
                </div>
                <div className="space-y-2 text-xs">
                  <div>
                    <label className="text-[10px] font-mono text-[#9BA7A0] block">Pollinator Abundance</label>
                    <select
                      id="bio-pollinators"
                      value={formData.biodiversity?.pollinatorAbundance || ''}
                      onChange={(e) => handleInputChange('biodiversity', 'pollinatorAbundance', e.target.value)}
                      className="w-full rounded-sm border border-white/[0.06] bg-[#141A17] px-2 py-1 text-xs text-[#F2F5F3] focus:border-purple-600/60 focus:outline-none"
                    >
                      <option value="">Select status...</option>
                      <option value="Low">Low / Severely Depleted</option>
                      <option value="Moderate">Moderate Presence</option>
                      <option value="Abundant">Abundant & Diverse</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-mono text-[#9BA7A0] block">Soil Microbial Biomass Index</label>
                    <select
                      id="bio-microbes"
                      value={formData.biodiversity?.soilMicrobialBiomassIndex || ''}
                      onChange={(e) => handleInputChange('biodiversity', 'soilMicrobialBiomassIndex', e.target.value)}
                      className="w-full rounded-sm border border-white/[0.06] bg-[#141A17] px-2 py-1 text-xs text-[#F2F5F3] focus:border-purple-600/60 focus:outline-none"
                    >
                      <option value="">Select status...</option>
                      <option value="Depleted">Depleted / Suppressed</option>
                      <option value="Moderate">Moderate Activity</option>
                      <option value="Active">Biologically Active</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-mono text-[#9BA7A0] block">Canopy / Floral Buffers (%)</label>
                    <input
                      type="number"
                      id="bio-canopy"
                      value={formData.biodiversity?.canopyCoverPercent ?? ''}
                      onChange={(e) => handleInputChange('biodiversity', 'canopyCoverPercent', e.target.value === '' ? undefined : parseFloat(e.target.value))}
                      placeholder="e.g. 5"
                      className="w-full rounded-sm border border-white/[0.06] bg-[#141A17] px-2 py-1 text-xs text-[#F2F5F3] focus:border-purple-600/60 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* 5. WATER */}
              <div className="rounded-md border border-sky-900/30 bg-[#101512] p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-white/[0.05] pb-2">
                  <div className="flex items-center gap-1.5 text-sky-400 font-mono text-xs font-bold uppercase">
                    <Droplets className="h-3.5 w-3.5" />
                    <span>WATER</span>
                  </div>
                  <span className={`h-1.5 w-1.5 rounded-full ${hasWater ? 'bg-sky-500' : 'bg-gray-600'}`} />
                </div>
                <div className="space-y-2 text-xs">
                  <div>
                    <label className="text-[10px] font-mono text-[#9BA7A0] block">Water Table Depth (m)</label>
                    <input
                      type="number"
                      step="0.5"
                      id="water-table"
                      value={formData.water?.waterTableDepthM ?? ''}
                      onChange={(e) => handleInputChange('water', 'waterTableDepthM', e.target.value === '' ? undefined : parseFloat(e.target.value))}
                      placeholder="e.g. 18"
                      className="w-full rounded-sm border border-white/[0.06] bg-[#141A17] px-2 py-1 text-xs text-[#F2F5F3] focus:border-sky-600/60 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono text-[#9BA7A0] block">Irrigation Access</label>
                    <input
                      type="text"
                      id="water-irrigation"
                      value={formData.water?.irrigationType || ''}
                      onChange={(e) => handleInputChange('water', 'irrigationType', e.target.value)}
                      placeholder="e.g. None / Strictly Rainfed"
                      className="w-full rounded-sm border border-white/[0.06] bg-[#141A17] px-2 py-1 text-xs text-[#F2F5F3] focus:border-sky-600/60 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono text-[#9BA7A0] block">Surface Water Availability</label>
                    <input
                      type="text"
                      id="water-surface"
                      value={formData.water?.surfaceWaterAvailability || ''}
                      onChange={(e) => handleInputChange('water', 'surfaceWaterAvailability', e.target.value)}
                      placeholder="e.g. Ephemeral creeks only"
                      className="w-full rounded-sm border border-white/[0.06] bg-[#141A17] px-2 py-1 text-xs text-[#F2F5F3] focus:border-sky-600/60 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* 6. HUMAN IMPACT */}
              <div className="rounded-md border border-rose-900/30 bg-[#101512] p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-white/[0.05] pb-2">
                  <div className="flex items-center gap-1.5 text-rose-400 font-mono text-xs font-bold uppercase">
                    <UserCheck className="h-3.5 w-3.5" />
                    <span>HUMAN IMPACT</span>
                  </div>
                  <span className={`h-1.5 w-1.5 rounded-full ${hasHumanImpact ? 'bg-rose-500' : 'bg-gray-600'}`} />
                </div>
                <div className="space-y-2 text-xs">
                  <div>
                    <label className="text-[10px] font-mono text-[#9BA7A0] block">Synthetic Fertilizer (kg/ha)</label>
                    <input
                      type="number"
                      id="impact-fertilizer"
                      value={formData.humanImpact?.chemicalFertilizerKgHa ?? ''}
                      onChange={(e) => handleInputChange('humanImpact', 'chemicalFertilizerKgHa', e.target.value === '' ? undefined : parseFloat(e.target.value))}
                      placeholder="e.g. 90"
                      className="w-full rounded-sm border border-white/[0.06] bg-[#141A17] px-2 py-1 text-xs text-[#F2F5F3] focus:border-rose-600/60 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono text-[#9BA7A0] block">Pesticide Applications/Yr</label>
                    <input
                      type="number"
                      id="impact-pesticide"
                      value={formData.humanImpact?.pesticideApplicationsPerYear ?? ''}
                      onChange={(e) => handleInputChange('humanImpact', 'pesticideApplicationsPerYear', e.target.value === '' ? undefined : parseFloat(e.target.value))}
                      placeholder="e.g. 3"
                      className="w-full rounded-sm border border-white/[0.06] bg-[#141A17] px-2 py-1 text-xs text-[#F2F5F3] focus:border-rose-600/60 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono text-[#9BA7A0] block">Grazing Intensity</label>
                    <input
                      type="text"
                      id="impact-grazing"
                      value={formData.humanImpact?.grazingIntensity || ''}
                      onChange={(e) => handleInputChange('humanImpact', 'grazingIntensity', e.target.value)}
                      placeholder="e.g. None / Crop only"
                      className="w-full rounded-sm border border-white/[0.06] bg-[#141A17] px-2 py-1 text-xs text-[#F2F5F3] focus:border-rose-600/60 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Submit Action Button */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/[0.08]">
          <button
            type="submit"
            id="analyze-submit-btn"
            disabled={isLoading}
            className="inline-flex items-center gap-2 rounded-md bg-[#244231] px-6 py-2.5 text-sm font-semibold text-[#F2F5F3] hover:bg-[#2D543F] transition border border-emerald-700/50 cursor-pointer disabled:opacity-50 shadow-md"
          >
            <Play className="h-4 w-4 fill-current text-emerald-400" />
            <span>{isLoading ? 'Executing Reasoning...' : 'Execute Multi-Metric Analysis'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
