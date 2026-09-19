import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import {
  executeEnvironmentalAnalysis,
  checkSufficientInformation,
  extractVariables,
  detectMultiMetricRelationships
} from './src/services/reasoningEngine.js';
import { SCIENTIFIC_KNOWLEDGE_BASE } from './src/data/scientificKnowledge.js';
import {
  updateContextFromMessage,
  generateClarificationPrompt,
  retrieveConversationalEvidence,
  constructGeminiPrompt,
  constructAnalysisGeminiPrompt,
  generateDeterministicResponse
} from './src/services/conversationManager.js';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Consistent Gemini model configuration
const CONFIGURED_GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
const GEMINI_MODEL_DISPLAY_NAME = 'Gemini 2.5 Flash';

// Lazy-initialized Gemini client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// 1. Health check & runtime status
app.get('/api/health', (req, res) => {
  const hasKey = Boolean(process.env.GEMINI_API_KEY);
  res.json({
    status: 'ok',
    environment: process.env.NODE_ENV || 'development',
    aiIntegration: hasKey ? `${GEMINI_MODEL_DISPLAY_NAME} Available` : 'Demo Mode (Deterministic Reasoning)',
    hasGeminiKey: hasKey,
    model: CONFIGURED_GEMINI_MODEL,
    modelDisplayName: GEMINI_MODEL_DISPLAY_NAME,
    knowledgeRecordsCount: SCIENTIFIC_KNOWLEDGE_BASE.length,
    deterministicFallback: true,
  });
});

// 2. Knowledge Base API
app.get('/api/knowledge', (req, res) => {
  const { category, search } = req.query;
  let results = [...SCIENTIFIC_KNOWLEDGE_BASE];

  if (category && typeof category === 'string' && category !== 'ALL') {
    results = results.filter(k => k.category.toUpperCase() === category.toUpperCase());
  }

  if (search && typeof search === 'string') {
    const term = search.toLowerCase();
    results = results.filter(k =>
      k.title.toLowerCase().includes(term) ||
      k.organization.toLowerCase().includes(term) ||
      k.summary.toLowerCase().includes(term) ||
      k.content.toLowerCase().includes(term) ||
      k.relevant_variables.some(v => v.toLowerCase().includes(term))
    );
  }

  res.json({
    total: results.length,
    sources: results,
  });
});

// 3. Environmental Analysis API
app.post('/api/analyze', async (req, res) => {
  try {
    const inputData = req.body;
    if (!inputData) {
      return res.status(400).json({ error: 'No environmental data provided.' });
    }

    // Check sufficiency (requires at least 3 distinct environmental dimensions)
    const sufficiency = checkSufficientInformation(inputData);

    // Run baseline deterministic multi-metric engine
    const analysisResult = executeEnvironmentalAnalysis(inputData);

    // If Gemini key is available and context has 3+ dimensions, synthesize an explanation
    // grounded strictly in the deterministic analysis results
    const client = getGeminiClient();
    if (client && !sufficiency.isNeeded) {
      try {
        const prompt = constructAnalysisGeminiPrompt(inputData, analysisResult);

        const geminiResponse = await client.models.generateContent({
          model: CONFIGURED_GEMINI_MODEL,
          contents: prompt,
        });

        if (geminiResponse.text) {
          analysisResult.interpretation.summary = geminiResponse.text.trim();
          analysisResult.executionMode = 'gemini_enhanced';
        }
      } catch (geminiError) {
        console.warn('Gemini analysis enhancement unavailable, preserving deterministic analysis:', geminiError);
        // Seamlessly falls back to deterministic analysis
      }
    }

    res.json({
      sufficiency,
      analysis: analysisResult,
    });
  } catch (error: any) {
    console.error('Analysis error:', error);
    res.status(500).json({ error: 'Failed to process environmental analysis.', details: error.message });
  }
});

// 4. Conversational Scientist API
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history, currentContext } = req.body;
    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ error: 'Message is required.' });
    }

    // 1. Multi-turn context update and variable extraction
    const contextUpdate = updateContextFromMessage(message, currentContext);
    const {
      updatedContext,
      extractedVariables,
      activeDimensions,
      dimensionCount,
      isSufficientContext,
      correctionsDetected
    } = contextUpdate;

    // 2. Detect multi-metric relationship chains
    const chains = detectMultiMetricRelationships(extractedVariables);

    // 3. Retrieve context-aware evidence based on variables, chains, and inquiry topic (NO slice(0, 3))
    const relevantSources = retrieveConversationalEvidence(extractedVariables, chains, message);

    // 4. Try Gemini if available with bounded history and strict grounding
    const client = getGeminiClient();
    if (client) {
      try {
        const prompt = constructGeminiPrompt(
          message,
          history || [],
          updatedContext,
          extractedVariables,
          chains,
          relevantSources,
          activeDimensions,
          correctionsDetected
        );

        const geminiRes = await client.models.generateContent({
          model: CONFIGURED_GEMINI_MODEL,
          contents: prompt,
        });

        if (geminiRes.text) {
          const clarificationInfo = !isSufficientContext
            ? generateClarificationPrompt(updatedContext, activeDimensions, message)
            : undefined;

          return res.json({
            reply: geminiRes.text.trim(),
            detectedVariables: updatedContext,
            activeDimensions,
            dimensionCount,
            isSufficientContext,
            targetedQuestions: clarificationInfo?.targetedQuestions,
            evidenceSources: relevantSources.slice(0, 4),
            correctionsDetected,
            mode: 'gemini_live',
          });
        }
      } catch (err) {
        console.warn('Gemini chat fallback to deterministic scientist:', err);
      }
    }

    // 5. Deterministic Conversational Reasoning Engine Fallback
    const deterministicResult = generateDeterministicResponse(
      message,
      updatedContext,
      extractedVariables,
      chains,
      relevantSources,
      activeDimensions,
      correctionsDetected
    );

    return res.json({
      ...deterministicResult,
      correctionsDetected,
    });
  } catch (error: any) {
    console.error('Chat error:', error);
    res.status(500).json({ error: 'Failed to process scientist chat.', details: error.message });
  }
});

// 5. Serve Vite in dev mode or static files in production
async function setupServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`DARUKAA EARTH INTELLIGENCE server running at http://0.0.0.0:${PORT}`);
  });
}

setupServer().catch(err => {
  console.error('Failed to initialize server:', err);
});
