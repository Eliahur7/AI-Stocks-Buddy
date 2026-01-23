import { useState } from 'react';
import { TickerSearch } from '@/components/TickerSearch';
import { StockHeader } from '@/components/StockHeader';
import { FundamentalsGrid } from '@/components/FundamentalsGrid';
import { RecommendationCard } from '@/components/RecommendationCard';
import { getStockData, analyzeStock } from '@/lib/stockData';
import { StockFundamentals, StockAnalysis } from '@/types/stock';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [stock, setStock] = useState<StockFundamentals | null>(null);
  const [analysis, setAnalysis] = useState<StockAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (symbol: string) => {
    setIsLoading(true);
    setError(null);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const data = getStockData(symbol);
    
    if (data) {
      setStock(data);
      setAnalysis(analyzeStock(data));
    } else {
      setError(`No data found for ticker "${symbol}". Try AAPL, MSFT, NVDA, TSLA, or JPM.`);
      setStock(null);
      setAnalysis(null);
    }
    
    setIsLoading(false);
  };

  const handleReset = () => {
    setStock(null);
    setAnalysis(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 pointer-events-none" />
      
      <div className="relative z-10 container mx-auto px-4 py-8 md:py-12">
        {!stock ? (
          <div className="flex flex-col items-center justify-center min-h-[80vh]">
            <TickerSearch onSearch={handleSearch} isLoading={isLoading} />
            
            {error && (
              <div className="mt-6 flex items-center gap-2 text-destructive bg-destructive/10 px-4 py-3 rounded-lg animate-fade-in">
                <AlertCircle className="h-5 w-5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6 max-w-6xl mx-auto">
            {/* Back button */}
            <Button
              variant="ghost"
              onClick={handleReset}
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              New Search
            </Button>

            {/* Stock Header */}
            <StockHeader stock={stock} />

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Fundamentals - takes 2 columns on large screens */}
              <div className="lg:col-span-2">
                <FundamentalsGrid stock={stock} />
              </div>

              {/* Recommendation - takes 1 column */}
              <div className="lg:col-span-1">
                {analysis && (
                  <RecommendationCard analysis={analysis} symbol={stock.symbol} />
                )}
              </div>
            </div>

            {/* Disclaimer */}
            <div className="glass-card p-4 text-center text-xs text-muted-foreground">
              <strong>Disclaimer:</strong> This analysis is for educational purposes only and should not be considered financial advice. 
              Always do your own research and consult with a qualified financial advisor before making investment decisions.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
