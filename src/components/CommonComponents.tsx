// ============================================================
// GICC - Common UI Components
// Score Gauges, Cards, Badges, Modals
// ============================================================

import React, { useState } from 'react';
import {
    Eye,
    Newspaper,
    BookOpen,
    ShieldAlert,
    Users,
    MessageSquare,
    BarChart3,
    X,
    Plus,
    CheckCircle2,
    HelpCircle,
    Flag,
    ArrowUpRight,
    ArrowDownRight,
    Minus,
    ExternalLink,
    TrendingUp,
    AlertTriangle,
    Droplets,
    Gavel
} from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import {
    IntelItem,
    RumorItem,
    ScoreVerification,
    DailySnapshot
} from '../types';

// --- Score Gauge Component ---
interface ScoreGaugeProps {
    label: string;
    value: number;
    icon: LucideIcon;
    delta?: number;
}

export const ScoreGauge: React.FC<ScoreGaugeProps> = ({
    label,
    value,
    icon: Icon,
    delta = 0
}) => {
    let colorClass = 'text-green-500 dark:text-green-400';
    if (value > 40) colorClass = 'text-yellow-500 dark:text-yellow-400';
    if (value > 70) colorClass = 'text-red-600 dark:text-red-500';

    return (
        <div className="flex flex-col items-center bg-white dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-3 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider font-semibold">
                <Icon size={14} />
                {label}
            </div>
            <div className="flex items-end gap-2">
                <div className={`text-3xl font-bold ${colorClass}`}>
                    {value}
                </div>
                {delta !== 0 && (
                    <div className={`text-sm font-bold mb-1 flex items-center ${delta > 0 ? 'text-red-500 dark:text-red-400' : 'text-green-500 dark:text-green-400'}`}>
                        {delta > 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                        {delta > 0 ? '+' : ''}{delta}
                    </div>
                )}
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 mt-3 rounded-full overflow-hidden">
                <div
                    className={`h-full transition-all duration-500 ${colorClass.replace('text', 'bg')}`}
                    style={{ width: `${value}%` }}
                />
            </div>
        </div>
    );
};

// --- Verification Badge ---
interface VerificationBadgeProps {
    status: ScoreVerification;
}

export const VerificationBadge: React.FC<VerificationBadgeProps> = ({ status }) => {
    const styles = {
        VERIFIED: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800',
        PROVISIONAL: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-800',
        FLAGGED: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800'
    };

    const icons = {
        VERIFIED: CheckCircle2,
        PROVISIONAL: HelpCircle,
        FLAGGED: Flag
    };

    const IconComponent = icons[status];

    return (
        <div className={`flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border ${styles[status]}`}>
            <IconComponent size={12} />
            {status}
        </div>
    );
};

// --- Intel Item Card ---
interface ItemCardProps {
    item: IntelItem;
    isWatchlistMatch: boolean;
}

export const ItemCard: React.FC<ItemCardProps> = ({ item, isWatchlistMatch }) => (
    <div className={`group bg-white dark:bg-slate-800 border rounded-xl p-4 transition-all duration-200 shadow-sm hover:shadow-lg ${isWatchlistMatch
        ? 'border-yellow-400/50 dark:border-yellow-500/50 bg-yellow-50 dark:bg-yellow-900/10'
        : 'border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500'
        }`}>
        <div className="flex justify-between items-start mb-3">
            <div className="flex items-center gap-2 flex-wrap">
                <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${item.type === 'NEWS'
                    ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                    : 'bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800'
                    }`}>
                    {item.type}
                </span>
                {item.type === 'RESEARCH' && <BookOpen size={12} className="text-purple-500 dark:text-purple-400" />}
                {isWatchlistMatch && (
                    <span className="text-[10px] font-bold bg-yellow-400 text-slate-900 px-2 py-0.5 rounded flex items-center gap-1">
                        <Eye size={10} /> WATCHLIST
                    </span>
                )}
                <span className="text-slate-500 dark:text-slate-500 text-xs">
                    {new Date(item.publishedAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'Africa/Mogadishu' })} EAT
                </span>
            </div>
            <div className={`w-3 h-3 rounded-full flex-shrink-0 ${item.impact === 'HIGH' ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)] animate-pulse' :
                item.impact === 'MEDIUM' ? 'bg-orange-400' : 'bg-green-400'
                }`} title={`Impact: ${item.impact}`} />
        </div>

        <h3 className="text-slate-900 dark:text-white font-semibold text-lg leading-tight mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            <a href={item.url} target="_blank" rel="noopener noreferrer" className="flex items-start gap-2">
                {item.title}
                <ExternalLink size={14} className="flex-shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
        </h3>

        <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 leading-relaxed line-clamp-2">
            {item.summary}
        </p>

        <div className="flex items-center justify-between text-xs text-slate-500 border-t border-slate-200 dark:border-slate-700/50 pt-3">
            <span className="flex items-center gap-1.5 font-medium">
                <Newspaper size={12} />
                {item.source}
            </span>
            <div className="flex gap-2">
                {item.tags.map(tag => (
                    <span key={tag} className="text-slate-400 hover:text-blue-500 cursor-pointer transition-colors">
                        {tag.startsWith('#') ? tag : `#${tag}`}
                    </span>
                ))}
            </div>
        </div>
    </div>
);

