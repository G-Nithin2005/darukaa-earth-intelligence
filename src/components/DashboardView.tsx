import React, { useState } from 'react';
import {
  Activity,
  Layers,
  Droplets,
  Sun,
  ShieldAlert,
  Compass,
  AlertTriangle,
  Sparkles,
  Info,
  TrendingDown,
  TrendingUp,
  RefreshCw,
  Cpu,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Radio
} from 'lucide-react';
import { AnalysisResult, EnvironmentalData, Recommendation } from '../types';
import { EnvironmentalParameterCards } from './EnvironmentalParameterCards';
import { RelationshipGraph } from './RelationshipGraph';
import { RecommendationCard } from './RecommendationCard';
import { EvidenceDrawer } from './EvidenceDrawer';

interface DashboardViewProps {
  analysisResult: AnalysisResult;
  onNavigateToTab: (tab: string) => void;
  onReloadDemo: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  analysisResult,
  onNavigateToTab,
  onReloadDemo
}) => {
  const [selectedRec, setSelectedRec] = useState<Recommendation | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const data = analysisResult.inputData;
  const composite = analysisResult.compositeIndicator;

  const handleOpenEvidence = (rec: Recommendation) => {
    setSelectedRec(rec);
    setIsDrawerOpen(true);
  };

  return (
    <div className="py-6 max-w-7xl mx-auto px-4 text-[#F2F5F3] space-y-6">
      {/* 1. TOP COMMAND-CENTER TELEMETRY BAR */}
      <div className="rounded-md border border-white/[0.08] bg-[#0E1310] p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="rounded-sm bg-white/[0.06] px-2 py-0.5 text-[10px] font-mono font-bold text-emerald-400 uppercase border border-white/[0.08]">
              COMMAND CENTER
            </span>
            <span className="text-xs font-mono text-[#9BA7A0]">
              Parcel: {data.location?.region || 'Semi-Arid Drylands'}
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#F2F5F3] tracking-tight">
            Environmental Intelligence Dashboard
          </h1>
          <p className="text-xs text-[#9BA7A0]">
            Continuous multi-metric monitoring across soil, climate, hydrology, land architecture, and trophic resilience.
          </p>
        </div>

        {/* Telemetry quick metrics & actions */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="rounded-sm bg-[#141A17] px-3 py-1.5 border border-white/[0.06] text-xs font-mono">
            <span className="text-[10px] text-[#6D7B74] block">Ecosystem Resilience</span>
            <span className="font-bold text-[#F2F5F3]">
              {composite.label} ({composite.score}/100)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="dash-reload-demo-btn"
              onClick={onReloadDemo}
              className="flex items-center gap-1.5 rounded-md bg-[#141A17] px-3 py-1.5 text-xs font-mono text-[#9BA7A0] hover:bg-[#1A221E] hover:text-[#F2F5F3] transition border border-white/[0.08] cursor-pointer"
            >
              <RefreshCw className="h-3 w-3" />
              Reset Benchmark
            </button>
            <button
              id="dash-inspect-reasoning-btn"
              onClick={() => onNavigateToTab('reasoning')}
              className="flex items-center gap-1.5 rounded-md bg-[#244231] px-3.5 py-1.5 text-xs font-semibold text-[#F2F5F3] hover:bg-[#2D543F] transition border border-emerald-700/50 cursor-pointer"
            >
              <Cpu className="h-3.5 w-3.5 text-emerald-400" />
              <span>Causal Pipeline</span>
            </button>
          </div>
        </div>
      </div>

      {/* Aggregate Ecosystem State Banner */}
      <div className="rounded-md border border-white/[0.08] bg-[#101512] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold uppercase text-[#9BA7A0]">
              Aggregate Diagnostic Assessment
            </span>
            <span className="rounded-sm bg-rose-950/70 px-2 py-0.2 text-[10px] font-mono text-rose-300 border border-rose-800/40">
              CRITICAL BUFFER DEFICIT
            </span>
          </div>
          <p className="text-xs text-[#9BA7A0] leading-relaxed">
            Composite score ({composite.score}/100) reflects low organic carbon (0.3% SOC), high thermal vapor pressure deficit, and continuous wheat cultivation without biological habitat corridors.
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono shrink-0">
          <div className="text-right">
            <span className="text-[10px] text-[#6D7B74] block">Cascades</span>
            <span className="text-sm font-bold text-[#F2F5F3]">{analysisResult.relationships.length} Active</span>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-[#6D7B74] block">Recommendations</span>
            <span className="text-sm font-bold text-emerald-400">{analysisResult.recommendations.length} Grounded</span>
          </div>
        </div>
      </div>

      {/* 2. MAIN 3-COLUMN DASHBOARD COMMAND CENTER LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* LEFT COLUMN: Environmental Parameters (6 realms) */}
        <div className="lg:col-span-3 space-y-4">
          <EnvironmentalParameterCards
            data={analysisResult.inputData}
            extractedVariables={analysisResult.extractedVariables}
          />
        </div>

        {/* CENTER COLUMN: Multi-Metric Relationship Graph */}
        <div className="lg:col-span-5 space-y-4">
          <RelationshipGraph
            chains={analysisResult.relationships}
          />
        </div>

        {/* RIGHT COLUMN: Scientific Synthesis / Grounded Recommendations Summary */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center justify-between pb-1">
            <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#9BA7A0]">
              Grounded Actions ({analysisResult.recommendations.length})
            </span>
            <button
              onClick={() => onNavigateToTab('reasoning')}
              className="text-[10px] font-mono text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer"
            >
              <span>Full Audit</span>
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>

          <div className="space-y-3">
            {analysisResult.recommendations.map((rec) => (
              <RecommendationCard
                key={rec.id}
                rec={rec}
                onInspectEvidence={handleOpenEvidence}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Evidence Drawer for citation inspection */}
      <EvidenceDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        recommendation={selectedRec}
        extractedVariables={analysisResult.extractedVariables}
      />
    </div>
  );
};
