import { useState, useEffect } from 'react';
import { TickerSearch } from '@/components/TickerSearch';
import { StockHeader } from '@/components/StockHeader';
import { FundamentalsGrid } from '@/components/FundamentalsGrid';
import { RecommendationCard } from '@/components/RecommendationCard';
import { FundamentalsExpertCard } from '@/components/FundamentalsExpertCard';
import { UserMenu } from '@/components/UserMenu';
import { WatchlistPanel } from '@/components/WatchlistPanel';
import { TechnicalAnalysisCard } from '@/components/TechnicalAnalysisCard';
import { StockChart } from '@/components/StockChart';
import { NewsFeed } from '@/components/NewsFeed';
import { useStockData } from '@/hooks/useStockData';
import { useFundamentalsExpert } from '@/hooks/useFundamentalsExpert';
import { AlertCircle, LineChart } from 'lucide-react';
import { Toaster } from '@/components/ui/toaster';

const Index = () => {
  const { stock, analysis, isLoading, isAnalysisLoading, error, searchStock, reset } = useStockData();
  const { expertAnalysis, isExpertLoading, expertError, runExpertAnalysis, clearExpertAnalysis } = useFundamentalsExpert();
  const [showWatchlist, setShowWatchlist] = useState(false);

  // Auto-clear expert analysis when stock changes
  useEffect(() => {
    clearExpertAnalysis();
  }, [stock?.symbol, clearExpertAnalysis]);

  const handleSelectFromWatchlist = (symbol: string) => {
    searchStock(symbol);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 pointer-events-none" />

      {/* Header with user menu */}
      <header className="relative z-20 border-b border-border/50 sticky top-0 bg-background/80 backdrop-blur-md">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 py-3 flex items-center justify-between gap-4">
          <div
            className="flex items-center gap-2 hidden sm:flex cursor-pointer hover:opacity-80 transition-opacity"
            onClick={reset}
          >
            <div className="bg-primary/10 p-1.5 rounded-lg flex items-center justify-center">
              <LineChart className="h-5 w-5 text-primary" />
            </div>
            <h1 className="text-lg font-semibold gradient-text whitespace-nowrap">
              AI Stocks Buddy
            </h1>
          </div>
          <div className="flex-1 max-w-lg mx-auto">
            <TickerSearch onSearch={searchStock} isLoading={isLoading} />
          </div>
          <UserMenu onShowWatchlist={() => setShowWatchlist(true)} />
        </div>
      </header>

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 md:px-6 py-4 md:py-6">
        {error && !stock && (
          <div className="mb-6 flex items-center justify-center gap-2 text-destructive bg-destructive/10 px-4 py-3 rounded-lg animate-fade-in max-w-lg mx-auto">
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {!stock ? (
          <div className="flex flex-col items-center justify-center min-h-[50vh] animate-fade-in">
            <div className="glass-card p-8 text-center max-w-md w-full">
              <h2 className="text-2xl font-bold mb-3 gradient-text">Welcome to AI Stocks Buddy</h2>
              <p className="text-muted-foreground">
                Search for a stock ticker above (e.g., AAPL, MSFT) to get AI-powered insights, fundamental data, and the latest news.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4 max-w-[1440px] mx-auto">
            {/* Stock Header */}
            <StockHeader stock={stock} />

            <div className="grid lg:grid-cols-3 gap-4">
              {/* Main Column - 2 columns on large screens */}
              <div className="lg:col-span-2 flex flex-col gap-4">
                {stock.historical && (
                  <StockChart data={stock.historical} changePercent={stock.changePercent} />
                )}
                <FundamentalsGrid stock={stock} />

                {/* Fundamentals Expert Agent */}
                <FundamentalsExpertCard
                  analysis={expertAnalysis}
                  isLoading={isExpertLoading}
                  error={expertError}
                  symbol={stock.symbol}
                  onRun={() => runExpertAnalysis(stock)}
                  hasStock={true}
                />

                {/* Technical Expert Agent — placed directly under Fundamentals Expert */}
                {stock.technicals && (
                  <TechnicalAnalysisCard technicals={stock.technicals} symbol={stock.symbol} />
                )}
              </div>

              {/* Sidebar Column - 1 column */}
              <div className="lg:col-span-1 flex flex-col gap-4">
                {isAnalysisLoading ? (
                  <div className="glass-card p-6 flex flex-col items-center justify-center min-h-[300px]">
                    <div className="h-10 w-10 rounded-full border-4 border-primary border-t-transparent animate-spin mb-4" />
                    <p className="text-muted-foreground font-medium animate-pulse">Gemini AI is analyzing...</p>
                  </div>
                ) : analysis ? (
                  <RecommendationCard analysis={analysis} symbol={stock.symbol} />
                ) : null}

                {stock.news && stock.news.length > 0 && (
                  <div className="h-[400px]">
                    <NewsFeed news={stock.news} />
                  </div>
                )}
              </div>
            </div>

            {/* Disclaimer */}
            <div className="glass-card p-3 text-center text-xs text-muted-foreground mt-4">
              <strong>Disclaimer:</strong> This analysis is for educational purposes only and should not be considered financial advice.
              Always do your own research and consult with a qualified financial advisor before making investment decisions.
            </div>
          </div>
        )}
      </div>

      {/* Watchlist Panel */}
      <WatchlistPanel
        open={showWatchlist}
        onOpenChange={setShowWatchlist}
        onSelectStock={handleSelectFromWatchlist}
      />

      <Toaster />
    </div>
  );
};

export default Index;
