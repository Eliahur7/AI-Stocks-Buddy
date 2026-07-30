import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { StockFundamentals, StockAnalysis } from '@/types/stock';
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
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const result = getStockData(symbol);

      if (!result) {
        throw new Error(`No data found for ticker "${symbol}"`);
      }

      setStock(result as StockFundamentals);
      setIsLoading(false); // Stop loading stock data, but keep analysis loading

      // Simulate AI Analysis delay in background
      setTimeout(() => {
        try {
          setAnalysis(analyzeStock(result as StockFundamentals)); // Fallback to local
        } catch (err) {
          console.error('Failed to generate AI analysis:', err);
        } finally {
          setIsAnalysisLoading(false);
        }
      }, 1200);

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
