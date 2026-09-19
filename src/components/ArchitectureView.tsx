import React from 'react';
import {
  Cpu,
  Layers,
  Database,
  ArrowRight,
  ArrowDown,
  Server,
  Cloud,
  Satellite,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Lock,
  GitBranch,
  Bot,
  Activity,
  Radio
} from 'lucide-react';

export const ArchitectureView: React.FC = () => {
  return (
    <div className="py-6 max-w-7xl mx-auto px-4 text-[#F2F5F3] space-y-12">
      {/* Header */}
      <div className="border-b border-white/[0.08] pb-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="rounded-sm bg-white/[0.06] px-2 py-0.5 text-[10px] font-mono font-bold text-emerald-400 uppercase border border-white/[0.08]">
            JUDGE-FACING BLUEPRINT
          </span>
          <span className="text-xs font-mono text-[#9BA7A0]">
            Deterministic Scientific Core & AI Explainer Pipeline
          </span>
        </div>
        <h1 className="text-xl sm:text-3xl font-bold text-[#F2F5F3] tracking-tight">
          System Architecture
        </h1>
        <p className="text-xs text-[#9BA7A0]">
          Visualizing the deterministic biophysical pipeline, the 3+ dimension gate, and the bounded Gemini explanation layer.
        </p>
      </div>

      {/* 1. THE MAIN ARCHITECTURAL PIPELINE (JUDGE SHOWCASE) */}
      <section className="rounded-md border border-white/[0.08] bg-[#101512] p-6 md:p-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.06] pb-4">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-[#F2F5F3] font-mono">
              Complete End-to-End Execution Pipeline
            </h2>
            <p className="text-xs text-[#9BA7A0]">
              Every step is testable, bounded by empirical literature, and free of fabricated facts.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="rounded-sm bg-emerald-950/60 px-2 py-0.5 text-emerald-400 border border-emerald-800/40 font-bold">
              DETERMINISTIC SCIENTIFIC CORE
            </span>
            <span className="rounded-sm bg-amber-950/60 px-2 py-0.5 text-amber-300 border border-amber-800/40 font-bold">
              GEMINI EXPLANATION LAYER
            </span>
          </div>
        </div>

        {/* Vertical Pipeline Flow with Clear Grouping Labels */}
        <div className="relative space-y-4 max-w-4xl mx-auto">
          {/* SECTION A: DETERMINISTIC SCIENTIFIC CORE */}
          <div className="rounded-md border border-emerald-800/40 bg-[#0C120F] p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-emerald-900/40 pb-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4" />
                DETERMINISTIC SCIENTIFIC CORE (Zero Hallucinations)
              </span>
              <span className="text-[10px] font-mono text-[#6D7B74]">Steps 01 - 06</span>
            </div>

            <div className="space-y-3">
              {/* Step 1: User Input */}
              <div className="rounded-sm bg-[#141A17] p-3.5 border border-white/[0.06] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-sm bg-emerald-950/60 text-emerald-400 font-mono text-xs font-bold border border-emerald-800/40">1</span>
                  <div>
                    <h4 className="font-mono text-xs font-bold text-[#F2F5F3]">USER INPUT</h4>
                    <p className="text-[11px] text-[#9BA7A0]">Multi-realm farm measurements, natural language field notes, or sensor telemetry.</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-[#6D7B74]">Soil, Climate, Land, Bio, Water, Impact</span>
              </div>

              <div className="flex justify-center"><ArrowDown className="h-3.5 w-3.5 text-emerald-500/60" /></div>

              {/* Step 2: Variable Extraction */}
              <div className="rounded-sm bg-[#141A17] p-3.5 border border-white/[0.06] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-sm bg-emerald-950/60 text-emerald-400 font-mono text-xs font-bold border border-emerald-800/40">2</span>
                  <div>
                    <h4 className="font-mono text-xs font-bold text-[#F2F5F3]">VARIABLE EXTRACTION & NORMALIZATION</h4>
                    <p className="text-[11px] text-[#9BA7A0]">Parses inputs into standardized biophysical vector with threshold severity tiers.</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-[#6D7B74]">Critical / High / Moderate</span>
              </div>

              <div className="flex justify-center"><ArrowDown className="h-3.5 w-3.5 text-emerald-500/60" /></div>

              {/* Step 3: 3+ Dimension Gate */}
              <div className="rounded-sm bg-[#16221A] p-3.5 border border-emerald-600/40 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-sm bg-emerald-900/60 text-emerald-300 font-mono text-xs font-bold border border-emerald-700/50">3</span>
                  <div>
                    <h4 className="font-mono text-xs font-bold text-emerald-300">3+ ENVIRONMENTAL DIMENSION GATE</h4>
                    <p className="text-[11px] text-[#9BA7A0]">Sufficiency verification. Blocks single-variable reasoning to prevent ecological misdiagnosis.</p>
                  </div>
                </div>
                <span className="rounded-sm bg-emerald-950 px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-400 border border-emerald-700/50">Gate Enforced</span>
              </div>

              <div className="flex justify-center"><ArrowDown className="h-3.5 w-3.5 text-emerald-500/60" /></div>

              {/* Step 4: Multi-Metric Reasoning */}
              <div className="rounded-sm bg-[#141A17] p-3.5 border border-white/[0.06] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-sm bg-emerald-950/60 text-emerald-400 font-mono text-xs font-bold border border-emerald-800/40">4</span>
                  <div>
                    <h4 className="font-mono text-xs font-bold text-[#F2F5F3]">MULTI-METRIC REASONING</h4>
                    <p className="text-[11px] text-[#9BA7A0]">Deduces non-linear feedback cascades across compound variable intersections.</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-purple-300">System Inference</span>
              </div>

              <div className="flex justify-center"><ArrowDown className="h-3.5 w-3.5 text-emerald-500/60" /></div>

              {/* Step 5: Scientific Retrieval */}
              <div className="rounded-sm bg-[#141A17] p-3.5 border border-white/[0.06] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-sm bg-emerald-950/60 text-emerald-400 font-mono text-xs font-bold border border-emerald-800/40">5</span>
                  <div>
                    <h4 className="font-mono text-xs font-bold text-[#F2F5F3]">SCIENTIFIC RETRIEVAL</h4>
                    <p className="text-[11px] text-[#9BA7A0]">Deterministic matching against curated institutional syntheses and peer-reviewed literature.</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-[#6D7B74]">12 Verified Authorities</span>
              </div>

              <div className="flex justify-center"><ArrowDown className="h-3.5 w-3.5 text-emerald-500/60" /></div>

              {/* Step 6: Grounded Recommendations */}
              <div className="rounded-sm bg-[#141A17] p-3.5 border border-white/[0.06] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-sm bg-emerald-950/60 text-emerald-400 font-mono text-xs font-bold border border-emerald-800/40">6</span>
                  <div>
                    <h4 className="font-mono text-xs font-bold text-[#F2F5F3]">GROUNDED RECOMMENDATIONS</h4>
                    <p className="text-[11px] text-[#9BA7A0]">Formulates verifiable interventions bounded by biophysical mechanisms and trade-offs.</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-emerald-400">Action Plan</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center"><ArrowDown className="h-4 w-4 text-amber-500" /></div>

          {/* SECTION B: GEMINI EXPLANATION LAYER */}
          <div className="rounded-md border border-amber-800/40 bg-[#14110C] p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-amber-900/40 pb-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                <Bot className="h-4 w-4" />
                GEMINI EXPLANATION LAYER (Bounded Natural Language)
              </span>
              <span className="text-[10px] font-mono text-[#6D7B74]">Steps 07 - 08</span>
            </div>

            <div className="space-y-3">
              {/* Step 7: Gemini Explanation */}
              <div className="rounded-sm bg-[#1A1610] p-3.5 border border-white/[0.06] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-sm bg-amber-950/60 text-amber-400 font-mono text-xs font-bold border border-amber-800/40">7</span>
                  <div>
                    <h4 className="font-mono text-xs font-bold text-amber-300">GEMINI EXPLANATION</h4>
                    <p className="text-[11px] text-[#9BA7A0]">Translates deterministic causal outputs into natural, context-grounded practitioner prose without inventing claims.</p>
                  </div>
                </div>
                <span className="rounded-sm bg-amber-950/60 px-2 py-0.5 font-mono text-[10px] text-amber-300 border border-amber-800/40">Gemini 2.5 Flash</span>
              </div>

              <div className="flex justify-center"><ArrowDown className="h-3.5 w-3.5 text-amber-500/60" /></div>

              {/* Step 8: Monitoring */}
              <div className="rounded-sm bg-[#1A1610] p-3.5 border border-white/[0.06] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-sm bg-amber-950/60 text-amber-400 font-mono text-xs font-bold border border-amber-800/40">8</span>
                  <div>
                    <h4 className="font-mono text-xs font-bold text-[#F2F5F3]">EMPIRICAL MONITORING</h4>
                    <p className="text-[11px] text-[#9BA7A0]">Establishes verification timelines and measurable indicators to track ecological recovery.</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-[#6D7B74]">6 - 24 Month Horizon</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Grid: Current Hackathon Version vs Future Enterprise Roadmap */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* CURRENT VERIFIED VERSION */}
        <div className="rounded-md border border-white/[0.08] bg-[#101512] p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
            <div>
              <span className="rounded-sm bg-white/[0.06] px-2 py-0.5 text-[9px] font-mono font-bold text-emerald-400 border border-white/[0.08]">
                CURRENT VERIFIED VERSION
              </span>
              <h3 className="text-base font-bold text-[#F2F5F3] mt-1 font-mono">
                Deterministic Hackathon Architecture
              </h3>
            </div>
            <ShieldCheck className="h-5 w-5 text-emerald-400" />
          </div>

          <p className="text-xs text-[#9BA7A0] leading-relaxed">
            Engineered specifically to guarantee 100% testable reproducibility, zero hallucinated citations, and zero API downtime during judge evaluations.
          </p>

          <div className="space-y-2 text-xs font-mono">
            <div className="rounded-sm bg-[#141A17] p-2.5 border border-white/[0.04]">
              <strong className="text-[#F2F5F3] block mb-0.5">Biophysical State Vector:</strong>
              <span className="text-[#9BA7A0]">Normalized ratings across the 6 environmental dimensions.</span>
            </div>
            <div className="rounded-sm bg-[#141A17] p-2.5 border border-white/[0.04]">
              <strong className="text-[#F2F5F3] block mb-0.5">Causal Feedback Modeling:</strong>
              <span className="text-[#9BA7A0]">Compound feedback matrices linking climate, soil, and trophic collapse.</span>
            </div>
            <div className="rounded-sm bg-[#141A17] p-2.5 border border-white/[0.04]">
              <strong className="text-[#F2F5F3] block mb-0.5">Zero-Tolerance Epistemics:</strong>
              <span className="text-[#9BA7A0]">Strictly separates direct evidence from system inference.</span>
            </div>
          </div>
        </div>

        {/* FUTURE PRODUCTION ENTERPRISE ROADMAP */}
        <div className="rounded-md border border-white/[0.08] bg-[#101512] p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
            <div>
              <span className="rounded-sm bg-white/[0.06] px-2 py-0.5 text-[9px] font-mono font-bold text-sky-400 border border-white/[0.08]">
                PRODUCTION ROADMAP
              </span>
              <h3 className="text-base font-bold text-[#F2F5F3] mt-1 font-mono">
                Scalable Cloud Enterprise Architecture
              </h3>
            </div>
            <Cloud className="h-5 w-5 text-sky-400" />
          </div>

          <p className="text-xs text-[#9BA7A0] leading-relaxed">
            Expanding from static curated literature to real-time satellite telemetry, pgvector embeddings, and continuous sensor calibration.
          </p>

          <div className="space-y-2 text-xs font-mono">
            <div className="rounded-sm bg-[#141A17] p-2.5 border border-white/[0.04]">
              <strong className="text-[#F2F5F3] block mb-0.5">PostgreSQL + pgvector:</strong>
              <span className="text-[#9BA7A0]">Millions of papers with hybrid lexical and high-dimensional semantic search.</span>
            </div>
            <div className="rounded-sm bg-[#141A17] p-2.5 border border-white/[0.04]">
              <strong className="text-[#F2F5F3] block mb-0.5">Earth Engine & Sentinel:</strong>
              <span className="text-[#9BA7A0]">Continuous ingestion of Sentinel-2 NDVI/EVI and SMAP Soil Moisture.</span>
            </div>
            <div className="rounded-sm bg-[#141A17] p-2.5 border border-white/[0.04]">
              <strong className="text-[#F2F5F3] block mb-0.5">Closed-Loop Recalibration:</strong>
              <span className="text-[#9BA7A0]">Automated Bayesian recalibration as post-restoration sensors stream data.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
