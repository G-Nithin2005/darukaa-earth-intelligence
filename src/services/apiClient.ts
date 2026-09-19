import { EnvironmentalData, AnalysisResult, KnowledgeRecord, ChatMessage, MetricCategory } from '../types';
import { executeEnvironmentalAnalysis, checkSufficientInformation, detectMultiMetricRelationships } from './reasoningEngine';
import {
  updateContextFromMessage,
  retrieveConversationalEvidence,
  generateDeterministicResponse
} from './conversationManager';
import { SCIENTIFIC_KNOWLEDGE_BASE } from '../data/scientificKnowledge';

export interface AnalysisResponse {
  sufficiency: {
    isNeeded: boolean;
    message: string;
    missingFields: {
      fieldKey: string;
      category: any;
      promptQuestion: string;
    }[];
  };
  analysis: AnalysisResult;
}

export interface ChatResponse {
  reply: string;
  detectedVariables?: EnvironmentalData;
  activeDimensions?: MetricCategory[];
  dimensionCount?: number;
  isSufficientContext?: boolean;
  targetedQuestions?: string[];
  evidenceSources?: KnowledgeRecord[];
  directEvidence?: string;
  systemInference?: string;
  correctionsDetected?: string[];
  mode?: string;
}

/**
 * Executes environmental analysis through the full-stack server route,
 * with instantaneous deterministic fallback if offline or network unavailable.
 */
export async function runAnalysis(data: EnvironmentalData): Promise<AnalysisResponse> {
  try {
    const res = await fetch('/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      const json = await res.json();
      return json;
    }
  } catch (err) {
    console.warn('API /api/analyze call failed, using client-side deterministic engine:', err);
  }

  // Client-side fallback
  const sufficiency = checkSufficientInformation(data);
  const analysis = executeEnvironmentalAnalysis(data);
  return { sufficiency, analysis };
}

/**
 * Sends messages to the AI Environmental Scientist
 */
export async function sendChatMessage(
  message: string,
  history: ChatMessage[],
  currentContext: EnvironmentalData
): Promise<ChatResponse> {
  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, history, currentContext }),
    });

    if (res.ok) {
      const json = await res.json();
      return json;
    }
  } catch (err) {
    console.warn('API /api/chat call failed, using client-side conversational fallback:', err);
  }

  // Rich client-side conversational fallback
  const update = updateContextFromMessage(message, currentContext);
  const chains = detectMultiMetricRelationships(update.extractedVariables);
  const sources = retrieveConversationalEvidence(update.extractedVariables, chains, message);
  const deterministicResult = generateDeterministicResponse(
    message,
    update.updatedContext,
    update.extractedVariables,
    chains,
    sources,
    update.activeDimensions,
    update.correctionsDetected
  );

  return {
    ...deterministicResult,
    correctionsDetected: update.correctionsDetected,
  };
}

/**
 * Fetches knowledge base records
 */
export async function fetchKnowledgeSources(category?: string, search?: string): Promise<KnowledgeRecord[]> {
  try {
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    if (search) params.append('search', search);

    const res = await fetch(`/api/knowledge?${params.toString()}`);
    if (res.ok) {
      const data = await res.json();
      return data.sources;
    }
  } catch (err) {
    console.warn('API /api/knowledge fetch failed, using local database:', err);
  }

  let list = [...SCIENTIFIC_KNOWLEDGE_BASE];
  if (category && category !== 'ALL') {
    list = list.filter(k => k.category === category);
  }
  if (search) {
    const q = search.toLowerCase();
    list = list.filter(k =>
      k.title.toLowerCase().includes(q) ||
      k.organization.toLowerCase().includes(q) ||
      k.summary.toLowerCase().includes(q)
    );
  }
  return list;
}

/**
 * Checks server health and Gemini status
 */
export async function checkServerStatus() {
  try {
    const res = await fetch('/api/health');
    if (res.ok) {
      return await res.json();
    }
  } catch {
    // ignore
  }
  return {
    status: 'local_mode',
    environment: 'client_fallback',
    aiIntegration: 'Demo Mode (Deterministic Reasoning)',
    hasGeminiKey: false,
    model: 'gemini-2.5-flash',
    modelDisplayName: 'Gemini 2.5 Flash',
    knowledgeRecordsCount: SCIENTIFIC_KNOWLEDGE_BASE.length,
    deterministicFallback: true,
  };
}
