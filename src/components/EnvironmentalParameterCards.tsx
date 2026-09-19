import React from 'react';
import { Layers, Sun, Droplets, Activity, Sprout, UserCheck, AlertCircle, CheckCircle2 } from 'lucide-react';
import { EnvironmentalData, ExtractedVariable } from '../types';
import { DIMENSION_THEMES, DimensionKey } from '../utils/theme';

interface EnvironmentalParameterCardsProps {
  data: EnvironmentalData;
  extractedVariables: ExtractedVariable[];
}

export const EnvironmentalParameterCards: React.FC<EnvironmentalParameterCardsProps> = ({
  data,
  extractedVariables
}) => {
  // Map extracted variables by realm
  const getVariablesForRealm = (realm: string) => {
    return extractedVariables.filter(v => v.category.toUpperCase() === realm.toUpperCase());
  };

  // Dimensions specification
  const dimensions: { key: DimensionKey; icon: any; fields: { label: string; val: any; unit?: string }[] }[] = [
    {
      key: 'SOIL',
      icon: Layers,
      fields: [
        { label: 'SOC', val: data.soil?.organicCarbonPercent !== undefined ? `${data.soil.organicCarbonPercent}%` : undefined },
        { label: 'pH', val: data.soil?.ph !== undefined ? data.soil.ph : undefined },
        { label: 'Moisture', val: data.soil?.moisturePercent !== undefined ? `${data.soil.moisturePercent}%` : undefined },
        { label: 'Texture', val: data.soil?.soilType || undefined }
      ]
    },
    {
      key: 'CLIMATE',
      icon: Sun,
      fields: [
        { label: 'Rainfall', val: data.climate?.rainfall || undefined },
        { label: 'Annual Rain', val: data.climate?.annualRainfallMm !== undefined ? `${data.climate.annualRainfallMm} mm` : undefined },
        { label: 'Summer Max', val: data.climate?.maxSummerTempC !== undefined ? `${data.climate.maxSummerTempC}°C` : undefined },
        { label: 'Seasonality', val: data.climate?.temperatureSeasonality || undefined }
      ]
    },
    {
      key: 'LAND',
      icon: Sprout,
      fields: [
        { label: 'Land Use', val: data.land?.landUse || undefined },
        { label: 'Crop Type', val: data.land?.cropType || undefined },
        { label: 'Tillage', val: data.land?.tillageType || undefined },
        { label: 'Slope', val: data.land?.slopePercent !== undefined ? `${data.land.slopePercent}%` : undefined }
      ]
    },
    {
      key: 'BIODIVERSITY',
      icon: Activity,
      fields: [
        { label: 'Pollinators', val: data.biodiversity?.pollinatorAbundance || undefined },
        { label: 'Soil Microbes', val: data.biodiversity?.soilMicrobialBiomassIndex || undefined },
        { label: 'Native Species', val: data.biodiversity?.nativeSpeciesCount !== undefined ? data.biodiversity.nativeSpeciesCount : undefined },
        { label: 'Floral Buffers', val: data.biodiversity?.canopyCoverPercent !== undefined ? `${data.biodiversity.canopyCoverPercent}%` : undefined }
      ]
    },
    {
      key: 'WATER',
      icon: Droplets,
      fields: [
        { label: 'Water Table', val: data.water?.waterTableDepthM !== undefined ? `${data.water.waterTableDepthM} m` : undefined },
        { label: 'Surface Water', val: data.water?.surfaceWaterAvailability || undefined },
        { label: 'Irrigation', val: data.water?.irrigationType || undefined },
        { label: 'Drought Reg.', val: data.water?.droughtFrequencyMonths !== undefined ? `${data.water.droughtFrequencyMonths} mo` : undefined }
      ]
    },
    {
      key: 'HUMAN IMPACT',
      icon: UserCheck,
      fields: [
        { label: 'Fertilizer', val: data.humanImpact?.chemicalFertilizerKgHa !== undefined ? `${data.humanImpact.chemicalFertilizerKgHa} kg/ha` : undefined },
        { label: 'Pesticides', val: data.humanImpact?.pesticideApplicationsPerYear !== undefined ? `${data.humanImpact.pesticideApplicationsPerYear} /yr` : undefined },
        { label: 'Grazing', val: data.humanImpact?.grazingIntensity || undefined },
        { label: 'Practices', val: data.humanImpact?.conservationPractices || undefined }
      ]
    }
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between pb-1">
        <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#9BA7A0]">
          Environmental Parameters (6 Realms)
        </span>
        <span className="text-[10px] font-mono text-[#6D7B74]">
          Telemetry Feed
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
        {dimensions.map((dim) => {
          const theme = DIMENSION_THEMES[dim.key];
          const Icon = dim.icon;
          const detectedVars = getVariablesForRealm(dim.key);
          const hasDetected = detectedVars.length > 0;
          const availableFields = dim.fields.filter(f => f.val !== undefined);
          const isMeasured = availableFields.length > 0 || hasDetected;

          return (
            <div
              key={dim.key}
              className={`rounded-md border p-3 transition bg-[#101512] ${
                isMeasured ? 'border-white/[0.12]' : 'border-white/[0.05] opacity-75'
              }`}
            >
              {/* Header */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <div className={`flex h-6 w-6 items-center justify-center rounded-sm bg-white/[0.04] ${theme.textColor}`}>
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                  <span className="font-mono text-xs font-bold text-[#F2F5F3] tracking-wide">
                    {dim.key}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className={`h-1.5 w-1.5 rounded-full ${isMeasured ? theme.dotColor : 'bg-gray-600'}`} />
                  <span className="text-[10px] font-mono text-[#9BA7A0]">
                    {isMeasured ? 'MEASURED' : 'UNMEASURED'}
                  </span>
                </div>
              </div>

              {/* Detected Metrics / Values */}
              {isMeasured ? (
                <div className="space-y-1.5 text-xs">
                  <div className="grid grid-cols-2 gap-1.5">
                    {availableFields.slice(0, 4).map((f, i) => (
                      <div key={i} className="rounded-sm bg-white/[0.02] px-2 py-1 border border-white/[0.04]">
                        <span className="text-[10px] font-mono text-[#6D7B74] block truncate">{f.label}</span>
                        <span className="font-mono text-[11px] font-semibold text-[#F2F5F3] truncate block">
                          {String(f.val)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Status & Confidence row */}
                  <div className="pt-1.5 flex items-center justify-between text-[10px] font-mono text-[#6D7B74] border-t border-white/[0.04]">
                    <span>
                      Confidence: <strong className="text-[#9BA7A0]">{hasDetected ? 'High (In-Situ)' : 'Direct Input'}</strong>
                    </span>
                    {detectedVars[0] && (
                      <span className={`uppercase font-semibold ${
                        detectedVars[0].normalizedLevel === 'critical' ? 'text-rose-400' :
                        detectedVars[0].normalizedLevel === 'high' ? 'text-amber-400' : 'text-emerald-400'
                      }`}>
                        {detectedVars[0].normalizedLevel}
                      </span>
                    )}
                  </div>
                </div>
              ) : (
                <div className="rounded-sm bg-white/[0.02] p-2 text-center text-[10px] font-mono text-[#6D7B74]">
                  Not available
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
