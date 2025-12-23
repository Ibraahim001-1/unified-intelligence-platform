// ============================================================
// GICC - Global Intelligence Command Center
// Main Application Component
// ============================================================

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import {
    LayoutDashboard,
    Globe,
    Menu,
    X,
    Search,
    Calendar,
    Clock,
    Newspaper,
    TrendingUp,
    ShieldAlert,
    Droplets,
    Gavel,
    BookOpen,
    ArrowRightLeft,
    Eye,
    Download,
    FileText,
    Sun,
    Moon,
    Activity,
    AlertTriangle,
    ExternalLink,
    Sparkles,
    ChevronRight,
    Zap,
    RefreshCw,
    HelpCircle
} from 'lucide-react';

import { MOCK_DB, SECTORS, getTodayLocal } from './utils/mockDataGenerator';
import { useTheme, useWatchlist, usePersistentState, useIsMobile } from './hooks';
import { generateAnalysis } from './services/geminiService';
import {
    ScoreGauge,
    VerificationBadge,
    ItemCard,
    RumorCard,
    SnapshotCard,
    WatchlistModal,
    LoadingSpinner,
    ScoreIcons
} from './components/CommonComponents';
import {
    WarRoomView,
    ImpactMatrixView,
    SmartChartView
} from './components/AIComponents';
import WelcomePage from './components/WelcomePage';
import OnboardingTour from './components/OnboardingTour';
import { DashboardSkeleton, SectorDetailSkeleton, AIReportSkeleton } from './components/SkeletonLoaders';
import {
    SectorID,
    IntelItem,
    AnalysisParams,
    AnalysisResult,
    COUNTRIES,
    ASSETS,
    HORIZONS,
    RISKS,
    MODELS
} from './types';

