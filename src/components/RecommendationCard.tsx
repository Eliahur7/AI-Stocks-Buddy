import { StockAnalysis, Recommendation } from '@/types/stock';
import { ThumbsUp, ThumbsDown, Minus, AlertTriangle, CheckCircle2, TrendingUp } from 'lucide-react';

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
}> = {
  buy: {
    label: 'BUY',
    icon: <ThumbsUp className="h-8 w-8" />,
    bgClass: 'bg-success/10 border-success/30',
    glowClass: 'glow-success',
    textClass: 'text-success',
  },
  hold: {
    label: 'HOLD',
    icon: <Minus className="h-8 w-8" />,
    bgClass: 'bg-warning/10 border-warning/30',
    glowClass: 'glow-warning',
    textClass: 'text-warning',
  },
  sell: {
    label: 'SELL',
    icon: <ThumbsDown className="h-8 w-8" />,
    bgClass: 'bg-destructive/10 border-destructive/30',
    glowClass: 'glow-destructive',
    textClass: 'text-destructive',
  },
};

export function RecommendationCard({ analysis, symbol }: RecommendationCardProps) {
  const config = recommendationConfig[analysis.recommendation];

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Main Recommendation Badge */}
      <div className={`glass-card ${config.bgClass} ${config.glowClass} p-6 text-center`}>
        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${config.bgClass} ${config.textClass} mb-4`}>
          {config.icon}
        </div>
        <div className={`text-4xl font-bold ${config.textClass} mb-2`}>
          {config.label}
        </div>
        <div className="text-muted-foreground">
          Recommendation for <span className="font-mono font-semibold text-foreground">{symbol}</span>
        </div>
        <div className="mt-4 flex items-center justify-center gap-2">
          <div className="text-sm text-muted-foreground">Confidence:</div>
          <div className="flex items-center gap-2">
            <div className="w-24 h-2 bg-secondary rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full ${
                  analysis.confidence >= 70 ? 'bg-success' : 
                  analysis.confidence >= 50 ? 'bg-warning' : 'bg-destructive'
                }`}
                style={{ width: `${analysis.confidence}%` }}
              />
            </div>
            <span className="text-sm font-mono font-semibold text-foreground">{analysis.confidence}%</span>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="glass-card p-5">
        <h4 className="font-semibold mb-3 flex items-center gap-2 text-foreground">
          <TrendingUp className="h-5 w-5 text-primary" />
          Analysis Summary
        </h4>
        <p className="text-muted-foreground leading-relaxed">
          {analysis.summary}
        </p>
      </div>

      {/* Reasons & Risks */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Bullish Factors */}
        <div className="glass-card p-5">
          <h4 className="font-semibold mb-3 flex items-center gap-2 text-success">
            <CheckCircle2 className="h-5 w-5" />
            Bullish Factors
          </h4>
          {analysis.reasons.length > 0 ? (
            <ul className="space-y-2">
              {analysis.reasons.map((reason, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-success mt-1">•</span>
                  {reason}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground italic">No significant bullish factors identified</p>
          )}
        </div>

        {/* Risk Factors */}
        <div className="glass-card p-5">
          <h4 className="font-semibold mb-3 flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            Risk Factors
          </h4>
          {analysis.risks.length > 0 ? (
            <ul className="space-y-2">
              {analysis.risks.map((risk, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-destructive mt-1">•</span>
                  {risk}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground italic">No significant risk factors identified</p>
          )}
        </div>
      </div>
    </div>
  );
}
