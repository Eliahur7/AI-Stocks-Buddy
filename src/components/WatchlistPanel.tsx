import { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useWatchlist, WatchlistItem } from '@/hooks/useWatchlist';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Star, TrendingUp, TrendingDown, Loader2, Trash2, RefreshCw } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { getStockData } from '@/lib/stockData';

interface WatchlistPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectStock: (symbol: string) => void;
}

interface StockQuote {
  symbol: string;
  price: number;
  changePercent: number;
  companyName: string;
}

export function WatchlistPanel({ open, onOpenChange, onSelectStock }: WatchlistPanelProps) {
  const { user } = useAuth();
  const { watchlist, removeFromWatchlist, isLoading: watchlistLoading } = useWatchlist();
  const [quotes, setQuotes] = useState<Record<string, StockQuote>>({});
  const [loadingQuotes, setLoadingQuotes] = useState(false);

  const fetchQuotes = async () => {
    if (watchlist.length === 0) return;
    
    setLoadingQuotes(true);
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newQuotes: Record<string, StockQuote> = {};
    
    watchlist.forEach((item) => {
      try {
        const data = getStockData(item.symbol);
        
        if (data) {
          newQuotes[item.symbol] = {
            symbol: data.symbol,
            price: data.price,
            changePercent: data.changePercent,
            companyName: data.companyName,
          };
        }
      } catch (error) {
        console.error(`Error fetching quote for ${item.symbol}:`, error);
      }
    });
    
    setQuotes(newQuotes);
    setLoadingQuotes(false);
  };

  useEffect(() => {
    if (open && watchlist.length > 0) {
      fetchQuotes();
    }
  }, [open, watchlist.length]);

  const handleRemove = async (symbol: string) => {
    const success = await removeFromWatchlist(symbol);
    if (success) {
      toast({
        title: 'Removed from watchlist',
        description: `${symbol} has been removed.`,
      });
    }
  };

  const handleSelect = (symbol: string) => {
    onSelectStock(symbol);
    onOpenChange(false);
  };

  if (!user) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="glass-card border-l-border/50 w-full sm:max-w-md">
        <SheetHeader className="space-y-1">
          <SheetTitle className="flex items-center gap-2 text-xl">
            <Star className="h-5 w-5 text-warning fill-warning" />
            My Watchlist
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground">
              {watchlist.length} stock{watchlist.length !== 1 ? 's' : ''} tracked
            </p>
            {watchlist.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={fetchQuotes}
                disabled={loadingQuotes}
                className="text-muted-foreground hover:text-foreground"
              >
                <RefreshCw className={`h-4 w-4 mr-1 ${loadingQuotes ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            )}
          </div>

          {watchlistLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : watchlist.length === 0 ? (
            <div className="text-center py-12">
              <Star className="h-12 w-12 mx-auto text-muted-foreground/30 mb-4" />
              <p className="text-muted-foreground">Your watchlist is empty</p>
              <p className="text-sm text-muted-foreground/70 mt-1">
                Search for stocks and add them to your watchlist
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {watchlist.map((item) => {
                const quote = quotes[item.symbol];
                const isPositive = quote?.changePercent >= 0;

                return (
                  <div
                    key={item.id}
                    className="glass-card p-3 hover:border-primary/30 transition-all cursor-pointer group"
                    onClick={() => handleSelect(item.symbol)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold font-mono">
                            {item.symbol}
                          </span>
                          {quote && (
                            <span
                              className={`text-xs px-1.5 py-0.5 rounded flex items-center gap-0.5 ${
                                isPositive
                                  ? 'bg-success/10 text-success'
                                  : 'bg-destructive/10 text-destructive'
                              }`}
                            >
                              {isPositive ? (
                                <TrendingUp className="h-3 w-3" />
                              ) : (
                                <TrendingDown className="h-3 w-3" />
                              )}
                              {isPositive ? '+' : ''}
                              {quote.changePercent.toFixed(2)}%
                            </span>
                          )}
                        </div>
                        {quote && (
                          <p className="text-sm text-muted-foreground truncate mt-0.5">
                            {quote.companyName}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-3">
                        {quote && (
                          <span className="font-mono font-semibold">
                            ${quote.price.toFixed(2)}
                          </span>
                        )}
                        {loadingQuotes && !quote && (
                          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemove(item.symbol);
                          }}
                          className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
