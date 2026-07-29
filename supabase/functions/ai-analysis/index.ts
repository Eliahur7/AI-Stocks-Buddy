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
    if (!apiKey) {
      // Fallback for when API key is not configured - simulate an AI response
      console.warn('GEMINI_API_KEY not found. Using fallback analysis.');
      
      let recommendation = 'hold';
      if (fundamentals.peRatio < 20 && fundamentals.epsGrowth > 10) recommendation = 'buy';
      if (fundamentals.peRatio > 50 && fundamentals.epsGrowth < 5) recommendation = 'sell';
      
      const fallbackResponse = {
        recommendation,
        confidence: 75,
        reasons: ['Attractive valuation metrics (fallback)', 'Steady historical growth (fallback)'],
        risks: ['General market volatility (fallback)', 'Sector headwinds (fallback)'],
        summary: `(Fallback Analysis - Set GEMINI_API_KEY in Supabase) Based on the current fundamentals, ${fundamentals.companyName} (${fundamentals.symbol}) shows interesting characteristics. The PE ratio is ${fundamentals.peRatio} with an EPS growth of ${fundamentals.epsGrowth}%.`
      };
      
      return new Response(
        JSON.stringify(fallbackResponse),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Call Google Gemini API
    const prompt = `
You are an expert AI financial analyst. Analyze the following stock fundamentals and provide a recommendation.
Company: ${fundamentals.companyName} (${fundamentals.symbol})
Sector: ${fundamentals.sector}
Industry: ${fundamentals.industry}
Price: $${fundamentals.price}
Market Cap: $${fundamentals.marketCap}
P/E Ratio: ${fundamentals.peRatio}
Forward P/E: ${fundamentals.forwardPE}
EPS: ${fundamentals.eps}
EPS Growth: ${fundamentals.epsGrowth}%
Revenue Growth: ${fundamentals.revenueGrowth}%
Net Margin: ${fundamentals.netMargin}%
Debt to Equity: ${fundamentals.debtToEquity}
Dividend Yield: ${fundamentals.dividendYield}%
Beta: ${fundamentals.beta}

Based on this data, provide:
1. A recommendation (strictly one of: 'buy', 'hold', 'sell')
2. A confidence score (0 to 100)
3. 2-4 brief bullet points of reasons (bullish factors)
4. 2-4 brief bullet points of risks (bearish factors)
5. A cohesive summary paragraph of the analysis (3-4 sentences)

Format your response EXACTLY as a valid JSON object matching this structure:
{
  "recommendation": "buy/hold/sell",
  "confidence": 85,
  "reasons": ["reason 1", "reason 2"],
  "risks": ["risk 1", "risk 2"],
  "summary": "Your detailed summary paragraph here."
}
Do not include markdown blocks or any other text, just the raw JSON.`;

    const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.2,
        }
      })
    });

    if (!geminiResponse.ok) {
      const errorData = await geminiResponse.text();
      console.error('Gemini API Error:', errorData);
      throw new Error('Failed to fetch from Gemini API');
    }

    const data = await geminiResponse.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!text) {
      throw new Error('Unexpected response format from Gemini API');
    }

    // Parse the JSON from the text
    const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const result = JSON.parse(cleanText);

    return new Response(
      JSON.stringify(result),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in AI analysis:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to generate AI analysis' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