// ============================================================
// SIDEBAR COMPONENT
// ============================================================

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
    selectedSector: SectorID | 'RUMORS' | 'AI_ANALYSIS' | null;
    onSelectSector: (sector: SectorID | 'RUMORS' | 'AI_ANALYSIS' | null) => void;
    showLogs: boolean;
    onShowLogs: () => void;
    isDarkMode: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({
    isOpen,
    onClose,
    selectedSector,
    onSelectSector,
    showLogs,
    onShowLogs,
    isDarkMode
}) => (
    <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <Globe className="text-white" size={22} />
                </div>
                <div>
                    <h1 className="font-bold text-lg tracking-tight text-slate-900 dark:text-white">GICC</h1>
                    <p className="text-[10px] text-slate-500 font-medium">Intelligence Command</p>
                </div>
            </div>
            <button onClick={onClose} className="md:hidden text-slate-400 hover:text-slate-900 dark:hover:text-white">
                <X size={24} />
            </button>
        </div>

        <div className="p-4 overflow-y-auto h-[calc(100vh-80px)]">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-3">Main Views</div>
            <nav className="space-y-1">
                <button
                    onClick={() => { onSelectSector(null); onClose(); }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl transition-all ${selectedSector === null && !showLogs
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                        : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                >
                    <LayoutDashboard size={18} />
                    Intel Dashboard
                </button>

                <button
                    onClick={() => { onSelectSector('AI_ANALYSIS'); onClose(); }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl transition-all ${selectedSector === 'AI_ANALYSIS'
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                        : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                >
                    <Sparkles size={18} />
                    AI Analysis
                    <span className="ml-auto text-[10px] bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 px-1.5 py-0.5 rounded">NEW</span>
                </button>
            </nav>

            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-3 mt-6">Sectors</div>
            <nav className="space-y-1">
                {SECTORS.map(sector => (
                    <button
                        key={sector.id}
                        onClick={() => { onSelectSector(sector.id); onClose(); }}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl transition-all ${selectedSector === sector.id
                            ? 'bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 border border-slate-200 dark:border-slate-700'
                            : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                            }`}
                    >
                        <sector.icon size={18} className={selectedSector === sector.id ? (isDarkMode ? sector.color : sector.lightColor) : ''} />
                        {sector.label}
                    </button>
                ))}
            </nav>

            <div className="my-4 border-t border-slate-200 dark:border-slate-800" />

            <nav className="space-y-1">
                <button
                    onClick={() => { onSelectSector('RUMORS'); onClose(); }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl transition-all ${selectedSector === 'RUMORS'
                        ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/50'
                        : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                >
                    <ShieldAlert size={18} />
                    Rumor Overlay
                </button>

                <button
                    onClick={() => { onShowLogs(); onClose(); }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl transition-all ${showLogs
                        ? 'bg-slate-800 text-white'
                        : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                >
                    <FileText size={18} />
                    System Logs
                </button>
            </nav>
        </div>
    </aside>
);

// ============================================================
// AI ANALYSIS PANEL
// ============================================================

interface AIAnalysisPanelProps {
    onResult: (result: AnalysisResult | null) => void;
    loading: boolean;
    setLoading: (v: boolean) => void;
}

const AIAnalysisPanel: React.FC<AIAnalysisPanelProps> = ({ onResult, loading, setLoading }) => {
    const [params, setParams] = usePersistentState<AnalysisParams>('gicc_ai_params', {
        query: '',
        secondaryQuery: '',
        countryFocus: ['Global'],
        assetFocus: [],
        horizon: HORIZONS[0],
        riskFocus: [],
        language: 'Somali',
        selectedModel: MODELS[0].id
    });
    const [error, setError] = useState<string | null>(null);

    const toggleItem = (arr: string[], item: string, key: keyof AnalysisParams) => {
        const newArr = arr.includes(item) ? arr.filter(x => x !== item) : [...arr, item];
        setParams(prev => ({ ...prev, [key]: newArr }));
    };

    const handleGenerate = async () => {
        if (!params.query.trim()) {
            setError('Please enter a research topic');
            return;
        }
        setLoading(true);
        setError(null);
        onResult(null);

        try {
            const result = await generateAnalysis(params);
            onResult(result);
        } catch (err: any) {
            setError(err.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-lg">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-6">
                <Sparkles className="text-purple-500" />
                AI Research Generator
            </h3>

            <div className="space-y-5">
                {/* Primary Query */}
                <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2 block">
                        Primary Research Topic *
                    </label>
                    <input
                        type="text"
                        value={params.query}
                        onChange={(e) => setParams(prev => ({ ...prev, query: e.target.value }))}
                        placeholder="e.g., Impact of Fed rate cuts on emerging markets"
                        className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white outline-none focus:border-blue-500"
                    />
                </div>

                {/* Secondary Query */}
                <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2 block">
                        Secondary Topic (Correlation Analysis)
                    </label>
                    <input
                        type="text"
                        value={params.secondaryQuery}
                        onChange={(e) => setParams(prev => ({ ...prev, secondaryQuery: e.target.value }))}
                        placeholder="e.g., Bitcoin price correlation"
                        className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white outline-none focus:border-blue-500"
                    />
                </div>

                {/* Region Focus */}
                <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2 block">Region Focus</label>
                    <div className="flex flex-wrap gap-2">
                        {COUNTRIES.slice(0, 10).map(c => (
                            <button
                                key={c}
                                onClick={() => toggleItem(params.countryFocus, c, 'countryFocus')}
                                className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${params.countryFocus.includes(c)
                                    ? 'bg-blue-600 text-white border-blue-600'
                                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-blue-500'
                                    }`}
                            >
                                {c}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Horizon */}
                <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2 block">Time Horizon</label>
                    <select
                        value={params.horizon}
                        onChange={(e) => setParams(prev => ({ ...prev, horizon: e.target.value }))}
                        className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white outline-none"
                    >
                        {HORIZONS.map(h => (
                            <option key={h} value={h}>{h}</option>
                        ))}
                    </select>
                </div>

                {/* Language & Model */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2 block">Language</label>
                        <select
                            value={params.language}
                            onChange={(e) => setParams(prev => ({ ...prev, language: e.target.value as 'Somali' | 'English' }))}
                            className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white outline-none"
                        >
                            <option value="Somali">Somali</option>
                            <option value="English">English</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2 block">AI Model</label>
                        <select
                            value={params.selectedModel}
                            onChange={(e) => setParams(prev => ({ ...prev, selectedModel: e.target.value }))}
                            className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white outline-none"
                        >
                            {MODELS.map(m => (
                                <option key={m.id} value={m.id}>{m.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Error */}
                {error && (
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-xl text-sm">
                        {error}
                    </div>
                )}

                {/* Generate Button */}
                <button
                    onClick={handleGenerate}
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-4 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-purple-600/30"
                >
                    {loading ? (
                        <>
                            <RefreshCw size={20} className="animate-spin" />
                            Generating Intelligence...
                        </>
                    ) : (
                        <>
                            <Sparkles size={20} />
                            Generate Intelligence Report
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};

// ============================================================
// MAIN APP COMPONENT
// ============================================================

const App: React.FC = () => {
    // Welcome & Onboarding State
    const [showWelcome, setShowWelcome] = usePersistentState('gicc_welcomed', true);
    const [showOnboarding, setShowOnboarding] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // State
    const [currentDate, setCurrentDate] = useState(getTodayLocal());
    const [currentRunId, setCurrentRunId] = useState<string>('');
    const [selectedSector, setSelectedSector] = useState<SectorID | 'RUMORS' | 'AI_ANALYSIS' | null>(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [viewTab, setViewTab] = useState<'NEWS' | 'RESEARCH'>('NEWS');
    const [showLogs, setShowLogs] = useState(false);
    const [compareMode, setCompareMode] = useState(false);
    const [compareRunId, setCompareRunId] = useState<string>('');
    const [watchlistOpen, setWatchlistOpen] = useState(false);

    // AI Analysis State
    const [aiResult, setAiResult] = useState<AnalysisResult | null>(null);
    const [aiLoading, setAiLoading] = useState(false);
    const [aiViewTab, setAiViewTab] = useState<'REPORT' | 'WARROOM' | 'MATRIX' | 'CHART'>('REPORT');

    // Hooks
    const { isDarkMode, toggleTheme } = useTheme();
    const { watchlist, addKeyword, removeKeyword, isMatch } = useWatchlist();
    const isMobile = useIsMobile();

    // Derived Data
    const availableRuns = useMemo(() =>
        MOCK_DB.filter(run => run.reportDate === currentDate).sort((a, b) => b.generatedAt.localeCompare(a.generatedAt)),
        [currentDate]
    );

    useEffect(() => {
        if (availableRuns.length > 0) {
            setCurrentRunId(availableRuns[0].runId);
            setCompareRunId(availableRuns[1]?.runId || availableRuns[0].runId);
        }
    }, [availableRuns]);

    const activeRun = useMemo(() => MOCK_DB.find(run => run.runId === currentRunId) || MOCK_DB[0], [currentRunId]);
    const comparisonRun = useMemo(() => MOCK_DB.find(run => run.runId === compareRunId) || activeRun, [compareRunId, activeRun]);

    const activeSectorData = useMemo(() => {
        if (!selectedSector || selectedSector === 'RUMORS' || selectedSector === 'AI_ANALYSIS') return null;
        const items = activeRun.items.filter(i => i.sectorId === selectedSector);
        const scores = activeRun.scores[selectedSector];
        return { items, scores };
    }, [activeRun, selectedSector]);

    // Search Results
    const filteredSearchResults = useMemo(() => {
        if (!searchQuery) return [];
        return activeRun.items.filter(item =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
        );
    }, [searchQuery, activeRun]);

    const isWatchlistMatch = useCallback((item: IntelItem) => {
        return isMatch(item.title) || isMatch(item.summary) || item.tags.some(t => isMatch(t));
    }, [isMatch]);

    const handleSectorSelect = useCallback((sector: SectorID | 'RUMORS' | 'AI_ANALYSIS' | null) => {
        setSelectedSector(sector);
        setSearchQuery('');
        setShowLogs(false);
    }, []);

    const handleShowLogs = useCallback(() => {
        setShowLogs(true);
        setSelectedSector(null);
    }, []);

    // Check if onboarding was completed
    const tourCompleted = localStorage.getItem('gicc_tour_completed') === 'true';

    // Simulate loading delay for skeleton effect
    useEffect(() => {
        if (!showWelcome) {
            const timer = setTimeout(() => {
                setIsLoading(false);
                // Show onboarding if not completed
                if (!tourCompleted) {
                    setShowOnboarding(true);
                }
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [showWelcome, tourCompleted]);

    // Handle entering from welcome page
    const handleEnterFromWelcome = useCallback(() => {
        setShowWelcome(false);
    }, [setShowWelcome]);

    // Handle onboarding completion
    const handleOnboardingComplete = useCallback(() => {
        setShowOnboarding(false);
    }, []);

    // Handle help button click to restart tour
    const handleRestartTour = useCallback(() => {
        localStorage.removeItem('gicc_tour_completed');
        setShowOnboarding(true);
    }, []);

    // ============================================================
    // RENDER
    // ============================================================

    // Show Welcome Page if not entered yet
    if (showWelcome) {
        return <WelcomePage onEnter={handleEnterFromWelcome} />;
    }

    return (
        <div className={isDarkMode ? 'dark' : ''}>
            {/* Onboarding Tour */}
            {showOnboarding && (
                <OnboardingTour
                    onComplete={handleOnboardingComplete}
                    onSkip={handleOnboardingComplete}
                    language="so"
                />
            )}

            <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-300">

                {/* Mobile Overlay */}
                {mobileMenuOpen && (
                    <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setMobileMenuOpen(false)} />
                )}

                {/* Watchlist Modal */}
                {watchlistOpen && (
                    <WatchlistModal
                        keywords={watchlist}
                        onAdd={addKeyword}
                        onRemove={removeKeyword}
                        onClose={() => setWatchlistOpen(false)}
                    />
                )}

                {/* Sidebar */}
                <Sidebar
                    isOpen={mobileMenuOpen}
                    onClose={() => setMobileMenuOpen(false)}
                    selectedSector={selectedSector}
                    onSelectSector={handleSectorSelect}
                    showLogs={showLogs}
                    onShowLogs={handleShowLogs}
                    isDarkMode={isDarkMode}
                />

                {/* Main Content */}
                <main className="flex-1 flex flex-col min-w-0 overflow-hidden">

                    {/* Header */}
                    <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 z-40 transition-colors">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 py-3 gap-3 sm:gap-0">
                            <div className="flex items-center gap-3 w-full sm:w-auto">
                                <button onClick={() => setMobileMenuOpen(true)} className="md:hidden text-slate-400 hover:text-slate-900 dark:hover:text-white">
                                    <Menu size={24} />
                                </button>

                                <div className="relative group w-full sm:w-auto">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={16} />
                                    <input
                                        type="text"
                                        placeholder="Search global intel..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-200 text-sm rounded-full pl-10 pr-4 py-2 w-full sm:w-64 transition-all outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20"
                                    />
                                </div>

                                <button
                                    onClick={() => setCompareMode(!compareMode)}
                                    className={`hidden md:flex items-center gap-2 text-xs font-bold px-3 py-2 rounded-full border transition-colors ${compareMode
                                        ? 'bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 border-purple-300 dark:border-purple-500'
                                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'
                                        }`}
                                >
                                    <ArrowRightLeft size={14} />
                                    Compare: {compareMode ? 'ON' : 'OFF'}
                                </button>
                            </div>

                            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                                <button onClick={toggleTheme} className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-yellow-400 transition-colors">
                                    {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                                </button>

                                <button onClick={() => setWatchlistOpen(true)} className="relative p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors">
                                    <Eye size={20} />
                                    {watchlist.length > 0 && <span className="absolute top-0 right-0 w-2 h-2 bg-blue-500 rounded-full" />}
                                </button>

                                {/* Help Button - Restart Tour */}
                                <button
                                    onClick={handleRestartTour}
                                    className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-purple-600 transition-colors"
                                    title="Dib u bilow Hagaha (Restart Tour)"
                                >
                                    <HelpCircle size={20} />
                                </button>

                                <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 rounded-xl p-1.5 border border-slate-200 dark:border-slate-700">
                                    <div className="relative">
                                        <Calendar className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
                                        <input
                                            type="date"
                                            value={currentDate}
                                            onChange={(e) => setCurrentDate(e.target.value)}
                                            className="bg-transparent text-sm text-slate-700 dark:text-slate-200 pl-8 pr-2 py-1 outline-none w-28 sm:w-32"
                                        />
                                    </div>

                                    <div className="h-4 w-px bg-slate-300 dark:bg-slate-700" />

                                    <select
                                        value={currentRunId}
                                        onChange={(e) => setCurrentRunId(e.target.value)}
                                        className="bg-transparent text-sm text-blue-600 dark:text-blue-400 font-medium py-1 px-2 outline-none cursor-pointer max-w-[120px]"
                                    >
                                        {availableRuns.map(run => (
                                            <option key={run.runId} value={run.runId}>
                                                {new Date(run.generatedAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                                            </option>
                                        ))}
                                        {availableRuns.length === 0 && <option>No Runs</option>}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-50 dark:bg-slate-950/50 px-4 py-1.5 flex justify-between items-center text-xs border-b border-slate-200 dark:border-slate-800">
                            <div className="flex items-center gap-4 text-slate-500">
                                <span className="flex items-center gap-1">
                                    <Clock size={10} />
                                    Generated: {new Date(activeRun.generatedAt).toLocaleString('en-US', { timeZone: 'Africa/Mogadishu' })} (EAT)
                                </span>
                            </div>
                            <div className={`px-2 py-0.5 rounded text-[10px] font-bold ${activeRun.status === 'OK' ? 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-400' : 'bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-400'
                                }`}>
                                STATUS: {activeRun.status}
                            </div>
                        </div>
                    </header>

                    {/* Content Area */}
                    <div className="flex-1 overflow-y-auto p-4 md:p-6 scroll-smooth">

                        {availableRuns.length === 0 ? (
                            /* No Reports */
                            <div className="flex flex-col items-center justify-center h-full text-slate-500">
                                <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-full mb-4">
                                    <Calendar size={48} className="text-slate-400" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No Reports Available</h3>
                                <p className="max-w-md text-center">
                                    There are no intelligence reports for <span className="font-mono font-bold">{currentDate}</span>.
                                </p>
                            </div>

                        ) : showLogs ? (
                            /* System Logs */
                            <div className="max-w-4xl mx-auto space-y-4">
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                    <FileText /> System Ingestion Logs
                                </h2>
                                <div className="bg-slate-950 rounded-xl border border-slate-800 p-4 font-mono text-xs text-slate-400">
                                    {activeRun.logs.map((log, i) => (
                                        <div key={i} className="mb-2 border-b border-slate-800/50 pb-2 last:border-0">{log}</div>
                                    ))}
                                </div>
                            </div>

                        ) : searchQuery ? (
                            /* Search Results */
                            <div className="max-w-5xl mx-auto space-y-6">
                                <div className="flex items-center gap-2 text-slate-500">
                                    <Search size={20} />
                                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">Search Results</h2>
                                    <span className="bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded-full text-xs">{filteredSearchResults.length} matches</span>
                                </div>
                                {filteredSearchResults.length === 0 ? (
                                    <div className="text-center py-20 text-slate-500">No results for "{searchQuery}"</div>
                                ) : (
                                    <div className="grid gap-4">
                                        {filteredSearchResults.map(item => (
                                            <ItemCard key={item.id} item={item} isWatchlistMatch={isWatchlistMatch(item)} />
                                        ))}
                                    </div>
                                )}
                            </div>

                        ) : selectedSector === 'AI_ANALYSIS' ? (
                            /* AI Analysis View */
                            <div className="max-w-6xl mx-auto space-y-6">
                                <div className="grid lg:grid-cols-3 gap-6">
                                    <div className="lg:col-span-1">
                                        <AIAnalysisPanel onResult={setAiResult} loading={aiLoading} setLoading={setAiLoading} />
                                    </div>
                                    <div className="lg:col-span-2 space-y-6">
                                        {aiLoading ? (
                                            <AIReportSkeleton />
                                        ) : aiResult ? (
                                            <>
                                                {/* AI Result Tabs */}
                                                <div className="flex gap-2 border-b border-slate-200 dark:border-slate-700 pb-2">
                                                    {(['REPORT', 'WARROOM', 'MATRIX', 'CHART'] as const).map(tab => (
                                                        <button
                                                            key={tab}
                                                            onClick={() => setAiViewTab(tab)}
                                                            className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${aiViewTab === tab
                                                                ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 border-t border-l border-r border-slate-200 dark:border-slate-700'
                                                                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                                                                }`}
                                                        >
                                                            {tab === 'REPORT' && 'Report'}
                                                            {tab === 'WARROOM' && 'War Room'}
                                                            {tab === 'MATRIX' && 'Impact Matrix'}
                                                            {tab === 'CHART' && 'Smart Chart'}
                                                        </button>
                                                    ))}
                                                </div>

                                                {aiViewTab === 'REPORT' && (
                                                    <div className="bg-white dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 prose dark:prose-invert max-w-none">
                                                        <div dangerouslySetInnerHTML={{ __html: aiResult.text.replace(/\n/g, '<br/>') }} />
                                                    </div>
                                                )}
                                                {aiViewTab === 'WARROOM' && aiResult.warRoom && <WarRoomView data={aiResult.warRoom} />}
                                                {aiViewTab === 'MATRIX' && aiResult.impactMatrix && <ImpactMatrixView data={aiResult.impactMatrix} />}
                                                {aiViewTab === 'CHART' && aiResult.smartChart && <SmartChartView data={aiResult.smartChart} />}
                                            </>
                                        ) : (
                                            <div className="bg-white dark:bg-slate-800/50 rounded-2xl p-12 border border-slate-200 dark:border-slate-700 text-center">
                                                <Sparkles size={48} className="text-purple-400 mx-auto mb-4" />
                                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">AI Research Ready</h3>
                                                <p className="text-slate-500">Enter your research topic and generate an intelligence report.</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                        ) : selectedSector === null ? (
                            /* Main Dashboard */
                            isLoading ? (
                                <DashboardSkeleton />
                            ) : (
                                <div className="space-y-8">
                                    {/* Daily Snapshot */}
                                    {activeRun.snapshot && <SnapshotCard snapshot={activeRun.snapshot} />}

                                    {/* Critical Signals Ticker */}
                                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-900/50 rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center gap-4 shadow-sm">
                                        <div className="bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg animate-pulse whitespace-nowrap">
                                            CRITICAL SIGNALS
                                        </div>
                                        <div className="overflow-hidden w-full relative h-6">
                                            <div className="absolute w-full animate-marquee whitespace-nowrap text-sm text-blue-900 dark:text-blue-200">
                                                {activeRun.items.filter(i => i.impact === 'HIGH').map((i) => (
                                                    <span key={i.id} className="mr-8">
                                                        <b className="text-slate-900 dark:text-white">{i.sectorId}:</b> {i.title}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Research Highlights */}
                                    <div>
                                        <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-slate-200 mb-4">
                                            <BookOpen size={20} className="text-purple-500" />
                                            Latest Research Drops
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {activeRun.items.filter(i => i.type === 'RESEARCH').slice(0, 4).map(item => (
                                                <div key={item.id} className={`bg-white dark:bg-slate-800/50 border p-4 rounded-xl hover:shadow-lg transition-shadow ${isWatchlistMatch(item) ? 'border-yellow-400/50' : 'border-slate-200 dark:border-slate-700'}`}>
                                                    <div className="flex justify-between items-start mb-2">
                                                        <span className="text-[10px] font-bold text-slate-500 uppercase">{item.sectorId}</span>
                                                        <span className="text-xs text-slate-500">{new Date(item.publishedAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
                                                    </div>
                                                    <h4 className="font-medium text-slate-800 dark:text-slate-200 mb-2 line-clamp-2 hover:text-purple-600 dark:hover:text-purple-400 cursor-pointer">{item.title}</h4>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="border-t border-slate-200 dark:border-slate-800 my-2" />

                                    {/* Sector Grid */}
                                    <h3 className="flex items-center justify-between text-lg font-bold text-slate-900 dark:text-slate-200 mb-2">
                                        <div className="flex items-center gap-2">
                                            <Activity size={20} className="text-blue-600 dark:text-blue-400" />
                                            Sector Risk Monitor
                                        </div>
                                        {compareMode && <span className="text-xs text-purple-500 font-normal">Comparing Runs</span>}
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {SECTORS.map(sector => {
                                            const score = activeRun.scores[sector.id];
                                            const prevScore = comparisonRun.scores[sector.id];
                                            const composite = Math.round((score.momentum + score.risk + score.liquidity + score.policy) / 4);
                                            const prevComposite = Math.round((prevScore.momentum + prevScore.risk + prevScore.liquidity + prevScore.policy) / 4);
                                            const delta = compareMode ? composite - prevComposite : 0;

                                            return (
                                                <button
                                                    key={sector.id}
                                                    onClick={() => setSelectedSector(sector.id)}
                                                    className="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500/50 hover:shadow-xl rounded-2xl p-5 text-left transition-all"
                                                >
                                                    <div className="flex justify-between items-start mb-4">
                                                        <div className={`p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 ${isDarkMode ? sector.color : sector.lightColor}`}>
                                                            <sector.icon size={24} />
                                                        </div>
                                                        <div className="text-right">
                                                            <div className="flex items-end justify-end gap-2">
                                                                <div className="text-3xl font-bold text-slate-900 dark:text-slate-200">{composite}</div>
                                                                {compareMode && delta !== 0 && (
                                                                    <span className={`text-sm font-bold mb-1 ${delta > 0 ? 'text-red-500' : 'text-green-500'}`}>
                                                                        {delta > 0 ? '+' : ''}{delta}
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <div className="text-[10px] text-slate-500 uppercase font-semibold">Composite</div>
                                                        </div>
                                                    </div>
                                                    <h3 className="font-semibold text-lg text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-1">
                                                        {sector.label}
                                                    </h3>
                                                    <div className="flex items-center gap-2 text-xs text-slate-500">
                                                        <span className={score.risk > 70 ? 'text-red-600 dark:text-red-400' : ''}>
                                                            Risk: {score.risk}/100
                                                        </span>
                                                        <span>•</span>
                                                        <VerificationBadge status={score.verificationStatus} />
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            )
                        ) : selectedSector === 'RUMORS' ? (
                            /* Rumor Overlay */
                            <div className="max-w-4xl mx-auto">
                                <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/50 rounded-2xl p-6 mb-8 text-center">
                                    <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-2 flex items-center justify-center gap-2">
                                        <ShieldAlert />
                                        RUMOR SURVEILLANCE LAYER
                                    </h2>
                                    <p className="text-red-800 dark:text-red-200/80 max-w-2xl mx-auto">
                                        WARNING: Information in this section represents unverified chatter. Use with extreme caution.
                                    </p>
                                </div>
                                <div className="grid gap-4">
                                    {activeRun.rumors.map(rumor => (
                                        <RumorCard key={rumor.id} rumor={rumor} />
                                    ))}
                                </div>
                            </div>

                        ) : activeSectorData && (
                            /* Sector Detail View */
                            isLoading ? (
                                <SectorDetailSkeleton />
                            ) : (
                                <div className="max-w-5xl mx-auto space-y-6">
                                    {/* Score Gauges */}
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <ScoreGauge
                                            label="Momentum"
                                            value={activeSectorData.scores.momentum}
                                            icon={ScoreIcons.momentum}
                                            delta={compareMode ? activeSectorData.scores.momentum - comparisonRun.scores[selectedSector as SectorID].momentum : 0}
                                        />
                                        <ScoreGauge
                                            label="Risk / Stress"
                                            value={activeSectorData.scores.risk}
                                            icon={ScoreIcons.risk}
                                            delta={compareMode ? activeSectorData.scores.risk - comparisonRun.scores[selectedSector as SectorID].risk : 0}
                                        />
                                        <ScoreGauge
                                            label="Liquidity"
                                            value={activeSectorData.scores.liquidity}
                                            icon={ScoreIcons.liquidity}
                                            delta={compareMode ? activeSectorData.scores.liquidity - comparisonRun.scores[selectedSector as SectorID].liquidity : 0}
                                        />
                                        <ScoreGauge
                                            label="Policy Heat"
                                            value={activeSectorData.scores.policy}
                                            icon={ScoreIcons.policy}
                                            delta={compareMode ? activeSectorData.scores.policy - comparisonRun.scores[selectedSector as SectorID].policy : 0}
                                        />
                                    </div>

                                    {/* Reasoning Panel */}
                                    <div className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-xl p-4 shadow-sm">
                                        <div className="flex justify-between items-center mb-3">
                                            <div className="flex items-center gap-4">
                                                <div className="text-sm text-slate-500">
                                                    AI Confidence: <span className={`font-bold ${activeSectorData.scores.confidence === 'HIGH' ? 'text-green-600' : 'text-yellow-600'}`}>{activeSectorData.scores.confidence}</span>
                                                </div>
                                                <VerificationBadge status={activeSectorData.scores.verificationStatus} />
                                            </div>
                                            <div className="text-xs text-slate-500">{activeSectorData.items.length} items</div>
                                        </div>
                                        <div className="text-sm text-slate-700 dark:text-slate-300 italic border-t border-slate-200 dark:border-slate-700/50 pt-3 mb-2">
                                            "{activeSectorData.scores.reasoning}"
                                        </div>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {activeSectorData.scores.evidence.map((ev, i) => (
                                                <a key={i} href={ev.url} className="text-[10px] flex items-center gap-1 bg-slate-100 dark:bg-slate-900 px-2 py-1 rounded text-blue-600 dark:text-blue-400 hover:underline">
                                                    <ExternalLink size={10} />
                                                    {ev.label}
                                                </a>
                                            ))}
                                        </div>
                                    </div>

                                    {/* News/Research Tabs */}
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-700">
                                            <button
                                                onClick={() => setViewTab('NEWS')}
                                                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${viewTab === 'NEWS' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
                                            >
                                                <Newspaper size={16} /> Daily News
                                                <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-1.5 py-0.5 rounded-full text-xs">
                                                    {activeSectorData.items.filter(i => i.type === 'NEWS').length}
                                                </span>
                                            </button>
                                            <button
                                                onClick={() => setViewTab('RESEARCH')}
                                                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${viewTab === 'RESEARCH' ? 'border-purple-500 text-purple-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
                                            >
                                                <BookOpen size={16} /> Research
                                                <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-1.5 py-0.5 rounded-full text-xs">
                                                    {activeSectorData.items.filter(i => i.type === 'RESEARCH').length}
                                                </span>
                                            </button>
                                        </div>

                                        <div className="grid grid-cols-1 gap-4">
                                            {activeSectorData.items.filter(i => i.type === viewTab).map(item => (
                                                <ItemCard key={item.id} item={item} isWatchlistMatch={isWatchlistMatch(item)} />
                                            ))}
                                            {activeSectorData.items.filter(i => i.type === viewTab).length === 0 && (
                                                <div className="text-center py-12 text-slate-500 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
                                                    No {viewTab.toLowerCase()} items found.
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )
                        )}

                    </div>
                </main>
            </div >
        </div >
    );
};

export default App;
