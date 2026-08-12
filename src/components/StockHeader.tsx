import { StockFundamentals } from '@/types/stock';
import { WatchlistButton } from './WatchlistButton';
import { TrendingUp, TrendingDown, Building2 } from 'lucide-react';

interface StockHeaderProps {
  stock: StockFundamentals;
}

export function StockHeader({ stock }: StockHeaderProps) {
  const isPositive = stock.change >= 0;

  return (
    <div className="glass-card p-4 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold font-mono text-primary">{stock.symbol}</span>
            <span className="px-2 py-0.5 text-xs font-medium bg-secondary rounded-md text-secondary-foreground">
              {stock.sector}
            </span>
            <WatchlistButton symbol={stock.symbol} />
          </div>
          <h2 className="text-base font-semibold text-foreground">{stock.companyName}</h2>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Building2 className="h-3.5 w-3.5" />
            {stock.industry}
          </div>
        </div>

        <div className="text-right">
          <div className="text-3xl font-bold font-mono text-foreground">
            ${stock.price.toFixed(2)}
          </div>
          <div className={`flex items-center justify-end gap-1.5 text-base font-semibold ${
            isPositive ? 'text-success' : 'text-destructive'
          }`}>
            {isPositive ? (
              <TrendingUp className="h-4 w-4" />
            ) : (
              <TrendingDown className="h-4 w-4" />
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
