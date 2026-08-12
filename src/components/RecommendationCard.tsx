import { StockAnalysis, Recommendation } from '@/types/stock';
import { ThumbsUp, ThumbsDown, Minus, AlertTriangle, CheckCircle2, TrendingUp, ShieldAlert, Sparkles } from 'lucide-react';

interface RecommendationCardProps {
  analysis: StockAnalysis;
  symbol: string;
}

const recommendationConfig: Record<Recommendation, {
  label: string;
  icon: React.ReactNode;
  bgClass: string;
  glowClass: string;
  textClass: string;
  borderClass: string;
}> = {
  buy: {
    label: 'BUY',
    icon: <ThumbsUp className="h-6 w-6" />,
    bgClass: 'bg-emerald-500/10',
    glowClass: 'glow-success',
    textClass: 'text-emerald-400',
    borderClass: 'border-emerald-500/30',
  },
  hold: {
    label: 'HOLD',
    icon: <Minus className="h-6 w-6" />,
    bgClass: 'bg-amber-500/10',
    glowClass: 'glow-warning',
    textClass: 'text-amber-400',
    borderClass: 'border-amber-500/30',
  },
  sell: {
    label: 'SELL',
    icon: <ThumbsDown className="h-6 w-6" />,
    bgClass: 'bg-rose-500/10',
    glowClass: 'glow-destructive',
    textClass: 'text-rose-400',
    borderClass: 'border-rose-500/30',
  },
};

export function RecommendationCard({ analysis, symbol }: RecommendationCardProps) {
  const config = recommendationConfig[analysis.recommendation];

  return (
    <div className="space-y-3.5 animate-fade-in">
      {/* Main Recommendation Badge */}
      <div className={`glass-card ${config.borderClass} ${config.glowClass} p-4 text-center relative overflow-hidden`}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
            <Sparkles className="h-3 w-3 text-primary" />
            AI Consensus
          </span>
          <span className="text-xs font-mono font-medium text-slate-300">
            {symbol}
          </span>
        </div>

        <div className="py-2 flex items-center justify-center gap-3">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${config.bgClass} ${config.textClass} border ${config.borderClass} shadow-inner`}>
            {config.icon}
          </div>
          <div className="text-left">
            <div className={`text-3xl font-black font-mono tracking-tight ${config.textClass}`}>
              {config.label}
            </div>
            <div className="text-xs text-muted-foreground">
              Overall AI Outlook
            </div>
          </div>
        </div>

        <div className="mt-2 pt-2 border-t border-white/10 flex items-center justify-between text-xs">
          <span className="text-muted-foreground font-medium">Model Confidence</span>
          <div className="flex items-center gap-2">
            <div className="w-20 h-1.5 bg-secondary rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${
                  analysis.confidence >= 70 ? 'bg-emerald-500' :
                  analysis.confidence >= 50 ? 'bg-amber-500' : 'bg-rose-500'
                }`}
                style={{ width: `${analysis.confidence}%` }}
              />
            </div>
            <span className="font-mono font-bold text-slate-200">{analysis.confidence}%</span>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="glass-card p-3.5 space-y-1.5">
        <h4 className="text-xs font-bold uppercase tracking-wide flex items-center gap-1.5 text-slate-200">
          <TrendingUp className="h-3.5 w-3.5 text-primary" />
          Executive Summary
        </h4>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {analysis.summary}
        </p>
      </div>

      {/* Bullish & Risk Factors */}
      <div className="space-y-3">
        {/* Bullish Factors */}
        <div className="glass-card p-3 space-y-1.5">
          <h4 className="text-xs font-bold uppercase tracking-wide flex items-center gap-1.5 text-emerald-400">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Key Catalysts
          </h4>
          {analysis.reasons.length > 0 ? (
            <ul className="space-y-1">
              {analysis.reasons.map((reason, index) => (
                <li key={index} className="flex items-start gap-1.5 text-xs text-muted-foreground">
                  <span className="text-emerald-400 font-bold mt-0.5">•</span>
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-muted-foreground italic">No significant catalysts identified</p>
          )}
        </div>

        {/* Risk Factors */}
        <div className="glass-card p-3 space-y-1.5">
          <h4 className="text-xs font-bold uppercase tracking-wide flex items-center gap-1.5 text-rose-400">
            <ShieldAlert className="h-3.5 w-3.5" />
            Key Risks
          </h4>
          {analysis.risks.length > 0 ? (
            <ul className="space-y-1">
              {analysis.risks.map((risk, index) => (
                <li key={index} className="flex items-start gap-1.5 text-xs text-muted-foreground">
                  <span className="text-rose-400 font-bold mt-0.5">•</span>
                  <span>{risk}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-muted-foreground italic">No significant risks identified</p>
          )}
        </div>
      </div>
    </div>
  );
}
