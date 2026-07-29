import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { StockFundamentals, StockAnalysis } from '@/types/stock';
import { analyzeStock } from '@/lib/stockData';

  interface UseStockDataReturn {
  stock: StockFundamentals | null;
  analysis: StockAnalysis | null;
  isLoading: boolean;
  isAnalysisLoading: boolean;
  error: string | null;
  searchStock: (symbol: string) => Promise<void>;
  reset: () => void;
}

export function useStockData(): UseStockDataReturn {
  const [stock, setStock] = useState<StockFundamentals | null>(null);
  const [analysis, setAnalysis] = useState<StockAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAnalysisLoading, setIsAnalysisLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchStock = async (symbol: string) => {
    setIsLoading(true);
    setIsAnalysisLoading(true);
    setError(null);
    setStock(null);
    setAnalysis(null);

    try {
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
      setIsLoading(false); // Stop loading stock data, but keep analysis loading

      // Fetch AI Analysis in background
      fetch(`${projectUrl}/functions/v1/ai-analysis`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${anonKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fundamentals: result }),
      })
      .then(res => res.json())
      .then(aiResult => {
        if (aiResult.error) {
          console.error('AI Analysis error:', aiResult.error);
          setAnalysis(analyzeStock(result as StockFundamentals)); // Fallback to local
        } else {
          setAnalysis(aiResult as StockAnalysis);
        }
      })
      .catch(err => {
        console.error('Failed to fetch AI analysis:', err);
        setAnalysis(analyzeStock(result as StockFundamentals)); // Fallback to local
      })
      .finally(() => {
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

  return {
    stock,
    analysis,
    isLoading,
    isAnalysisLoading,
    error,
    searchStock,
    reset,
  };
}