// --- Rumor Card ---
interface RumorCardProps {
    rumor: RumorItem;
}

export const RumorCard: React.FC<RumorCardProps> = ({ rumor }) => {
    const riskColors = {
        CRITICAL: 'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200 border-red-300 dark:border-red-800',
        HIGH: 'bg-orange-100 dark:bg-orange-900/50 text-orange-800 dark:text-orange-200 border-orange-300 dark:border-orange-800',
        MODERATE: 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-200 border-yellow-300 dark:border-yellow-800',
        LOW: 'bg-slate-100 dark:bg-slate-900/50 text-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-800'
    };

    return (
        <div className={`relative overflow-hidden rounded-xl p-5 border transition-all bg-white dark:bg-slate-900 shadow-sm hover:shadow-lg ${rumor.status === 'UNVERIFIED' ? 'border-red-200 dark:border-red-900/30' : 'border-yellow-200 dark:border-yellow-900/30'
            }`}>
            {rumor.riskLevel === 'CRITICAL' && (
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-orange-500" />
            )}

            <div className="flex justify-between items-start mb-4">
                <div className="flex gap-2">
                    <div className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${rumor.status === 'UNVERIFIED'
                        ? 'bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800'
                        : 'bg-yellow-50 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800'
                        }`}>
                        {rumor.status}
                    </div>
                    <div className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border uppercase ${riskColors[rumor.riskLevel]}`}>
                        RISK: {rumor.riskLevel}
                    </div>
                </div>
                <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs font-mono bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                    <ShieldAlert size={12} />
                    SCORE: {rumor.score}
                </div>
            </div>

            <h4 className="text-lg text-slate-800 dark:text-slate-200 font-medium mb-4 italic leading-relaxed">
                "{rumor.claim}"
            </h4>

            {/* Score Breakdown */}
            <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg border border-slate-100 dark:border-slate-700">
                    <div className="text-[10px] text-slate-500 uppercase flex items-center gap-1 mb-2">
                        <Users size={10} /> Credibility
                    </div>
                    <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 transition-all duration-500" style={{ width: `${rumor.breakdown.sourceCredibility}%` }} />
                    </div>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg border border-slate-100 dark:border-slate-700">
                    <div className="text-[10px] text-slate-500 uppercase flex items-center gap-1 mb-2">
                        <MessageSquare size={10} /> Spread
                    </div>
                    <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full bg-purple-500 transition-all duration-500" style={{ width: `${rumor.breakdown.narrativeSpread}%` }} />
                    </div>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg border border-slate-100 dark:border-slate-700">
                    <div className="text-[10px] text-slate-500 uppercase flex items-center gap-1 mb-2">
                        <BarChart3 size={10} /> Evidence
                    </div>
                    <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 transition-all duration-500" style={{ width: `${rumor.breakdown.evidenceStrength}%` }} />
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-end text-xs text-slate-500">
                <div>
                    <div className="mb-1">Taxonomy: <span className="text-slate-700 dark:text-slate-300 font-medium">{rumor.taxonomy}</span></div>
                    <div>Sources: {rumor.sources.join(', ')}</div>
                </div>
                <div className="text-right">
                    Evidence Count: <span className="text-slate-700 dark:text-slate-300 font-bold">{rumor.evidenceCount}</span>
                </div>
            </div>
        </div>
    );
};

// --- Daily Snapshot Card ---
interface SnapshotCardProps {
    snapshot: DailySnapshot;
}

