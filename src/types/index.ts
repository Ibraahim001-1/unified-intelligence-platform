// ============================================================
// GICC - Global Intelligence Command Center
// Unified Type Definitions
// ============================================================

import { LucideIcon } from 'lucide-react';

// --- Enums ---

export type SectorID =
    | 'CRYPTO'
    | 'MACRO'
    | 'GEOPOLITICS'
    | 'TECH'
    | 'FINANCE'
    | 'ENERGY'
    | 'INDUSTRIALS'
    | 'TRANSPORT'
    | 'HEALTHCARE';

export type ItemType = 'NEWS' | 'RESEARCH';
export type Impact = 'HIGH' | 'MEDIUM' | 'LOW';
export type Confidence = 'HIGH' | 'MEDIUM' | 'LOW';
export type ScoreVerification = 'VERIFIED' | 'PROVISIONAL' | 'FLAGGED';
export type RunStatus = 'OK' | 'PARTIAL' | 'FAIL';
export type RunType = 'MORNING_BRIEF' | 'MIDDAY_UPDATE' | 'NIGHT_CAP';
export type RumorStatus = 'VERIFIED' | 'PLAUSIBLE' | 'UNVERIFIED';
export type RumorRiskLevel = 'CRITICAL' | 'HIGH' | 'MODERATE' | 'LOW';
export type ViewMode = 'DASHBOARD' | 'SECTOR' | 'RUMORS' | 'SEARCH' | 'HISTORY' | 'COMPARE' | 'AI_ANALYSIS' | 'LOGS';

// --- Sector Configuration ---

export interface SectorConfig {
    id: SectorID;
    label: string;
    icon: LucideIcon;
    color: string;
    lightColor: string;
}

// --- Score & Evidence ---

export interface EvidenceLink {
    label: string;
    url: string;
}

export interface ScoreSet {
    momentum: number;
    risk: number;
    liquidity: number;
    policy: number;
    confidence: Confidence;
    reasoning: string;
    evidence: EvidenceLink[];
    verificationStatus: ScoreVerification;
}

// --- Intel Items ---

export interface IntelItem {
    id: string;
    sectorId: SectorID;
    type: ItemType;
    title: string;
    summary: string;
    source: string;
    url: string;
    publishedAt: string;
    impact: Impact;
    tags: string[];
}

// --- Rumors ---

export interface RumorBreakdown {
    sourceCredibility: number;
    narrativeSpread: number;
    evidenceStrength: number;
}

export interface RumorItem {
    id: string;
    claim: string;
    status: RumorStatus;
    score: number;
    riskLevel: RumorRiskLevel;
    breakdown: RumorBreakdown;
    evidenceCount: number;
    sources: string[];
    taxonomy: string;
}

// --- Daily Snapshot ---

export interface DailySnapshot {
    date: string;
    totalItems: number;
    riskShift: number;
    topSector: SectorID;
    coveragePct: number;
}

// --- Run Data ---

export interface RunData {
    runId: string;
    reportDate: string;
    generatedAt: string;
    runType: RunType;
    status: RunStatus;
    scores: Record<SectorID, ScoreSet>;
    items: IntelItem[];
    rumors: RumorItem[];
    logs: string[];
    snapshot: DailySnapshot;
}

// --- AI Analysis Types ---

export interface AnalysisParams {
    query: string;
    secondaryQuery: string;
    countryFocus: string[];
    assetFocus: string[];
    horizon: string;
    riskFocus: string[];
    language: 'Somali' | 'English';
    selectedModel: string;
}

export interface ChartDataPoint {
    label: string;
    value: number;
    annotation?: string;
}

export interface SmartChart {
    title: string;
    type: 'line' | 'bar';
    xAxisLabel: string;
    yAxisLabel: string;
    data: ChartDataPoint[];
    description: string;
}

export interface ImpactSignal {
    assetClass: string;
    signal: 'Positive' | 'Negative' | 'Neutral' | 'Tailwind' | 'Caution';
    reasoning: string;
}

export interface WarRoomContent {
    bullCase: string[];
    bearCase: string[];
    bullScore: number;
    bearScore: number;
    verdict: string;
}

export interface AnalysisResult {
    text: string;
    groundingChunks?: GroundingChunk[];
    warRoom?: WarRoomContent;
    impactMatrix?: ImpactSignal[];
    smartChart?: SmartChart;
}

export interface GroundingChunk {
    web?: {
        uri?: string;
        title?: string;
    };
}

export interface UserDetails {
    referenceId: string;
    location: string;
    notes: string;
}

// --- App State ---

export interface AppState {
    currentDate: string;
    currentRunId: string;
    selectedSector: SectorID | 'RUMORS' | null;
    viewMode: ViewMode;
    isDarkMode: boolean;
    compareMode: boolean;
    compareRunId: string;
    searchQuery: string;
    watchlist: string[];
    showLogs: boolean;
}

// --- Constants ---

export const COUNTRIES = [
    "Global", "US", "Eurozone", "China", "East Africa (EAC)", "Somalia", "Horn of Africa",
    "UK", "Japan", "Middle East (GCC)", "BRICS", "G7", "G20", "NATO",
    "African Union", "ASEAN", "Latin America", "Emerging Markets"
];

export const ASSETS = [
    "Stocks (Equities)", "Stocks (Emerging Mkts)", "Sovereign Bonds", "Corporate Credit",
    "Forex (Majors)", "Forex (Exotic/African)", "Commodities (Gold/Oil)", "Industrial Metals",
    "Crypto (BTC/ETH)", "Real Estate (Residential)", "Real Estate (Commercial)",
    "Private Equity", "Venture Capital", "Carbon Credits"
];

export const HORIZONS = [
    "0–3 Months (Short Term)",
    "3–12 Months (Medium Term)",
    "1–3 Years (Long Term)",
    "5+ Years (Strategic)",
    "Next Election Cycle",
    "Fiscal Year End",
    "Custom Date..."
];

export const RISKS = [
    "Recession Risk", "Inflation Risk", "Currency Devaluation", "Sovereign Default",
    "Policy Changes", "Geopolitical Tension", "Supply Chain Disruption",
    "Trade Wars / Sanctions", "Social Unrest", "Climate / Environmental Risk", "Tech Disruption"
];

export const MODELS = [
    { id: 'gemini-2.0-flash', name: 'Gemini 2.0 Flash (Fast)' },
    { id: 'gemini-2.5-pro-preview-06-05', name: 'Gemini 2.5 Pro (Deep Research)' },
];

// --- Global Window Extension ---

declare global {
    interface Window {
        html2pdf: any;
    }
}
