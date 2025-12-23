// ============================================================
// GICC - AI Analysis Components
// War Room, Impact Matrix, Smart Chart
// ============================================================

import React from 'react';
import {
    Swords,
    TrendingUp,
    TrendingDown,
    Minus,
    Scale,
    ArrowUpRight,
    ArrowDownRight,
    MinusCircle
} from 'lucide-react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    ReferenceDot
} from 'recharts';
import { WarRoomContent, ImpactSignal, SmartChart } from '../types';

// --- War Room View ---
interface WarRoomViewProps {
    data: WarRoomContent;
}

export const WarRoomView: React.FC<WarRoomViewProps> = ({ data }) => {
    const bullWidth = `${data.bullScore}%`;
    const bearWidth = `${data.bearScore}%`;

    return (
        <div className="bg-white dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-lg">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-6">
                <Swords className="text-purple-500" />
                War Room: Bull vs Bear Debate
            </h3>

            {/* Score Bar */}
            <div className="mb-6">
                <div className="flex justify-between text-sm font-bold mb-2">
                    <span className="text-green-500 flex items-center gap-1">
                        <TrendingUp size={16} /> BULL {data.bullScore}%
                    </span>
                    <span className="text-red-500 flex items-center gap-1">
                        BEAR {data.bearScore}% <TrendingDown size={16} />
                    </span>
                </div>
                <div className="h-4 flex rounded-full overflow-hidden bg-slate-200 dark:bg-slate-700">
                    <div
                        className="bg-gradient-to-r from-green-400 to-green-500 transition-all duration-500"
                        style={{ width: bullWidth }}
                    />
                    <div
                        className="bg-gradient-to-r from-red-500 to-red-400 transition-all duration-500"
                        style={{ width: bearWidth }}
                    />
                </div>
            </div>

            {/* Cases */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
                {/* Bull Case */}
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl border border-green-200 dark:border-green-800">
                    <h4 className="text-green-700 dark:text-green-400 font-bold flex items-center gap-2 mb-3">
                        <TrendingUp size={18} />
                        Bull Case
                    </h4>
                    <ul className="space-y-2">
                        {data.bullCase.map((point, i) => (
                            <li key={i} className="text-sm text-green-800 dark:text-green-300 flex items-start gap-2">
                                <span className="text-green-500 mt-1">•</span>
                                {point}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Bear Case */}
                <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-xl border border-red-200 dark:border-red-800">
                    <h4 className="text-red-700 dark:text-red-400 font-bold flex items-center gap-2 mb-3">
                        <TrendingDown size={18} />
                        Bear Case
                    </h4>
                    <ul className="space-y-2">
                        {data.bearCase.map((point, i) => (
                            <li key={i} className="text-sm text-red-800 dark:text-red-300 flex items-start gap-2">
                                <span className="text-red-500 mt-1">•</span>
                                {point}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Verdict */}
            <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                <h4 className="text-slate-700 dark:text-slate-300 font-bold flex items-center gap-2 mb-2">
                    <Scale size={18} />
                    Strategic Verdict
                </h4>
                <p className="text-slate-800 dark:text-slate-200 font-medium">
                    {data.verdict}
                </p>
            </div>
        </div>
    );
};

// --- Impact Matrix View ---
interface ImpactMatrixProps {
    data: ImpactSignal[];
}

export const ImpactMatrixView: React.FC<ImpactMatrixProps> = ({ data }) => {
    const getSignalIcon = (signal: string) => {
        switch (signal) {
            case 'Positive':
            case 'Tailwind':
                return <ArrowUpRight className="text-green-500" size={18} />;
            case 'Negative':
                return <ArrowDownRight className="text-red-500" size={18} />;
            case 'Caution':
                return <ArrowDownRight className="text-yellow-500" size={18} />;
            default:
                return <MinusCircle className="text-slate-400" size={18} />;
        }
    };

    const getSignalColor = (signal: string): string => {
        switch (signal) {
            case 'Positive':
            case 'Tailwind':
                return 'border-l-green-500 bg-green-50 dark:bg-green-900/20';
            case 'Negative':
                return 'border-l-red-500 bg-red-50 dark:bg-red-900/20';
            case 'Caution':
                return 'border-l-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
            default:
                return 'border-l-slate-400 bg-slate-50 dark:bg-slate-800/50';
        }
    };

    return (
        <div className="bg-white dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-lg">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
                Impact Matrix: Asset Class Signals
            </h3>

            <div className="grid gap-3">
                {data.map((item, i) => (
                    <div
                        key={i}
                        className={`p-4 rounded-lg border-l-4 ${getSignalColor(item.signal)}`}
                    >
                        <div className="flex items-center justify-between mb-2">
                            <h4 className="font-bold text-slate-800 dark:text-slate-200">
                                {item.assetClass}
                            </h4>
                            <div className="flex items-center gap-2">
                                {getSignalIcon(item.signal)}
                                <span className={`text-sm font-bold ${item.signal === 'Positive' || item.signal === 'Tailwind' ? 'text-green-600 dark:text-green-400' :
                                        item.signal === 'Negative' ? 'text-red-600 dark:text-red-400' :
                                            item.signal === 'Caution' ? 'text-yellow-600 dark:text-yellow-400' :
                                                'text-slate-500'
                                    }`}>
                                    {item.signal}
                                </span>
                            </div>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            {item.reasoning}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- Smart Chart View ---
interface SmartChartViewProps {
    data: SmartChart;
}

export const SmartChartView: React.FC<SmartChartViewProps> = ({ data }) => {
    const chartData = data.data.map(d => ({
        ...d,
        hasAnnotation: !!d.annotation
    }));

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            const point = chartData.find(d => d.label === label);
            return (
                <div className="bg-slate-900 text-white p-3 rounded-lg shadow-xl border border-slate-700">
                    <p className="font-bold">{label}</p>
                    <p className="text-blue-400">Value: {payload[0].value}</p>
                    {point?.annotation && (
                        <p className="text-yellow-400 text-sm mt-1">📌 {point.annotation}</p>
                    )}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="bg-white dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-lg">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                {data.title}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                {data.description}
            </p>

            <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    {data.type === 'line' ? (
                        <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                            <XAxis
                                dataKey="label"
                                stroke="#9CA3AF"
                                tick={{ fontSize: 12 }}
                            />
                            <YAxis
                                stroke="#9CA3AF"
                                tick={{ fontSize: 12 }}
                                label={{ value: data.yAxisLabel, angle: -90, position: 'insideLeft', fill: '#9CA3AF' }}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Line
                                type="monotone"
                                dataKey="value"
                                stroke="#3B82F6"
                                strokeWidth={3}
                                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                                activeDot={{ r: 6, fill: '#60A5FA' }}
                            />
                            {/* Annotation dots */}
                            {chartData.filter(d => d.annotation).map((d, i) => (
                                <ReferenceDot
                                    key={i}
                                    x={d.label}
                                    y={d.value}
                                    r={8}
                                    fill="#FBBF24"
                                    stroke="#fff"
                                    strokeWidth={2}
                                />
                            ))}
                        </LineChart>
                    ) : (
                        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                            <XAxis
                                dataKey="label"
                                stroke="#9CA3AF"
                                tick={{ fontSize: 12 }}
                            />
                            <YAxis
                                stroke="#9CA3AF"
                                tick={{ fontSize: 12 }}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar
                                dataKey="value"
                                fill="#3B82F6"
                                radius={[4, 4, 0, 0]}
                            />
                        </BarChart>
                    )}
                </ResponsiveContainer>
            </div>

            {/* Annotations Legend */}
            {chartData.some(d => d.annotation) && (
                <div className="mt-4 flex flex-wrap gap-3">
                    {chartData.filter(d => d.annotation).map((d, i) => (
                        <span
                            key={i}
                            className="text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 px-2 py-1 rounded-full"
                        >
                            📌 {d.label}: {d.annotation}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
};
