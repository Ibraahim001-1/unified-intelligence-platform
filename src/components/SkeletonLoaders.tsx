// ============================================================
// GICC - Skeleton Loader Components
// Used for loading states throughout the app
// ============================================================

import React from 'react';

// --- Base Skeleton ---
interface SkeletonProps {
    className?: string;
    animate?: boolean;
    style?: React.CSSProperties;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = '', animate = true, style }) => (
    <div
        className={`bg-slate-200 dark:bg-slate-700 rounded ${animate ? 'animate-pulse' : ''} ${className}`}
        style={style}
    />
);

// --- Text Lines Skeleton ---
interface TextSkeletonProps {
    lines?: number;
    lastLineWidth?: string;
}

export const TextSkeleton: React.FC<TextSkeletonProps> = ({ lines = 3, lastLineWidth = '60%' }) => (
    <div className="space-y-2">
        {Array.from({ length: lines }).map((_, i) => (
            <Skeleton
                key={i}
                className="h-4"
                style={{ width: i === lines - 1 ? lastLineWidth : '100%' } as any}
            />
        ))}
    </div>
);

// --- Card Skeleton ---
export const CardSkeleton: React.FC = () => (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700">
        <div className="flex justify-between items-start mb-4">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-4 w-4 rounded-full" />
        </div>
        <Skeleton className="h-5 w-full mb-2" />
        <Skeleton className="h-5 w-3/4 mb-4" />
        <TextSkeleton lines={2} />
        <div className="flex justify-between items-center mt-4 pt-3 border-t border-slate-200 dark:border-slate-700">
            <Skeleton className="h-3 w-24" />
            <div className="flex gap-2">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-3 w-16" />
            </div>
        </div>
    </div>
);

// --- Sector Card Skeleton ---
export const SectorCardSkeleton: React.FC = () => (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700">
        <div className="flex justify-between items-start mb-4">
            <Skeleton className="h-12 w-12 rounded-xl" />
            <div className="text-right">
                <Skeleton className="h-8 w-12 mb-1" />
                <Skeleton className="h-3 w-16" />
            </div>
        </div>
        <Skeleton className="h-5 w-40 mb-2" />
        <div className="flex items-center gap-2">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-4 w-16 rounded-full" />
        </div>
    </div>
);

// --- Score Gauge Skeleton ---
export const ScoreGaugeSkeleton: React.FC = () => (
    <div className="bg-white dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-2 mb-3">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-3 w-20" />
        </div>
        <div className="flex items-center justify-center mb-3">
            <Skeleton className="h-10 w-14" />
        </div>
        <Skeleton className="h-1.5 w-full rounded-full" />
    </div>
);

// --- Snapshot Card Skeleton ---
export const SnapshotSkeleton: React.FC = () => (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 border border-slate-700/50">
        <div className="flex justify-between items-start mb-5">
            <div>
                <Skeleton className="h-3 w-32 mb-2 bg-slate-700" />
                <Skeleton className="h-6 w-48 bg-slate-700" />
            </div>
            <div className="text-right">
                <Skeleton className="h-10 w-16 mb-1 bg-slate-700" />
                <Skeleton className="h-3 w-20 bg-slate-700" />
            </div>
        </div>
        <div className="grid grid-cols-3 gap-6 border-t border-slate-700/50 pt-5">
            {[1, 2, 3].map(i => (
                <div key={i}>
                    <Skeleton className="h-3 w-20 mb-2 bg-slate-700" />
                    <Skeleton className="h-7 w-14 bg-slate-700" />
                </div>
            ))}
        </div>
    </div>
);

// --- Rumor Card Skeleton ---
export const RumorCardSkeleton: React.FC = () => (
    <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800">
        <div className="flex justify-between items-start mb-4">
            <div className="flex gap-2">
                <Skeleton className="h-6 w-20 rounded-lg" />
                <Skeleton className="h-6 w-24 rounded-lg" />
            </div>
            <Skeleton className="h-5 w-16 rounded" />
        </div>
        <Skeleton className="h-5 w-full mb-2" />
        <Skeleton className="h-5 w-4/5 mb-4" />
        <div className="grid grid-cols-3 gap-3 mb-4">
            {[1, 2, 3].map(i => (
                <div key={i} className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg">
                    <Skeleton className="h-2 w-16 mb-2" />
                    <Skeleton className="h-2 w-full" />
                </div>
            ))}
        </div>
    </div>
);

// --- AI Report Skeleton ---
export const AIReportSkeleton: React.FC = () => (
    <div className="bg-white dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 space-y-4">
        <Skeleton className="h-8 w-2/3 mb-2" />
        <Skeleton className="h-4 w-1/3 mb-6" />
        <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
        </div>
        <Skeleton className="h-6 w-1/2 mt-6" />
        <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
        </div>
        <div className="bg-slate-100 dark:bg-slate-900 rounded-xl p-4 mt-6">
            <div className="flex justify-between mb-4">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-5 w-24" />
            </div>
            <Skeleton className="h-3 w-full rounded-full" />
        </div>
    </div>
);

// --- Dashboard Loading Skeleton ---
export const DashboardSkeleton: React.FC = () => (
    <div className="space-y-8 animate-fade-in">
        {/* Snapshot Skeleton */}
        <SnapshotSkeleton />

        {/* Critical Signals Skeleton */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-900/50 rounded-xl p-4 flex items-center gap-4">
            <Skeleton className="h-8 w-32 rounded-lg bg-blue-200 dark:bg-blue-800" />
            <Skeleton className="h-4 flex-1 bg-blue-200 dark:bg-blue-800" />
        </div>

        {/* Research Drops Skeleton */}
        <div>
            <Skeleton className="h-6 w-48 mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map(i => (
                    <CardSkeleton key={i} />
                ))}
            </div>
        </div>

        {/* Sector Grid Skeleton */}
        <div>
            <Skeleton className="h-6 w-40 mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => (
                    <SectorCardSkeleton key={i} />
                ))}
            </div>
        </div>
    </div>
);

// --- Sector Detail Skeleton ---
export const SectorDetailSkeleton: React.FC = () => (
    <div className="space-y-6 animate-fade-in">
        {/* Score Gauges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => (
                <ScoreGaugeSkeleton key={i} />
            ))}
        </div>

        {/* Reasoning Panel */}
        <div className="bg-white dark:bg-slate-800/50 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
            <div className="flex justify-between items-center mb-3">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-16 rounded-full" />
            </div>
            <TextSkeleton lines={3} />
        </div>

        {/* News/Research Tabs */}
        <div className="flex gap-4 border-b border-slate-200 dark:border-slate-700 pb-2">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-24" />
        </div>

        {/* Cards */}
        <div className="grid gap-4">
            {[1, 2, 3].map(i => (
                <CardSkeleton key={i} />
            ))}
        </div>
    </div>
);

export default {
    Skeleton,
    TextSkeleton,
    CardSkeleton,
    SectorCardSkeleton,
    ScoreGaugeSkeleton,
    SnapshotSkeleton,
    RumorCardSkeleton,
    AIReportSkeleton,
    DashboardSkeleton,
    SectorDetailSkeleton
};
