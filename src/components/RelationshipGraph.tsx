import React, { useState } from 'react';
import {
  ArrowDown,
  AlertCircle,
  Sparkles,
  GitCommit,
  Layers,
  ArrowRight,
  ShieldCheck,
  Cpu,
  CheckCircle2,
  Info,
  BookOpen
} from 'lucide-react';
import { RelationshipChain } from '../types';
import { getDimensionTheme } from '../utils/theme';

interface RelationshipGraphProps {
  chains: RelationshipChain[];
  onSelectChain?: (chain: RelationshipChain) => void;
}

export const RelationshipGraph: React.FC<RelationshipGraphProps> = ({ chains, onSelectChain }) => {
  const [selectedChainId, setSelectedChainId] = useState<string>(chains[0]?.id || '');
  const [activeStepIdx, setActiveStepIdx] = useState<number | null>(null);

  const activeChain = chains.find((c) => c.id === selectedChainId) || chains[0];

  if (!activeChain) {
    return (
      <div className="rounded-md border border-white/[0.08] bg-[#101512] p-8 text-center text-xs text-[#9BA7A0] font-mono">
        No multi-metric relationship chains detected yet. Provide at least 3 environmental dimensions.
      </div>
    );
  }

  return (
    <div className="rounded-md border border-white/[0.08] bg-[#101512] p-5 text-[#F2F5F3] space-y-5">
      {/* Header & Chain Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-sm bg-white/[0.08] text-emerald-400 text-[10px] font-mono font-bold">
              3+
            </span>
            <h3 className="text-sm font-bold text-[#F2F5F3] tracking-wide font-mono">
              Multi-Metric Interaction Cascades
            </h3>
          </div>
          <p className="text-[11px] text-[#9BA7A0] mt-0.5">
            Non-linear compounding feedbacks across soil, climate, land architecture, and trophic levels.
          </p>
        </div>

        {/* Chain selector pills */}
        <div className="flex flex-wrap gap-1.5">
          {chains.map((chain) => {
            const isSelected = chain.id === activeChain.id;
            return (
              <button
                key={chain.id}
                id={`chain-pill-${chain.id}`}
                onClick={() => {
                  setSelectedChainId(chain.id);
                  setActiveStepIdx(null);
                  if (onSelectChain) onSelectChain(chain);
                }}
                className={`rounded-sm px-2.5 py-1 text-xs font-mono transition cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#18231C] text-[#F2F5F3] border border-emerald-600/50 shadow-xs'
                    : 'bg-[#141A17] text-[#9BA7A0] hover:bg-[#1A221E] hover:text-[#F2F5F3] border border-white/[0.06]'
                }`}
              >
                <GitCommit className="h-3 w-3 text-emerald-400" />
                <span className="truncate max-w-[160px]">{chain.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mandatory Label: SYSTEM INFERENCE */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-md bg-[#141A17] px-3.5 py-2.5 border border-white/[0.06]">
        <div className="flex items-center gap-2">
          <span className="rounded-sm bg-purple-950/60 px-2 py-0.5 font-mono text-[10px] font-bold text-purple-300 border border-purple-800/40">
            SYSTEM INFERENCE
          </span>
          <span className="text-xs font-mono text-[#9BA7A0]">
            Deterministic Multi-Metric Deduction
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono">
          <span className="text-[#6D7B74]">
            Confidence: <strong className="text-[#F2F5F3]">{activeChain.confidence}</strong>
          </span>
          <span className="text-white/20">|</span>
          <span className="text-[#6D7B74]">
            Severity:{' '}
            <strong className={`uppercase ${
              activeChain.severity === 'critical' ? 'text-rose-400' :
              activeChain.severity === 'high' ? 'text-amber-400' : 'text-emerald-400'
            }`}>
              {activeChain.severity}
            </strong>
          </span>
        </div>
      </div>

      {/* CAUSAL CHAIN NODES CONNECTED WITH DIRECTIONAL ARROWS */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-[11px] font-mono text-[#6D7B74] px-1">
          <span>Directional Causal Sequence</span>
          <span>Click node to inspect stage impact</span>
        </div>

        <div className="space-y-2">
          {activeChain.chainSteps.map((step, idx) => {
            const isFirst = idx === 0;
            const isLast = idx === activeChain.chainSteps.length - 1;
            const isSelected = activeStepIdx === idx;

            return (
              <React.Fragment key={idx}>
                <div
                  onClick={() => setActiveStepIdx(isSelected ? null : idx)}
                  className={`group rounded-md border p-3 transition cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-[#19241E] border-emerald-500/60 shadow-sm'
                      : 'bg-[#141A17] border-white/[0.06] hover:border-white/[0.15]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-sm font-mono text-xs font-bold ${
                        isFirst
                          ? 'bg-amber-950/40 border border-amber-800/40 text-amber-400'
                          : isLast
                          ? 'bg-rose-950/40 border border-rose-800/40 text-rose-400'
                          : 'bg-white/[0.04] border border-white/[0.08] text-[#9BA7A0]'
                      }`}
                    >
                      {isFirst ? 'IN' : isLast ? 'OUT' : `0${idx}`}
                    </div>

                    <div>
                      <h4 className="font-mono text-xs font-bold text-[#F2F5F3]">
                        {step}
                      </h4>
                      <span className="text-[10px] font-mono text-[#6D7B74]">
                        {isFirst ? 'Environmental Forcing Trigger' : isLast ? 'Ecosystem Consequence' : 'Intermediary Biophysical Step'}
                      </span>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono text-[#6D7B74] group-hover:text-[#9BA7A0]">
                    {isSelected ? 'Selected' : 'Inspect'}
                  </span>
                </div>

                {/* Downward Directional Connector */}
                {!isLast && (
                  <div className="flex justify-center py-0.5">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#6D7B74]">
                      <ArrowDown className="h-3 w-3 text-emerald-500/70" />
                      <span className="text-[9px] tracking-wider uppercase opacity-60">triggers biophysical cascade</span>
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* DETAILED RELATIONSHIP INSPECTOR PANEL */}
      <div className="rounded-md border border-white/[0.08] bg-[#0E1310] p-4 space-y-3.5">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.06] pb-2.5">
          <div>
            <span className="text-[10px] font-mono uppercase text-[#6D7B74] block">
              Active Cascade Specification
            </span>
            <h4 className="text-xs font-bold text-[#F2F5F3] font-mono mt-0.5">
              {activeChain.title}
            </h4>
          </div>

          {/* Dimension Chips */}
          <div className="flex flex-wrap items-center gap-1.5">
            {activeChain.dimensions.map((dim, i) => {
              const theme = getDimensionTheme(dim);
              return (
                <span
                  key={i}
                  className={`inline-flex items-center gap-1 rounded-sm px-2 py-0.5 text-[10px] font-mono font-medium ${theme.badgeBg} ${theme.textColor} border ${theme.badgeBorder}`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${theme.dotColor}`} />
                  {dim}
                </span>
              );
            })}
          </div>
        </div>

        {/* Variables Involved */}
        <div className="space-y-1">
          <span className="text-[10px] font-mono text-[#6D7B74] uppercase block">
            Variables Involved:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {activeChain.variables.map((v, i) => (
              <span
                key={i}
                className="rounded-sm bg-white/[0.04] px-2 py-0.5 text-[11px] font-mono text-[#F2F5F3] border border-white/[0.08]"
              >
                {v}
              </span>
            ))}
          </div>
        </div>

        {/* Mechanism & Ecological Consequence */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase text-emerald-400 font-semibold block">
              Biophysical Mechanism:
            </span>
            <p className="text-[#9BA7A0] leading-relaxed text-[11px]">
              {activeChain.mechanism || activeChain.scientificExplanation}
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase text-amber-400 font-semibold block">
              Ecological Consequence:
            </span>
            <p className="text-[#9BA7A0] leading-relaxed text-[11px]">
              {activeChain.ecologicalConsequence || activeChain.ecologicalImpact}
            </p>
          </div>
        </div>

        {/* Supporting Evidence IDs */}
        <div className="pt-2 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1.5">
            <BookOpen className="h-3.5 w-3.5 text-emerald-400" />
            <span className="text-[10px] font-mono text-[#6D7B74]">Supporting Evidence Citations:</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {activeChain.supportingEvidenceIds.map((id) => (
              <span
                key={id}
                className="rounded-sm bg-white/[0.04] px-1.5 py-0.2 text-[10px] font-mono text-[#9BA7A0] border border-white/[0.08]"
              >
                {id}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
