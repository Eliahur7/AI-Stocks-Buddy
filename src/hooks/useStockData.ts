import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { StockFundamentals, StockAnalysis, TechnicalIndicators } from '@/types/stock';
import { analyzeStock, getStockData } from '@/lib/stockData';

interface UseStockDataReturn {
  stock: StockFundamentals | null;
  analysis: StockAnalysis | null;
  isLoading: boolean;
  isAnalysisLoading: boolean;
  error: string | null;
  searchStock: (symbol: string) => Promise<void>;
  reset: () => void;
}

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

/** Call the stock-data edge function which uses the FMP API. */
async function fetchLiveStockData(symbol: string): Promise<StockFundamentals | null> {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/functions/v1/stock-data?symbol=${encodeURIComponent(symbol)}`,
      {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
      }
    );
    if (!res.ok) return null;
    const data = await res.json();
    if (data?.error) return null;
    return data as StockFundamentals;
  } catch {
    return null;
  }
}

/** Call the ai-analysis edge function which uses Gemini. */
async function fetchAiAnalysis(fundamentals: StockFundamentals): Promise<StockAnalysis | null> {
  try {
    const { data, error } = await supabase.functions.invoke('ai-analysis', {
      body: { fundamentals },
    });
    if (error || data?.error) return null;
    return data as StockAnalysis;
  } catch {
    return null;
  }
}

/**
 * Confidence gate — industry research consensus:
 * Below 60% confidence the signal is noise; override buy/sell to hold.
 * Applied to BOTH AI and local results so the rule is always enforced.
 */
function applyConfidenceGate(analysis: StockAnalysis): StockAnalysis {
  if (analysis.confidence < 60 && analysis.recommendation !== 'hold') {
    return {
      ...analysis,
      recommendation: 'hold',
      summary: analysis.summary.replace(
        /^(.*?)\./, // replace first sentence
        `Insufficient conviction for a directional call at ${analysis.confidence}% confidence — defaulting to Hold.`
      ),
    };
  }
  return analysis;
}

/** Generate technicals locally from price/change data when not provided by the API. */
function generateTechnicals(stock: StockFundamentals): TechnicalIndicators {
  const isPositive = stock.changePercent >= 0;
  const rsiBase = isPositive ? 55 : 45;
  const rsi = Math.min(85, Math.max(15, rsiBase + stock.changePercent * 3));
  return {
    rsi,
    macd: {
      value: stock.change * 0.5,
      signal: stock.change * 0.4,
      histogram: stock.change * 0.1,
    },
    sma50: stock.price * (1 - (stock.changePercent / 100) * 0.2),
    sma200: stock.price * (1 - (stock.changePercent / 100) * 0.8),
    support: stock.fiftyTwoWeekLow + (stock.price - stock.fiftyTwoWeekLow) * 0.3,
    resistance: stock.price + (stock.fiftyTwoWeekHigh - stock.price) * 0.7,
  };
}

export function useStockData(): UseStockDataReturn {
  const [stock, setStock] = useState<StockFundamentals | null>(null);
  const [analysis, setAnalysis] = useState<StockAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAnalysisLoading, setIsAnalysisLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchStock = async (symbol: string) => {
    const upperSymbol = symbol.toUpperCase().trim();
    setIsLoading(true);
    setIsAnalysisLoading(true);
    setError(null);
    setStock(null);
    setAnalysis(null);

    try {
      // 1. Try the live edge function first (any ticker, real FMP data)
      let result: StockFundamentals | null = await fetchLiveStockData(upperSymbol);

      // 2. Fall back to local mock data if live call fails / FMP key not set
      if (!result) {
        result = getStockData(upperSymbol);
      }

      if (!result) {
        throw new Error(
          `No data found for ticker "${upperSymbol}". ` +
          `Check the symbol or configure FMP_API_KEY in Supabase for live data.`
        );
      }

      // 3. Ensure technicals are always populated
      if (!result.technicals) {
        result = { ...result, technicals: generateTechnicals(result) };
      }

      setStock(result);
      setIsLoading(false);

      // 4. Fetch AI analysis (Gemini) in background, fall back to local scoring
      fetchAiAnalysis(result).then((aiResult) => {
        const raw = aiResult ?? analyzeStock(result!);
        setAnalysis(applyConfidenceGate(raw));
      }).catch(() => {
        setAnalysis(applyConfidenceGate(analyzeStock(result!)));
      }).finally(() => {
        setIsAnalysisLoading(false);
      });

    } catch (err) {
      const message = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(message);
      setStock(null);
      setAnalysis(null);
      setIsLoading(false);
      setIsAnalysisLoading(false);
    }
  };

  const reset = () => {
    setStock(null);
    setAnalysis(null);
    setError(null);
  };

  return { stock, analysis, isLoading, isAnalysisLoading, error, searchStock, reset };
}