export const SnapshotCard: React.FC<SnapshotCardProps> = ({ snapshot }) => {
    return (
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-950 dark:to-slate-900 rounded-2xl p-6 text-white shadow-xl mb-6 border border-slate-700/50">
            <div className="flex justify-between items-start mb-5">
                <div>
                    <div className="text-xs text-slate-400 uppercase tracking-wider font-bold mb-1">Daily Intelligence Snapshot</div>
                    <div className="text-xl font-semibold">
                        {new Date(snapshot.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-4xl font-bold text-blue-400">{snapshot.coveragePct}%</div>
                    <div className="text-[11px] text-slate-400">Global Coverage</div>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-6 border-t border-slate-700/50 pt-5">
                <div>
                    <div className="text-slate-400 text-xs mb-1">Total Signals</div>
                    <div className="text-2xl font-bold">{snapshot.totalItems}</div>
                </div>
                <div>
                    <div className="text-slate-400 text-xs mb-1">Net Risk Shift</div>
                    <div className={`text-2xl font-bold flex items-center gap-1 ${snapshot.riskShift > 0 ? 'text-red-400' : snapshot.riskShift < 0 ? 'text-green-400' : 'text-slate-200'
                        }`}>
                        {snapshot.riskShift > 0 ? <ArrowUpRight size={20} /> : snapshot.riskShift < 0 ? <ArrowDownRight size={20} /> : <Minus size={20} />}
                        {Math.abs(snapshot.riskShift)} pts
                    </div>
                </div>
                <div>
                    <div className="text-slate-400 text-xs mb-1">Top Active Sector</div>
                    <div className="text-2xl font-bold text-yellow-400">{snapshot.topSector}</div>
                </div>
            </div>
        </div>
    );
};

// --- Watchlist Modal ---
interface WatchlistModalProps {
    keywords: string[];
    onAdd: (keyword: string) => void;
    onRemove: (keyword: string) => void;
    onClose: () => void;
}

export const WatchlistModal: React.FC<WatchlistModalProps> = ({
    keywords,
    onAdd,
    onRemove,
    onClose
}) => {
    const [input, setInput] = useState('');

    const handleAdd = () => {
        if (input.trim()) {
            onAdd(input.trim());
            setInput('');
        }
    };

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 w-full max-w-md shadow-2xl animate-fade-in">
                <div className="flex justify-between items-center mb-5">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <Eye className="text-blue-500 dark:text-blue-400" />
                        My Watchlist
                    </h3>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <div className="flex gap-2 mb-6">
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Add keyword (e.g. Bitcoin, Inflation)..."
                        className="flex-1 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:border-blue-500 outline-none transition-colors"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handleAdd();
                        }}
                    />
                    <button
                        onClick={handleAdd}
                        className="bg-blue-600 hover:bg-blue-500 text-white p-3 rounded-xl transition-colors"
                    >
                        <Plus size={20} />
                    </button>
                </div>

                <div className="space-y-3 mb-6">
                    <div className="text-xs text-slate-500 uppercase tracking-wide font-semibold">Active Keywords</div>
                    {keywords.length === 0 && (
                        <div className="text-slate-600 dark:text-slate-400 italic text-sm">No keywords active. Add some above!</div>
                    )}
                    <div className="flex flex-wrap gap-2">
                        {keywords.map(k => (
                            <span
                                key={k}
                                className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 px-3 py-1.5 rounded-lg text-sm flex items-center gap-2 border border-slate-300 dark:border-slate-700"
                            >
                                {k}
                                <button
                                    onClick={() => onRemove(k)}
                                    className="text-slate-400 hover:text-red-500 transition-colors"
                                >
                                    <X size={14} />
                                </button>
                            </span>
                        ))}
                    </div>
                </div>

                <p className="text-xs text-slate-500">
                    Intel items matching these keywords will be highlighted in your feed with a yellow border.
                </p>
            </div>
        </div>
    );
};

// --- Skeleton Loader ---
export const SkeletonLoader: React.FC<{ lines?: number }> = ({ lines = 3 }) => (
    <div className="space-y-3 animate-pulse">
        {Array.from({ length: lines }).map((_, i) => (
            <div key={i} className="h-4 bg-slate-700 rounded" style={{ width: `${100 - i * 15}%` }} />
        ))}
    </div>
);

// --- Loading Spinner ---
export const LoadingSpinner: React.FC<{ size?: number }> = ({ size = 24 }) => (
    <div
        className="animate-spin rounded-full border-2 border-slate-600 border-t-blue-500"
        style={{ width: size, height: size }}
    />
);

// --- Export Score Gauge Icons ---
export const ScoreIcons = {
    momentum: TrendingUp,
    risk: AlertTriangle,
    liquidity: Droplets,
    policy: Gavel
};

// --- Error Boundary ---
interface ErrorBoundaryProps {
    children: React.ReactNode;
    fallback?: React.ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(_: Error): ErrorBoundaryState {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback || (
                <div className="p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
                    <h3 className="font-bold">Something went wrong.</h3>
                    <p className="text-sm">Please refresh the page to try again.</p>
                </div>
            );
        }

        return this.props.children;
    }
}
