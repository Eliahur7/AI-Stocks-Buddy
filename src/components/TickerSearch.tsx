import { useState } from 'react';
import { Search, TrendingUp } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface TickerSearchProps {
  onSearch: (symbol: string) => void;
  isLoading: boolean;
}

const popularTickers = ['AAPL', 'NVDA', 'RKLB', 'CEG', 'SMCI'];

export function TickerSearch({ onSearch, isLoading }: TickerSearchProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input.trim().toUpperCase());
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 animate-fade-in">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold gradient-text">Stock Analyzer</h1>
        <p className="text-muted-foreground">
          Enter a stock ticker to get comprehensive fundamentals and AI-powered recommendations
        </p>
      </div>

      <form onSubmit={handleSubmit} className="relative">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Enter stock ticker (e.g., AAPL)"
              value={input}
              onChange={(e) => setInput(e.target.value.toUpperCase())}
              className="pl-12 h-14 text-lg font-mono bg-card border-border/50 focus:border-primary/50 focus:ring-primary/20"
              maxLength={5}
            />
          </div>
          <Button 
            type="submit" 
            disabled={!input.trim() || isLoading}
            className="h-14 px-8 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
          >
            {isLoading ? (
              <div className="h-5 w-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
            ) : (
              'Analyze'
            )}
          </Button>
        </div>
      </form>

      <div className="flex items-center justify-center gap-2 flex-wrap">
        <span className="text-sm text-muted-foreground flex items-center gap-1">
          <TrendingUp className="h-4 w-4" />
          Popular:
        </span>
        {popularTickers.map((ticker) => (
          <button
            key={ticker}
            onClick={() => onSearch(ticker)}
            className="px-3 py-1.5 text-sm font-mono bg-secondary/50 hover:bg-secondary rounded-md transition-colors text-foreground"
          >
            {ticker}
          </button>
        ))}
      </div>
    </div>
  );
}
