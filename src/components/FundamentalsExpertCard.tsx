import { FundamentalsExpertAnalysis } from '@/types/stock';
import {
  Brain,
  TrendingUp,
  DollarSign,
  Activity,
  BarChart3,
  Users,
  Loader2,
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  ChevronRight,
  Star,
} from 'lucide-react';

interface FundamentalsExpertCardProps {
  analysis: FundamentalsExpertAnalysis | null;
  isLoading: boolean;
  error: string | null;
  symbol: string;
  onRun: () => void;
  hasStock: boolean;
}

interface ScoreDimension {
  label: string;
  score: number;
  verdict: string;
  icon: React.ReactNode;
}

function ScoreRing({ score, size = 'md' }: { score: number; size?: 'sm' | 'md' | 'lg' }) {
  const pct = (score / 10) * 100;
  const color =
    score >= 8 ? '#22c55e' : score >= 6 ? '#3b82f6' : score >= 4 ? '#f59e0b' : '#ef4444';
  const radius = size === 'lg' ? 44 : size === 'md' ? 32 : 22;
  const stroke = size === 'lg' ? 5 : 4;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (pct / 100) * circumference;
  const svgSize = (radius + stroke) * 2 + 4;
  const fontSize = size === 'lg' ? 'text-3xl' : size === 'md' ? 'text-lg' : 'text-sm';

  return (
    <div className="relative flex items-center justify-center" style={{ width: svgSize, height: svgSize }}>
      <svg width={svgSize} height={svgSize} className="-rotate-90">
        <circle
          cx={svgSize / 2}
          cy={svgSize / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          className="text-secondary"
        />
        <circle
          cx={svgSize / 2}
          cy={svgSize / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1s ease' }}
        />
      </svg>
      <span className={`absolute font-bold font-mono ${fontSize}`} style={{ color }}>
        {score}
      </span>
    </div>
  );
}

function DimensionRow({ label, score, verdict, icon }: ScoreDimension) {
  const color =
    score >= 8 ? 'text-success' : score >= 6 ? 'text-primary' : score >= 4 ? 'text-warning' : 'text-destructive';
  const barColor =
    score >= 8 ? 'bg-success' : score >= 6 ? 'bg-primary' : score >= 4 ? 'bg-warning' : 'bg-destructive';

  return (
    <div className="space-y-1.5 animate-fade-in">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm font-medium text-foreground min-w-0">
          <span className="text-primary flex-shrink-0">{icon}</span>
          <span className="truncate">{label}</span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="w-24 h-2 bg-secondary rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${barColor} transition-all duration-700`}
              style={{ width: `${score * 10}%` }}
            />
          </div>
          <span className={`text-sm font-bold font-mono w-8 text-right ${color}`}>{score}/10</span>
        </div>
      </div>
      <p className="text-xs text-muted-foreground pl-6 leading-relaxed">{verdict}</p>
    </div>
  );
}

export function FundamentalsExpertCard({
  analysis,
  isLoading,
  error,
  symbol,
  onRun,
  hasStock,
}: FundamentalsExpertCardProps) {
  if (!hasStock) return null;

  const overallColor =
    analysis
      ? analysis.overallScore >= 8
        ? 'text-success'
        : analysis.overallScore >= 6
        ? 'text-primary'
        : analysis.overallScore >= 4
        ? 'text-warning'
        : 'text-destructive'
      : 'text-foreground';

  const overallBorder =
    analysis
      ? analysis.overallScore >= 8
        ? 'border-success/30 bg-success/5'
        : analysis.overallScore >= 6
        ? 'border-primary/30 bg-primary/5'
        : analysis.overallScore >= 4
        ? 'border-warning/30 bg-warning/5'
        : 'border-destructive/30 bg-destructive/5'
      : 'border-border/50';

  const dimensions: ScoreDimension[] = analysis
    ? [
        {
          label: 'Valuation',
          score: analysis.valuationScore,
          verdict: analysis.valuationVerdict,
          icon: <DollarSign className="h-3.5 w-3.5" />,
        },
        {
          label: 'Profitability',
          score: analysis.profitabilityScore,
          verdict: analysis.profitabilityVerdict,
          icon: <TrendingUp className="h-3.5 w-3.5" />,
        },
        {
          label: 'Growth',
          score: analysis.growthScore,
          verdict: analysis.growthVerdict,
          icon: <BarChart3 className="h-3.5 w-3.5" />,
        },
        {
          label: 'Financial Health',
          score: analysis.financialHealthScore,
          verdict: analysis.financialHealthVerdict,
          icon: <Activity className="h-3.5 w-3.5" />,
        },
        {
          label: 'Shareholder Value',
          score: analysis.shareholderValueScore,
          verdict: analysis.shareholderValueVerdict,
          icon: <Users className="h-3.5 w-3.5" />,
        },
      ]
    : [];

  return (
    <div className="glass-card p-6 space-y-5 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="bg-primary/10 p-2 rounded-lg">
          <Brain className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground flex items-center gap-1.5">
            Fundamentals Expert
            <Sparkles className="h-4 w-4 text-primary" />
          </h3>
          <p className="text-xs text-muted-foreground">AI-powered fundamental quality rating</p>
        </div>
      </div>

      {/* Not yet run — CTA */}
      {!analysis && !isLoading && !error && (
        <div className="text-center py-4 space-y-4">
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-20 h-20 rounded-full border-4 border-dashed border-primary/30 flex items-center justify-center">
                <Star className="h-8 w-8 text-primary/40" />
              </div>
              <div className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                ?
              </div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground max-w-[240px] mx-auto">
            Run a deep fundamental analysis of{' '}
            <span className="font-mono font-semibold text-foreground">{symbol}</span> across 6 key dimensions, scored 1–10.
          </p>
          <button
            onClick={onRun}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/25"
          >
            <Brain className="h-4 w-4" />
            Analyze Fundamentals
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Loading */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-8 gap-3">
          <Loader2 className="h-10 w-10 text-primary animate-spin" />
          <p className="text-sm text-muted-foreground animate-pulse font-medium">
            Expert is reading the fundamentals...
          </p>
          <p className="text-xs text-muted-foreground/70">Scoring across 6 dimensions</p>
        </div>
      )}

      {/* Error */}
      {error && !isLoading && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-destructive text-sm bg-destructive/10 px-4 py-3 rounded-lg">
            <AlertTriangle className="h-4 w-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
          <button
            onClick={onRun}
            className="w-full text-sm text-primary hover:underline"
          >
            Try again
          </button>
        </div>
      )}

      {/* Results */}
      {analysis && !isLoading && (
        <div className="space-y-5">
          {/* Overall Score Hero */}
          <div className={`rounded-xl border p-5 flex items-center gap-5 ${overallBorder}`}>
            <ScoreRing score={analysis.overallScore} size="lg" />
            <div className="min-w-0">
              <div className={`text-xl font-bold ${overallColor}`}>
                {analysis.overallScore >= 8
                  ? 'Excellent Fundamentals'
                  : analysis.overallScore >= 6
                  ? 'Good Fundamentals'
                  : analysis.overallScore >= 4
                  ? 'Mixed Fundamentals'
                  : 'Weak Fundamentals'}
              </div>
              <div className="text-xs text-muted-foreground mt-0.5">
                Overall score for{' '}
                <span className="font-mono font-semibold text-foreground">{symbol}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed line-clamp-3">
                {analysis.expertSummary}
              </p>
            </div>
          </div>

          {/* Dimension Scores */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground">Dimension Breakdown</h4>
            {dimensions.map((d) => (
              <DimensionRow key={d.label} {...d} />
            ))}
          </div>

          {/* Strengths & Concerns */}
          <div className="grid grid-cols-2 gap-3">
            <div className="glass-card p-4 space-y-2">
              <h4 className="text-xs font-semibold text-success flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5" />
                Strengths
              </h4>
              <ul className="space-y-1">
                {analysis.strengths.map((s, i) => (
                  <li key={i} className="text-xs text-muted-foreground flex items-start gap-1.5">
                    <span className="text-success mt-0.5 flex-shrink-0">•</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass-card p-4 space-y-2">
              <h4 className="text-xs font-semibold text-destructive flex items-center gap-1.5">
                <AlertTriangle className="h-3.5 w-3.5" />
                Concerns
              </h4>
              <ul className="space-y-1">
                {analysis.concerns.map((c, i) => (
                  <li key={i} className="text-xs text-muted-foreground flex items-start gap-1.5">
                    <span className="text-destructive mt-0.5 flex-shrink-0">•</span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Investor Profile */}
          <div className="glass-card p-4 flex items-start gap-3 border border-primary/20 bg-primary/5">
            <Users className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-foreground mb-0.5">Best Suited For</p>
              <p className="text-xs text-muted-foreground">{analysis.investorProfile}</p>
            </div>
          </div>

          {/* Re-run */}
          <button
            onClick={onRun}
            className="w-full text-xs text-muted-foreground hover:text-primary transition-colors flex items-center justify-center gap-1"
          >
            <Brain className="h-3 w-3" />
            Re-run analysis
          </button>
        </div>
      )}
    </div>
  );
}
