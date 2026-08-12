import { StockFundamentals } from '@/types/stock';
import { WatchlistButton } from './WatchlistButton';
import { TrendingUp, TrendingDown, Building2, Layers, BarChart2 } from 'lucide-react';
import { formatMarketCap } from '@/lib/stockData';

interface StockHeaderProps {
  stock: StockFundamentals;
}

export function StockHeader({ stock }: StockHeaderProps) {
  const isPositive = stock.change >= 0;

  return (
    <div className="glass-card p-3.5 md:p-4 animate-fade-in relative overflow-hidden border-emerald-500/20">
      {/* Background ambient glow */}
      <div className={`absolute -right-10 -top-10 w-40 h-40 rounded-full blur-3xl pointer-events-none ${
        isPositive ? 'bg-emerald-500/10' : 'bg-rose-500/10'
      }`} />

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 relative z-10">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="text-2xl md:text-3xl font-extrabold font-mono text-emerald-400 tracking-tight">
              {stock.symbol}
            </span>

            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/5 border border-white/10 text-slate-300">
              <Layers className="h-3 w-3 text-emerald-400" />
              {stock.sector}
            </div>

            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
              <BarChart2 className="h-3 w-3 text-emerald-400" />
              MCap: {formatMarketCap(stock.marketCap)}
            </div>

            <WatchlistButton symbol={stock.symbol} />
          </div>

          <div className="flex items-center gap-3">
            <h2 className="text-base font-bold text-slate-100">{stock.companyName}</h2>
            <span className="text-muted-foreground/40">•</span>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Building2 className="h-3.5 w-3.5 text-muted-foreground/70" />
              {stock.industry}
            </div>
          </div>
        </div>

        <div className="flex md:flex-col items-baseline md:items-end justify-between md:justify-center gap-2">
          <div className="text-2xl md:text-3xl font-extrabold font-mono text-white tracking-tight">
            ${stock.price.toFixed(2)}
          </div>

          <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold font-mono ${
            isPositive
              ? 'text-emerald-400 bg-emerald-500/15 border border-emerald-500/30'
              : 'text-rose-400 bg-rose-500/15 border border-rose-500/30'
          }`}>
            {isPositive ? (
              <TrendingUp className="h-3.5 w-3.5" />
            ) : (
              <TrendingDown className="h-3.5 w-3.5" />
            )}
            <span>
              {isPositive ? '+' : ''}{stock.change.toFixed(2)} ({isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
