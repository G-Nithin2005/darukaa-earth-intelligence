import React from 'react';
import { Recommendation } from '../types';
import { ShieldCheck, Clock, AlertTriangle, Layers, BookOpen, ExternalLink, ArrowRight } from 'lucide-react';

interface RecommendationCardProps {
  rec: Recommendation;
  onInspectEvidence?: (rec: Recommendation) => void;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({
  rec,
  onInspectEvidence
}) => {
  return (
    <div className="rounded-md border border-white/[0.08] bg-[#101512] p-4 text-[#F2F5F3] space-y-3.5 hover:border-white/[0.15] transition">
      {/* Top Meta Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.06] pb-2.5">
        <div className="flex items-center gap-2">
          <span className="rounded-sm bg-emerald-950/60 px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-400 border border-emerald-800/40">
            RECOMMENDATION
          </span>
          {rec.priority && (
            <span className={`text-[10px] font-mono uppercase font-semibold ${
              rec.priority.toLowerCase() === 'immediate' ? 'text-rose-400' :
              rec.priority.toLowerCase() === 'high' ? 'text-amber-400' : 'text-emerald-400'
            }`}>
              {rec.priority} Priority
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 text-[10px] font-mono text-[#6D7B74]">
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {rec.timeHorizon}
          </span>
          <span className="text-white/20">|</span>
          <span>Confidence: <strong className="text-[#9BA7A0]">{rec.confidence}</strong></span>
        </div>
      </div>

      {/* 1. What To Do (Title) */}
      <div>
        <h4 className="text-sm font-bold text-[#F2F5F3] leading-snug">
          {rec.title}
        </h4>
      </div>

      {/* 2. Why This Matters (Biophysical Mechanism) */}
      <div className="space-y-1">
        <span className="text-[10px] font-mono text-[#6D7B74] uppercase tracking-wider block">
          Why This Matters (Biophysical Mechanism)
        </span>
        <p className="text-xs text-[#9BA7A0] leading-relaxed">
          {rec.scientificMechanism}
        </p>
      </div>

      {/* Epistemological Split: Direct Evidence vs System Inference */}
      {(rec.directEvidence || rec.systemInference) && (
        <div className="space-y-2 rounded-sm bg-[#0C110E] p-2.5 border border-white/[0.04] text-[11px]">
          {rec.directEvidence && (
            <div>
              <span className="font-mono text-[9px] uppercase tracking-wider text-emerald-400 font-bold block mb-0.5">
                Direct Scientific Evidence:
              </span>
              <p className="text-[#9BA7A0] leading-relaxed italic text-[11px]">
                {rec.directEvidence}
              </p>
            </div>
          )}
          {rec.systemInference && (
            <div className="pt-1.5 border-t border-white/[0.04]">
              <span className="font-mono text-[9px] uppercase tracking-wider text-purple-300 font-bold block mb-0.5">
                Derived System Inference:
              </span>
              <p className="text-[#9BA7A0] leading-relaxed text-[11px]">
                {rec.systemInference}
              </p>
            </div>
          )}
        </div>
      )}

      {/* 3. Impacted Metrics Chips */}
      {rec.impactedMetrics && rec.impactedMetrics.length > 0 && (
        <div className="space-y-1">
          <span className="text-[10px] font-mono text-[#6D7B74] uppercase block">
            Impacted Biophysical Metrics:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {rec.impactedMetrics.map((metric, i) => (
              <span
                key={i}
                className="rounded-sm bg-white/[0.04] px-2 py-0.5 text-[10px] font-mono text-[#F2F5F3] border border-white/[0.08]"
              >
                {metric}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* 4. Trade-Off & 5. Evidence Reference */}
      <div className="pt-2 border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-1.5 text-amber-300/90 text-[11px]">
          <AlertTriangle className="h-3 w-3 shrink-0" />
          <span className="truncate max-w-[320px]" title={rec.risksAndTradeoffs}>
            <strong>Trade-off:</strong> {rec.risksAndTradeoffs}
          </span>
        </div>

        {onInspectEvidence && (
          <button
            onClick={() => onInspectEvidence(rec)}
            className="flex items-center gap-1 text-[11px] font-mono text-emerald-400 hover:text-emerald-300 transition cursor-pointer shrink-0"
          >
            <BookOpen className="h-3 w-3" />
            <span>{rec.evidence?.length || rec.evidenceIds?.length || 0} Citations</span>
            <ArrowRight className="h-3 w-3" />
          </button>
        )}
      </div>
    </div>
  );
};
