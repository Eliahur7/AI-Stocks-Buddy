import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { StockFundamentals, FundamentalsExpertAnalysis } from '@/types/stock';

interface UseFundamentalsExpertReturn {
  expertAnalysis: FundamentalsExpertAnalysis | null;
  isExpertLoading: boolean;
  expertError: string | null;
  runExpertAnalysis: (stock: StockFundamentals) => Promise<void>;
  clearExpertAnalysis: () => void;
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
      const { data, error } = await supabase.functions.invoke('fundamentals-expert', {
        body: { fundamentals: stock },
      });

      if (error) {
        throw new Error(error.message || 'Failed to invoke fundamentals-expert function');
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      setExpertAnalysis(data as FundamentalsExpertAnalysis);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An unexpected error occurred';
      setExpertError(message);
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
