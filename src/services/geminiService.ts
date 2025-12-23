// ============================================================
// GICC - Gemini AI Service
// Integration with Google's Generative AI
// ============================================================

import { GoogleGenerativeAI } from "@google/generative-ai";
import { AnalysisParams, AnalysisResult } from "../types";

const SYSTEM_INSTRUCTION = `
System Role: Institutional Global Macro Strategist & Research Analyst.

**CORE DIRECTIVE:**
You are an advanced AI Analyst for the Global Intelligence Command Center (GICC). You must generate a "Chain of Thought" first, then a structured JSON output that contains specific decision-support data, and finally the written report.

**OUTPUT FORMAT:**
You must provide your response in a very specific format.
1. <thinking> ... </thinking> (Your internal planning - be thorough)
2. <json> ... </json> (The structured data for charts/debate/matrix)
3. The Markdown Report (The standard text analysis)

**JSON STRUCTURE (Inside <json> tags):**
{
  "warRoom": {
    "bullCase": ["Point 1", "Point 2", "Point 3"],
    "bearCase": ["Point 1", "Point 2", "Point 3"],
    "bullScore": 65,
    "bearScore": 35,
    "verdict": "Strategic synthesis and recommendation..."
  },
  "impactMatrix": [
    { "assetClass": "Crypto", "signal": "Positive", "reasoning": "..." },
    { "assetClass": "Bonds", "signal": "Negative", "reasoning": "..." },
    { "assetClass": "Real Estate", "signal": "Neutral", "reasoning": "..." }
  ],
  "smartChart": {
    "title": "Representative Trend Analysis",
    "type": "line",
    "xAxisLabel": "Time",
    "yAxisLabel": "Value",
    "description": "Chart description explaining the narrative",
    "data": [
       { "label": "Q1", "value": 100, "annotation": "Event X happened" },
       { "label": "Q2", "value": 110 },
       { "label": "Q3", "value": 105, "annotation": "Correction" },
       { "label": "Q4", "value": 120 }
    ]
  }
}

**REPORT WRITING RULES (The Text Part):**
1. **Tone:** Hedge-fund style, objective, professional
2. **Structure:** Executive Summary, Macro Data Analysis, Correlation Nexus, Key Risk Vectors, Strategic Verdict
3. **Citations:** Reference sources with [1], [2], etc.
4. **Data Tables:** Include relevant data comparisons
5. **Language:** Write in the requested language (Somali or English)
`;

