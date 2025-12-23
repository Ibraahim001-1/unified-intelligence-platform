// ============================================================
// GICC - Onboarding Tour Component
// Guides new users through the application
// ============================================================

import React, { useState, useEffect } from 'react';
import { X, ArrowRight, ArrowLeft, Check, HelpCircle } from 'lucide-react';

interface TourStep {
    target: string;
    title: string;
    titleSo: string;
    content: string;
    contentSo: string;
    position: 'top' | 'bottom' | 'left' | 'right';
}

const TOUR_STEPS: TourStep[] = [
    {
        target: 'sidebar',
        title: 'Navigation Sidebar',
        titleSo: 'Sidebar-ka Navigation-ka',
        content: 'Use this sidebar to navigate between different views like Dashboard, AI Analysis, Sectors, and Rumor Overlay.',
        contentSo: 'Sidebar-kan waxaad isticmaashaa inaad u gudubto views-ka kala duwan sida Dashboard, AI Analysis, Sectors, iyo Rumor Overlay.',
        position: 'right'
    },
    {
        target: 'dashboard',
        title: 'Intelligence Dashboard',
        titleSo: 'Dashboard-ka Sirdoonka',
        content: 'This is your main view. It shows the Daily Snapshot, Critical Signals, and Sector Risk Monitor.',
        contentSo: 'Kani waa view-gaaga ugu muhiimsan. Wuxuu muujiyaa Daily Snapshot, Critical Signals, iyo Sector Risk Monitor.',
        position: 'bottom'
    },
    {
        target: 'sectors',
        title: 'Sector Cards',
        titleSo: 'Kaararka Sector-yada',
        content: 'Click on any sector card to see detailed scores, AI reasoning, news and research for that sector.',
        contentSo: 'Riix kaar kasta oo sector ah si aad u aragto scores-ka faahfaahsan, sharaxaada AI-ga, wararka iyo research-ka.',
        position: 'top'
    },
    {
        target: 'ai-analysis',
        title: 'AI Analysis',
        titleSo: 'Falanqaynta AI-ga',
        content: 'Generate custom intelligence reports using Gemini AI. Enter your topic and get War Room debates, Impact Matrix, and Smart Charts.',
        contentSo: 'Samee reports cusub adigoo isticmaalaya Gemini AI. Gali topic-kaaga oo hel War Room, Impact Matrix, iyo Smart Charts.',
        position: 'right'
    },
    {
        target: 'search',
        title: 'Global Search',
        titleSo: 'Raadinta Guud',
        content: 'Search across all intelligence items, news, and research. Type any keyword to find relevant content.',
        contentSo: 'Raadi dhammaan items-ka, wararka, iyo research-ka. Qor keyword si aad u hesho content-ka la xidhiidha.',
        position: 'bottom'
    },
    {
        target: 'theme',
        title: 'Theme Toggle',
        titleSo: 'Beddelka Theme-ka',
        content: 'Switch between Dark and Light mode by clicking the sun/moon icon.',
        contentSo: 'U beddel Dark iyo Light mode adigoo riixa icon-ka qorraxda/dayaxa.',
        position: 'bottom'
    },
    {
        target: 'watchlist',
        title: 'Your Watchlist',
        titleSo: 'Watchlist-kaaga',
        content: 'Add keywords you want to track. Items matching your watchlist will be highlighted with a yellow border.',
        contentSo: 'Ku dar keywords-ka aad rabto inaad la socoto. Items-ka u dhigma waxay yeelanayaan border jaalle.',
        position: 'bottom'
    }
];

interface OnboardingTourProps {
    onComplete: () => void;
    onSkip: () => void;
    language?: 'en' | 'so';
}

const OnboardingTour: React.FC<OnboardingTourProps> = ({
    onComplete,
    onSkip,
    language = 'so'
}) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    const step = TOUR_STEPS[currentStep];
    const isLastStep = currentStep === TOUR_STEPS.length - 1;
    const isFirstStep = currentStep === 0;

    const handleNext = () => {
        if (isLastStep) {
            localStorage.setItem('gicc_tour_completed', 'true');
            onComplete();
        } else {
            setCurrentStep(prev => prev + 1);
        }
    };

    const handlePrev = () => {
        if (!isFirstStep) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const handleSkip = () => {
        localStorage.setItem('gicc_tour_completed', 'true');
        onSkip();
    };

    if (!isVisible) return null;

    return (
        <>
            {/* Overlay */}
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]" />

            {/* Tour Tooltip */}
            <div className="fixed inset-0 z-[101] flex items-center justify-center p-4">
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full p-6 animate-fade-in border border-slate-200 dark:border-slate-700">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/50 rounded-xl flex items-center justify-center">
                                <HelpCircle className="text-blue-600 dark:text-blue-400" size={22} />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                                    {language === 'so' ? step.titleSo : step.title}
                                </h3>
                                <p className="text-xs text-slate-500">
                                    Step {currentStep + 1} of {TOUR_STEPS.length}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={handleSkip}
                            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Progress Bar */}
                    <div className="h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full mb-5 overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
                            style={{ width: `${((currentStep + 1) / TOUR_STEPS.length) * 100}%` }}
                        />
                    </div>

                    {/* Content */}
                    <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                        {language === 'so' ? step.contentSo : step.content}
                    </p>

                    {/* Navigation Buttons */}
                    <div className="flex justify-between items-center">
                        <button
                            onClick={handleSkip}
                            className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 text-sm font-medium transition-colors"
                        >
                            Skip Tour
                        </button>

                        <div className="flex gap-2">
                            {!isFirstStep && (
                                <button
                                    onClick={handlePrev}
                                    className="flex items-center gap-1 px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                                >
                                    <ArrowLeft size={16} />
                                    Back
                                </button>
                            )}
                            <button
                                onClick={handleNext}
                                className="flex items-center gap-1 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors"
                            >
                                {isLastStep ? (
                                    <>
                                        <Check size={16} />
                                        Finish
                                    </>
                                ) : (
                                    <>
                                        Next
                                        <ArrowRight size={16} />
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Step Dots */}
                    <div className="flex justify-center gap-1.5 mt-5">
                        {TOUR_STEPS.map((_, idx) => (
                            <div
                                key={idx}
                                className={`w-2 h-2 rounded-full transition-colors ${idx === currentStep
                                        ? 'bg-blue-600'
                                        : idx < currentStep
                                            ? 'bg-green-500'
                                            : 'bg-slate-300 dark:bg-slate-600'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default OnboardingTour;
