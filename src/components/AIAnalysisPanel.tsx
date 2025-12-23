import React, { useState } from 'react';
import { Sparkles, RefreshCw } from 'lucide-react';
import { usePersistentState } from '../hooks';
import { generateAnalysis } from '../services/geminiService';
import {
    AnalysisParams,
    AnalysisResult,
    COUNTRIES,
    HORIZONS,
    MODELS
} from '../types';

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

export default AIAnalysisPanel;
