// ============================================================
// GICC - Mock Data Generator
// Seeded pseudo-random generator for consistent data
// ============================================================

import {
    SectorID,
    SectorConfig,
    ScoreSet,
    IntelItem,
    RumorItem,
    RunData,
    RunType,
    RumorRiskLevel,
    DailySnapshot
} from '../types';
import {
    Zap,
    Globe,
    AlertTriangle,
    Cpu,
    Landmark,
    Factory,
    Ship,
    Activity,
    Flame
} from 'lucide-react';

// --- Sector Configuration ---
export const SECTORS: SectorConfig[] = [
    { id: 'CRYPTO', label: 'Crypto Sector', icon: Zap, color: 'text-purple-400', lightColor: 'text-purple-600' },
    { id: 'MACRO', label: 'Global Macro & Policy', icon: Globe, color: 'text-blue-400', lightColor: 'text-blue-600' },
    { id: 'GEOPOLITICS', label: 'Geopolitics & Conflicts', icon: AlertTriangle, color: 'text-red-400', lightColor: 'text-red-600' },
    { id: 'TECH', label: 'Tech & Innovation', icon: Cpu, color: 'text-cyan-400', lightColor: 'text-cyan-600' },
    { id: 'FINANCE', label: 'Financial System', icon: Landmark, color: 'text-green-400', lightColor: 'text-green-600' },
    { id: 'ENERGY', label: 'Energy Sector', icon: Flame, color: 'text-yellow-400', lightColor: 'text-yellow-600' },
    { id: 'INDUSTRIALS', label: 'Industrials & Materials', icon: Factory, color: 'text-orange-400', lightColor: 'text-orange-600' },
    { id: 'TRANSPORT', label: 'Transport & Logistics', icon: Ship, color: 'text-indigo-400', lightColor: 'text-indigo-600' },
    { id: 'HEALTHCARE', label: 'Healthcare', icon: Activity, color: 'text-pink-400', lightColor: 'text-pink-600' },
];

// --- Content Templates ---
const NEWS_TEMPLATES = [
    "Regulatory crackdown intensifies in {region}, impacting {sector} outlook.",
    "New supply chain bottlenecks emerge in {region} following {event}.",
    "Market volatility spikes as {sector} reacts to unexpected {event}.",
    "Major breakthrough in {sector} technology announced by leading firm.",
    "Institutional capital flows into {sector} reach yearly high.",
    "Central Bank signals policy shift affecting {sector} liquidity.",
    "Trade tensions escalate, threatening {sector} export volumes.",
    "Key infrastructure failure in {region} disrupts {sector} operations.",
    "Merger talks confirmed between top {sector} players.",
    "Analyst downgrade triggers sell-off in {sector} equities.",
    "Breaking: {sector} faces unprecedented regulatory scrutiny in {region}.",
    "Emerging market turmoil spreads to {sector} as {event} triggers panic.",
];

const RESEARCH_TEMPLATES = [
    "Deep Dive: The long-term impact of {event} on {sector} valuations.",
    "Q4 Outlook: Assessing structural risks in the {sector} market.",
    "Whitepaper: New methodology for pricing {sector} assets.",
    "Survey: Institutional sentiment towards {sector} shifts bearish.",
    "Analysis: Correlation breakdown between {sector} and macro indices.",
    "Strategic Report: {sector} positioning ahead of {event}.",
    "Risk Assessment: {sector} exposure to {region} developments.",
];

const RUMOR_CLAIMS = [
    "Insider sources suggest imminent insolvency of major player",
    "Unverified reports of a massive data breach at top firm",
    "Whispers of a surprise regulatory ban coming next week",
    "Leaked memos indicate CEO resignation is planned",
    "Market chatter about a secret merger deal in late stages",
    "Speculation regarding a new government stimulus package",
    "Rumors of a critical vulnerability in widely used protocol",
    "Anonymous tip suggests massive short position building",
    "Industry insider claims major partnership announcement imminent",
];

const REGIONS = ["Asia-Pacific", "Eurozone", "North America", "MENA Region", "Emerging Markets", "East Africa", "Horn of Africa"];
const EVENTS = ["inflation data", "election results", "cyberattack", "sanctions", "rate hike", "shortage", "trade war", "climate summit"];

// --- Seeded Random Generator ---
const createGenerator = (seed: string) => {
    let h = 2166136261 >>> 0;
    for (let i = 0; i < seed.length; i++) {
        h = Math.imul(h ^ seed.charCodeAt(i), 16777619);
    }
    return () => {
        h += h << 13;
        h ^= h >>> 7;
        h += h << 3;
        h ^= h >>> 17;
        return (h >>> 0) / 4294967296;
    };
};

const determineRunType = (hour: number): RunType => {
    if (hour < 10) return 'MORNING_BRIEF';
    if (hour < 16) return 'MIDDAY_UPDATE';
    return 'NIGHT_CAP';
};

const calculateRumorRisk = (score: number): RumorRiskLevel => {
    if (score >= 80) return 'CRITICAL';
    if (score >= 60) return 'HIGH';
    if (score >= 40) return 'MODERATE';
    return 'LOW';
};

