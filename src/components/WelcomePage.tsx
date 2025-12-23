// ============================================================
// GICC - Welcome/Login Page Component
// Shown when user first enters the application
// ============================================================

import React, { useState, useEffect } from 'react';
import { Globe, ArrowRight, Sparkles, Shield, TrendingUp, Zap } from 'lucide-react';

interface WelcomePageProps {
    onEnter: () => void;
}

const WelcomePage: React.FC<WelcomePageProps> = ({ onEnter }) => {
    const [isAnimated, setIsAnimated] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    useEffect(() => {
        setTimeout(() => setIsAnimated(true), 100);
    }, []);

    const handleEnter = () => {
        if (rememberMe) {
            localStorage.setItem('gicc_welcomed', 'true');
        }
        onEnter();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 flex items-center justify-center p-4 overflow-hidden relative">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
            </div>

            {/* Grid Pattern Overlay */}
            <div
                className="absolute inset-0 opacity-5"
                style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                     linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                    backgroundSize: '50px 50px'
                }}
            />

            {/* Main Content */}
            <div className={`relative z-10 max-w-2xl w-full text-center transform transition-all duration-1000 ${isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>

                {/* Logo */}
                <div className="mb-8">
                    <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl shadow-2xl shadow-blue-500/30 mb-6 transform hover:scale-105 transition-transform">
                        <Globe className="text-white" size={48} />
                    </div>

                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
                        GICC
                    </h1>

                    <p className="text-xl md:text-2xl text-blue-400 font-medium mb-2">
                        Global Intelligence Command Center
                    </p>

                    <p className="text-slate-400 text-lg max-w-md mx-auto">
                        Platform-ka Sirdoonka Caalamiga ee Falanqaynta Macro iyo Wararka
                    </p>
                </div>

                {/* Feature Pills */}
                <div className="flex flex-wrap justify-center gap-3 mb-10">
                    <div className="flex items-center gap-2 bg-white/5 backdrop-blur px-4 py-2 rounded-full border border-white/10">
                        <TrendingUp size={16} className="text-green-400" />
                        <span className="text-slate-300 text-sm">9 Sector Monitoring</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/5 backdrop-blur px-4 py-2 rounded-full border border-white/10">
                        <Sparkles size={16} className="text-purple-400" />
                        <span className="text-slate-300 text-sm">AI-Powered Analysis</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/5 backdrop-blur px-4 py-2 rounded-full border border-white/10">
                        <Shield size={16} className="text-red-400" />
                        <span className="text-slate-300 text-sm">Rumor Surveillance</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/5 backdrop-blur px-4 py-2 rounded-full border border-white/10">
                        <Zap size={16} className="text-yellow-400" />
                        <span className="text-slate-300 text-sm">Real-time Updates</span>
                    </div>
                </div>

                {/* Enter Button */}
                <button
                    onClick={handleEnter}
                    className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-lg px-10 py-4 rounded-2xl shadow-xl shadow-blue-600/30 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/40"
                >
                    <span>Gal Platform-ka</span>
                    <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                </button>

                {/* Remember Me */}
                <div className="mt-6 flex items-center justify-center gap-2">
                    <input
                        type="checkbox"
                        id="rememberMe"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-4 h-4 rounded bg-slate-800 border-slate-600 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="rememberMe" className="text-slate-400 text-sm cursor-pointer">
                        Ha i weydiin markale (Remember me)
                    </label>
                </div>

                {/* Footer */}
                <div className="mt-16 text-slate-500 text-sm">
                    <p>Version 1.0 • Built in Mogadishu, Somalia 🇸🇴</p>
                </div>
            </div>
        </div>
    );
};

export default WelcomePage;
