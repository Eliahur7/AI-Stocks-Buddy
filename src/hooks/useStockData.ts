import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { StockFundamentals, StockAnalysis } from '@/types/stock';
import { analyzeStock } from '@/lib/stockData';

interface UseStockDataReturn {
  stock: StockFundamentals | null;
  analysis: StockAnalysis | null;
  isLoading: boolean;
  error: string | null;
  searchStock: (symbol: string) => Promise<void>;
  reset: () => void;
}

export function useStockData(): UseStockDataReturn {
  const [stock, setStock] = useState<StockFundamentals | null>(null);
  const [analysis, setAnalysis] = useState<StockAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchStock = async (symbol: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error: fnError } = await supabase.functions.invoke('stock-data', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        body: null,
      });

      // supabase.functions.invoke doesn't support query params directly, 
      // so we need to use fetch directly
      const projectUrl = import.meta.env.VITE_SUPABASE_URL;
      const anonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
      
      const response = await fetch(
        `${projectUrl}/functions/v1/stock-data?symbol=${encodeURIComponent(symbol)}`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${anonKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to fetch stock data');
      }

      setStock(result as StockFundamentals);
      setAnalysis(analyzeStock(result as StockFundamentals));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(message);
      setStock(null);
      setAnalysis(null);
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setStock(null);
    setAnalysis(null);
    setError(null);
  };

  return {
    stock,
    analysis,
    isLoading,
    error,
    searchStock,
    reset,
  };
}
