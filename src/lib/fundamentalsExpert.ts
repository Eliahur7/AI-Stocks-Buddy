import { StockFundamentals, FundamentalsExpertAnalysis } from '@/types/stock';

/**
 * Local Fundamentals Expert scoring engine.
 *
 * Mirrors the logic in supabase/functions/fundamentals-expert/index.ts
 * so analysis always works even without a deployed edge function or API key.
 *
 * Scoring philosophy (industry standard):
 *   1  = deeply troubled / speculative pre-revenue
 *   4  = below average, meaningful concerns
 *   6  = adequate, sector-typical
 *   8  = strong, top-quartile
 *  10  = exceptional (reserved for best-in-class)
 */
export function scoreFundamentalsLocally(stock: StockFundamentals): FundamentalsExpertAnalysis {
  const {
    peRatio, pegRatio, priceToBook, priceToSales,
    netMargin, grossMargin, operatingMargin, roe, roa,
    epsGrowth, revenueGrowth,
    debtToEquity, currentRatio, beta,
    dividendYield, payoutRatio,
    companyName, symbol, sector,
  } = stock;

  // ── 1. VALUATION ───────────────────────────────────────────────────────────
  let valuation = 5;
  // P/E analysis (sector-sensitive heuristics)
  if (peRatio > 0 && peRatio < 12)       valuation += 2.5;
  else if (peRatio > 0 && peRatio < 20)  valuation += 1.5;
  else if (peRatio > 0 && peRatio < 35)  valuation += 0;
  else if (peRatio > 50)                 valuation -= 1.5;
  else if (peRatio < 0)                  valuation -= 1;   // negative EPS

  // PEG — growth-adjusted value signal
  if (pegRatio > 0 && pegRatio < 1)      valuation += 2;
  else if (pegRatio > 0 && pegRatio < 1.5) valuation += 1;
  else if (pegRatio > 3)                 valuation -= 1.5;

  // P/B
  if (priceToBook > 0 && priceToBook < 1.5)  valuation += 1;
  else if (priceToBook > 10)                  valuation -= 0.5;

  // P/S
  if (priceToSales > 0 && priceToSales < 2)  valuation += 0.5;
  else if (priceToSales > 20)                valuation -= 1;

  valuation = clamp(valuation, 1, 10);

  // ── 2. PROFITABILITY ───────────────────────────────────────────────────────
  let profitability = 5;

  if (netMargin > 30)       profitability += 3;
  else if (netMargin > 20)  profitability += 2;
  else if (netMargin > 10)  profitability += 1;
  else if (netMargin > 0)   profitability += 0;
  else if (netMargin < -50) profitability -= 3;
  else if (netMargin < 0)   profitability -= 2;

  if (grossMargin > 70)       profitability += 1.5;
  else if (grossMargin > 40)  profitability += 0.5;
  else if (grossMargin < 10 && grossMargin > 0) profitability -= 0.5;

  if (roe > 30)     profitability += 1.5;
  else if (roe > 15) profitability += 0.5;
  else if (roe < 0)  profitability -= 1.5;

  if (roa > 15)     profitability += 0.5;
  else if (roa < 0) profitability -= 0.5;

  profitability = clamp(profitability, 1, 10);

  // ── 3. GROWTH ──────────────────────────────────────────────────────────────
  let growth = 5;

  if (epsGrowth > 100)      growth += 3.5;
  else if (epsGrowth > 30)  growth += 2.5;
  else if (epsGrowth > 10)  growth += 1.5;
  else if (epsGrowth > 0)   growth += 0.5;
  else if (epsGrowth < -30) growth -= 3;
  else if (epsGrowth < 0)   growth -= 1.5;

  if (revenueGrowth > 30)      growth += 2;
  else if (revenueGrowth > 15) growth += 1;
  else if (revenueGrowth > 5)  growth += 0.5;
  else if (revenueGrowth < 0)  growth -= 1.5;

  growth = clamp(growth, 1, 10);

  // ── 4. FINANCIAL HEALTH ────────────────────────────────────────────────────
  let health = 5;

  if (currentRatio > 3)          health += 2;
  else if (currentRatio > 2)     health += 1.5;
  else if (currentRatio > 1.5)   health += 1;
  else if (currentRatio > 1)     health += 0;
  else if (currentRatio > 0 && currentRatio < 1) health -= 2;

  if (debtToEquity < 20)       health += 2;
  else if (debtToEquity < 50)  health += 1;
  else if (debtToEquity < 100) health += 0;
  else if (debtToEquity > 200) health -= 1.5;
  else if (debtToEquity > 300) health -= 2.5;

  // Beta: high beta = more risk = lower health score
  if (beta > 2.5)      health -= 1;
  else if (beta > 1.5) health -= 0.5;
  else if (beta < 0.8) health += 0.5;

  health = clamp(health, 1, 10);

  // ── 5. SHAREHOLDER VALUE ───────────────────────────────────────────────────
  let shareholder = 5;

  if (dividendYield > 4)       shareholder += 2;
  else if (dividendYield > 2)  shareholder += 1.5;
  else if (dividendYield > 0.5) shareholder += 0.5;

  // Sustainable payout ratio
  if (payoutRatio > 0 && payoutRatio < 40)    shareholder += 1;
  else if (payoutRatio > 0 && payoutRatio < 70) shareholder += 0;
  else if (payoutRatio > 100)                  shareholder -= 2;

  // High ROE signals good capital allocation even without dividends
  if (roe > 25) shareholder += 1;

  shareholder = clamp(shareholder, 1, 10);

  // ── 6. OVERALL (weighted, not a simple average) ────────────────────────────
  const overall = clamp(Math.round(
    profitability * 0.25 +
    growth        * 0.25 +
    health        * 0.20 +
    valuation     * 0.20 +
    shareholder   * 0.10
  ), 1, 10);

  // ── Verdicts ───────────────────────────────────────────────────────────────
  const valuationVerdict = peRatio > 0
    ? `P/E of ${peRatio.toFixed(1)}x ${peRatio < 20 ? 'is below market average, indicating reasonable value' : peRatio > 40 ? 'is elevated — growth expectations are baked in' : 'sits in a moderate range'}. PEG of ${pegRatio.toFixed(2)} ${pegRatio > 0 && pegRatio < 1.5 ? 'suggests fair value relative to growth' : 'signals the stock may be rich relative to its growth rate'}.`
    : `Negative or missing earnings make traditional valuation multiples unreliable at this stage. Price-to-sales of ${priceToSales.toFixed(1)}x is the primary anchor.`;

  const profitabilityVerdict = `Net margin of ${netMargin.toFixed(1)}% and gross margin of ${grossMargin.toFixed(1)}% are ${netMargin > 20 ? 'exceptional' : netMargin > 10 ? 'solid' : netMargin > 0 ? 'modest' : 'negative — the company is not yet profitable'}. ROE of ${roe.toFixed(1)}% ${roe > 20 ? 'demonstrates excellent return on shareholder capital' : roe > 0 ? 'is adequate' : 'is negative, reflecting losses'}.`;

  const growthVerdict = `EPS growth of ${epsGrowth.toFixed(1)}% and revenue growth of ${revenueGrowth.toFixed(1)}% ${epsGrowth > 30 ? 'are exceptional — the company is compounding rapidly' : epsGrowth > 10 ? 'indicate healthy expansion' : epsGrowth < 0 ? 'raise concerns about earnings trajectory' : 'are modest but stable'}.`;

  const financialHealthVerdict = `Debt-to-equity of ${debtToEquity.toFixed(1)} ${debtToEquity < 50 ? 'signals a clean balance sheet' : debtToEquity > 200 ? 'is high and warrants monitoring' : 'is moderate'}. Current ratio of ${currentRatio.toFixed(2)} ${currentRatio > 1.5 ? 'indicates strong short-term liquidity' : currentRatio > 1 ? 'is adequate' : 'may create near-term liquidity pressure'}.`;

  const shareholderValueVerdict = dividendYield > 0
    ? `Dividend yield of ${dividendYield.toFixed(2)}% with a ${payoutRatio.toFixed(0)}% payout ratio ${payoutRatio < 60 ? 'is well-covered and sustainable' : 'may be stretched'}. ROE of ${roe.toFixed(1)}% supports overall capital efficiency.`
    : `No dividend is paid — capital is being retained or reinvested. For a growth-stage company this is appropriate; income investors should look elsewhere.`;

  // ── Expert summary ─────────────────────────────────────────────────────────
  const qualityLabel = overall >= 8 ? 'high-quality' : overall >= 6 ? 'solid' : overall >= 4 ? 'mixed-quality' : 'lower-quality';
  const expertSummary = `${companyName} (${symbol}) is a ${qualityLabel} business in the ${sector} sector, scoring ${overall}/10 on overall fundamental quality. ${profitability >= 7 ? 'Profitability stands out as a key strength. ' : profitability <= 4 ? 'Profitability is a primary area of concern. ' : ''}${growth >= 7 ? 'Growth momentum is impressive and supports a premium. ' : growth <= 4 ? 'Growth has been subdued and needs to accelerate. ' : ''}${health <= 4 ? 'The balance sheet deserves close attention before committing capital.' : 'The balance sheet provides a reasonable foundation.'}`;

  // ── Strengths & concerns ───────────────────────────────────────────────────
  const strengths: string[] = [];
  const concerns: string[] = [];

  if (netMargin > 20)      strengths.push(`Strong net margin (${netMargin.toFixed(1)}%)`);
  if (grossMargin > 50)    strengths.push(`Wide gross margin (${grossMargin.toFixed(1)}%)`);
  if (epsGrowth > 30)      strengths.push(`High EPS growth (${epsGrowth.toFixed(1)}%)`);
  if (revenueGrowth > 20)  strengths.push(`Strong revenue growth (${revenueGrowth.toFixed(1)}%)`);
  if (roe > 20)            strengths.push(`Excellent ROE (${roe.toFixed(1)}%)`);
  if (currentRatio > 2)    strengths.push(`Strong liquidity (current ratio ${currentRatio.toFixed(2)})`);
  if (debtToEquity < 30)   strengths.push(`Low leverage (D/E ${debtToEquity.toFixed(1)})`);
  if (dividendYield > 2)   strengths.push(`Attractive dividend yield (${dividendYield.toFixed(2)}%)`);
  if (pegRatio > 0 && pegRatio < 1.5) strengths.push(`Attractive PEG ratio (${pegRatio.toFixed(2)})`);

  if (peRatio > 50)           concerns.push(`Elevated P/E ratio (${peRatio.toFixed(1)}x)`);
  if (netMargin < 0)          concerns.push(`Negative net margin (${netMargin.toFixed(1)}%)`);
  if (epsGrowth < 0)          concerns.push(`Declining EPS (${epsGrowth.toFixed(1)}%)`);
  if (revenueGrowth < 0)      concerns.push(`Shrinking revenue (${revenueGrowth.toFixed(1)}%)`);
  if (debtToEquity > 150)     concerns.push(`High leverage (D/E ${debtToEquity.toFixed(1)})`);
  if (currentRatio > 0 && currentRatio < 1) concerns.push(`Low current ratio (${currentRatio.toFixed(2)})`);
  if (beta > 2)               concerns.push(`High market volatility (beta ${beta.toFixed(2)})`);
  if (payoutRatio > 100)      concerns.push(`Unsustainable payout ratio (${payoutRatio.toFixed(0)}%)`);
  if (priceToSales > 15)      concerns.push(`Rich P/S ratio (${priceToSales.toFixed(1)}x)`);

  // Ensure at least 3 of each
  while (strengths.length < 3) {
    const fallbacks = [
      `Established position in ${sector}`,
      `Operational scale supports margins`,
      `Analyst coverage reflects market relevance`,
    ];
    strengths.push(fallbacks[strengths.length] ?? 'Sector resilience');
  }
  while (concerns.length < 3) {
    const fallbacks = [
      `Macro sensitivity and rate risk`,
      `Sector competition may compress margins`,
      `Execution risk on growth initiatives`,
    ];
    concerns.push(fallbacks[concerns.length] ?? 'General market risk');
  }

  // ── Investor profile ───────────────────────────────────────────────────────
  let investorProfile: string;
  if (overall >= 8 && dividendYield > 2) {
    investorProfile = 'Quality-income investors seeking reliable dividends and strong fundamentals';
  } else if (overall >= 8) {
    investorProfile = 'Quality-growth investors with a 3–5 year horizon comfortable with premium valuations';
  } else if (overall >= 6 && growth >= 7) {
    investorProfile = 'Growth-oriented investors who can tolerate volatility for above-average returns';
  } else if (overall >= 6) {
    investorProfile = 'Core/balanced investors looking for steady, market-rate compounding';
  } else if (overall >= 4) {
    investorProfile = 'Value-contrarian investors willing to wait for a catalyst or turn-around';
  } else {
    investorProfile = 'Speculative traders only — high risk, not suitable for risk-averse or income-focused portfolios';
  }

  return {
    valuationScore:       Math.round(valuation),
    profitabilityScore:   Math.round(profitability),
    growthScore:          Math.round(growth),
    financialHealthScore: Math.round(health),
    shareholderValueScore: Math.round(shareholder),
    overallScore: overall,
    valuationVerdict,
    profitabilityVerdict,
    growthVerdict,
    financialHealthVerdict,
    shareholderValueVerdict,
    expertSummary,
    strengths: strengths.slice(0, 3),
    concerns:  concerns.slice(0, 3),
    investorProfile,
  };
}

function clamp(val: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, val));
}