// --- Demo Response for DEMO mode ---
const getDemoResponse = (params: AnalysisParams): AnalysisResult => {
    const query = params.query || "Global Macro Outlook";

    return {
        text: `
# 🌍 Global Macro Strategy: ${query}
**Date:** ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
**Classification:** Institutional Alpha | High Sensitivity
**Analyst:** GICC AI Engine v1.0

---

## 1. Executive Summary

The global economy is currently navigating a complex environment characterized by structural inflation concerns, geopolitical fragmentation, and divergent monetary policy paths. Our proprietary models indicate a **62% probability** of continued disinflation without major labor market disruption, though the "last mile" of inflation (from 3% to 2%) will prove stickier than consensus.

### Key Strategic Takeaways:
* **Monetary Policy:** Major central banks (Fed, ECB, BoE) are likely done hiking, but cuts will be pushed to late 2025
* **Geopolitics:** Regional fragmentation (Red Sea, Eastern Europe, Taiwan Strait) creating structural inflation floor
* **Asset Allocation:** Pivot from "Cash is King" to "Quality Duration" in fixed income

---

## 2. Macro Data Dashboard

| Indicator | Current | Consensus | YoY Δ | Signal |
|:----------|:--------|:----------|:------|:-------|
| **US GDP Real** | 2.1% | 1.8% | +0.3% | ✅ Resilient |
| **Core PCE** | 2.8% | 2.9% | -1.1% | ⚠️ Sticky |
| **China Mfg PMI** | 49.2 | 50.0 | -2.1% | 🔻 Contraction |
| **Brent Crude** | $78.50 | $82.00 | -5.4% | ⚖️ Neutral |
| **10Y Treasury** | 4.15% | 4.00% | +15bps | ⚠️ Tightening |
| **VIX** | 14.2 | 16.0 | -25% | ✅ Complacency |

> **Critical Note:** Divergence between US service sector strength and Chinese manufacturing weakness defines the macro narrative.

---

## 3. The Correlation Nexus

Analysis of **${query}** reveals significant cross-asset sensitivities:

### A. Yield Curve Dynamics
The 2s10s curve remains inverted (-35bps), traditionally a recession signal. However, bear steepening suggests bond market pricing in "soft landing."

### B. Commodity Supercycle Thesis
While energy remains range-bound, industrial metals (Cu, Li) show breakout potential driven by "Green Capex" cycle.

**Key Correlations:**
- **USD vs. EM Equities:** -0.68 (Strong Inverse)
- **Oil vs. Breakeven Inflation:** +0.82 (High Sensitivity)
- **Tech vs. Real Rates:** -0.45 (Moderate Sensitivity)

---

## 4. Risk Vectors

1. **Supply Chain 2.0:** Panama/Suez disruption adding ~15% to shipping costs
2. **Credit Wall:** $500B corporate debt maturing in 2025 at 5%+ rates
3. **Fiscal Dominance:** Election year spending preventing fiscal drag
4. **Geopolitical Shock:** 25% probability of major escalation

---

## 5. Strategic Verdict

**OVERWEIGHT:**
* Investment Grade Credit (5.5% yield, limited default risk)
* Japan Equities (governance reform + currency tailwind)
* Gold (hedge against tail risks)

**UNDERWEIGHT:**
* European Industrials (energy cost disadvantage)
* Commercial Real Estate (cap rate expansion)
* High-Yield Credit (spread compression overdone)

---

*Report generated by GICC AI Engine | Demo Mode*
    `,
        groundingChunks: [
            { web: { uri: "https://bloomberg.com/markets", title: "Bloomberg Markets Overview" } },
            { web: { uri: "https://wsj.com/economy", title: "WSJ Economic Data" } },
            { web: { uri: "https://ft.com/global-economy", title: "FT Global Economy" } },
            { web: { uri: "https://imf.org/outlook", title: "IMF World Economic Outlook" } }
        ],
        warRoom: {
            bullCase: [
                "AI-driven productivity surge boosts corporate margins globally",
                "Immigration solves labor supply constraints in developed markets",
                "Household balance sheets remain historically strong",
                "Central bank credibility maintained → inflation expectations anchored"
            ],
            bearCase: [
                "Second wave of inflation via shipping cost pass-through",
                "Commercial Real Estate refinancing cliff triggers credit event",
                "Geopolitical error triggers oil shock ($100+ Brent)",
                "China deflation exports depresses global growth"
            ],
            bullScore: 62,
            bearScore: 38,
            verdict: "Cautiously Accumulate Risk Assets (Focus on Quality & Duration)"
        },
        impactMatrix: [
            { assetClass: "US Tech (Nasdaq)", signal: "Positive", reasoning: "Earnings growth outpaces rate headwinds; AI monetization accelerating" },
            { assetClass: "Govt Bonds (10Y)", signal: "Tailwind", reasoning: "Peak rates reached; asymmetric downside protection" },
            { assetClass: "Real Estate (Office)", signal: "Negative", reasoning: "Structural vacancy + refinancing risks persist" },
            { assetClass: "Gold / Precious", signal: "Positive", reasoning: "Central bank demand + geopolitical hedge" },
            { assetClass: "Emerging Markets", signal: "Caution", reasoning: "Strong USD remains significant headwind" },
            { assetClass: "Crypto (BTC/ETH)", signal: "Positive", reasoning: "ETF flows + halving cycle support" }
        ],
        smartChart: {
            title: "Global Liquidity vs. Risk Assets",
            type: "line",
            xAxisLabel: "Timeline (Months)",
            yAxisLabel: "Index (Normalized)",
            description: "Correlation between Central Bank net liquidity and equity performance suggests risk-on environment ahead.",
            data: [
                { label: "Jan", value: 100, annotation: "Fed Pause" },
                { label: "Feb", value: 102 },
                { label: "Mar", value: 98, annotation: "Banking Stress" },
                { label: "Apr", value: 105 },
                { label: "May", value: 110 },
                { label: "Jun", value: 108 },
                { label: "Jul", value: 115, annotation: "Soft Landing Narrative" },
                { label: "Aug", value: 112 },
                { label: "Sep", value: 118 },
                { label: "Oct", value: 122, annotation: "Election Rally" }
            ]
        }
    };
};

