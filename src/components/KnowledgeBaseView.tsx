import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Search,
  Filter,
  ExternalLink,
  ShieldCheck,
  Building,
  Calendar,
  Layers,
  Sparkles
} from 'lucide-react';
import { KnowledgeRecord } from '../types';
import { fetchKnowledgeSources } from '../services/apiClient';
import { SCIENTIFIC_KNOWLEDGE_BASE } from '../data/scientificKnowledge';
import { getDimensionTheme } from '../utils/theme';

export const KnowledgeBaseView: React.FC = () => {
  const [sources, setSources] = useState<KnowledgeRecord[]>(SCIENTIFIC_KNOWLEDGE_BASE);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const categories = [
    'ALL',
    'SOIL',
    'BIODIVERSITY',
    'LAND',
    'CLIMATE',
    'WATER',
    'HUMAN IMPACT'
  ];

  useEffect(() => {
    fetchKnowledgeSources(selectedCategory, searchQuery).then((data) => {
      setSources(data);
    });
  }, [selectedCategory, searchQuery]);

  const uniqueOrganizations = Array.from(new Set(SCIENTIFIC_KNOWLEDGE_BASE.map(s => s.organization)));

  return (
    <div className="py-6 max-w-7xl mx-auto px-4 text-[#F2F5F3] space-y-6">
      {/* Top Header */}
      <div className="border-b border-white/[0.08] pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="rounded-sm bg-white/[0.06] px-2 py-0.5 text-[10px] font-mono font-bold text-emerald-400 uppercase border border-white/[0.08]">
              SCIENTIFIC CORPUS
            </span>
            <span className="text-xs font-mono text-[#9BA7A0]">
              Curated Evidence Index (Zero Fabricated Citations)
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#F2F5F3] tracking-tight">
            Scientific Knowledge Base
          </h1>
          <p className="text-xs text-[#9BA7A0]">
            Transparent repository of authoritative agroecological literature, institutional assessments (FAO, IPCC, IPBES), and technical guidelines.
          </p>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-3 text-xs font-mono">
          <div className="rounded-md border border-white/[0.08] bg-[#101512] px-3.5 py-1.5">
            <span className="text-emerald-400 block font-bold text-sm">{SCIENTIFIC_KNOWLEDGE_BASE.length}</span>
            <span className="text-[10px] text-[#9BA7A0]">Verified Sources</span>
          </div>
          <div className="rounded-md border border-white/[0.08] bg-[#101512] px-3.5 py-1.5">
            <span className="text-emerald-400 block font-bold text-sm">{uniqueOrganizations.length}</span>
            <span className="text-[10px] text-[#9BA7A0]">Organizations</span>
          </div>
        </div>
      </div>

      {/* Search & Category Filter Controls */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-[#6D7B74]" />
            <input
              type="text"
              id="knowledge-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, author, keyword, or biophysical variable..."
              className="w-full rounded-md border border-white/[0.08] bg-[#101512] pl-10 pr-4 py-2 text-xs text-[#F2F5F3] placeholder-[#6D7B74] focus:border-emerald-600/60 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                id={`cat-filter-${cat}`}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-sm px-3 py-1.5 text-xs font-mono transition cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-[#18231C] text-[#F2F5F3] border border-emerald-500/50'
                    : 'bg-[#101512] text-[#9BA7A0] hover:bg-[#141A17] hover:text-[#F2F5F3] border border-white/[0.06]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Knowledge Sources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sources.map((source) => {
          const isExpanded = expandedId === source.id;
          const theme = getDimensionTheme(source.category);

          return (
            <div
              key={source.id}
              className="rounded-md border border-white/[0.08] bg-[#101512] p-4 space-y-3 transition hover:border-white/[0.15] flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="rounded-sm bg-emerald-950/60 px-2 py-0.5 font-mono text-[9px] font-bold text-emerald-300 border border-emerald-800/40">
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
                  <span className="text-[10px] font-mono text-[#6D7B74]">{source.year}</span>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-[#F2F5F3] leading-snug">
                    {source.title}
                  </h3>
                  <p className="text-[10px] font-mono text-[#9BA7A0] mt-0.5">
                    {source.organization} · <span className="italic">{source.author}</span>
                  </p>
                </div>

                <div className="rounded-sm bg-[#0C110E] p-2.5 border border-white/[0.04]">
                  <span className="text-[9px] font-mono uppercase text-[#6D7B74] block mb-0.5">
                    Evidence Statement:
                  </span>
                  <p className="text-xs text-[#9BA7A0] leading-relaxed">
                    {source.summary}
                  </p>
                </div>

                {/* Excerpt if expanded */}
                {isExpanded && source.content && (
                  <div className="pt-2 text-xs text-[#9BA7A0] leading-relaxed border-t border-white/[0.04]">
                    <strong className="text-[#F2F5F3] block mb-1 font-mono text-[10px]">Mechanism Excerpt:</strong>
                    {source.content}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-[#6D7B74]">
                <div className="flex items-center gap-2">
                  <span>ID: {source.id}</span>
                  {source.doi && <span className="truncate max-w-[140px]">DOI: {source.doi}</span>}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : source.id)}
                    className="text-emerald-400 hover:text-emerald-300 transition cursor-pointer"
                  >
                    {isExpanded ? 'Collapse' : 'Inspect Excerpt'}
                  </button>

                  {source.source_url && (
                    <a
                      href={source.source_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#9BA7A0] hover:text-[#F2F5F3] transition"
                      title="Open external source"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
