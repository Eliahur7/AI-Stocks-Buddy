import { TechnicalIndicators, TechnicalAnalysis } from '@/types/stock';
import { analyzeTechnicals } from '@/lib/stockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot, TrendingUp, TrendingDown, Activity, Minus } from 'lucide-react';

interface TechnicalAnalysisCardProps {
  technicals: TechnicalIndicators;
  symbol: string;
}

export function TechnicalAnalysisCard({ technicals, symbol }: TechnicalAnalysisCardProps) {
  const analysis = analyzeTechnicals(technicals);

  const getMomentumColor = (momentum: TechnicalAnalysis['momentum']) => {
    switch (momentum) {
      case 'Bullish': return 'text-success bg-success/10';
      case 'Bearish': return 'text-destructive bg-destructive/10';
      default: return 'text-warning bg-warning/10';
    }
  };

  const getMomentumIcon = (momentum: TechnicalAnalysis['momentum']) => {
    switch (momentum) {
      case 'Bullish': return <TrendingUp className="h-5 w-5 text-success" />;
      case 'Bearish': return <TrendingDown className="h-5 w-5 text-destructive" />;
      default: return <Minus className="h-5 w-5 text-warning" />;
    }
  };

  return (
    <Card className="glass-card">
      <CardHeader className="pb-2 border-b border-border/50">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Bot className="h-6 w-6 text-primary" />
          Technical Expert Agent
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wider">Analysis Summary</h3>
              <p className="text-sm leading-relaxed">{analysis.summary}</p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex-1 glass-card p-4 rounded-xl text-center border-t border-t-white/5">
                <p className="text-xs text-muted-foreground uppercase mb-1">Momentum</p>
                <div className="flex items-center justify-center gap-2">
                  {getMomentumIcon(analysis.momentum)}
                  <span className={`font-semibold ${getMomentumColor(analysis.momentum).split(' ')[0]}`}>
                    {analysis.momentum}
                  </span>
                </div>
              </div>
              <div className="flex-1 glass-card p-4 rounded-xl text-center border-t border-t-white/5">
                <p className="text-xs text-muted-foreground uppercase mb-1">Trend</p>
                <div className="flex items-center justify-center gap-2">
                  <Activity className="h-5 w-5 text-primary" />
                  <span className="font-semibold text-primary">{analysis.trend}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Key Indicators</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="glass-card p-3 rounded-lg flex justify-between items-center">
                <span className="text-xs text-muted-foreground">RSI (14)</span>
                <span className={`font-mono text-sm ${technicals.rsi > 70 ? 'text-destructive' : technicals.rsi < 30 ? 'text-success' : 'text-foreground'}`}>
                  {technicals.rsi.toFixed(2)}
                </span>
              </div>
              <div className="glass-card p-3 rounded-lg flex justify-between items-center">
                <span className="text-xs text-muted-foreground">MACD</span>
                <span className={`font-mono text-sm ${technicals.macd.histogram > 0 ? 'text-success' : 'text-destructive'}`}>
                  {technicals.macd.histogram > 0 ? '+' : ''}{technicals.macd.histogram.toFixed(2)}
                </span>
              </div>
              <div className="glass-card p-3 rounded-lg flex justify-between items-center">
                <span className="text-xs text-muted-foreground">50-Day SMA</span>
                <span className="font-mono text-sm">${technicals.sma50.toFixed(2)}</span>
              </div>
              <div className="glass-card p-3 rounded-lg flex justify-between items-center">
                <span className="text-xs text-muted-foreground">200-Day SMA</span>
                <span className="font-mono text-sm">${technicals.sma200.toFixed(2)}</span>
              </div>
              <div className="glass-card p-3 rounded-lg flex justify-between items-center border-l-2 border-l-success">
                <span className="text-xs text-muted-foreground">Support</span>
                <span className="font-mono text-sm">${technicals.support.toFixed(2)}</span>
              </div>
              <div className="glass-card p-3 rounded-lg flex justify-between items-center border-l-2 border-l-destructive">
                <span className="text-xs text-muted-foreground">Resistance</span>
                <span className="font-mono text-sm">${technicals.resistance.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
