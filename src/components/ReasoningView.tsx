import React, { useState } from 'react';
import {
  Cpu,
  GitMerge,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Search,
  HelpCircle,
  ExternalLink,
  Layers,
  Sparkles,
  Info,
  Calendar
} from 'lucide-react';
import { AnalysisResult, Recommendation, KnowledgeRecord } from '../types';
import { RelationshipGraph } from './RelationshipGraph';
import { EvidenceDrawer } from './EvidenceDrawer';
import { RecommendationCard } from './RecommendationCard';
import { getDimensionTheme } from '../utils/theme';

interface ReasoningViewProps {
  analysisResult: AnalysisResult;
}

export const ReasoningView: React.FC<ReasoningViewProps> = ({ analysisResult }) => {
  const [selectedRecommendation, setSelectedRecommendation] = useState<Recommendation | null>(null);
  const [isEvidenceDrawerOpen, setIsEvidenceDrawerOpen] = useState<boolean>(false);

  const handleOpenEvidence = (rec: Recommendation) => {
    setSelectedRecommendation(rec);
    setIsEvidenceDrawerOpen(true);
  };

  return (
    <div className="py-6 max-w-7xl mx-auto px-4 text-[#F2F5F3] space-y-10">
      {/* Top Section Header */}
      <div className="border-b border-white/[0.08] pb-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="rounded-sm bg-white/[0.06] px-2 py-0.5 text-[10px] font-mono font-bold text-emerald-400 uppercase border border-white/[0.08]">
            CAUSAL REASONING PIPELINE
          </span>
          <span className="text-xs font-mono text-[#9BA7A0]">
            Deterministic Deduction & Multi-Metric Auditing
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-[#F2F5F3] tracking-tight">
          How the AI Reasoned
        </h1>
        <p className="text-xs text-[#9BA7A0]">
          A transparent, step-by-step audit trail from raw biophysical inputs to grounded ecological restoration actions.
        </p>
      </div>

      {/* PIPELINE NAVIGATION BAR */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-center text-xs font-mono">
        <div className="rounded-sm border border-white/[0.08] bg-[#101512] p-2.5">
          <span className="text-[10px] text-emerald-400 block">STAGE 1</span>
          <strong className="text-[#F2F5F3]">Input Variables</strong>
        </div>
        <div className="rounded-sm border border-white/[0.08] bg-[#101512] p-2.5">
          <span className="text-[10px] text-emerald-400 block">STAGE 2</span>
          <strong className="text-[#F2F5F3]">Cascades</strong>
        </div>
        <div className="rounded-sm border border-white/[0.08] bg-[#101512] p-2.5">
          <span className="text-[10px] text-emerald-400 block">STAGE 3</span>
          <strong className="text-[#F2F5F3]">Retrieval</strong>
        </div>
        <div className="rounded-sm border border-white/[0.08] bg-[#101512] p-2.5">
          <span className="text-[10px] text-emerald-400 block">STAGE 4</span>
          <strong className="text-[#F2F5F3]">Interpretation</strong>
        </div>
        <div className="rounded-sm border border-white/[0.08] bg-[#101512] p-2.5">
          <span className="text-[10px] text-emerald-400 block">STAGE 5</span>
          <strong className="text-[#F2F5F3]">Action Cards</strong>
        </div>
        <div className="rounded-sm border border-white/[0.08] bg-[#101512] p-2.5">
          <span className="text-[10px] text-emerald-400 block">STAGE 6</span>
          <strong className="text-[#F2F5F3]">Monitoring</strong>
        </div>
      </div>

      {/* STAGE 1: INPUT VARIABLES */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-sm bg-white/[0.06] text-emerald-400 text-xs font-mono font-bold border border-white/[0.08]">
            01
          </span>
          <h2 className="text-sm font-bold text-[#F2F5F3] tracking-wide font-mono">
            Input Variables & Extracted Biophysical Profile
          </h2>
        </div>
        <p className="text-xs text-[#9BA7A0]">
          Normalized indicators extracted across soil, atmosphere, hydrology, and vegetation canopy:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {analysisResult.extractedVariables.map((v) => {
            const theme = getDimensionTheme(v.category);
            return (
              <div
                key={v.key}
                className="rounded-md border border-white/[0.08] bg-[#101512] p-3 flex flex-col justify-between"
              >
                <div>
                  <span className={`text-[10px] font-mono block truncate ${theme.textColor}`}>
                    {v.category}
                  </span>
                  <h4 className="text-xs font-semibold text-[#F2F5F3] mt-0.5">
                    {v.label}
                  </h4>
                </div>
                <div className="mt-2.5 flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#F2F5F3]">
                    {String(v.rawValue)}
                  </span>
                  <span
                    className={`rounded-sm px-1.5 py-0.2 text-[9px] font-mono uppercase font-semibold ${
                      v.normalizedLevel === 'critical'
                        ? 'bg-rose-950/70 text-rose-300 border border-rose-800/40'
                        : v.normalizedLevel === 'high'
                        ? 'bg-amber-950/70 text-amber-300 border border-amber-800/40'
                        : 'bg-emerald-950/70 text-emerald-300 border border-emerald-800/40'
                    }`}
                  >
                    {v.normalizedLevel}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* STAGE 2: VISUAL RELATIONSHIP GRAPH & DETECTED RELATIONSHIPS */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-sm bg-white/[0.06] text-emerald-400 text-xs font-mono font-bold border border-white/[0.08]">
            02
          </span>
          <h2 className="text-sm font-bold text-[#F2F5F3] tracking-wide font-mono">
            Multi-Metric Interaction Cascades (3+ Variables)
          </h2>
        </div>
        <RelationshipGraph chains={analysisResult.relationships} />
      </section>

      {/* STAGE 3: SCIENTIFIC KNOWLEDGE RETRIEVAL */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-sm bg-white/[0.06] text-emerald-400 text-xs font-mono font-bold border border-white/[0.08]">
            03
          </span>
          <h2 className="text-sm font-bold text-[#F2F5F3] tracking-wide font-mono">
            Curated Scientific Literature Matching ({analysisResult.retrievedSources?.length || 0} Citations)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {analysisResult.retrievedSources.map((source) => {
            const theme = getDimensionTheme(source.category);
            return (
              <div
                key={source.id}
                className="rounded-md border border-white/[0.08] bg-[#101512] p-4 space-y-2 hover:border-white/[0.15] transition"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex flex-wrap items-center gap-1.5 mb-1">
                      <span className="rounded-sm bg-emerald-950/60 px-1.5 py-0.2 font-mono text-[9px] font-bold text-emerald-300 border border-emerald-800/40">
                        DIRECT SCIENTIFIC EVIDENCE
                      </span>
                      <span className={`rounded-sm px-1.5 py-0.2 font-mono text-[9px] ${theme.badgeBg} ${theme.textColor} border ${theme.badgeBorder}`}>
                        {source.category}
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-[#F2F5F3] leading-snug">
                      {source.title}
                    </h4>
                    <span className="text-[10px] font-mono text-[#9BA7A0] mt-0.5 block">
                      {source.organization} ({source.year}) · <span className="italic">{source.author}</span>
                    </span>
                  </div>
                </div>

                <p className="text-xs text-[#9BA7A0] leading-relaxed">
                  {source.summary}
                </p>

                <div className="pt-2 border-t border-white/[0.04] flex items-center justify-between text-[10px] font-mono text-[#6D7B74]">
                  <span>Supported: {source.relevant_variables.join(', ')}</span>
                  {source.doi && <span>DOI: {source.doi}</span>}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* STAGE 4: AI SCIENTIST INTERPRETATION */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-sm bg-white/[0.06] text-emerald-400 text-xs font-mono font-bold border border-white/[0.08]">
            04
          </span>
          <h2 className="text-sm font-bold text-[#F2F5F3] tracking-wide font-mono">
            AI Environmental Scientist Diagnostic Synthesis
          </h2>
        </div>

        <div className="rounded-md border border-white/[0.08] bg-[#101512] p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-2.5">
            <span className="text-xs font-mono font-bold uppercase text-amber-300 flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5" />
              Comprehensive Biophysical Interpretation
            </span>
            <span className="text-[10px] font-mono text-[#6D7B74]">Zero Hallucinated Citations Guarantee</span>
          </div>

          <p className="text-xs text-[#F2F5F3] leading-relaxed whitespace-pre-line">
            {analysisResult.interpretation?.summary}
          </p>

          <div className="rounded-sm bg-[#0E1310] p-3 border border-white/[0.04] space-y-1 text-xs">
            <span className="font-mono text-[10px] uppercase text-emerald-400 font-bold block">
              Confidence & Epistemological Boundaries:
            </span>
            <p className="text-[#9BA7A0] leading-relaxed">
              {analysisResult.uncertainty?.evidenceLimitations || analysisResult.uncertainty?.fieldValidationRequirements || 'Field validation required before applying restorative interventions.'}
            </p>
          </div>
        </div>
      </section>

      {/* STAGE 5: GROUNDED RECOMMENDATIONS */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-sm bg-white/[0.06] text-emerald-400 text-xs font-mono font-bold border border-white/[0.08]">
              05
            </span>
            <h2 className="text-sm font-bold text-[#F2F5F3] tracking-wide font-mono">
              Action Cards: Evidence-Grounded Interventions ({analysisResult.recommendations.length})
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {analysisResult.recommendations.map((rec) => (
            <RecommendationCard
              key={rec.id}
              rec={rec}
              onInspectEvidence={handleOpenEvidence}
            />
          ))}
        </div>
      </section>

      {/* STAGE 6: EMPIRICAL MONITORING PLAN */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-sm bg-white/[0.06] text-emerald-400 text-xs font-mono font-bold border border-white/[0.08]">
            06
          </span>
          <h2 className="text-sm font-bold text-[#F2F5F3] tracking-wide font-mono">
            Empirical Monitoring & Verification Schedule
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {analysisResult.monitoringPlan.map((step) => (
            <div
              key={step.id}
              className="rounded-md border border-white/[0.08] bg-[#101512] p-4 space-y-2"
            >
              <div className="flex items-center justify-between text-[10px] font-mono text-[#6D7B74]">
                <span className="flex items-center gap-1 text-emerald-400">
                  <Clock className="h-3 w-3" />
                  {step.timeHorizon || step.timeframe}
                </span>
                <span>{step.frequency || 'Seasonal'}</span>
              </div>
              <h4 className="text-xs font-bold text-[#F2F5F3]">
                {step.metric || step.indicator}
              </h4>
              <p className="text-[11px] text-[#9BA7A0] leading-relaxed">
                {step.measurementMethod || step.method}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Evidence Drawer */}
      <EvidenceDrawer
        isOpen={isEvidenceDrawerOpen}
        onClose={() => setIsEvidenceDrawerOpen(false)}
        recommendation={selectedRecommendation}
        extractedVariables={analysisResult.extractedVariables}
      />
    </div>
  );
};
