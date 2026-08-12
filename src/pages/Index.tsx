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
import { AlertCircle, LineChart, Sparkles } from 'lucide-react';
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
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      {/* Dynamic ambient radial glowing background */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.15),rgba(255,255,255,0))] pointer-events-none z-0" />
      <div className="fixed top-1/3 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-10 right-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Glass Header */}
      <header className="relative z-30 border-b border-white/10 sticky top-0 bg-slate-950/70 backdrop-blur-2xl">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 py-2.5 flex items-center justify-between gap-4">
          <div
            className="flex items-center gap-2.5 cursor-pointer hover:opacity-90 transition-opacity"
            onClick={reset}
          >
            <div className="bg-emerald-500/15 p-2 rounded-xl border border-emerald-500/30 flex items-center justify-center shadow-lg shadow-emerald-500/10">
              <LineChart className="h-5 w-5 text-emerald-400" />
            </div>
            <div>
              <h1 className="text-base font-extrabold gradient-text leading-tight">
                AI Stocks Buddy
              </h1>
              <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Multi-Agent Intelligence
              </div>
            </div>
          </div>

          <div className="flex-1 max-w-xl mx-auto">
            <TickerSearch onSearch={searchStock} isLoading={isLoading} compact={!!stock} />
          </div>

          <UserMenu onShowWatchlist={() => setShowWatchlist(true)} />
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-[1440px] mx-auto px-4 md:px-6 py-4 md:py-6">
        {error && !stock && (
          <div className="mb-6 flex items-center justify-center gap-2 text-rose-400 bg-rose-500/10 border border-rose-500/20 px-4 py-3 rounded-xl animate-fade-in max-w-lg mx-auto shadow-lg shadow-rose-500/10">
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
            <span className="text-sm font-medium">{error}</span>
          </div>
        )}

        {!stock ? (
          <div className="flex flex-col items-center justify-center min-h-[65vh] py-10 animate-fade-in">
            <TickerSearch onSearch={searchStock} isLoading={isLoading} compact={false} />
          </div>
        ) : (
          <div className="space-y-4 max-w-[1440px] mx-auto">
            {/* Stock Header */}
            <StockHeader stock={stock} />

            <div className="grid lg:grid-cols-3 gap-4">
              {/* Main Column — 2/3 width */}
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

                {/* Technical Expert Agent — directly below Fundamentals Expert */}
                {stock.technicals && (
                  <TechnicalAnalysisCard technicals={stock.technicals} symbol={stock.symbol} />
                )}
              </div>

              {/* Sidebar Column — 1/3 width */}
              <div className="lg:col-span-1 flex flex-col gap-4">
                {isAnalysisLoading ? (
                  <div className="glass-card p-8 flex flex-col items-center justify-center min-h-[280px] space-y-3">
                    <div className="h-10 w-10 rounded-full border-3 border-emerald-500/20 border-t-emerald-400 animate-spin" />
                    <p className="text-sm font-semibold text-slate-200 animate-pulse">
                      Gemini AI Analyzing {stock.symbol}...
                    </p>
                    <p className="text-xs text-muted-foreground">Evaluating valuation, growth & market momentum</p>
                  </div>
                ) : analysis ? (
                  <RecommendationCard analysis={analysis} symbol={stock.symbol} />
                ) : null}

                {stock.news && stock.news.length > 0 && (
                  <div className="h-[420px]">
                    <NewsFeed news={stock.news} />
                  </div>
                )}
              </div>
            </div>

            {/* Disclaimer */}
            <div className="glass-card p-3 text-center text-[11px] text-muted-foreground/80 mt-4 border-white/5">
              <strong className="text-slate-300">Disclaimer:</strong> Market metrics and AI model ratings are for informational & research purposes only. Always conduct independent due diligence before making investment decisions.
            </div>
          </div>
        )}
      </main>

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
