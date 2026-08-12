import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { StockFundamentals, FundamentalsExpertAnalysis } from '@/types/stock';
import { scoreFundamentalsLocally } from '@/lib/fundamentalsExpert';

interface UseFundamentalsExpertReturn {
  expertAnalysis: FundamentalsExpertAnalysis | null;
  isExpertLoading: boolean;
  expertError: string | null;
  runExpertAnalysis: (stock: StockFundamentals) => Promise<void>;
  clearExpertAnalysis: () => void;
}

/**
 * Try the Supabase edge function (Gemini-powered) first.
 * Falls back to local scoring immediately if the edge function is not deployed
 * or the network call fails — so analysis ALWAYS works.
 */
async function fetchFromEdgeFunction(
  stock: StockFundamentals
): Promise<FundamentalsExpertAnalysis | null> {
  try {
    const { data, error } = await supabase.functions.invoke('fundamentals-expert', {
      body: { fundamentals: stock },
    });
    if (error || !data || data.error) return null;
    // Validate the response has the shape we expect
    if (typeof data.overallScore !== 'number') return null;
    return data as FundamentalsExpertAnalysis;
  } catch {
    return null;
  }
}

export function useFundamentalsExpert(): UseFundamentalsExpertReturn {
  const [expertAnalysis, setExpertAnalysis] = useState<FundamentalsExpertAnalysis | null>(null);
  const [isExpertLoading, setIsExpertLoading] = useState(false);
  const [expertError, setExpertError] = useState<string | null>(null);

  const runExpertAnalysis = useCallback(async (stock: StockFundamentals) => {
    setIsExpertLoading(true);
    setExpertError(null);
    setExpertAnalysis(null);

    try {
      // 1. Try Gemini-powered edge function (best quality)
      const aiResult = await fetchFromEdgeFunction(stock);

      if (aiResult) {
        setExpertAnalysis(aiResult);
      } else {
        // 2. Always-available local engine — no API key or deployment needed
        const localResult = scoreFundamentalsLocally(stock);
        setExpertAnalysis(localResult);
      }
    } catch (err) {
      // Absolute last resort: still try local scoring
      try {
        setExpertAnalysis(scoreFundamentalsLocally(stock));
      } catch {
        const message = err instanceof Error ? err.message : 'Analysis failed';
        setExpertError(message);
      }
    } finally {
      setIsExpertLoading(false);
    }
  }, []);

  const clearExpertAnalysis = useCallback(() => {
    setExpertAnalysis(null);
    setExpertError(null);
  }, []);

  return {
    expertAnalysis,
    isExpertLoading,
    expertError,
    runExpertAnalysis,
    clearExpertAnalysis,
  };
}
