import React from 'react';
import {
  History,
  FileText,
  Trash2,
  ExternalLink,
  Download,
  Clock,
  Compass,
  Sparkles,
  Layers,
  Activity,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import { AnalysisResult } from '../types';
import { getDimensionTheme } from '../utils/theme';

interface HistoryViewProps {
  historyList: AnalysisResult[];
  onSelectHistory: (result: AnalysisResult) => void;
  onClearHistory: () => void;
  onLoadBenchmark: () => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  historyList,
  onSelectHistory,
  onClearHistory,
  onLoadBenchmark
}) => {
  const handleExportJSON = (item: AnalysisResult) => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(item, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `darukaa_analysis_${item.id}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="py-6 max-w-7xl mx-auto px-4 text-[#F2F5F3] space-y-6">
      {/* Header */}
      <div className="border-b border-white/[0.08] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="rounded-sm bg-white/[0.06] px-2 py-0.5 text-[10px] font-mono font-bold text-emerald-400 uppercase border border-white/[0.08]">
              HISTORICAL TIMELINE
            </span>
            <span className="text-xs font-mono text-[#9BA7A0]">
              Audited Landscape Evaluations
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#F2F5F3] tracking-tight">
            Analysis History
          </h1>
          <p className="text-xs text-[#9BA7A0]">
            Review past multi-metric evaluations, restore saved landscape parameters, and export deterministic JSON traces.
          </p>
        </div>

        {historyList.length > 0 && (
          <button
            onClick={onClearHistory}
            className="flex items-center gap-1.5 rounded-md bg-rose-950/40 px-3 py-1.5 text-xs font-mono text-rose-300 hover:bg-rose-900/60 transition border border-rose-900/50 cursor-pointer"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Clear History</span>
          </button>
        )}
      </div>

      {historyList.length === 0 ? (
        <div className="rounded-md border border-white/[0.08] bg-[#101512] p-12 text-center space-y-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-white/[0.04] text-[#9BA7A0] mx-auto border border-white/[0.08]">
            <History className="h-5 w-5" />
          </div>
          <h3 className="text-sm font-bold text-[#F2F5F3]">No Previous Analyses Stored Yet</h3>
          <p className="text-xs text-[#9BA7A0] max-w-md mx-auto">
            Run an environmental evaluation through the "Analyze My Land" form or load the official benchmark case to begin logging audits.
          </p>
          <button
            onClick={onLoadBenchmark}
            className="inline-flex items-center gap-2 rounded-md bg-[#244231] px-4 py-2 text-xs font-semibold text-[#F2F5F3] hover:bg-[#2D543F] transition border border-emerald-700/50 cursor-pointer"
          >
            <Sparkles className="h-4 w-4 text-amber-300" />
            <span>Load Benchmark Case</span>
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {historyList.map((item) => {
            const dims = item.environmentalDimensions || ['SOIL', 'CLIMATE', 'LAND', 'BIODIVERSITY'];
            const mainStress = item.relationships[0]?.title || item.compositeIndicator.label;

            return (
              <div
                key={item.id}
                className="rounded-md border border-white/[0.08] bg-[#101512] p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 transition hover:border-white/[0.15]"
              >
                {/* Entry details */}
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono">
                    <span className="text-emerald-400 font-semibold">
                      {new Date(item.timestamp).toLocaleString()}
                    </span>
                    <span className="text-white/20">|</span>
                    <span className="text-[#6D7B74]">
                      Resilience: <strong className="text-[#9BA7A0]">{item.compositeIndicator.score}/100</strong>
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-[#F2F5F3]">
                    {item.inputData.location?.region || item.inputData.location?.country || 'Assessed Agroecosystem'}
                  </h4>

                  <div className="space-y-1">
                    <div className="text-xs text-[#9BA7A0] flex items-center gap-1.5">
                      <span className="text-[10px] font-mono text-[#6D7B74] uppercase">Main Stress:</span>
                      <span className="font-mono text-amber-300/90">{mainStress}</span>
                    </div>

                    {/* Dimensions analyzed chips */}
                    <div className="flex flex-wrap items-center gap-1 pt-1">
                      <span className="text-[10px] font-mono text-[#6D7B74] mr-1">Dimensions:</span>
                      {dims.map((dim, idx) => {
                        const theme = getDimensionTheme(dim);
                        return (
                          <span
                            key={idx}
                            className={`inline-flex items-center gap-1 rounded-sm px-1.5 py-0.2 text-[9px] font-mono ${theme.badgeBg} ${theme.textColor} border ${theme.badgeBorder}`}
                          >
                            <span className={`h-1 w-1 rounded-full ${theme.dotColor}`} />
                            {dim}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 text-[11px] font-mono text-[#6D7B74] pt-1">
                    <span>Relationships: <strong className="text-[#F2F5F3]">{item.relationships.length}</strong></span>
                    <span>Recommendations: <strong className="text-emerald-400">{item.recommendations.length}</strong></span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                  <button
                    onClick={() => handleExportJSON(item)}
                    className="flex items-center gap-1 rounded-md bg-[#141A17] px-3 py-1.5 text-xs font-mono text-[#9BA7A0] hover:bg-[#1A221E] hover:text-[#F2F5F3] transition border border-white/[0.08] cursor-pointer"
                    title="Export raw JSON trace"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>JSON</span>
                  </button>
                  <button
                    onClick={() => onSelectHistory(item)}
                    className="flex items-center gap-1.5 rounded-md bg-[#244231] px-4 py-1.5 text-xs font-semibold text-[#F2F5F3] hover:bg-[#2D543F] transition border border-emerald-700/50 cursor-pointer"
                  >
                    <span>Reopen Analysis</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