// --- Main API Function ---
export const generateAnalysis = async (params: AnalysisParams): Promise<AnalysisResult> => {
    // Get API Key
    let apiKey = import.meta.env.VITE_API_KEY || import.meta.env.API_KEY || "";
    apiKey = apiKey.trim();

    // Check for missing key
    if (!apiKey) {
        console.warn("⚠️ API Key missing, falling back to DEMO mode");
        apiKey = "DEMO";
    }

    // Demo Mode
    if (apiKey === "DEMO" || apiKey === "") {
        console.log("🎮 DEMO MODE: Simulating AI response (3s delay)...");
        await new Promise(resolve => setTimeout(resolve, 3000));
        return getDemoResponse(params);
    }

    // Real API Call
    console.log(`🚀 Starting Real Analysis with Model: ${params.selectedModel}`);

    try {
        const genAI = new GoogleGenerativeAI(apiKey);

        const model = genAI.getGenerativeModel({
            model: params.selectedModel || 'gemini-2.0-flash',
            systemInstruction: SYSTEM_INSTRUCTION
        });

        const riskList = params.riskFocus.length > 0 ? params.riskFocus.join(", ") : "General Macro Risks";
        const countryList = params.countryFocus.length > 0 ? params.countryFocus.join(", ") : "Global";
        const assetList = params.assetFocus.length > 0 ? params.assetFocus.join(", ") : "Multi-asset";

        let topicDescription = `**Primary Topic:** ${params.query || "Global Macro Outlook"}`;
        if (params.secondaryQuery) {
            topicDescription += `\n**Secondary Topic:** ${params.secondaryQuery}`;
        }

        const prompt = `
      **AGENTIC RESEARCH REQUEST**
      
      **TOPIC DOSSIER:**
      ${topicDescription}
      
      **Scope & Lenses:**
      - Region: ${countryList}
      - Assets: ${assetList}
      - Horizon: ${params.horizon}
      - Risks: ${riskList}
      - Language: ${params.language}
      
      **Task:**
      1. PLAN inside <thinking>.
      2. GENERATE JSON inside <json> for the War Room, Impact Matrix, and Smart Chart.
      3. WRITE the full markdown report in ${params.language}.
    `;

        console.log("📤 Sending Prompt to Gemini...");
        const result = await model.generateContent(prompt);
        const response = await result.response;
        let fullText = response.text() || "No analysis generated.";

        console.log("✅ Response received. Length:", fullText.length);

        // Extract Thinking (Log only)
        const thinkingMatch = fullText.match(/<thinking>([\s\S]*?)<\/thinking>/);
        if (thinkingMatch) {
            console.log("🧠 AGENT THINKING:", thinkingMatch[1].trim().substring(0, 200) + "...");
            fullText = fullText.replace(/<thinking>[\s\S]*?<\/thinking>/, "").trim();
        }

        // Extract JSON
        let parsedJson: any = {};
        const jsonMatch = fullText.match(/<json>([\s\S]*?)<\/json>/);
        if (jsonMatch) {
            try {
                parsedJson = JSON.parse(jsonMatch[1].trim());
                fullText = fullText.replace(/<json>[\s\S]*?<\/json>/, "").trim();
                console.log("✅ JSON Data Extracted Successfully");
            } catch (e) {
                console.error("❌ Failed to parse JSON segment", e);
            }
        } else {
            console.warn("⚠️ No <json> tag found in response");
        }

        // @ts-ignore - Get grounding metadata if available
        const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

        return {
            text: fullText,
            groundingChunks,
            warRoom: parsedJson.warRoom,
            impactMatrix: parsedJson.impactMatrix,
            smartChart: parsedJson.smartChart
        };

    } catch (error: any) {
        console.error("❌ Gemini API Error:", error);
        throw new Error(error.message || "Failed to contact AI service. Please try again.");
    }
};
