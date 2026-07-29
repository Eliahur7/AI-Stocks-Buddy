import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { format, parseISO } from 'date-fns';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface HistoricalPrice {
  date: string;
  close: number;
}

interface StockChartProps {
  data: HistoricalPrice[];
  changePercent: number;
}

export function StockChart({ data, changePercent }: StockChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="glass-card p-6 h-[400px] flex items-center justify-center text-muted-foreground">
        No historical data available.
      </div>
    );
  }

  const isPositive = changePercent >= 0;
  const gradientColor = isPositive ? 'hsl(var(--success))' : 'hsl(var(--destructive))';
  const strokeColor = isPositive ? 'hsl(var(--success))' : 'hsl(var(--destructive))';

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), 'MMM d');
    } catch (e) {
      return dateString;
    }
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-card p-3 border-border/50 shadow-xl">
          <p className="text-muted-foreground text-xs mb-1">{formatDate(label)}</p>
          <p className="font-mono font-semibold text-foreground">
            {formatCurrency(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  // Find min and max for Y axis domain to make the chart look more dynamic
  const prices = data.map(d => d.close);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const padding = (max - min) * 0.1;

  return (
    <div className="glass-card p-6 flex flex-col h-[400px] animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        {isPositive ? (
          <TrendingUp className="h-5 w-5 text-success" />
        ) : (
          <TrendingDown className="h-5 w-5 text-destructive" />
        )}
        <h3 className="font-semibold text-foreground">Price History (3 Months)</h3>
      </div>
      
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={gradientColor} stopOpacity={0.3} />
                <stop offset="95%" stopColor={gradientColor} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.5} />
            <XAxis 
              dataKey="date" 
              tickFormatter={formatDate}
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              minTickGap={30}
            />
            <YAxis 
              domain={[min - padding, max + padding]}
              tickFormatter={(val) => `$${val.toFixed(0)}`}
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              width={60}
              orientation="right"
            />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey="close" 
              stroke={strokeColor} 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorPrice)" 
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
