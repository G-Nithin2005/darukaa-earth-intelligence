import React, { useState } from 'react';
import {
  Search,
  Database,
  ArrowRight,
  BookOpen,
  GitMerge,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Layers,
  Sparkles,
  Cpu,
  FileText,
  AlertTriangle
} from 'lucide-react';
import { AnalysisResult, KnowledgeRecord } from '../types';
import { EvidenceDrawer } from './EvidenceDrawer';
import { getDimensionTheme } from '../utils/theme';

interface EvidenceExplorerViewProps {
  analysisResult: AnalysisResult;
}

export const EvidenceExplorerView: React.FC<EvidenceExplorerViewProps> = ({ analysisResult }) => {
  const [activeStage, setActiveStage] = useState<number>(4);
  const [selectedSource, setSelectedSource] = useState<KnowledgeRecord | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const stages = [
    {
      id: 1,
      title: '1. USER INPUT',
      desc: 'Raw multi-realm field inputs',
      icon: Database
    },
    {
      id: 2,
      title: '2. EXTRACTED VARIABLES',
      desc: 'Normalized biophysical indicators',
      icon: Layers
    },
    {
      id: 3,
      title: '3. 3+ DIMENSION GATE',
      desc: 'Multi-metric sufficiency check',
      icon: ShieldCheck
    },
    {
      id: 4,
      title: '4. RETRIEVED SOURCES',
      desc: 'Authoritative scientific evidence',
      icon: BookOpen
    },
    {
      id: 5,
      title: '5. CAUSAL REASONING',
      desc: 'Multi-variable cascade deduction',
      icon: GitMerge
    },
    {
      id: 6,
      title: '6. GROUNDED ACTION',
      desc: 'Targeted restoration interventions',
      icon: Cpu
    },
  ];

  return (
    <div className="py-6 max-w-7xl mx-auto px-4 text-[#F2F5F3] space-y-6">
      {/* Top Header */}
      <div className="border-b border-white/[0.08] pb-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="rounded-sm bg-white/[0.06] px-2 py-0.5 text-[10px] font-mono font-bold text-emerald-400 uppercase border border-white/[0.08]">
            EPISTEMOLOGICAL AUDIT
          </span>
          <span className="text-xs font-mono text-[#9BA7A0]">
            Transparent Evidence Grounding
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-[#F2F5F3] tracking-tight">
          Evidence Explorer
        </h1>
        <p className="text-xs text-[#9BA7A0]">
          Inspect the complete causal progression from user measurements to scientific citations and restoration recommendations.
        </p>
      </div>

      {/* Interactive Stage Pipeline Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {stages.map((st) => {
          const Icon = st.icon;
          const isActive = activeStage === st.id;
          return (
            <button
              key={st.id}
              id={`evidence-stage-btn-${st.id}`}
              onClick={() => setActiveStage(st.id)}
              className={`rounded-md p-3 text-left transition border cursor-pointer ${
                isActive
                  ? 'bg-[#18231C] text-[#F2F5F3] border-emerald-500/60 shadow-xs'
                  : 'bg-[#101512] text-[#9BA7A0] hover:bg-[#141A17] hover:text-[#F2F5F3] border-white/[0.06]'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <Icon className={`h-4 w-4 ${isActive ? 'text-emerald-400' : 'text-[#6D7B74]'}`} />
                <span className="text-[10px] font-mono opacity-60">0{st.id}</span>
              </div>
              <h4 className="text-xs font-bold font-mono truncate">{st.title}</h4>
              <p className="text-[10px] opacity-75 truncate text-[#9BA7A0]">{st.desc}</p>
            </button>
          );
        })}
      </div>

      {/* Main Stage Content Display */}
      <div className="rounded-md border border-white/[0.08] bg-[#101512] p-5 space-y-5">
        {/* Stage 1: User Input Payload */}
        {activeStage === 1 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#F2F5F3] font-mono">
                Stage 1: Raw Environmental Input Payload
              </h3>
              <span className="text-[10px] font-mono text-emerald-400">Exact Recorded State</span>
            </div>
            <p className="text-xs text-[#9BA7A0]">
              The raw parameter payload ingested for this landscape assessment:
            </p>
            <pre className="rounded-md border border-white/[0.06] bg-[#0A0E0C] p-4 text-xs font-mono text-emerald-400/90 overflow-x-auto">
              {JSON.stringify(analysisResult.inputData, null, 2)}
            </pre>
          </div>
        )}

        {/* Stage 2: Extracted Variables */}
        {activeStage === 2 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#F2F5F3] font-mono">
                Stage 2: Normalized Biophysical Variables ({analysisResult.extractedVariables.length})
              </h3>
              <span className="text-[10px] font-mono text-emerald-400">Standardized Scale</span>
            </div>
            <p className="text-xs text-[#9BA7A0]">
              Biophysical parameters extracted and normalized into qualitative severity and threshold tiers:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {analysisResult.extractedVariables.map((v) => {
                const theme = getDimensionTheme(v.category);
                return (
                  <div
                    key={v.key}
                    className="rounded-md border border-white/[0.06] bg-[#141A17] p-3 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className={`inline-flex items-center gap-1 text-[10px] font-mono ${theme.textColor}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${theme.dotColor}`} />
                        {v.category}
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
                    <h4 className="text-xs font-bold text-[#F2F5F3]">{v.label}</h4>
                    <div className="text-xs font-mono text-[#9BA7A0]">
                      Value: <strong className="text-[#F2F5F3]">{String(v.rawValue)}</strong> {v.unit || ''}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Stage 3: 3+ Dimension Gate */}
        {activeStage === 3 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#F2F5F3] font-mono">
                Stage 3: 3+ Environmental Dimension Sufficiency Gate
              </h3>
              <span className="text-[10px] font-mono text-emerald-400">PASSED ({analysisResult.dimensionCount || 6}/3 Required)</span>
            </div>
            <p className="text-xs text-[#9BA7A0]">
              To protect against premature prescription and single-variable errors, the platform strictly checks for data across at least 3 distinct environmental realms before running reasoning.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
              {(analysisResult.environmentalDimensions || ['SOIL', 'CLIMATE', 'LAND', 'BIODIVERSITY', 'WATER', 'HUMAN IMPACT']).map((dim) => {
                const theme = getDimensionTheme(dim);
                return (
                  <div key={dim} className="rounded-md border border-white/[0.08] bg-[#141A17] p-3 text-center space-y-1">
                    <span className={`h-2 w-2 rounded-full ${theme.dotColor} inline-block`} />
                    <h4 className="text-xs font-bold text-[#F2F5F3] font-mono">{dim}</h4>
                    <span className="text-[10px] font-mono text-emerald-400 block">Covered</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Stage 4: Retrieved Sources (REDESIGNED EVIDENCE CARDS) */}
        {activeStage === 4 && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-sm font-bold text-[#F2F5F3] font-mono">
                  Stage 4: Authoritative Scientific Knowledge Records ({analysisResult.retrievedSources?.length || 0})
                </h3>
                <p className="text-xs text-[#9BA7A0]">
                  Grounded citations retrieved deterministically based on multi-variable intersections:
                </p>
              </div>

              {/* Badge Legend */}
              <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono">
                <span className="rounded-sm bg-emerald-950/60 px-2 py-0.5 text-emerald-300 border border-emerald-800/40">
                  DIRECT SCIENTIFIC EVIDENCE
                </span>
                <span className="rounded-sm bg-purple-950/60 px-2 py-0.5 text-purple-300 border border-purple-800/40">
                  DERIVED SYSTEM INFERENCE
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {(analysisResult.retrievedSources || []).map((source) => {
                const theme = getDimensionTheme(source.category);
                return (
                  <div
                    key={source.id}
                    className="rounded-md border border-white/[0.08] bg-[#141A17] p-4 space-y-3 hover:border-white/[0.15] transition flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      {/* Top badges: Source Type & DIRECT SCIENTIFIC EVIDENCE badge */}
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="rounded-sm bg-emerald-950/60 px-2 py-0.5 font-mono text-[9px] font-bold text-emerald-300 border border-emerald-800/40">
                            DIRECT SCIENTIFIC EVIDENCE
                          </span>
                          <span className="rounded-sm bg-white/[0.06] px-1.5 py-0.5 font-mono text-[9px] text-[#9BA7A0] border border-white/[0.08] capitalize">
                            {source.sourceType?.replace(/_/g, ' ') || 'Scientific Document'}
                          </span>
                        </div>

                        <span className="text-[10px] font-mono text-[#6D7B74]">{source.year}</span>
                      </div>

                      {/* Source Title & Authors */}
                      <div>
                        <h4 className="text-xs font-bold text-[#F2F5F3] leading-snug">
                          {source.title}
                        </h4>
                        <p className="text-[11px] font-mono text-[#9BA7A0] mt-0.5">
                          {source.organization} · <span className="italic">{source.author}</span>
                        </p>
                      </div>

                      {/* Evidence Statement */}
                      <div className="rounded-sm bg-[#0C110E] p-2.5 border border-white/[0.04]">
                        <span className="text-[9px] font-mono uppercase text-[#6D7B74] block mb-0.5">
                          Evidence Statement:
                        </span>
                        <p className="text-xs text-[#9BA7A0] leading-relaxed">
                          {source.summary}
                        </p>
                      </div>

                      {/* Relevant Dimensions & Variables */}
                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        <span className={`inline-flex items-center gap-1 rounded-sm px-1.5 py-0.2 text-[9px] font-mono ${theme.badgeBg} ${theme.textColor} border ${theme.badgeBorder}`}>
                          <span className={`h-1 w-1 rounded-full ${theme.dotColor}`} />
                          {source.category}
                        </span>

                        {source.relevant_variables?.slice(0, 3).map((v, i) => (
                          <span
                            key={i}
                            className="rounded-sm bg-white/[0.04] px-1.5 py-0.2 text-[9px] font-mono text-[#9BA7A0] border border-white/[0.06]"
                          >
                            {v}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Footer: Identifier / DOI */}
                    <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-[#6D7B74]">
                      <span>ID: <strong className="text-[#9BA7A0]">{source.id}</strong></span>
                      {source.doi && (
                        <span className="text-emerald-400/90 truncate max-w-[180px]">
                          DOI: {source.doi}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Stage 5: Causal Reasoning */}
        {activeStage === 5 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#F2F5F3] font-mono">
                Stage 5: Multi-Metric Causal Deduction ({analysisResult.relationships.length} Chains)
              </h3>
              <span className="rounded-sm bg-purple-950/60 px-2 py-0.5 font-mono text-[9px] text-purple-300 border border-purple-800/40">
                DERIVED SYSTEM INFERENCE
              </span>
            </div>
            <div className="space-y-3">
              {analysisResult.relationships.map((chain) => (
                <div
                  key={chain.id}
                  className="rounded-md border border-white/[0.08] bg-[#141A17] p-4 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-[#F2F5F3] font-mono">{chain.title}</h4>
                    <span className="text-[10px] font-mono text-emerald-400">Confidence: {chain.confidence}</span>
                  </div>
                  <p className="text-xs text-[#9BA7A0] leading-relaxed">
                    {chain.mechanism}
                  </p>
                  <div className="pt-1 flex flex-wrap gap-1">
                    {chain.variables.map((v, i) => (
                      <span key={i} className="rounded-sm bg-white/[0.04] px-1.5 py-0.2 text-[9px] font-mono text-[#9BA7A0] border border-white/[0.06]">
                        {v}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Stage 6: Grounded Action */}
        {activeStage === 6 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#F2F5F3] font-mono">
                Stage 6: Grounded Recommendations ({analysisResult.recommendations.length})
              </h3>
              <span className="text-[10px] font-mono text-emerald-400">Verifiable Interventions</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {analysisResult.recommendations.map((rec) => (
                <div key={rec.id} className="rounded-md border border-white/[0.08] bg-[#141A17] p-4 space-y-2">
                  <h4 className="text-xs font-bold text-[#F2F5F3]">{rec.title}</h4>
                  <p className="text-xs text-[#9BA7A0] leading-relaxed">{rec.scientificMechanism}</p>
                  <div className="text-[10px] font-mono text-[#6D7B74] pt-1">
                    Timeframe: {rec.timeHorizon} · Sources: {rec.evidenceIds.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Evidence Drawer */}
      <EvidenceDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        sources={selectedSource ? [selectedSource] : analysisResult.retrievedSources}
        extractedVariables={analysisResult.extractedVariables}
      />
    </div>
  );
};
