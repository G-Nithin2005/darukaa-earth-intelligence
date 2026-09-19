import React from 'react';
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Cpu,
  Layers,
  Search,
  BookOpen,
  Activity,
  CheckCircle2,
  TrendingUp,
  AlertCircle,
  FileCheck,
  Compass,
  Zap,
  Globe,
  Radio,
  BarChart3,
  MapPin,
  GitBranch,
  Filter
} from 'lucide-react';
import { AnalysisResult } from '../types';
import { DIMENSION_THEMES } from '../utils/theme';

interface LandingViewProps {
  onStartJudgeDemo: () => void;
  onNavigateToTab: (tab: string) => void;
  analysisResult: AnalysisResult | null;
  onLoadBenchmark: () => void;
}

export const LandingView: React.FC<LandingViewProps> = ({
  onStartJudgeDemo,
  onNavigateToTab,
  analysisResult,
  onLoadBenchmark
}) => {
  return (
    <div className="space-y-16 py-8 max-w-7xl mx-auto px-4 text-[#F2F5F3]">
      {/* 1. HERO SECTION: Scientific Environmental Intelligence Platform */}
      <section className="relative overflow-hidden rounded-xl border border-white/[0.08] bg-[#0E1411] p-8 md:p-14 shadow-2xl bg-topo-grid">
        {/* Subtle geospatial coordinates telemetry markers */}
        <div className="absolute top-4 left-6 text-[10px] font-mono text-[#6D7B74] tracking-widest pointer-events-none hidden sm:block">
          LAT 38.5714° N | LON 7.9135° W | DRYLAND AGROECOSYSTEM MATRIX | MULTI-DIMENSIONAL COUPLING
        </div>
        <div className="absolute bottom-4 right-6 text-[10px] font-mono text-[#6D7B74] tracking-widest pointer-events-none hidden sm:block">
          ENGINE: DETERMINISTIC CAUSAL V1.0 | CORPUS: 12 GLOBAL SYNTHESES
        </div>

        {/* Abstract topographic contours SVG overlay */}
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-10 pointer-events-none overflow-hidden">
          <svg viewBox="0 0 400 400" className="w-full h-full stroke-emerald-400 fill-none" strokeWidth="0.75">
            <path d="M 50,200 Q 150,50 250,200 T 450,200" />
            <path d="M 30,220 Q 140,80 260,210 T 470,220" />
            <path d="M 70,180 Q 160,30 240,190 T 430,180" />
            <path d="M 10,240 Q 130,110 270,220 T 490,240" />
            <circle cx="200" cy="180" r="90" strokeDasharray="3 3" />
            <circle cx="200" cy="180" r="140" strokeDasharray="6 6" />
            <line x1="200" y1="20" x2="200" y2="340" strokeDasharray="2 4" strokeWidth="0.5" />
            <line x1="40" y1="180" x2="360" y2="180" strokeDasharray="2 4" strokeWidth="0.5" />
          </svg>
        </div>

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 rounded-md bg-[#16211B] px-3 py-1 text-xs font-mono text-[#9BA7A0] border border-white/[0.08]">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span className="text-[#F2F5F3] font-semibold">DARUKAA EARTH INTELLIGENCE</span>
            <span className="text-[#6D7B74]">· Environmental Analytics Laboratory</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F2F5F3] leading-[1.1]">
              Turn environmental data into <br />
              <span className="text-emerald-400 font-extrabold">
                biodiversity action.
              </span>
            </h1>
            <p className="text-base sm:text-lg text-[#9BA7A0] leading-relaxed max-w-2xl pt-2">
              A high-precision environmental intelligence platform that unifies soil, climate, hydrology, land use, and trophic biodiversity into verifiable, multi-metric causal reasoning and grounded ecological restoration.
            </p>
          </div>

          {/* Primary & Secondary Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              id="landing-hero-analyze-btn"
              onClick={() => onNavigateToTab('analyze')}
              className="inline-flex items-center gap-2 rounded-md bg-[#244231] px-6 py-3 text-sm font-semibold text-[#F2F5F3] hover:bg-[#2D543F] transition border border-emerald-700/50 cursor-pointer shadow-md"
            >
              <Layers className="h-4 w-4 text-emerald-400" />
              <span>Analyze My Land</span>
              <ArrowRight className="h-4 w-4 ml-1" />
            </button>

            <button
              id="landing-hero-evidence-btn"
              onClick={() => onNavigateToTab('evidence-explorer')}
              className="inline-flex items-center gap-2 rounded-md bg-[#141A17] px-6 py-3 text-sm font-medium text-[#9BA7A0] hover:bg-[#1B231F] hover:text-[#F2F5F3] transition border border-white/[0.08] cursor-pointer"
            >
              <Search className="h-4 w-4 text-[#9BA7A0]" />
              <span>Explore Evidence</span>
            </button>

            <button
              id="landing-hero-judge-demo-btn"
              onClick={onStartJudgeDemo}
              className="inline-flex items-center gap-2 rounded-md bg-[#18211B] px-4 py-3 text-xs font-mono text-[#F2F5F3] hover:bg-[#202D25] transition border border-emerald-600/30 cursor-pointer ml-auto"
            >
              <Sparkles className="h-3.5 w-3.5 text-amber-300 animate-pulse" />
              <span>Launch Judge Walkthrough (8 Steps)</span>
            </button>
          </div>

          {/* Core Epistemological Standards */}
          <div className="flex flex-wrap items-center gap-6 pt-5 text-xs font-mono text-[#9BA7A0] border-t border-white/[0.08]">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              <span>3+ Dimension Multi-Metric Gate</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              <span>Zero Fabricated Scientific Citations</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              <span>Explicit Direct Evidence vs System Inference</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE 6 ENVIRONMENTAL DIMENSIONS (Semantic indicators) */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.08] pb-3">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-[#9BA7A0] uppercase block">
              Biophysical Foundation
            </span>
            <h2 className="text-xl font-bold text-[#F2F5F3]">
              Six Environmental Intelligence Dimensions
            </h2>
          </div>
          <p className="text-xs text-[#9BA7A0] max-w-md">
            Single-variable recommendations produce ecological misdiagnosis. Darukaa models across all six realms simultaneously.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {Object.entries(DIMENSION_THEMES).map(([key, theme]) => (
            <div
              key={key}
              className="rounded-md border border-white/[0.08] bg-[#101512] p-4 flex flex-col justify-between space-y-3 hover:border-white/[0.15] transition"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#F2F5F3] font-mono">{theme.label}</span>
                <span className={`h-2 w-2 rounded-full ${theme.dotColor}`} />
              </div>
              <p className="text-[11px] text-[#9BA7A0] leading-snug">
                {key === 'SOIL' && 'SOC, pH, bulk density, and microbial moisture buffers.'}
                {key === 'CLIMATE' && 'Thermal regime, aridity indices, and precipitation variance.'}
                {key === 'WATER' && 'Water table depth, surface infiltration, and drought stress.'}
                {key === 'BIODIVERSITY' && 'Trophic tiers, arthropod indices, and native flora diversity.'}
                {key === 'LAND' && 'Monoculture density, canopy stratification, and edge buffers.'}
                {key === 'HUMAN IMPACT' && 'Tillage intensity, synthetic inputs, and livestock pressure.'}
              </p>
              <div className="pt-2 border-t border-white/[0.05] flex items-center justify-between text-[10px] font-mono text-[#6D7B74]">
                <span>COUPLING</span>
                <span className={theme.textColor}>Active</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. MULTI-METRIC CAUSAL ARCHITECTURE PREVIEW */}
      <section className="rounded-xl border border-white/[0.08] bg-[#101512] p-6 md:p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
          <div>
            <span className="text-[10px] font-mono font-bold tracking-widest text-emerald-400 uppercase">
              Demonstrated Causal Depth
            </span>
            <h3 className="text-xl font-bold text-[#F2F5F3] mt-0.5">
              Why Multi-Variable Compound Reasoning Matters
            </h3>
            <p className="text-xs text-[#9BA7A0] mt-1">
              Traditional farm tools treat symptoms in isolation. Darukaa reveals non-linear feedbacks across the entire ecosystem.
            </p>
          </div>

          <button
            onClick={onLoadBenchmark}
            className="inline-flex items-center gap-2 rounded-md bg-[#18231C] px-3.5 py-2 text-xs font-mono text-[#F2F5F3] border border-white/[0.12] hover:bg-[#202E24] transition cursor-pointer self-start"
          >
            <Sparkles className="h-3.5 w-3.5 text-amber-300" />
            <span>Load Benchmark (Wheat Monoculture 0.3% SOC)</span>
          </button>
        </div>

        {/* Visual Causal Chain Flow */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
          <div className="rounded-md border border-orange-900/30 bg-[#141815] p-4 space-y-1.5">
            <span className="text-[10px] font-mono text-orange-400 uppercase font-semibold">Climate Forcing</span>
            <h4 className="text-xs font-bold text-[#F2F5F3]">Low Rainfall / High VPD</h4>
            <p className="text-[11px] text-[#9BA7A0]">Elevated atmospheric evaporative draw accelerates surface drying.</p>
          </div>

          <div className="rounded-md border border-amber-900/30 bg-[#141815] p-4 space-y-1.5">
            <span className="text-[10px] font-mono text-amber-400 uppercase font-semibold">Soil Vulnerability</span>
            <h4 className="text-xs font-bold text-[#F2F5F3]">Depleted SOC (0.3%)</h4>
            <p className="text-[11px] text-[#9BA7A0]">Inadequate organic sponge prevents rain penetration and retention.</p>
          </div>

          <div className="rounded-md border border-lime-900/30 bg-[#141815] p-4 space-y-1.5">
            <span className="text-[10px] font-mono text-lime-400 uppercase font-semibold">Land Architecture</span>
            <h4 className="text-xs font-bold text-[#F2F5F3]">Continuous Monoculture</h4>
            <p className="text-[11px] text-[#9BA7A0]">Eliminates floral continuity and natural predator habitat corridors.</p>
          </div>

          <div className="rounded-md border border-purple-900/30 bg-[#141815] p-4 space-y-1.5">
            <span className="text-[10px] font-mono text-purple-400 uppercase font-semibold">Trophic Feedback</span>
            <h4 className="text-xs font-bold text-[#F2F5F3]">Arthropod Collapse</h4>
            <p className="text-[11px] text-[#9BA7A0]">Loss of biological pest control triggers yield and ecosystem fragility.</p>
          </div>

          <div className="rounded-md border border-emerald-800/40 bg-[#16231C] p-4 space-y-1.5">
            <span className="text-[10px] font-mono text-emerald-400 uppercase font-semibold">Grounded Action</span>
            <h4 className="text-xs font-bold text-[#F2F5F3]">Targeted Diversification</h4>
            <p className="text-[11px] text-[#9BA7A0]">Stubble retention + drought cover crops rebuilds buffering capacity.</p>
          </div>
        </div>
      </section>

      {/* 4. VERIFIED KNOWLEDGE BASE & SCIENTIFIC CITATIONS */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-md border border-white/[0.08] bg-[#101512] p-6 space-y-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#16211B] text-emerald-400 border border-white/[0.08]">
            <BookOpen className="h-4 w-4" />
          </div>
          <h3 className="text-base font-bold text-[#F2F5F3]">Curated Global Corpus</h3>
          <p className="text-xs text-[#9BA7A0] leading-relaxed">
            Directly indexes empirical syntheses from the FAO, IPCC, IPBES, USDA-NRCS, CBD, and Nature Ecology & Evolution.
          </p>
        </div>

        <div className="rounded-md border border-white/[0.08] bg-[#101512] p-6 space-y-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#16211B] text-amber-400 border border-white/[0.08]">
            <ShieldCheck className="h-4 w-4" />
          </div>
          <h3 className="text-base font-bold text-[#F2F5F3]">Zero Hallucinated Citations</h3>
          <p className="text-xs text-[#9BA7A0] leading-relaxed">
            The platform strictly rejects fabricating academic papers or asserting false certainty. Unknown parameters trigger clarifying diagnostic queries.
          </p>
        </div>

        <div className="rounded-md border border-white/[0.08] bg-[#101512] p-6 space-y-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#16211B] text-sky-400 border border-white/[0.08]">
            <Cpu className="h-4 w-4" />
          </div>
          <h3 className="text-base font-bold text-[#F2F5F3]">Deterministic Core</h3>
          <p className="text-xs text-[#9BA7A0] leading-relaxed">
            Scientific reasoning and cascade deductions execute deterministically on verified mathematical rules, with Gemini acting as an optional explanation layer.
          </p>
        </div>
      </section>
    </div>
  );
};
