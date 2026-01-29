import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface WatchlistItem {
  id: string;
  symbol: string;
  added_at: string;
}

interface UseWatchlistReturn {
  watchlist: WatchlistItem[];
  isLoading: boolean;
  addToWatchlist: (symbol: string) => Promise<boolean>;
  removeFromWatchlist: (symbol: string) => Promise<boolean>;
  isInWatchlist: (symbol: string) => boolean;
}

export function useWatchlist(): UseWatchlistReturn {
  const { user } = useAuth();
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchWatchlist = useCallback(async () => {
    if (!user) {
      setWatchlist([]);
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('watchlist')
        .select('id, symbol, added_at')
        .eq('user_id', user.id)
        .order('added_at', { ascending: false });

      if (error) throw error;
      setWatchlist(data || []);
    } catch (error) {
      console.error('Error fetching watchlist:', error);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchWatchlist();
  }, [fetchWatchlist]);

  // Set up realtime subscription
  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel('watchlist-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'watchlist',
          filter: `user_id=eq.${user.id}`,
        },
        () => {
          fetchWatchlist();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, fetchWatchlist]);

  const addToWatchlist = async (symbol: string): Promise<boolean> => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('watchlist')
        .insert({ user_id: user.id, symbol: symbol.toUpperCase() });

      if (error) {
        if (error.code === '23505') {
          // Duplicate key - already in watchlist
          return true;
        }
        throw error;
      }
      return true;
    } catch (error) {
      console.error('Error adding to watchlist:', error);
      return false;
    }
  };

  const removeFromWatchlist = async (symbol: string): Promise<boolean> => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('watchlist')
        .delete()
        .eq('user_id', user.id)
        .eq('symbol', symbol.toUpperCase());

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error removing from watchlist:', error);
      return false;
    }
  };

  const isInWatchlist = (symbol: string): boolean => {
    return watchlist.some((item) => item.symbol === symbol.toUpperCase());
  };

  return {
    watchlist,
    isLoading,
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist,
  };
}
