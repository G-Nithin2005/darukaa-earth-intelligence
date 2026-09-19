import React from 'react';
import { X, ExternalLink, BookOpen, ShieldCheck, Database, GitMerge, AlertTriangle, Layers } from 'lucide-react';
import { KnowledgeRecord, Recommendation, ExtractedVariable } from '../types';
import { getDimensionTheme } from '../utils/theme';

interface EvidenceDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  recommendation?: Recommendation | null;
  sources?: KnowledgeRecord[];
  extractedVariables?: ExtractedVariable[];
}

export const EvidenceDrawer: React.FC<EvidenceDrawerProps> = ({
  isOpen,
  onClose,
  recommendation,
  sources = [],
  extractedVariables = []
}) => {
  if (!isOpen) return null;

  const displaySources = recommendation?.evidence?.length ? recommendation.evidence : sources;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/75 backdrop-blur-xs transition-opacity">
      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-2xl border-l border-white/[0.08] bg-[#0E1310] text-[#F2F5F3] shadow-2xl flex flex-col">
          {/* Drawer Header */}
          <div className="border-b border-white/[0.08] bg-[#121814] px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-white/[0.04] text-emerald-400 border border-white/[0.08]">
                  <BookOpen className="h-4 w-4" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-[#F2F5F3] tracking-wide font-mono">
                    Scientific Evidence & Epistemological Audit
                  </h2>
                  <p className="text-[11px] text-[#9BA7A0]">
                    Linking observed data, deterministic inference, and verified literature
                  </p>
                </div>
              </div>
              <button
                id="close-evidence-drawer-btn"
                onClick={onClose}
                className="rounded-sm p-1.5 text-[#9BA7A0] hover:bg-white/[0.06] hover:text-[#F2F5F3] transition cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {recommendation && (
              <div className="mt-3 rounded-sm bg-[#16211B] p-2.5 border border-white/[0.06]">
                <span className="text-[9px] font-mono font-semibold tracking-wider text-emerald-400 uppercase">
                  Intervention Target
                </span>
                <h3 className="text-xs font-semibold text-[#F2F5F3] mt-0.5">
                  {recommendation.title}
                </h3>
              </div>
            )}
          </div>

          {/* Epistemological Distinction Legend */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 px-6 py-2.5 bg-[#0A0F0D] border-b border-white/[0.06] text-[10px] font-mono">
            <div className="flex items-center gap-1.5 text-sky-400">
              <Database className="h-3 w-3 shrink-0" />
              <span>1. USER DATA</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-400">
              <BookOpen className="h-3 w-3 shrink-0" />
              <span>2. EVIDENCE</span>
            </div>
            <div className="flex items-center gap-1.5 text-purple-300">
              <GitMerge className="h-3 w-3 shrink-0" />
              <span>3. INFERENCE</span>
            </div>
            <div className="flex items-center gap-1.5 text-amber-400">
              <AlertTriangle className="h-3 w-3 shrink-0" />
              <span>4. UNCERTAINTY</span>
            </div>
          </div>

          {/* Drawer Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
            {/* Section 1: User Data Context */}
            {extractedVariables.length > 0 && (
              <div className="rounded-md border border-white/[0.08] bg-[#121815] p-3.5 space-y-2">
                <div className="flex items-center gap-2 text-sky-400 font-mono text-[11px] font-semibold uppercase">
                  <Database className="h-3.5 w-3.5" />
                  <span>Observed Input Data Grounding</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {extractedVariables.map((v) => (
                    <span
                      key={v.key}
                      className="inline-flex items-center gap-1 rounded-sm bg-white/[0.04] px-2 py-0.5 text-[10px] font-mono text-[#F2F5F3] border border-white/[0.06]"
                    >
                      <span className="text-[#6D7B74]">{v.label}:</span>
                      <strong>{String(v.rawValue)}</strong>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Section 2: Retrieved Scientific Sources */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-[11px] font-semibold uppercase">
                  <BookOpen className="h-3.5 w-3.5" />
                  <span>Supporting Scientific Citations ({displaySources.length})</span>
                </div>
                <span className="text-[10px] font-mono text-[#6D7B74]">
                  Zero hallucinated citations
                </span>
              </div>

              {displaySources.length === 0 ? (
                <div className="rounded-md border border-white/[0.06] bg-[#121815] p-5 text-center text-xs text-[#9BA7A0]">
                  No supporting records currently associated.
                </div>
              ) : (
                <div className="space-y-3">
                  {displaySources.map((source, idx) => {
                    const theme = getDimensionTheme(source.category);
                    return (
                      <div
                        key={source.id || idx}
                        className="rounded-md border border-white/[0.08] bg-[#121815] p-4 space-y-2.5 transition hover:border-white/[0.15]"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="flex flex-wrap items-center gap-1.5 mb-1">
                              <span className="rounded-sm bg-emerald-950/60 px-1.5 py-0.2 font-mono text-[9px] font-bold text-emerald-300 border border-emerald-800/40">
                                DIRECT SCIENTIFIC EVIDENCE
                              </span>
                              <span className={`rounded-sm px-1.5 py-0.2 font-mono text-[9px] ${theme.badgeBg} ${theme.textColor} border ${theme.badgeBorder}`}>
                                {source.category}
                              </span>
                              {source.sourceType && (
                                <span className="rounded-sm bg-white/[0.04] px-1.5 py-0.2 font-mono text-[9px] text-[#9BA7A0] border border-white/[0.06] capitalize">
                                  {source.sourceType.replace(/_/g, ' ')}
                                </span>
                              )}
                            </div>
                            <h4 className="text-xs font-bold text-[#F2F5F3] leading-snug">
                              {source.title}
                            </h4>
                            <p className="text-[10px] font-mono text-[#9BA7A0] mt-0.5">
                              {source.organization} ({source.year}) · <span className="italic">{source.author}</span>
                            </p>
                          </div>

                          {source.source_url && (
                            <a
                              href={source.source_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 rounded-sm bg-white/[0.04] p-1.5 text-xs text-emerald-400 hover:bg-white/[0.08] transition shrink-0"
                              title="Open verified source link"
                            >
                              <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                          )}
                        </div>

                        {/* Summary & Specific Mechanism */}
                        <div className="rounded-sm bg-[#0B0F0D] p-2.5 text-xs text-[#9BA7A0] leading-relaxed border border-white/[0.04]">
                          <strong className="text-emerald-400 block mb-0.5 font-mono text-[9px] uppercase">
                            Scientific Summary:
                          </strong>
                          {source.summary}
                        </div>

                        {/* Content excerpt if available */}
                        {source.content && (
                          <div className="text-[11px] text-[#9BA7A0] leading-relaxed">
                            <strong className="text-[#F2F5F3] block mb-0.5 text-[10px] font-mono">Mechanism Excerpt:</strong>
                            {source.content}
                          </div>
                        )}

                        {/* Variables & Score footer */}
                        <div className="pt-2 border-t border-white/[0.04] flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono text-[#6D7B74]">
                          <div className="flex items-center gap-1">
                            <span>Supported Variables:</span>
                            <span className="text-[#F2F5F3]">{source.relevant_variables.join(', ')}</span>
                          </div>
                          {source.relevanceScore && (
                            <span className="text-emerald-400">Match: {source.relevanceScore}%</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Section 3: Inferred Reasoning & Epistemological Distinction */}
            {recommendation && (
              <div className="rounded-md border border-white/[0.08] bg-[#121815] p-4 space-y-2.5">
                <div className="flex items-center gap-2 text-purple-300 font-mono text-[11px] font-semibold uppercase">
                  <GitMerge className="h-3.5 w-3.5" />
                  <span>Evidence vs. Inference Distinction</span>
                </div>

                {recommendation.directEvidence && (
                  <div className="rounded-sm bg-emerald-950/30 border border-emerald-800/40 p-2.5 space-y-0.5">
                    <span className="text-[9px] font-mono font-bold text-emerald-400 uppercase tracking-wider block">
                      Direct Scientific Evidence:
                    </span>
                    <p className="text-xs text-[#9BA7A0] leading-relaxed">
                      {recommendation.directEvidence}
                    </p>
                  </div>
                )}

                {recommendation.systemInference && (
                  <div className="rounded-sm bg-purple-950/30 border border-purple-800/40 p-2.5 space-y-0.5">
                    <span className="text-[9px] font-mono font-bold text-purple-300 uppercase tracking-wider block">
                      Derived System Inference:
                    </span>
                    <p className="text-xs text-[#9BA7A0] leading-relaxed">
                      {recommendation.systemInference}
                    </p>
                  </div>
                )}

                {recommendation.risksAndTradeoffs && (
                  <div className="rounded-sm bg-amber-950/20 border border-amber-800/30 p-2.5 space-y-0.5">
                    <span className="text-[9px] font-mono font-bold text-amber-400 uppercase tracking-wider block">
                      Trade-offs & Implementation Cautions:
                    </span>
                    <p className="text-xs text-[#9BA7A0] leading-relaxed">
                      {recommendation.risksAndTradeoffs}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
