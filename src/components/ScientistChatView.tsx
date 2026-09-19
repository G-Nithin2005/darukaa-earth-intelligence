import React, { useState } from 'react';
import {
  Bot,
  Send,
  Sparkles,
  HelpCircle,
  Database,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  User,
  ExternalLink,
  Layers,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  GitMerge,
  Cpu
} from 'lucide-react';
import { ChatMessage, EnvironmentalData, KnowledgeRecord, MetricCategory } from '../types';
import { sendChatMessage } from '../services/apiClient';
import { extractVariables } from '../services/reasoningEngine';
import { createEmptyEnvironmentalData } from '../services/conversationManager';
import { getDimensionTheme, DIMENSION_THEMES, DimensionKey } from '../utils/theme';

interface ScientistChatViewProps {
  currentContext: EnvironmentalData;
  onUpdateContext: (newContext: EnvironmentalData) => void;
  onNavigateToTab: (tab: string) => void;
}

export const ScientistChatView: React.FC<ScientistChatViewProps> = ({
  currentContext,
  onUpdateContext,
  onNavigateToTab
}) => {
  const initialWelcome: ChatMessage = {
    id: 'welcome-msg',
    sender: 'assistant',
    text: `Greetings. I am your AI Environmental Scientist at DARUKAA EARTH INTELLIGENCE.

I reason across soil chemistry, thermal regimes, land architecture, and trophic biodiversity to formulate grounded ecological interventions. You can ask diagnostic questions, introduce your landscape observations incrementally, or test restorative interventions such as cover crop mixes and agroforestry edge buffers.

Protocol Notice: At least 3 distinct environmental dimensions are required before formulating multi-metric compound prescriptions.`,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    evidenceSources: []
  };

  const [messages, setMessages] = useState<ChatMessage[]>([initialWelcome]);
  const [inputPrompt, setInputPrompt] = useState<string>('');
  const [isSending, setIsSending] = useState<boolean>(false);

  // Compute active dimensions in real-time from the current context
  const extracted = extractVariables(currentContext);
  const activeDimensions = Array.from(new Set(extracted.map(v => v.category))) as MetricCategory[];
  const dimensionCount = activeDimensions.length;
  const isSufficient = dimensionCount >= 3;

  const suggestedPrompts = [
    'My biodiversity is declining.',
    'My soil organic carbon is 0.3% and rainfall is low.',
    'It is a continuous wheat monoculture.',
    'What about cover crops?',
    'What should I monitor?',
    'Actually rainfall is moderate.'
  ];

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isSending) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updatedHistory = [...messages, userMessage];
    setMessages(updatedHistory);
    setInputPrompt('');
    setIsSending(true);

    try {
      const response = await sendChatMessage(textToSend, updatedHistory, currentContext);

      // If variables detected, update parent context seamlessly
      if (response.detectedVariables) {
        onUpdateContext({
          ...currentContext,
          ...response.detectedVariables,
          soil: { ...currentContext.soil, ...response.detectedVariables.soil },
          climate: { ...currentContext.climate, ...response.detectedVariables.climate },
          land: { ...currentContext.land, ...response.detectedVariables.land },
          biodiversity: { ...currentContext.biodiversity, ...response.detectedVariables.biodiversity },
          water: { ...currentContext.water, ...response.detectedVariables.water },
          humanImpact: { ...currentContext.humanImpact, ...response.detectedVariables.humanImpact }
        });
      }

      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: response.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        detectedVariables: response.detectedVariables as any,
        targetedQuestions: response.targetedQuestions,
        evidenceSources: response.evidenceSources,
        directEvidence: response.directEvidence,
        systemInference: response.systemInference,
        activeDimensions: response.activeDimensions,
        correctionsDetected: response.correctionsDetected
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error('Chat error:', err);
    } finally {
      setIsSending(false);
    }
  };

  const handleResetContext = () => {
    const cleanContext = createEmptyEnvironmentalData();
    onUpdateContext(cleanContext);
    setMessages([
      {
        ...initialWelcome,
        id: `welcome-${Date.now()}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const handleLoadBenchmark = () => {
    const benchmark: EnvironmentalData = {
      location: { region: 'Alentejo Drylands', country: 'Portugal' },
      soil: {
        organicCarbonPercent: 0.3,
        ph: 7.6,
        moisturePercent: 12,
        soilType: 'Sandy Loam'
      },
      climate: {
        rainfall: 'Low',
        temperature: 'High',
        rainfallVariability: 'High'
      },
      land: {
        cropType: 'Wheat',
        isMonoculture: true,
        landUse: 'Continuous cereal monoculture',
        fragmentation: 'High',
        habitatAreaHa: 50
      },
      biodiversity: {
        speciesRichness: 'Low',
        habitatDiversity: 'Low',
        nativeSpecies: 'Depleted',
        invasiveSpecies: 'Minimal'
      },
      water: {
        availability: 'None / Rainfed',
        seasonalStress: 'High'
      },
      humanImpact: {
        pesticidePressure: 'Moderate'
      }
    };
    onUpdateContext(benchmark);
    setMessages((prev) => [
      ...prev,
      {
        id: `sys-${Date.now()}`,
        sender: 'system',
        text: 'Loaded semi-arid benchmark context (SOC: 0.3%, Rainfall: Low, Wheat Monoculture, Low Biodiversity, 4 Active Dimensions).',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const allPossibleDimensions: DimensionKey[] = [
    'SOIL',
    'CLIMATE',
    'LAND',
    'BIODIVERSITY',
    'WATER',
    'HUMAN IMPACT'
  ];

  return (
    <div className="py-6 max-w-7xl mx-auto px-4 text-[#F2F5F3] space-y-6">
      {/* 1. HEADER: AI ENVIRONMENTAL SCIENTIST */}
      <div className="border-b border-white/[0.08] pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="rounded-sm bg-white/[0.06] px-2 py-0.5 text-[10px] font-mono font-bold text-emerald-400 uppercase border border-white/[0.08]">
              AI ENVIRONMENTAL SCIENTIST
            </span>
            <span className="text-xs font-mono text-emerald-400/90 flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Status: Context synchronized
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#F2F5F3] tracking-tight">
            Conversational Environmental Reasoning
          </h1>
          <p className="text-xs text-[#9BA7A0]">
            Multi-turn research assistant with biophysical memory, citation grounding, and self-correcting logic.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleResetContext}
            id="reset-conversation-btn"
            className="flex items-center gap-1.5 rounded-md bg-[#141A17] px-3 py-1.5 text-xs font-mono text-[#9BA7A0] hover:bg-[#1A221E] hover:text-[#F2F5F3] transition border border-white/[0.08] cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset Context</span>
          </button>
          <button
            onClick={() => onNavigateToTab('reasoning')}
            className="rounded-md bg-[#244231] px-3.5 py-1.5 text-xs font-semibold text-[#F2F5F3] hover:bg-[#2D543F] transition border border-emerald-700/50 cursor-pointer"
          >
            View Causal Pipeline →
          </button>
        </div>
      </div>

      {/* 2. ACTIVE CONTEXT COMPACT CHIPS */}
      <div className="rounded-md border border-white/[0.08] bg-[#101512] p-3.5 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[#9BA7A0]">
            Active Context Telemetry ({dimensionCount}/3 Dimensions Established)
          </span>
          <span className={`text-[10px] font-mono font-semibold ${isSufficient ? 'text-emerald-400' : 'text-amber-400'}`}>
            {isSufficient ? 'Multi-Metric Reasoning Unlocked' : 'Requires 3+ Realms for Prescriptions'}
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {allPossibleDimensions.map((dim) => {
            const isDimActive = activeDimensions.includes(dim);
            const theme = DIMENSION_THEMES[dim];
            return (
              <span
                key={dim}
                className={`inline-flex items-center gap-1.5 rounded-sm px-2.5 py-1 text-xs font-mono transition ${
                  isDimActive
                    ? `${theme.badgeBg} ${theme.textColor} border ${theme.badgeBorder}`
                    : 'bg-white/[0.02] text-[#6D7B74] border border-white/[0.04]'
                }`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${isDimActive ? theme.dotColor : 'bg-gray-600'}`} />
                <span>{dim}</span>
                <span className="text-[10px] opacity-75">
                  {isDimActive ? 'Active' : 'Unmeasured'}
                </span>
              </span>
            );
          })}
        </div>
      </div>

      {/* Suggested Inquiries */}
      <div className="space-y-1.5">
        <span className="text-[10px] font-mono text-[#6D7B74] uppercase tracking-wider">
          Suggested Scientific Inquiries:
        </span>
        <div className="flex flex-wrap gap-1.5">
          {suggestedPrompts.map((prompt, idx) => (
            <button
              key={idx}
              id={`suggested-prompt-${idx}`}
              onClick={() => handleSendMessage(prompt)}
              className="rounded-sm bg-[#141A17] px-2.5 py-1 text-xs font-mono text-[#9BA7A0] hover:bg-[#1A221E] hover:text-[#F2F5F3] transition border border-white/[0.06] cursor-pointer text-left"
            >
              "{prompt}"
            </button>
          ))}
        </div>
      </div>

      {/* 3. MAIN CHAT & CONTEXT WORKSPACE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Chat History & Input (8 cols) */}
        <div className="lg:col-span-8 rounded-md border border-white/[0.08] bg-[#101512] flex flex-col h-[650px] overflow-hidden">
          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';
              const isSys = msg.sender === 'system';

              if (isSys) {
                return (
                  <div key={msg.id} className="text-center py-1">
                    <span className="rounded-sm bg-white/[0.04] border border-white/[0.08] px-3 py-1 text-[11px] font-mono text-[#9BA7A0]">
                      {msg.text}
                    </span>
                  </div>
                );
              }

              return (
                <div
                  key={msg.id}
                  className={`rounded-md border p-4 space-y-2.5 ${
                    isUser
                      ? 'border-white/[0.12] bg-[#141A17]'
                      : 'border-white/[0.08] bg-[#0E1310]'
                  }`}
                >
                  {/* Distinct Structured Label */}
                  <div className="flex items-center justify-between gap-3 border-b border-white/[0.05] pb-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={`rounded-sm px-2 py-0.5 text-[9px] font-mono font-bold uppercase tracking-wider ${
                          isUser
                            ? 'bg-sky-950/60 text-sky-400 border border-sky-800/40'
                            : 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/40'
                        }`}
                      >
                        {isUser ? 'USER INPUT' : 'SYSTEM ANALYSIS'}
                      </span>
                      <span className="text-xs font-mono text-[#9BA7A0]">
                        {isUser ? 'Field Practitioner' : 'AI Environmental Scientist'}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-[#6D7B74]">{msg.timestamp}</span>
                  </div>

                  {/* Corrections Detected Notice */}
                  {msg.correctionsDetected && msg.correctionsDetected.length > 0 && (
                    <div className="rounded-sm bg-[#16211B] px-2.5 py-1 text-[10px] font-mono text-emerald-400 border border-emerald-800/30">
                      ✓ Context updated: {msg.correctionsDetected.join('. ')}
                    </div>
                  )}

                  {/* Main Response Body */}
                  <div className="text-xs text-[#F2F5F3] leading-relaxed whitespace-pre-line">
                    {msg.text}
                  </div>

                  {/* DISTINCT BADGE & BLOCK: SCIENTIFIC EVIDENCE */}
                  {msg.directEvidence && (
                    <div className="rounded-sm bg-[#0C110E] p-2.5 border border-white/[0.04] space-y-1">
                      <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-[9px] uppercase font-bold">
                        <BookOpen className="h-3 w-3" />
                        <span>SCIENTIFIC EVIDENCE</span>
                      </div>
                      <p className="text-xs text-[#9BA7A0] leading-relaxed italic">
                        {msg.directEvidence}
                      </p>
                    </div>
                  )}

                  {/* DISTINCT BADGE & BLOCK: SYSTEM INFERENCE */}
                  {msg.systemInference && (
                    <div className="rounded-sm bg-[#0C110E] p-2.5 border border-white/[0.04] space-y-1">
                      <div className="flex items-center gap-1.5 text-purple-300 font-mono text-[9px] uppercase font-bold">
                        <GitMerge className="h-3 w-3" />
                        <span>SYSTEM INFERENCE</span>
                      </div>
                      <p className="text-xs text-[#9BA7A0] leading-relaxed">
                        {msg.systemInference}
                      </p>
                    </div>
                  )}

                  {/* Supporting Evidence Citations */}
                  {msg.evidenceSources && msg.evidenceSources.length > 0 && (
                    <div className="pt-1.5 border-t border-white/[0.04] flex flex-wrap items-center gap-1.5 text-[10px] font-mono">
                      <span className="text-[#6D7B74]">Citations:</span>
                      {msg.evidenceSources.map((s) => (
                        <span
                          key={s.id}
                          className="rounded-sm bg-white/[0.04] px-1.5 py-0.2 text-[#9BA7A0] border border-white/[0.06]"
                        >
                          {s.organization} ({s.year})
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Targeted Diagnostic Questions */}
                  {msg.targetedQuestions && msg.targetedQuestions.length > 0 && (
                    <div className="rounded-sm bg-amber-950/20 border border-amber-800/30 p-2.5 space-y-1">
                      <span className="text-[10px] font-mono uppercase text-amber-400 font-bold block">
                        Diagnostic Follow-up:
                      </span>
                      <ul className="list-disc pl-4 space-y-0.5 text-xs text-[#9BA7A0]">
                        {msg.targetedQuestions.map((q, idx) => (
                          <li key={idx}>{q}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}

            {isSending && (
              <div className="rounded-md border border-white/[0.08] bg-[#0E1310] p-4 flex items-center gap-2 text-xs font-mono text-[#9BA7A0]">
                <div className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Evaluating biophysical mechanisms across active realms...</span>
              </div>
            )}
          </div>

          {/* Input Box */}
          <div className="border-t border-white/[0.08] bg-[#0E1310] p-3">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputPrompt);
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                id="chat-user-input"
                value={inputPrompt}
                onChange={(e) => setInputPrompt(e.target.value)}
                placeholder="Ask an ecological question or add landscape metrics (e.g., 'Rainfall is 320mm', 'Cover crop mix')..."
                className="flex-1 rounded-md border border-white/[0.08] bg-[#141A17] px-3.5 py-2.5 text-xs text-[#F2F5F3] placeholder-[#6D7B74] focus:border-emerald-600/60 focus:outline-none"
              />
              <button
                type="submit"
                id="chat-send-btn"
                disabled={isSending || !inputPrompt.trim()}
                className="inline-flex items-center gap-1.5 rounded-md bg-[#244231] px-4 py-2.5 text-xs font-semibold text-[#F2F5F3] hover:bg-[#2D543F] transition border border-emerald-700/50 disabled:opacity-40 cursor-pointer"
              >
                <Send className="h-3.5 w-3.5" />
                <span>Send</span>
              </button>
            </form>
          </div>
        </div>

        {/* Real-time Biophysical State Vector (4 cols) */}
        <div className="lg:col-span-4 rounded-md border border-white/[0.08] bg-[#101512] p-4 space-y-4">
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-2">
            <span className="text-[11px] font-mono font-semibold uppercase text-[#9BA7A0]">
              Biophysical State Vector
            </span>
            <button
              onClick={handleLoadBenchmark}
              className="text-[10px] font-mono text-emerald-400 hover:text-emerald-300 transition cursor-pointer"
            >
              Load Benchmark
            </button>
          </div>

          {/* Extracted Variables List */}
          <div className="space-y-2 max-h-[520px] overflow-y-auto pr-1">
            {extracted.length === 0 ? (
              <div className="p-4 text-center text-xs font-mono text-[#6D7B74] border border-white/[0.04] rounded-sm">
                No active metrics provided yet. Type your observations in chat.
              </div>
            ) : (
              extracted.map((v) => {
                const theme = getDimensionTheme(v.category);
                return (
                  <div
                    key={v.key}
                    className="rounded-sm bg-[#141A17] p-2.5 border border-white/[0.06] space-y-1"
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono">
                      <span className={`inline-flex items-center gap-1 ${theme.textColor}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${theme.dotColor}`} />
                        {v.category}
                      </span>
                      <span className="uppercase text-[#9BA7A0]">{v.normalizedLevel}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#F2F5F3] font-medium">{v.label}</span>
                      <span className="font-mono text-emerald-400">{String(v.rawValue)} {v.unit || ''}</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