// --- Main Generator Function ---
export const generateMockRun = (date: string, time: string, runId: string): RunData => {
    const hour = parseInt(time.split(':')[0]);
    const seed = `${date}-${runId}`;
    const rand = createGenerator(seed);

    const getRandInt = (min: number, max: number) => Math.floor(rand() * (max - min + 1)) + min;
    const getRandItem = <T,>(arr: T[]): T => arr[Math.floor(rand() * arr.length)];

    const mockScores: Record<string, ScoreSet> = {};
    let totalRisk = 0;

    // Generate Sector Scores
    SECTORS.forEach(s => {
        const risk = getRandInt(20, 95);
        totalRisk += risk;

        mockScores[s.id] = {
            momentum: getRandInt(10, 90),
            risk: risk,
            liquidity: getRandInt(30, 85),
            policy: getRandInt(15, 95),
            confidence: rand() > 0.4 ? 'HIGH' : (rand() > 0.2 ? 'MEDIUM' : 'LOW'),
            reasoning: `Algorithm detected ${getRandInt(2, 5)} sigma move in ${s.label} signals. Key drivers include ${getRandItem(EVENTS)} and ${getRandItem(REGIONS)} volatility.`,
            evidence: [
                { label: "Bloomberg Terminal", url: "#" },
                { label: "Reuters Wire", url: "#" },
                { label: "Internal Analysis", url: "#" }
            ],
            verificationStatus: rand() > 0.3 ? 'VERIFIED' : (rand() > 0.1 ? 'PROVISIONAL' : 'FLAGGED')
        };
    });

    // Generate Intel Items
    const items: IntelItem[] = [];
    const itemCount = getRandInt(8, 15);

    for (let i = 0; i < itemCount; i++) {
        const sector = getRandItem(SECTORS);
        const isNews = rand() > 0.3;

        let template = isNews ? getRandItem(NEWS_TEMPLATES) : getRandItem(RESEARCH_TEMPLATES);
        template = template
            .replace('{sector}', sector.label)
            .replace('{region}', getRandItem(REGIONS))
            .replace('{event}', getRandItem(EVENTS));

        items.push({
            id: `item-${runId}-${i}`,
            sectorId: sector.id,
            type: isNews ? 'NEWS' : 'RESEARCH',
            title: template,
            summary: `Automated analysis: Recent data points suggest significant impact on ${sector.label} fundamentals due to external macro factors. Our models indicate elevated volatility in the short term.`,
            source: isNews ? getRandItem(['Bloomberg', 'Reuters', 'Financial Times', 'WSJ', 'CNBC']) : 'Proprietary Research',
            url: '#',
            publishedAt: `${date}T${Math.max(0, hour - getRandInt(1, 5)).toString().padStart(2, '0')}:${getRandInt(0, 59).toString().padStart(2, '0')}:00Z`,
            impact: rand() > 0.7 ? 'HIGH' : (rand() > 0.4 ? 'MEDIUM' : 'LOW'),
            tags: [`#${sector.id}`, `#${getRandItem(EVENTS).replace(/\s/g, '')}`, '#Global']
        });
    }

    // Generate Rumors
    const rumors: RumorItem[] = [];
    const rumorCount = getRandInt(2, 5);

    for (let i = 0; i < rumorCount; i++) {
        const score = getRandInt(15, 95);
        rumors.push({
            id: `rumor-${runId}-${i}`,
            claim: getRandItem(RUMOR_CLAIMS) + ` in ${getRandItem(SECTORS).label}`,
            status: score > 70 ? 'PLAUSIBLE' : 'UNVERIFIED',
            score: score,
            riskLevel: calculateRumorRisk(score),
            breakdown: {
                sourceCredibility: getRandInt(10, 90),
                narrativeSpread: getRandInt(20, 100),
                evidenceStrength: getRandInt(5, 60)
            },
            evidenceCount: getRandInt(0, 5),
            sources: ['Encrypted Channels', 'Market Chatter', 'Anonymous Tips'],
            taxonomy: getRandItem(['MarketStructure', 'Policy', 'Geopolitics', 'Security', 'Regulatory'])
        });
    }

    // Daily Snapshot
    const riskShift = getRandInt(-15, 15);
    const sortedSectors = Object.entries(mockScores).sort(([, a], [, b]) => b.risk - a.risk);
    const topSector = sortedSectors[0][0] as SectorID;

    const snapshot: DailySnapshot = {
        date,
        totalItems: items.length + rumors.length,
        riskShift,
        topSector,
        coveragePct: parseFloat((getRandInt(92, 99) + rand() * 0.9).toFixed(1))
    };

    return {
        runId,
        reportDate: date,
        generatedAt: `${date}T${time}:00.000+03:00`,
        runType: determineRunType(hour),
        status: rand() > 0.05 ? 'OK' : 'PARTIAL',
        scores: mockScores as Record<SectorID, ScoreSet>,
        items,
        rumors,
        logs: [
            `[${time}] System Init: Seed ${seed.substring(0, 10)}`,
            `[${time}] Ingestion: ${items.length} items processed from ${getRandInt(5, 12)} sources`,
            `[${time}] NLP Engine: Sentiment analysis complete (${getRandInt(80, 99)}% confidence)`,
            `[${time}] Risk Calculation: Global shift ${riskShift > 0 ? '+' : ''}${riskShift} basis points`,
            `[${time}] Rumor Scanner: ${rumors.length} unverified claims detected`,
            `[${time}] Report Status: Generation complete`
        ],
        snapshot
    };
};

// --- History Generator ---
export const getHistoricalRuns = (daysBack: number): RunData[] => {
    const runs: RunData[] = [];

    for (let i = 0; i <= daysBack; i++) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        const dateStr = `${year}-${month}-${day}`;

        // Generate 3 runs per day
        runs.push(generateMockRun(dateStr, '19:00', `run-${dateStr}-1900`));
        runs.push(generateMockRun(dateStr, '13:00', `run-${dateStr}-1300`));
        runs.push(generateMockRun(dateStr, '07:00', `run-${dateStr}-0700`));
    }

    return runs;
};

// --- Get local date helper ---
export const getTodayLocal = (): string => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

// --- Export pre-generated database ---
export const MOCK_DB: RunData[] = getHistoricalRuns(7);
