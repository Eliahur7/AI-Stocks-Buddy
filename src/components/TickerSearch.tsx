import { useState, useEffect } from 'react';
import { Search, TrendingUp, Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface TickerSearchProps {
  onSearch: (symbol: string) => void;
  isLoading: boolean;
  compact?: boolean;
}

const popularTickers = ['AAPL', 'NVDA', 'MSFT', 'AMZN', 'GOOGL', 'META', 'TSLA', 'JPM'];

export function TickerSearch({ onSearch, isLoading, compact }: TickerSearchProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input.trim().toUpperCase());
    }
  };

  // Keyboard shortcut cmd+k focus
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('ticker-search-input')?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (compact) {
    return (
      <form onSubmit={handleSubmit} className="relative w-full">
        <div className="relative flex items-center">
          <Search className="absolute left-3.5 h-4 w-4 text-emerald-400/80 pointer-events-none" />
          <Input
            id="ticker-search-input"
            type="text"
            placeholder="Search ticker (e.g. NVDA)... [⌘K]"
            value={input}
            onChange={(e) => setInput(e.target.value.toUpperCase())}
            className="pl-9 pr-24 h-10 text-sm font-mono bg-card/80 border-white/10 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 rounded-lg shadow-inner"
            maxLength={6}
          />
          <Button
            type="submit"
            disabled={!input.trim() || isLoading}
            size="sm"
            className="absolute right-1 h-8 px-3.5 bg-emerald-500 text-slate-950 hover:bg-emerald-400 font-bold text-xs rounded-md transition-all shadow-md shadow-emerald-500/20"
          >
            {isLoading ? (
              <div className="h-3.5 w-3.5 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" />
            ) : (
              'Analyze'
            )}
          </Button>
        </div>
      </form>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-5 animate-fade-in">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-1">
          <Sparkles className="h-3.5 w-3.5" />
          Autonomous AI Market Analyst
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight gradient-text">
          AI Stocks Buddy
        </h1>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          Deep multi-agent fundamental & technical analysis powered by Gemini 1.5 Flash
        </p>
      </div>

      <form onSubmit={handleSubmit} className="relative">
        <div className="flex gap-2.5">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-emerald-400/70" />
            <Input
              id="ticker-search-input"
              type="text"
              placeholder="Search ticker (e.g., AAPL, NVDA)..."
              value={input}
              onChange={(e) => setInput(e.target.value.toUpperCase())}
              className="pl-12 pr-12 h-13 text-base font-mono bg-card/70 border-white/10 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 rounded-xl shadow-2xl"
              maxLength={6}
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono text-muted-foreground/60 hidden sm:inline-block border border-white/10 px-1.5 py-0.5 rounded bg-white/5">
              ⌘K
            </span>
          </div>
          <Button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="h-13 px-7 bg-emerald-500 text-slate-950 hover:bg-emerald-400 font-bold text-sm rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-emerald-500/25"
          >
            {isLoading ? (
              <div className="h-5 w-5 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" />
            ) : (
              'Analyze'
            )}
          </Button>
        </div>
      </form>

      <div className="flex items-center justify-center gap-1.5 flex-wrap pt-1">
        <span className="text-xs text-muted-foreground flex items-center gap-1 font-medium mr-1">
          <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
          Popular Tickers:
        </span>
        {popularTickers.map((ticker) => (
          <button
            key={ticker}
            onClick={() => onSearch(ticker)}
            className="px-2.5 py-1 text-xs font-mono bg-white/5 hover:bg-emerald-500/15 border border-white/10 hover:border-emerald-500/30 rounded-lg transition-all text-slate-200 hover:text-emerald-300 active:scale-95"
          >
            {ticker}
          </button>
        ))}
      </div>
    </div>
  );
}
