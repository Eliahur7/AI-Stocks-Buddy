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
      <div className="flex items-start justify-between mb-2">
        <span className="text-sm text-muted-foreground">{label}</span>
        <span className="text-muted-foreground">{icon}</span>
      </div>
      <div className="text-xl font-bold font-mono text-foreground">{value}</div>
      {subValue && (
        <div className={`text-sm font-medium ${
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
    <div className="space-y-6">
      {/* Valuation Metrics */}
      <div>
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-foreground">
          <DollarSign className="h-5 w-5 text-primary" />
          Valuation
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <StatCard
            label="Market Cap"
            value={formatMarketCap(stock.marketCap)}
            icon={<BarChart3 className="h-4 w-4" />}
          />
          <StatCard
            label="P/E Ratio"
            value={stock.peRatio.toFixed(2)}
            icon={<Scale className="h-4 w-4" />}
            subValue={`Fwd: ${stock.forwardPE.toFixed(2)}`}
          />
          <StatCard
            label="PEG Ratio"
            value={stock.pegRatio.toFixed(2)}
            icon={<TrendingUp className="h-4 w-4" />}
          />
          <StatCard
            label="P/B Ratio"
            value={stock.priceToBook.toFixed(2)}
            icon={<Banknote className="h-4 w-4" />}
            subValue={`P/S: ${stock.priceToSales.toFixed(2)}`}
          />
        </div>
      </div>

      {/* Growth Metrics */}
      <div>
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-foreground">
          <TrendingUp className="h-5 w-5 text-primary" />
          Growth
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <StatCard
            label="EPS"
            value={`$${stock.eps.toFixed(2)}`}
            icon={<DollarSign className="h-4 w-4" />}
            subValue={`${stock.epsGrowth > 0 ? '+' : ''}${stock.epsGrowth.toFixed(1)}% YoY`}
            isPositive={stock.epsGrowth > 0}
          />
          <StatCard
            label="Revenue"
            value={formatLargeNumber(stock.revenue)}
            icon={<BarChart3 className="h-4 w-4" />}
            subValue={`${stock.revenueGrowth > 0 ? '+' : ''}${stock.revenueGrowth.toFixed(1)}% YoY`}
            isPositive={stock.revenueGrowth > 0}
          />
          <StatCard
            label="ROE"
            value={`${stock.roe.toFixed(1)}%`}
            icon={<Percent className="h-4 w-4" />}
          />
          <StatCard
            label="ROA"
            value={`${stock.roa.toFixed(1)}%`}
            icon={<PieChart className="h-4 w-4" />}
          />
        </div>
      </div>

      {/* Profitability Metrics */}
      <div>
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-foreground">
          <PieChart className="h-5 w-5 text-primary" />
          Profitability
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <StatCard
            label="Gross Margin"
            value={stock.grossMargin ? `${stock.grossMargin.toFixed(1)}%` : 'N/A'}
            icon={<Percent className="h-4 w-4" />}
          />
          <StatCard
            label="Operating Margin"
            value={`${stock.operatingMargin.toFixed(1)}%`}
            icon={<Percent className="h-4 w-4" />}
          />
          <StatCard
            label="Net Margin"
            value={`${stock.netMargin.toFixed(1)}%`}
            icon={<Percent className="h-4 w-4" />}
          />
          <StatCard
            label="Dividend Yield"
            value={stock.dividendYield ? `${stock.dividendYield.toFixed(2)}%` : 'None'}
            icon={<Banknote className="h-4 w-4" />}
            subValue={stock.payoutRatio ? `Payout: ${stock.payoutRatio.toFixed(1)}%` : undefined}
          />
        </div>
      </div>

      {/* Financial Health */}
      <div>
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-foreground">
          <Activity className="h-5 w-5 text-primary" />
          Financial Health
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <StatCard
            label="Debt/Equity"
            value={`${stock.debtToEquity.toFixed(1)}%`}
            icon={<Scale className="h-4 w-4" />}
          />
          <StatCard
            label="Current Ratio"
            value={stock.currentRatio ? stock.currentRatio.toFixed(2) : 'N/A'}
            icon={<Activity className="h-4 w-4" />}
          />
          <StatCard
            label="Beta"
            value={stock.beta.toFixed(2)}
            icon={<TrendingUp className="h-4 w-4" />}
          />
          <StatCard
            label="Avg Volume"
            value={formatLargeNumber(stock.averageVolume)}
            icon={<BarChart3 className="h-4 w-4" />}
          />
        </div>
      </div>

      {/* 52-Week Range */}
      <div className="glass-card p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">52-Week Range</span>
          <span className="text-sm font-mono text-muted-foreground">
            ${stock.fiftyTwoWeekLow.toFixed(2)} - ${stock.fiftyTwoWeekHigh.toFixed(2)}
          </span>
        </div>
        <div className="relative h-2 bg-secondary rounded-full overflow-hidden">
          <div 
            className="absolute h-full bg-gradient-to-r from-destructive via-warning to-success rounded-full"
            style={{ width: '100%' }}
          />
          <div 
            className="absolute w-3 h-3 bg-foreground rounded-full top-1/2 -translate-y-1/2 border-2 border-background"
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
