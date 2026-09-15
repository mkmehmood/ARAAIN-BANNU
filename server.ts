import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// In-memory server translation cache
const translationCache = new Map<string, string>();

function getCacheKey(text: string, to: string, from?: string): string {
  return `${from || 'auto'}->${to}:${text.trim().toLowerCase()}`;
}

/**
 * Translates text using Microsoft Azure Translator API if AZURE_TRANSLATOR_KEY is configured.
 * Endpoint: https://api.cognitive.microsofttranslator.com/translate?api-version=3.0
 */
async function translateWithAzure(
  texts: string[],
  to: 'ur' | 'en',
  from?: 'en' | 'ur'
): Promise<string[] | null> {
  const apiKey = process.env.AZURE_TRANSLATOR_KEY;
  if (!apiKey) {
    return null;
  }

  const region = process.env.AZURE_TRANSLATOR_REGION || 'global';
  const endpoint = `https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=${to}${from ? `&from=${from}` : ''}`;

  const body = texts.map((t) => ({ Text: t }));

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': apiKey,
        'Ocp-Apim-Subscription-Region': region,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      console.warn(`[Azure Translator API error] Status ${response.status}: ${await response.text()}`);
      return null;
    }

    const data = await response.json();
    if (Array.isArray(data)) {
      return data.map((item: any, idx: number) => {
        if (item?.translations?.[0]?.text) {
          return item.translations[0].text;
        }
        return texts[idx];
      });
    }
    return null;
  } catch (err) {
    console.error('[Azure Translator network error]:', err);
    return null;
  }
}

/**
 * Free machine translation fallback (e.g. MyMemory API) when Azure key is not yet set or rate limited.
 */
async function translateWithFallbackAPI(
  text: string,
  to: 'ur' | 'en',
  from?: 'en' | 'ur'
): Promise<string | null> {
  if (!text || !text.trim()) return text;
  const sourceLang = from || (to === 'ur' ? 'en' : 'ur');
  const targetLang = to;

  try {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text.trim())}&langpair=${sourceLang}|${targetLang}`;
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
      },
      signal: AbortSignal.timeout(6000),
    });

    if (response.ok) {
      const data = await response.json();
      const translated = data?.responseData?.translatedText;
      if (translated && typeof translated === 'string' && !translated.startsWith('MYMEMORY WARNING:')) {
        return translated;
      }
    }
  } catch (e) {
    // Network or timeout
  }

  return null;
}

// ── API Routes ───────────────────────────────────────────────────────

app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    hasAzureKey: Boolean(process.env.AZURE_TRANSLATOR_KEY),
    region: process.env.AZURE_TRANSLATOR_REGION || 'global',
    cachedCount: translationCache.size,
  });
});

/**
 * POST /api/translate
 * Translates a single text or an array of texts between Urdu & English
 */
app.post('/api/translate', async (req: Request, res: Response) => {
  try {
    const { text, texts, to = 'ur', from } = req.body;

    if (!text && (!texts || !Array.isArray(texts) || texts.length === 0)) {
      res.status(400).json({ error: 'Missing "text" or "texts" parameter' });
      return;
    }

    const isArray = Array.isArray(texts);
    const inputList: string[] = isArray ? texts : [text];
    const results: string[] = new Array(inputList.length);
    const toTranslateIndices: number[] = [];
    const toTranslateTexts: string[] = [];

    // 1. Check cache first
    inputList.forEach((raw, idx) => {
      if (!raw || !raw.trim()) {
        results[idx] = raw || '';
        return;
      }
      const key = getCacheKey(raw, to, from);
      if (translationCache.has(key)) {
        results[idx] = translationCache.get(key)!;
      } else {
        toTranslateIndices.push(idx);
        toTranslateTexts.push(raw);
      }
    });

    // 2. If all were in cache, return immediately
    if (toTranslateTexts.length === 0) {
      res.json({
        translatedText: isArray ? undefined : results[0],
        translations: isArray ? results : undefined,
        provider: 'cache',
      });
      return;
    }

    let provider = 'none';

    // 3. Try Azure Cognitive Services Translator
    const azureResults = await translateWithAzure(toTranslateTexts, to, from);
    if (azureResults && azureResults.length === toTranslateTexts.length) {
      provider = 'azure';
      toTranslateIndices.forEach((origIdx, i) => {
        const trans = azureResults[i];
        results[origIdx] = trans;
        const key = getCacheKey(inputList[origIdx], to, from);
        translationCache.set(key, trans);
      });
    } else {
      // 4. Fallback to free public translation API
      provider = 'fallback-api';
      await Promise.all(
        toTranslateIndices.map(async (origIdx, i) => {
          const raw = toTranslateTexts[i];
          const fb = await translateWithFallbackAPI(raw, to, from);
          const finalResult = fb || raw; // Keep original if translation fails, never distort
          results[origIdx] = finalResult;
          if (fb) {
            const key = getCacheKey(raw, to, from);
            translationCache.set(key, fb);
          }
        })
      );
    }

    res.json({
      translatedText: isArray ? undefined : results[0],
      translations: isArray ? results : undefined,
      provider,
    });
  } catch (error) {
    console.error('[Translate Route Error]:', error);
    res.status(500).json({ error: 'Internal translation failure' });
  }
});

// ── Vite Development / Production Middleware ────────────────────────

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
