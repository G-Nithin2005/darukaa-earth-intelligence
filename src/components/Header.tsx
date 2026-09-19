import React from 'react';
import {
  Compass,
  Activity,
  Layers,
  Bot,
  Search,
  BookOpen,
  History,
  Cpu,
  Settings,
  Sparkles,
  ShieldCheck,
  Play,
  CheckCircle2,
  Database,
  Radio
} from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onStartJudgeDemo: () => void;
  isDemoMode: boolean;
  activeAnalysisCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onStartJudgeDemo,
  isDemoMode,
  activeAnalysisCount
}) => {
  const navItems = [
    { id: 'landing', label: 'Overview', icon: Compass },
    { id: 'dashboard', label: 'Dashboard', icon: Activity },
    { id: 'analyze', label: 'Analyze My Land', icon: Layers },
    { id: 'reasoning', label: 'Reasoning Engine', icon: Cpu, badge: activeAnalysisCount > 0 ? 'Active' : undefined },
    { id: 'chat', label: 'AI Scientist', icon: Bot },
    { id: 'evidence-explorer', label: 'Evidence Explorer', icon: Search },
    { id: 'knowledge', label: 'Knowledge Base', icon: BookOpen },
    { id: 'history', label: 'History', icon: History },
    { id: 'architecture', label: 'Architecture', icon: Cpu },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.08] bg-[#0B0F0D]/95 backdrop-blur-md text-[#F2F5F3]">
      {/* Platform Telemetry Top Status Bar */}
      <div className="border-b border-white/[0.06] bg-[#0E1310] px-4 py-1.5 text-xs">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#9BA7A0]">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-white font-semibold">DARUKAA EARTH INTELLIGENCE</span>
            </div>
            <span className="hidden sm:inline text-white/20">|</span>
            <div className="hidden sm:flex items-center gap-1.5">
              <span className="text-[#6D7B74]">System:</span>
              <span className="text-[#9BA7A0] flex items-center gap-1">
                <ShieldCheck className="h-3 w-3 text-emerald-400" />
                Operational (Deterministic Core)
              </span>
            </div>
            <span className="hidden md:inline text-white/20">|</span>
            <div className="hidden md:flex items-center gap-1.5">
              <span className="text-[#6D7B74]">Gemini:</span>
              <span className="text-amber-400/90 flex items-center gap-1">
                <Radio className="h-3 w-3" />
                Active (Context-Bounded)
              </span>
            </div>
            <span className="hidden lg:inline text-white/20">|</span>
            <div className="hidden lg:flex items-center gap-1.5">
              <span className="text-[#6D7B74]">Knowledge Corpus:</span>
              <span className="text-[#F2F5F3]">12 Verified Authorities</span>
            </div>
            <span className="hidden xl:inline text-white/20">|</span>
            <div className="hidden xl:flex items-center gap-1.5">
              <span className="text-[#6D7B74]">Analysis State:</span>
              <span className="text-emerald-400 font-medium">
                {activeAnalysisCount > 0 ? 'Active Assessment' : 'Ready'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              id="header-start-judge-demo-btn"
              onClick={onStartJudgeDemo}
              className="inline-flex items-center gap-1.5 rounded-md bg-[#1B2B22] px-3 py-1 text-xs font-semibold text-[#F2F5F3] hover:bg-[#23382D] transition border border-emerald-600/30 cursor-pointer shadow-sm"
            >
              <Sparkles className="h-3.5 w-3.5 text-amber-300 animate-pulse" />
              <span>START JUDGE DEMO</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Header Brand Bar */}
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-15 items-center justify-between gap-4">
          {/* Brand Logo & Mission */}
          <div
            className="flex cursor-pointer items-center gap-3 group"
            onClick={() => setActiveTab('landing')}
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-[#141A17] border border-white/[0.12] text-emerald-400 group-hover:border-emerald-600/50 transition">
              <span className="font-mono text-sm font-bold tracking-tight">D·E</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-bold tracking-wider text-[#F2F5F3]">
                  DARUKAA EARTH INTELLIGENCE
                </span>
                <span className="rounded bg-white/[0.06] px-1.5 py-0.2 text-[10px] font-mono text-[#9BA7A0] border border-white/[0.08]">
                  Research Suite v1.0
                </span>
              </div>
              <p className="text-[11px] text-[#9BA7A0]">
                Turn environmental data into biodiversity action.
              </p>
            </div>
          </div>

          {/* Quick Action Button */}
          <div className="flex items-center gap-2">
            <button
              id="header-analyze-cta-btn"
              onClick={() => setActiveTab('analyze')}
              className="hidden md:inline-flex items-center gap-1.5 rounded-md bg-[#244231] px-3.5 py-1.5 text-xs font-semibold text-[#F2F5F3] transition hover:bg-[#2D543F] border border-emerald-700/40 cursor-pointer"
            >
              <Play className="h-3 w-3 fill-current text-emerald-400" />
              Analyze My Land
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex space-x-1 overflow-x-auto pb-1.5 pt-0.5 scrollbar-none text-xs border-t border-white/[0.05]">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-tab-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`group flex items-center gap-1.5 whitespace-nowrap rounded-md px-3 py-1.5 font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#18231C] text-[#F2F5F3] border border-white/[0.15] shadow-xs'
                    : 'text-[#9BA7A0] hover:bg-[#121815] hover:text-[#F2F5F3]'
                }`}
              >
                <Icon className={`h-3.5 w-3.5 ${isActive ? 'text-emerald-400' : 'text-[#6D7B74] group-hover:text-[#9BA7A0]'}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className="ml-1 rounded-sm bg-emerald-950/80 px-1.5 py-0.2 text-[9px] font-mono text-emerald-300 border border-emerald-700/40">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
