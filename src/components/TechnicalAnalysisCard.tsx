import { TechnicalIndicators, TechnicalAnalysis } from '@/types/stock';
import { analyzeTechnicals } from '@/lib/stockData';
import { Bot, TrendingUp, TrendingDown, Activity, Minus, Zap, Compass } from 'lucide-react';

interface TechnicalAnalysisCardProps {
  technicals: TechnicalIndicators;
  symbol: string;
}

export function TechnicalAnalysisCard({ technicals, symbol }: TechnicalAnalysisCardProps) {
  const analysis = analyzeTechnicals(technicals);

  const getMomentumColor = (momentum: TechnicalAnalysis['momentum']) => {
    switch (momentum) {
      case 'Bullish': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'Bearish': return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
      default: return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
    }
  };

  const getMomentumIcon = (momentum: TechnicalAnalysis['momentum']) => {
    switch (momentum) {
      case 'Bullish': return <TrendingUp className="h-4 w-4 text-emerald-400" />;
      case 'Bearish': return <TrendingDown className="h-4 w-4 text-rose-400" />;
      default: return <Minus className="h-4 w-4 text-amber-400" />;
    }
  };

  const rsiValue = Math.min(100, Math.max(0, technicals.rsi));
  const rsiCategory = rsiValue > 70 ? 'Overbought' : rsiValue < 30 ? 'Oversold' : 'Neutral';
  const rsiColor = rsiValue > 70 ? 'text-rose-400' : rsiValue < 30 ? 'text-emerald-400' : 'text-amber-400';

  return (
    <div className="glass-card p-4 space-y-3.5 animate-fade-in border-cyan-500/20">
      {/* Agent Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="bg-cyan-500/10 p-2 rounded-lg border border-cyan-500/20">
            <Zap className="h-4 w-4 text-cyan-400" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-1.5">
              Technical Expert Agent
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                LIVE CHART
              </span>
            </h3>
            <p className="text-xs text-muted-foreground">Momentum, Moving Averages & RSI Signals for {symbol}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className={`px-2.5 py-1 rounded-lg border text-xs font-bold font-mono flex items-center gap-1.5 ${getMomentumColor(analysis.momentum)}`}>
            {getMomentumIcon(analysis.momentum)}
            <span>{analysis.momentum}</span>
          </div>

          <div className="px-2.5 py-1 rounded-lg border border-white/10 bg-white/5 text-xs font-bold font-mono text-cyan-300 flex items-center gap-1.5">
            <Compass className="h-3.5 w-3.5" />
            <span>{analysis.trend}</span>
          </div>
        </div>
      </div>

      {/* Grid Content */}
      <div className="grid md:grid-cols-2 gap-3 pt-1">
        {/* Left Column: Summary & RSI Visual Gauge */}
        <div className="space-y-3">
          <div className="glass-card p-3 space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Technicals Summary</span>
            <p className="text-xs text-slate-200 leading-relaxed">{analysis.summary}</p>
          </div>

          {/* Visual RSI Bar */}
          <div className="glass-card p-3 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-muted-foreground">Relative Strength Index (RSI 14)</span>
              <span className={`font-mono font-bold ${rsiColor}`}>
                {rsiValue.toFixed(1)} ({rsiCategory})
              </span>
            </div>

            <div className="relative h-2 bg-slate-900 rounded-full overflow-hidden border border-white/10">
              <div className="absolute h-full bg-gradient-to-r from-emerald-500 via-amber-500 to-rose-500 w-full" />
              <div
                className="absolute w-2.5 h-2.5 bg-white rounded-full top-1/2 -translate-y-1/2 shadow-md border-2 border-slate-950"
                style={{ left: `${rsiValue}%`, transform: 'translate(-50%, -50%)' }}
              />
            </div>

            <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
              <span>0 (Oversold)</span>
              <span>50 (Neutral)</span>
              <span>100 (Overbought)</span>
            </div>
          </div>
        </div>

        {/* Right Column: Key Technical Metrics */}
        <div className="grid grid-cols-2 gap-2">
          <div className="stat-card">
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">50-Day SMA</span>
            <div className="text-sm font-bold font-mono text-slate-100 mt-0.5">${technicals.sma50.toFixed(2)}</div>
            <span className="text-[10px] text-muted-foreground">Short-term trend</span>
          </div>

          <div className="stat-card">
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">200-Day SMA</span>
            <div className="text-sm font-bold font-mono text-slate-100 mt-0.5">${technicals.sma200.toFixed(2)}</div>
            <span className="text-[10px] text-muted-foreground">Long-term baseline</span>
          </div>

          <div className="stat-card border-l-2 border-l-emerald-500">
            <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-semibold">Support Level</span>
            <div className="text-sm font-bold font-mono text-emerald-300 mt-0.5">${technicals.support.toFixed(2)}</div>
            <span className="text-[10px] text-muted-foreground">Key floor</span>
          </div>

          <div className="stat-card border-l-2 border-l-rose-500">
            <span className="text-[10px] uppercase tracking-wider text-rose-400 font-semibold">Resistance Level</span>
            <div className="text-sm font-bold font-mono text-rose-300 mt-0.5">${technicals.resistance.toFixed(2)}</div>
            <span className="text-[10px] text-muted-foreground">Key ceiling</span>
          </div>

          <div className="stat-card col-span-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">MACD Signal</span>
              <span className={`font-mono text-xs font-bold ${technicals.macd.histogram > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {technicals.macd.histogram > 0 ? '+ Bullish Divergence' : '- Bearish Divergence'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
