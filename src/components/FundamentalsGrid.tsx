import { StockFundamentals } from '@/types/stock';
import { formatMarketCap, formatLargeNumber } from '@/lib/stockData';
import {
  DollarSign,
  TrendingUp,
  Percent,
  BarChart3,
  PieChart,
  Activity,
  Scale,
  Banknote
} from 'lucide-react';

interface FundamentalsGridProps {
  stock: StockFundamentals;
}

interface StatCardProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  subValue?: string;
  isPositive?: boolean;
}

function StatCard({ label, value, icon, subValue, isPositive }: StatCardProps) {
  return (
    <div className="stat-card animate-fade-in">
      <div className="flex items-start justify-between mb-1">
        <span className="text-xs text-muted-foreground">{label}</span>
        <span className="text-muted-foreground">{icon}</span>
      </div>
      <div className="text-lg font-bold font-mono text-foreground">{value}</div>
      {subValue && (
        <div className={`text-xs font-medium ${
          isPositive === undefined ? 'text-muted-foreground' :
          isPositive ? 'text-success' : 'text-destructive'
        }`}>
          {subValue}
        </div>
      )}
    </div>
  );
}

export function FundamentalsGrid({ stock }: FundamentalsGridProps) {
  return (
    <div className="space-y-4">
      {/* Valuation */}
      <div>
        <h3 className="text-sm font-semibold mb-2 flex items-center gap-2 text-foreground">
          <DollarSign className="h-4 w-4 text-primary" />
          Valuation
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <StatCard label="Market Cap" value={formatMarketCap(stock.marketCap)} icon={<BarChart3 className="h-3.5 w-3.5" />} />
          <StatCard label="P/E Ratio" value={stock.peRatio.toFixed(2)} icon={<Scale className="h-3.5 w-3.5" />} subValue={`Fwd: ${stock.forwardPE.toFixed(2)}`} />
          <StatCard label="PEG Ratio" value={stock.pegRatio.toFixed(2)} icon={<TrendingUp className="h-3.5 w-3.5" />} />
          <StatCard label="P/B Ratio" value={stock.priceToBook.toFixed(2)} icon={<Banknote className="h-3.5 w-3.5" />} subValue={`P/S: ${stock.priceToSales.toFixed(2)}`} />
        </div>
      </div>

      {/* Growth */}
      <div>
        <h3 className="text-sm font-semibold mb-2 flex items-center gap-2 text-foreground">
          <TrendingUp className="h-4 w-4 text-primary" />
          Growth
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <StatCard label="EPS" value={`$${stock.eps.toFixed(2)}`} icon={<DollarSign className="h-3.5 w-3.5" />} subValue={`${stock.epsGrowth > 0 ? '+' : ''}${stock.epsGrowth.toFixed(1)}% YoY`} isPositive={stock.epsGrowth > 0} />
          <StatCard label="Revenue" value={formatLargeNumber(stock.revenue)} icon={<BarChart3 className="h-3.5 w-3.5" />} subValue={`${stock.revenueGrowth > 0 ? '+' : ''}${stock.revenueGrowth.toFixed(1)}% YoY`} isPositive={stock.revenueGrowth > 0} />
          <StatCard label="ROE" value={`${stock.roe.toFixed(1)}%`} icon={<Percent className="h-3.5 w-3.5" />} />
          <StatCard label="ROA" value={`${stock.roa.toFixed(1)}%`} icon={<PieChart className="h-3.5 w-3.5" />} />
        </div>
      </div>

      {/* Profitability */}
      <div>
        <h3 className="text-sm font-semibold mb-2 flex items-center gap-2 text-foreground">
          <PieChart className="h-4 w-4 text-primary" />
          Profitability
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <StatCard label="Gross Margin" value={stock.grossMargin ? `${stock.grossMargin.toFixed(1)}%` : 'N/A'} icon={<Percent className="h-3.5 w-3.5" />} />
          <StatCard label="Oper. Margin" value={`${stock.operatingMargin.toFixed(1)}%`} icon={<Percent className="h-3.5 w-3.5" />} />
          <StatCard label="Net Margin" value={`${stock.netMargin.toFixed(1)}%`} icon={<Percent className="h-3.5 w-3.5" />} />
          <StatCard label="Div. Yield" value={stock.dividendYield ? `${stock.dividendYield.toFixed(2)}%` : 'None'} icon={<Banknote className="h-3.5 w-3.5" />} subValue={stock.payoutRatio ? `Payout: ${stock.payoutRatio.toFixed(1)}%` : undefined} />
        </div>
      </div>

      {/* Financial Health */}
      <div>
        <h3 className="text-sm font-semibold mb-2 flex items-center gap-2 text-foreground">
          <Activity className="h-4 w-4 text-primary" />
          Financial Health
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <StatCard label="Debt/Equity" value={`${stock.debtToEquity.toFixed(1)}%`} icon={<Scale className="h-3.5 w-3.5" />} />
          <StatCard label="Current Ratio" value={stock.currentRatio ? stock.currentRatio.toFixed(2) : 'N/A'} icon={<Activity className="h-3.5 w-3.5" />} />
          <StatCard label="Beta" value={stock.beta.toFixed(2)} icon={<TrendingUp className="h-3.5 w-3.5" />} />
          <StatCard label="Avg Volume" value={formatLargeNumber(stock.averageVolume)} icon={<BarChart3 className="h-3.5 w-3.5" />} />
        </div>
      </div>

      {/* 52-Week Range */}
      <div className="glass-card p-3">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs text-muted-foreground">52-Week Range</span>
          <span className="text-xs font-mono text-muted-foreground">
            ${stock.fiftyTwoWeekLow.toFixed(2)} — ${stock.fiftyTwoWeekHigh.toFixed(2)}
          </span>
        </div>
        <div className="relative h-1.5 bg-secondary rounded-full overflow-hidden">
          <div className="absolute h-full bg-gradient-to-r from-destructive via-warning to-success rounded-full" style={{ width: '100%' }} />
          <div
            className="absolute w-2.5 h-2.5 bg-foreground rounded-full top-1/2 -translate-y-1/2 border-2 border-background"
            style={{
              left: `${((stock.price - stock.fiftyTwoWeekLow) / (stock.fiftyTwoWeekHigh - stock.fiftyTwoWeekLow)) * 100}%`,
              transform: 'translate(-50%, -50%)'
            }}
          />
        </div>
        <div className="flex justify-between mt-1 text-xs text-muted-foreground">
          <span>Low</span>
          <span className="font-mono font-medium text-foreground">${stock.price.toFixed(2)}</span>
          <span>High</span>
        </div>
      </div>
    </div>
  );
}
