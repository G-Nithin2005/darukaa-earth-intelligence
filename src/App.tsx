import React, { useState, useEffect } from 'react';
import { EnvironmentalData, AnalysisResult } from './types';
import { DEMO_CASE_INPUT } from './data/scientificKnowledge';
import { executeEnvironmentalAnalysis } from './services/reasoningEngine';
import { runAnalysis } from './services/apiClient';

// Components
import { Header } from './components/Header';
import { LandingView } from './components/LandingView';
import { DashboardView } from './components/DashboardView';
import { AnalyzeView } from './components/AnalyzeView';
import { ReasoningView } from './components/ReasoningView';
import { ScientistChatView } from './components/ScientistChatView';
import { EvidenceExplorerView } from './components/EvidenceExplorerView';
import { KnowledgeBaseView } from './components/KnowledgeBaseView';
import { HistoryView } from './components/HistoryView';
import { ArchitectureView } from './components/ArchitectureView';
import { SettingsView } from './components/SettingsView';
import { JudgeDemoModal } from './components/JudgeDemoModal';
import { ShieldCheck, Sparkles, ExternalLink, Heart } from 'lucide-react';

const LOCAL_STORAGE_KEY = 'darukaa_earth_intelligence_history';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('landing');
  const [currentData, setCurrentData] = useState<EnvironmentalData>(DEMO_CASE_INPUT);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult>(() =>
    executeEnvironmentalAnalysis(DEMO_CASE_INPUT)
  );
  const [historyList, setHistoryList] = useState<AnalysisResult[]>([]);
  const [isJudgeDemoOpen, setIsJudgeDemoOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [bannerNotice, setBannerNotice] = useState<string | null>(null);

  // Load history from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        setHistoryList(JSON.parse(stored));
      } else {
        // Seed with initial benchmark demo run
        const initialRun = executeEnvironmentalAnalysis(DEMO_CASE_INPUT);
        setHistoryList([initialRun]);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([initialRun]));
      }
    } catch (e) {
      console.warn('Could not read history from localStorage:', e);
    }
  }, []);

  const saveToHistory = (result: AnalysisResult) => {
    try {
      const updated = [result, ...historyList.filter((h) => h.id !== result.id)].slice(0, 20);
      setHistoryList(updated);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('Could not save to localStorage:', e);
    }
  };

  const handleExecuteAnalysis = async (data: EnvironmentalData) => {
    setIsLoading(true);
    setCurrentData(data);

    try {
      const res = await runAnalysis(data);
      setAnalysisResult(res.analysis);
      saveToHistory(res.analysis);
      setActiveTab('reasoning');
      setBannerNotice('Environmental analysis completed successfully.');
      setTimeout(() => setBannerNotice(null), 4000);
    } catch (err) {
      console.error('Analysis error:', err);
      // Fallback
      const result = executeEnvironmentalAnalysis(data);
      setAnalysisResult(result);
      saveToHistory(result);
      setActiveTab('reasoning');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadBenchmark = () => {
    setCurrentData({ ...DEMO_CASE_INPUT });
    const result = executeEnvironmentalAnalysis(DEMO_CASE_INPUT);
    setAnalysisResult(result);
    saveToHistory(result);
    setBannerNotice('Benchmark Case (Wheat Monoculture 0.3% SOC) loaded.');
    setTimeout(() => setBannerNotice(null), 3500);
  };

  const handleSelectHistory = (item: AnalysisResult) => {
    setAnalysisResult(item);
    setCurrentData(item.inputData);
    setActiveTab('reasoning');
  };

  const handleClearHistory = () => {
    setHistoryList([]);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setBannerNotice('Historical logs cleared.');
    setTimeout(() => setBannerNotice(null), 3000);
  };

  return (
    <div className="min-h-screen bg-[#0B0F0D] text-[#F2F5F3] flex flex-col font-sans selection:bg-emerald-800/40 selection:text-white">
      {/* Top Application Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onStartJudgeDemo={() => setIsJudgeDemoOpen(true)}
        isDemoMode={true}
        activeAnalysisCount={analysisResult ? 1 : 0}
      />

      {/* Floating Notice Banner */}
      {bannerNotice && (
        <div className="bg-[#141E18] border-b border-emerald-800/40 px-4 py-2 text-center text-xs text-emerald-300 font-mono transition-all">
          <Sparkles className="h-3.5 w-3.5 inline-block mr-1.5 text-amber-300" />
          {bannerNotice}
        </div>
      )}

      {/* Main View Router */}
      <main className="flex-1">
        {activeTab === 'landing' && (
          <LandingView
            onStartJudgeDemo={() => setIsJudgeDemoOpen(true)}
            onNavigateToTab={setActiveTab}
            analysisResult={analysisResult}
            onLoadBenchmark={handleLoadBenchmark}
          />
        )}

        {activeTab === 'dashboard' && (
          <DashboardView
            analysisResult={analysisResult}
            onNavigateToTab={setActiveTab}
            onReloadDemo={handleLoadBenchmark}
          />
        )}

        {activeTab === 'analyze' && (
          <AnalyzeView
            onExecuteAnalysis={handleExecuteAnalysis}
            initialData={currentData}
            isLoading={isLoading}
          />
        )}

        {activeTab === 'reasoning' && (
          <ReasoningView analysisResult={analysisResult} />
        )}

        {activeTab === 'chat' && (
          <ScientistChatView
            currentContext={currentData}
            onUpdateContext={(newCtx) => {
              setCurrentData(newCtx);
              const updatedResult = executeEnvironmentalAnalysis(newCtx);
              setAnalysisResult(updatedResult);
            }}
            onNavigateToTab={setActiveTab}
          />
        )}

        {activeTab === 'evidence-explorer' && (
          <EvidenceExplorerView analysisResult={analysisResult} />
        )}

        {activeTab === 'knowledge' && <KnowledgeBaseView />}

        {activeTab === 'history' && (
          <HistoryView
            historyList={historyList}
            onSelectHistory={handleSelectHistory}
            onClearHistory={handleClearHistory}
            onLoadBenchmark={handleLoadBenchmark}
          />
        )}

        {activeTab === 'architecture' && <ArchitectureView />}

        {activeTab === 'settings' && (
          <SettingsView
            onResetBenchmark={handleLoadBenchmark}
            onClearStorage={handleClearHistory}
          />
        )}
      </main>

      {/* Judge Guided Demo 8-Step Walkthrough Modal */}
      <JudgeDemoModal
        isOpen={isJudgeDemoOpen}
        onClose={() => setIsJudgeDemoOpen(false)}
        onLoadAndRunDemo={handleLoadBenchmark}
        analysisResult={analysisResult}
        onNavigateToTab={setActiveTab}
      />

      {/* Footer */}
      <footer className="border-t border-white/[0.08] bg-[#090D0B] py-8 text-xs text-[#9BA7A0]">
        <div className="mx-auto max-w-7xl px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-sm bg-white/[0.06] text-emerald-400 font-mono text-xs font-bold border border-white/[0.08]">
              D·E
            </div>
            <div>
              <span className="font-mono text-xs font-bold text-[#F2F5F3]">
                DARUKAA EARTH INTELLIGENCE
              </span>
              <p className="text-[11px] text-[#6D7B74]">
                Turn environmental data into biodiversity action.
              </p>
            </div>
          </div>

          <div className="text-center md:text-right space-y-1">
            <p className="text-[11px]">
              Built for the <strong className="text-[#F2F5F3]">Darukaa.Earth AI Biodiversity Intelligence Hackathon</strong>
            </p>
            <p className="text-[10px] text-[#6D7B74]">
              Epistemological integrity: Zero fabricated statistics, verified literature citations, and transparent multi-metric causal chains.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
