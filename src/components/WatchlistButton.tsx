import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useWatchlist } from '@/hooks/useWatchlist';
import { AuthModal } from './AuthModal';
import { Star, Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface WatchlistButtonProps {
  symbol: string;
}

export function WatchlistButton({ symbol }: WatchlistButtonProps) {
  const { user } = useAuth();
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();
  const [isLoading, setIsLoading] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const inWatchlist = isInWatchlist(symbol);

  const handleClick = async () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    setIsLoading(true);
    try {
      if (inWatchlist) {
        const success = await removeFromWatchlist(symbol);
        if (success) {
          toast({
            title: 'Removed from watchlist',
            description: `${symbol} has been removed from your watchlist.`,
          });
        }
      } else {
        const success = await addToWatchlist(symbol);
        if (success) {
          toast({
            title: 'Added to watchlist',
            description: `${symbol} has been added to your watchlist.`,
          });
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        onClick={handleClick}
        variant="outline"
        size="sm"
        disabled={isLoading}
        className={
          inWatchlist
            ? 'border-warning/50 bg-warning/10 text-warning hover:bg-warning/20'
            : 'border-border/50 hover:border-warning/50 hover:bg-warning/10 hover:text-warning'
        }
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <>
            <Star
              className={`h-4 w-4 mr-2 ${inWatchlist ? 'fill-warning' : ''}`}
            />
            {inWatchlist ? 'Watching' : 'Add to Watchlist'}
          </>
        )}
      </Button>
      <AuthModal open={showAuthModal} onOpenChange={setShowAuthModal} />
    </>
  );
}
