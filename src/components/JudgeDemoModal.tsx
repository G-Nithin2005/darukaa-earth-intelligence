import React, { useState } from 'react';
import {
  X,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Database,
  Search,
  GitMerge,
  BookOpen,
  Cpu,
  Layers,
  Activity,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { AnalysisResult, EnvironmentalData } from '../types';
import { DEMO_CASE_INPUT } from '../data/scientificKnowledge';
import { getDimensionTheme } from '../utils/theme';

interface JudgeDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoadAndRunDemo: () => void;
  analysisResult: AnalysisResult | null;
  onNavigateToTab: (tab: string) => void;
}

export const JudgeDemoModal: React.FC<JudgeDemoModalProps> = ({
  isOpen,
  onClose,
  onLoadAndRunDemo,
  analysisResult,
  onNavigateToTab
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  if (!isOpen) return null;

  const steps = [
    {
      step: 1,
      title: 'Load Benchmark Demo Case',
      badge: 'Step 1 of 8',
      subtitle: 'Semi-arid degraded dryland wheat monoculture'
    },
    {
      step: 2,
      title: 'Multidimensional Environmental Inputs',
      badge: 'Step 2 of 8',
      subtitle: 'Soil, Climate, Land, Biodiversity, Human, and Water data'
    },
    {
      step: 3,
      title: 'Variable Extraction & Normalization',
      badge: 'Step 3 of 8',
      subtitle: 'Extracting normalized biophysical indicators'
    },
    {
      step: 4,
      title: 'Multi-Metric Relationships (3+ Variables)',
      badge: 'Step 4 of 8',
      subtitle: 'Compound causal interactions over single-variable mapping'
    },
    {
      step: 5,
      title: 'Transparent Knowledge Retrieval',
      badge: 'Step 5 of 8',
      subtitle: 'Explicit search queries against curated scientific and institutional sources'
    },
    {
      step: 6,
      title: 'Scientific Ecological Interpretation',
      badge: 'Step 6 of 8',
      subtitle: 'Cautious, evidence-grounded biophysical synthesis'
    },
    {
      step: 7,
      title: 'Context-Sensitive Actionable Recommendations',
      badge: 'Step 7 of 8',
      subtitle: 'Specific mechanisms, tradeoffs, and verified citations'
    },
    {
      step: 8,
      title: 'Empirical Monitoring Plan',
      badge: 'Step 8 of 8',
      subtitle: 'Measurement methods without unsupported fabricated targets'
    }
  ];

  const handleNext = () => {
    if (currentStep === 1 && !analysisResult) {
      onLoadAndRunDemo();
    }
    if (currentStep < 8) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl rounded-md border border-white/[0.12] bg-[#0E1310] text-[#F2F5F3] shadow-2xl overflow-hidden my-6">
        {/* Top Header Bar */}
        <div className="border-b border-white/[0.08] bg-[#121714] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-sm bg-white/[0.06] text-amber-300 border border-white/[0.08]">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-[#F2F5F3] font-mono tracking-wide">
                  HACKATHON JUDGE DEMO MODE
                </h2>
                <span className="rounded-sm bg-emerald-950/60 px-2 py-0.5 text-[10px] font-mono text-emerald-300 border border-emerald-800/40">
                  Guided Scientific Walkthrough
                </span>
              </div>
              <p className="text-[11px] text-[#9BA7A0]">
                DARUKAA EARTH INTELLIGENCE • Verified 8-Stage Causal Pipeline
              </p>
            </div>
          </div>
          <button
            id="close-judge-modal-btn"
            onClick={onClose}
            className="rounded-sm p-1.5 text-[#9BA7A0] hover:bg-white/[0.06] hover:text-[#F2F5F3] transition cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Step Progress Bar */}
        <div className="grid grid-cols-8 border-b border-white/[0.06] bg-[#0A0E0B] text-[10px] font-mono">
          {steps.map((s) => {
            const isActive = s.step === currentStep;
            const isCompleted = s.step < currentStep;
            return (
              <button
                key={s.step}
                onClick={() => setCurrentStep(s.step)}
                className={`px-2 py-2 text-center transition border-r border-white/[0.04] last:border-r-0 flex flex-col items-center justify-center gap-0.5 cursor-pointer ${
                  isActive
                    ? 'bg-[#18231C] text-emerald-400 border-b-2 border-emerald-400 font-bold'
                    : isCompleted
                    ? 'bg-[#101512] text-emerald-500/80'
                    : 'text-[#6D7B74] hover:bg-[#101512]'
                }`}
              >
                <span>Stage {s.step}</span>
                <span className="truncate max-w-full text-[9px] hidden md:block">
                  {s.title.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Modal Main Body */}
        <div className="p-6 max-h-[65vh] overflow-y-auto space-y-6">
          {/* Step Banner */}
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
            <div>
              <span className="font-mono text-[10px] text-emerald-400 uppercase tracking-wider font-semibold">
                {steps[currentStep - 1].badge}
              </span>
              <h3 className="text-base font-bold text-[#F2F5F3] mt-0.5">
                {steps[currentStep - 1].title}
              </h3>
              <p className="text-xs text-[#9BA7A0]">
                {steps[currentStep - 1].subtitle}
              </p>
            </div>
          </div>

          {/* Step 1: Load Benchmark Demo Case */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="rounded-md border border-white/[0.08] bg-[#121714] p-5">
                <h4 className="text-xs font-semibold text-[#F2F5F3] mb-2 font-mono uppercase">
                  Official Darukaa Earth Intelligence Benchmark Case Study
                </h4>
                <p className="text-xs text-[#9BA7A0] leading-relaxed mb-4">
                  The hackathon criteria explicitly evaluates multi-variable reasoning across complex real-world environmental stress. We load a benchmark dryland landscape suffering from compound degradation:
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 font-mono text-xs">
                  <div className="rounded-sm bg-[#0E1310] p-2.5 border border-white/[0.06]">
                    <span className="text-[10px] text-[#6D7B74] block">Region:</span>
                    <strong className="text-[#F2F5F3]">Semi-arid agrozone</strong>
                  </div>
                  <div className="rounded-sm bg-[#0E1310] p-2.5 border border-white/[0.06]">
                    <span className="text-[10px] text-[#6D7B74] block">Soil Org. Carbon:</span>
                    <strong className="text-rose-400">0.3% (Critical)</strong>
                  </div>
                  <div className="rounded-sm bg-[#0E1310] p-2.5 border border-white/[0.06]">
                    <span className="text-[10px] text-[#6D7B74] block">Precipitation:</span>
                    <strong className="text-amber-400">Low (Water-limited)</strong>
                  </div>
                  <div className="rounded-sm bg-[#0E1310] p-2.5 border border-white/[0.06]">
                    <span className="text-[10px] text-[#6D7B74] block">Soil Moisture:</span>
                    <strong className="text-rose-400">Low (12%)</strong>
                  </div>
                  <div className="rounded-sm bg-[#0E1310] p-2.5 border border-white/[0.06]">
                    <span className="text-[10px] text-[#6D7B74] block">Temperature:</span>
                    <strong className="text-rose-400">High (Heat stress)</strong>
                  </div>
                  <div className="rounded-sm bg-[#0E1310] p-2.5 border border-white/[0.06]">
                    <span className="text-[10px] text-[#6D7B74] block">Cropping System:</span>
                    <strong className="text-[#F2F5F3]">Wheat Monoculture</strong>
                  </div>
                  <div className="rounded-sm bg-[#0E1310] p-2.5 border border-white/[0.06]">
                    <span className="text-[10px] text-[#6D7B74] block">Species Richness:</span>
                    <strong className="text-rose-400">Low (Depleted)</strong>
                  </div>
                  <div className="rounded-sm bg-[#0E1310] p-2.5 border border-white/[0.06]">
                    <span className="text-[10px] text-[#6D7B74] block">Water Availability:</span>
                    <strong className="text-amber-400">Seasonal scarcity</strong>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-md bg-[#16211B] p-4 border border-emerald-700/40">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span className="text-xs text-[#F2F5F3]">
                    Ready to execute full reasoning pipeline on this benchmark case.
                  </span>
                </div>
                <button
                  id="judge-load-run-demo-btn"
                  onClick={() => {
                    onLoadAndRunDemo();
                    setCurrentStep(2);
                  }}
                  className="rounded-md bg-[#244231] px-4 py-2 text-xs font-semibold text-[#F2F5F3] hover:bg-[#2D543F] transition flex items-center gap-1.5 border border-emerald-600/40 cursor-pointer"
                >
                  <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                  Load & Execute Assessment
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Show Environmental Inputs */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <p className="text-xs text-[#9BA7A0]">
                Data ingestion captures metrics across 6 distinct environmental realms, ensuring holistic rather than siloed analysis:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
                <div className="rounded-md border border-white/[0.08] bg-[#121714] p-3.5">
                  <span className="text-[11px] font-bold text-amber-400 block mb-2">SOIL HEALTH</span>
                  <p>pH: 7.6 (Slightly alkaline)</p>
                  <p className="text-rose-400 font-bold">Organic Carbon: 0.3%</p>
                  <p>Moisture: 12% (Depleted)</p>
                  <p>Soil Type: Sandy loam</p>
                </div>
                <div className="rounded-md border border-white/[0.08] bg-[#121714] p-3.5">
                  <span className="text-[11px] font-bold text-orange-400 block mb-2">CLIMATE & WATER</span>
                  <p>Temperature: High</p>
                  <p>Rainfall: Low</p>
                  <p>Variability: High episodic</p>
                  <p>Water: Seasonal scarcity</p>
                </div>
                <div className="rounded-md border border-white/[0.08] bg-[#121714] p-3.5">
                  <span className="text-[11px] font-bold text-lime-400 block mb-2">LAND & BIODIVERSITY</span>
                  <p>Crop: Wheat</p>
                  <p className="text-amber-300 font-bold">System: Monoculture</p>
                  <p>Species Richness: Low</p>
                  <p>Habitat Diversity: Low</p>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Extract Variables */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <p className="text-xs text-[#9BA7A0]">
                Raw field measurements are extracted and categorized into normalized biophysical indicators with contextual severity ratings:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
                {(analysisResult?.extractedVariables || []).map((v) => (
                  <div
                    key={v.key}
                    className="rounded-sm border border-white/[0.06] bg-[#121714] p-2.5 flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-mono text-[#9BA7A0]">{v.category}</span>
                      <span
                        className={`rounded-sm px-1.5 py-0.2 text-[9px] font-mono font-bold uppercase ${
                          v.normalizedLevel === 'critical'
                            ? 'bg-rose-950 text-rose-300'
                            : v.normalizedLevel === 'high'
                            ? 'bg-amber-950 text-amber-300'
                            : 'bg-emerald-950 text-emerald-300'
                        }`}
                      >
                        {v.normalizedLevel}
                      </span>
                    </div>
                    <span className="font-semibold text-[#F2F5F3]">{v.label}</span>
                    <span className="font-mono text-emerald-400 mt-1">{String(v.rawValue)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Show Multi-Metric Relationships */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <div className="rounded-sm bg-amber-950/20 border border-amber-800/40 p-3 text-xs text-amber-200">
                <strong>Crucial Hackathon Directive:</strong> The engine refuses single-variable mappings (such as <em>"low rainfall → plant X"</em>). Instead, it identifies multi-variable 3-way interactions:
              </div>

              <div className="space-y-2.5">
                {(analysisResult?.relationships || []).map((chain) => (
                  <div
                    key={chain.id}
                    className="rounded-md border border-white/[0.08] bg-[#121714] p-3.5 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-[#F2F5F3] font-mono uppercase tracking-wide">
                        {chain.title}
                      </h4>
                      <span className="text-[10px] font-mono text-rose-300 bg-rose-950/60 px-2 py-0.5 rounded-sm border border-rose-900/40">
                        {chain.severity} compound risk
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5 py-1 text-xs font-mono">
                      {chain.chainSteps.map((step, idx) => (
                        <React.Fragment key={idx}>
                          <span className="rounded-sm bg-white/[0.04] px-2 py-0.5 text-emerald-300 border border-white/[0.08]">
                            {step}
                          </span>
                          {idx < chain.chainSteps.length - 1 && (
                            <ArrowRight className="h-3 w-3 text-emerald-400 shrink-0" />
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                    <p className="text-[11px] text-[#9BA7A0] leading-relaxed">
                      {chain.ecologicalImpact}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 5: Show Retrieved Evidence */}
          {currentStep === 5 && (
            <div className="space-y-4">
              <div className="rounded-sm border border-white/[0.08] bg-[#121714] p-3 text-xs text-[#9BA7A0]">
                <strong className="text-[#F2F5F3] block mb-1 font-mono text-[10px]">Transparent Knowledge Retrieval Query:</strong>
                <code className="block rounded bg-[#0A0E0B] p-2 text-emerald-400 font-mono text-[11px] border border-white/[0.06]">
                  {analysisResult?.retrievalQuery || 'multi_metric_search: [soil_organic_carbon, rainfall, monoculture] context: [dryland]'}
                </code>
              </div>

              <div className="space-y-2">
                {(analysisResult?.retrievedSources || []).slice(0, 3).map((source) => (
                  <div
                    key={source.id}
                    className="rounded-md border border-white/[0.08] bg-[#121714] p-3 text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="rounded-sm bg-white/[0.06] px-2 py-0.5 font-mono text-[10px] text-emerald-400 border border-white/[0.08]">
                        {source.organization} ({source.year})
                      </span>
                      <span className="font-mono text-[10px] text-emerald-400">
                        Relevance: {source.relevanceScore}%
                      </span>
                    </div>
                    <h5 className="font-semibold text-[#F2F5F3]">{source.title}</h5>
                    <p className="text-[#9BA7A0] text-[11px]">{source.summary}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 6: Show Scientific Reasoning */}
          {currentStep === 6 && (
            <div className="space-y-4">
              <div className="rounded-md border border-white/[0.08] bg-[#121714] p-4 space-y-2">
                <span className="font-mono text-[10px] font-semibold text-emerald-400 uppercase">
                  Synthesized Ecological Interpretation
                </span>
                <p className="text-xs text-[#F2F5F3] leading-relaxed whitespace-pre-line">
                  {analysisResult?.interpretation?.summary}
                </p>
              </div>
            </div>
          )}

          {/* Step 7: Show Recommendations */}
          {currentStep === 7 && (
            <div className="space-y-3">
              <p className="text-xs text-[#9BA7A0]">
                Interventions are tailored strictly to the dryland monoculture context, complete with biophysical mechanisms and risks:
              </p>
              {(analysisResult?.recommendations || []).slice(0, 2).map((rec) => (
                <div
                  key={rec.id}
                  className="rounded-md border border-white/[0.08] bg-[#121714] p-4 space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="rounded-sm bg-white/[0.06] px-2 py-0.5 font-mono text-[10px] text-emerald-400 border border-white/[0.08]">
                      {rec.category}
                    </span>
                    <span className="font-mono text-[10px] text-emerald-300">
                      {rec.confidence} Confidence • {rec.timeHorizon}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-[#F2F5F3]">{rec.title}</h4>
                  <p className="text-[#D9CFC4]"><strong className="text-[#F2F5F3]">Action: </strong>{rec.whatToDo}</p>
                  <p className="text-[#9BA7A0]"><strong className="text-[#F2F5F3]">Mechanism: </strong>{rec.scientificMechanism}</p>
                </div>
              ))}
            </div>
          )}

          {/* Step 8: Show Monitoring Plan */}
          {currentStep === 8 && (
            <div className="space-y-4">
              <p className="text-xs text-[#9BA7A0]">
                Actionable empirical monitoring plan without fabricated percentage targets:
              </p>
              <div className="space-y-2">
                {(analysisResult?.monitoringPlan || []).map((m) => (
                  <div
                    key={m.id}
                    className="rounded-sm border border-white/[0.06] bg-[#121714] p-3 text-xs flex flex-col md:flex-row md:items-center justify-between gap-2"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#F2F5F3]">{m.metric || m.indicator}</span>
                        <span className="rounded-sm bg-white/[0.06] px-2 py-0.2 text-[10px] font-mono text-emerald-400">
                          {m.frequency || 'Seasonal'}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#9BA7A0] mt-0.5">{m.measurementMethod || m.method}</p>
                    </div>
                    <span className="font-mono text-[10px] text-emerald-300 bg-[#16211B] px-2.5 py-1 rounded-sm shrink-0">
                      {m.timeHorizon || m.timeframe}
                    </span>
                  </div>
                ))}
              </div>

              <div className="rounded-md bg-[#16211B] p-4 border border-emerald-700/40 flex items-center justify-between">
                <div>
                  <h5 className="text-xs font-bold text-[#F2F5F3] font-mono uppercase">
                    Walkthrough Complete
                  </h5>
                  <p className="text-[11px] text-[#9BA7A0]">
                    Explore the full interactive system via the navigation tabs.
                  </p>
                </div>
                <button
                  id="judge-open-reasoning-btn"
                  onClick={() => {
                    onClose();
                    onNavigateToTab('reasoning');
                  }}
                  className="rounded-md bg-[#244231] px-3.5 py-2 text-xs font-semibold text-[#F2F5F3] hover:bg-[#2D543F] transition cursor-pointer border border-emerald-600/40"
                >
                  Explore Reasoning Engine →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="border-t border-white/[0.08] bg-[#0A0E0B] px-6 py-4 flex items-center justify-between">
          <button
            id="judge-prev-step-btn"
            onClick={handlePrev}
            disabled={currentStep === 1}
            className={`flex items-center gap-1.5 rounded-sm px-3.5 py-1.5 text-xs font-medium transition cursor-pointer ${
              currentStep === 1
                ? 'text-[#6D7B74] opacity-40 cursor-not-allowed'
                : 'text-[#9BA7A0] hover:bg-white/[0.06] hover:text-[#F2F5F3]'
            }`}
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </button>

          <div className="flex items-center gap-1 text-xs font-mono text-emerald-400">
            Step {currentStep} of 8
          </div>

          <button
            id="judge-next-step-btn"
            onClick={handleNext}
            className="flex items-center gap-1.5 rounded-md bg-[#244231] px-4 py-1.5 text-xs font-semibold text-[#F2F5F3] hover:bg-[#2D543F] transition shadow-sm border border-emerald-600/40 cursor-pointer"
          >
            {currentStep === 8 ? 'Finish Tour' : 'Next Step'}
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
