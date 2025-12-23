import React from 'react';
import {
    Globe,
    X,
    LayoutDashboard,
    Sparkles,
    ShieldAlert,
    FileText
} from 'lucide-react';
import { SECTORS } from '../utils/mockDataGenerator';
import { SectorID } from '../types';

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

export default Sidebar;
