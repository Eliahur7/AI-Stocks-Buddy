import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { fundamentals } = await req.json();

    if (!fundamentals || !fundamentals.symbol) {
      return new Response(
        JSON.stringify({ error: 'Missing stock fundamentals data' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const apiKey = Deno.env.get('GEMINI_API_KEY');

    // Fallback scoring when no API key is configured
    if (!apiKey) {
      console.warn('GEMINI_API_KEY not found. Using local fallback scoring for Fundamentals Expert.');
      const fallback = computeLocalScore(fundamentals);
      return new Response(
        JSON.stringify(fallback),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const prompt = `
You are the world's foremost Fundamentals Expert — a veteran analyst who has read thousands of financial reports, income statements, balance sheets, and cash flow statements. Your sole job is to evaluate a company's fundamental quality and assign precise, honest scores.

You will analyze the following company:

Company: ${fundamentals.companyName} (${fundamentals.symbol})
Sector: ${fundamentals.sector} | Industry: ${fundamentals.industry}
Price: $${fundamentals.price} | Market Cap: $${(fundamentals.marketCap / 1e9).toFixed(2)}B

--- VALUATION ---
P/E Ratio: ${fundamentals.peRatio}
Forward P/E: ${fundamentals.forwardPE}
PEG Ratio: ${fundamentals.pegRatio}
Price-to-Book: ${fundamentals.priceToBook}
Price-to-Sales: ${fundamentals.priceToSales}

--- PROFITABILITY ---
EPS: $${fundamentals.eps}
Net Margin: ${fundamentals.netMargin}%
Gross Margin: ${fundamentals.grossMargin}%
Operating Margin: ${fundamentals.operatingMargin}%
ROE: ${fundamentals.roe}%
ROA: ${fundamentals.roa}%

--- GROWTH ---
EPS Growth (YoY): ${fundamentals.epsGrowth}%
Revenue Growth (YoY): ${fundamentals.revenueGrowth}%
Revenue: $${(fundamentals.revenue / 1e9).toFixed(2)}B

--- FINANCIAL HEALTH ---
Debt-to-Equity: ${fundamentals.debtToEquity}
Current Ratio: ${fundamentals.currentRatio}
Beta: ${fundamentals.beta}

--- SHAREHOLDER RETURNS ---
Dividend Yield: ${fundamentals.dividendYield}%
Payout Ratio: ${fundamentals.payoutRatio}%

Your task:
Score the company from 1 (worst) to 10 (best) on each of the following six fundamental dimensions. Be brutally honest, sector-aware, and compare to industry peers. A score of 10 is reserved for exceptional companies.

1. **Valuation Score** — Is the stock cheap or expensive relative to fundamentals and growth? (consider PE, PEG, P/B, P/S in context of sector)
2. **Profitability Score** — How strong are margins and returns? (net margin, gross margin, ROE, ROA)
3. **Growth Score** — Are revenues and earnings growing at a compelling rate?
4. **Financial Health Score** — Is the balance sheet solid? (debt/equity, current ratio, liquidity)
5. **Shareholder Value Score** — Does management return value? (dividends, buybacks implied by payoutRatio, sustainable capital allocation)
6. **Overall Fundamentals Score** — Your holistic 1-10 rating of this company's fundamental quality. This should NOT be a simple average — weight what matters most.

Then provide:
- A 2-3 sentence verdict per dimension explaining your score
- A 3-4 sentence overall expert summary
- 3 key fundamental strengths (one phrase each)
- 3 key fundamental concerns (one phrase each)
- A recommended investor profile: who should own this stock? (e.g., "Growth investors with 3-5 year horizon", "Income-focused retirees", "Speculative traders only")

Respond EXACTLY as a valid JSON object with this structure (no markdown, no extra text):
{
  "valuationScore": 7,
  "profitabilityScore": 9,
  "growthScore": 8,
  "financialHealthScore": 6,
  "shareholderValueScore": 5,
  "overallScore": 8,
  "valuationVerdict": "...",
  "profitabilityVerdict": "...",
  "growthVerdict": "...",
  "financialHealthVerdict": "...",
  "shareholderValueVerdict": "...",
  "expertSummary": "...",
  "strengths": ["strength 1", "strength 2", "strength 3"],
  "concerns": ["concern 1", "concern 2", "concern 3"],
  "investorProfile": "..."
}`;

    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.15 },
        }),
      }
    );

    if (!geminiResponse.ok) {
      const errorText = await geminiResponse.text();
      console.error('Gemini API Error:', errorText);
      // Fall back to local scoring rather than failing
      const fallback = computeLocalScore(fundamentals);
      return new Response(
        JSON.stringify(fallback),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await geminiResponse.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      throw new Error('Unexpected response format from Gemini API');
    }

    const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const result = JSON.parse(cleanText);

    return new Response(
      JSON.stringify(result),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in fundamentals-expert:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to generate fundamentals analysis' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

// Local rule-based scoring used as a fallback when GEMINI_API_KEY is not set
function computeLocalScore(f: Record<string, number | string>) {
  const pe = Number(f.peRatio) || 0;
  const peg = Number(f.pegRatio) || 0;
  const pb = Number(f.priceToBook) || 0;
  const netMargin = Number(f.netMargin) || 0;
  const grossMargin = Number(f.grossMargin) || 0;
  const roe = Number(f.roe) || 0;
  const roa = Number(f.roa) || 0;
  const epsGrowth = Number(f.epsGrowth) || 0;
  const revGrowth = Number(f.revenueGrowth) || 0;
  const dte = Number(f.debtToEquity) || 0;
  const cr = Number(f.currentRatio) || 0;
  const divYield = Number(f.dividendYield) || 0;
  const payoutRatio = Number(f.payoutRatio) || 0;

  // Valuation score
  let valuation = 5;
  if (pe > 0 && pe < 15) valuation += 2;
  else if (pe > 0 && pe < 25) valuation += 1;
  else if (pe > 50) valuation -= 2;
  if (peg > 0 && peg < 1.5) valuation += 2;
  else if (peg > 3) valuation -= 1;
  if (pb < 2) valuation += 1;
  else if (pb > 15) valuation -= 1;
  valuation = Math.min(10, Math.max(1, Math.round(valuation)));

  // Profitability score
  let profitability = 5;
  if (netMargin > 25) profitability += 3;
  else if (netMargin > 15) profitability += 2;
  else if (netMargin > 5) profitability += 1;
  else if (netMargin < 0) profitability -= 3;
  if (roe > 25) profitability += 2;
  else if (roe < 0) profitability -= 2;
  if (grossMargin > 50) profitability += 1;
  profitability = Math.min(10, Math.max(1, Math.round(profitability)));

  // Growth score
  let growth = 5;
  if (epsGrowth > 50) growth += 3;
  else if (epsGrowth > 20) growth += 2;
  else if (epsGrowth > 5) growth += 1;
  else if (epsGrowth < 0) growth -= 2;
  if (revGrowth > 20) growth += 2;
  else if (revGrowth > 5) growth += 1;
  else if (revGrowth < 0) growth -= 2;
  growth = Math.min(10, Math.max(1, Math.round(growth)));

  // Financial health score
  let health = 5;
  if (cr > 2) health += 2;
  else if (cr > 1.5) health += 1;
  else if (cr < 1 && cr > 0) health -= 2;
  if (dte < 30) health += 2;
  else if (dte < 80) health += 1;
  else if (dte > 200) health -= 2;
  health = Math.min(10, Math.max(1, Math.round(health)));

  // Shareholder value score
  let shareholder = 5;
  if (divYield > 3) shareholder += 2;
  else if (divYield > 1) shareholder += 1;
  if (payoutRatio > 0 && payoutRatio < 60) shareholder += 1;
  else if (payoutRatio > 100) shareholder -= 2;
  if (roe > 20) shareholder += 1;
  shareholder = Math.min(10, Math.max(1, Math.round(shareholder)));

  // Overall score — weighted
  const overall = Math.min(10, Math.max(1, Math.round(
    valuation * 0.20 +
    profitability * 0.25 +
    growth * 0.25 +
    health * 0.20 +
    shareholder * 0.10
  )));

  return {
    valuationScore: valuation,
    profitabilityScore: profitability,
    growthScore: growth,
    financialHealthScore: health,
    shareholderValueScore: shareholder,
    overallScore: overall,
    valuationVerdict: `(Fallback) P/E of ${pe.toFixed(1)} and PEG of ${peg.toFixed(2)} suggest ${valuation >= 6 ? 'reasonable' : 'stretched'} valuation relative to peers.`,
    profitabilityVerdict: `(Fallback) Net margin of ${netMargin.toFixed(1)}% and ROE of ${roe.toFixed(1)}% indicate ${profitability >= 6 ? 'strong' : 'weak'} profitability.`,
    growthVerdict: `(Fallback) EPS growth of ${epsGrowth.toFixed(1)}% and revenue growth of ${revGrowth.toFixed(1)}% reflect ${growth >= 6 ? 'solid' : 'modest'} expansion.`,
    financialHealthVerdict: `(Fallback) Debt-to-equity of ${dte.toFixed(1)} and current ratio of ${cr.toFixed(2)} indicate ${health >= 6 ? 'sound' : 'stressed'} financial health.`,
    shareholderValueVerdict: `(Fallback) Dividend yield of ${divYield.toFixed(2)}% with payout ratio of ${payoutRatio.toFixed(1)}% signals ${shareholder >= 6 ? 'disciplined' : 'limited'} shareholder returns.`,
    expertSummary: `(Fallback — set GEMINI_API_KEY in Supabase for full AI analysis) Based on available fundamentals, ${f.companyName} scores ${overall}/10 overall. Key drivers include ${profitability >= 6 ? 'solid profitability' : 'margin pressure'} and ${growth >= 6 ? 'healthy growth trajectory' : 'subdued growth prospects'}.`,
    strengths: [
      netMargin > 15 ? `Strong net margin of ${netMargin.toFixed(1)}%` : `Revenue base of $${(Number(f.revenue) / 1e9).toFixed(1)}B`,
      roe > 15 ? `High ROE of ${roe.toFixed(1)}%` : `Current ratio of ${cr.toFixed(2)}x`,
      revGrowth > 10 ? `Revenue growing ${revGrowth.toFixed(1)}% YoY` : `Established market position`
    ],
    concerns: [
      pe > 40 ? `Elevated P/E of ${pe.toFixed(1)}x` : `Limited valuation upside`,
      dte > 100 ? `High debt-to-equity ratio (${dte.toFixed(1)})` : `Execution risk`,
      epsGrowth < 0 ? `Declining EPS (${epsGrowth.toFixed(1)}%)` : `Macro sensitivity`
    ],
    investorProfile: overall >= 7
      ? 'Growth or quality-focused investors with a medium to long-term horizon'
      : overall >= 5
      ? 'Value-oriented investors willing to accept near-term uncertainty'
      : 'Speculative investors only — high risk, not suitable for risk-averse portfolios'
  };
}
