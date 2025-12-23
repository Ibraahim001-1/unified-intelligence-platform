// ============================================================
// GICC - Custom React Hooks
// ============================================================

import { useState, useEffect, useCallback } from 'react';

// --- Persistent State Hook ---
// Saves state to localStorage and recovers on reload
export function usePersistentState<T>(key: string, defaultValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
    const [state, setState] = useState<T>(() => {
        try {
            const stored = localStorage.getItem(key);
            if (stored) {
                return JSON.parse(stored);
            }
        } catch (e) {
            console.warn(`Failed to parse localStorage key "${key}":`, e);
            localStorage.removeItem(key);
        }
        return defaultValue;
    });

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(state));
        } catch (e) {
            console.warn(`Failed to save to localStorage key "${key}":`, e);
        }
    }, [key, state]);

    return [state, setState];
}

// --- Theme Hook ---
export function useTheme() {
    const [isDarkMode, setIsDarkMode] = usePersistentState('gicc_theme', true);

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
            document.documentElement.classList.remove('light');
        } else {
            document.documentElement.classList.remove('dark');
            document.documentElement.classList.add('light');
        }
    }, [isDarkMode]);

    const toggleTheme = useCallback(() => {
        setIsDarkMode(prev => !prev);
    }, [setIsDarkMode]);

    return { isDarkMode, toggleTheme };
}

// --- Watchlist Hook ---
export function useWatchlist() {
    const [watchlist, setWatchlist] = usePersistentState<string[]>('gicc_watchlist', ['Bitcoin', 'Inflation', 'Recession']);

    const addKeyword = useCallback((keyword: string) => {
        if (keyword.trim() && !watchlist.includes(keyword.trim())) {
            setWatchlist(prev => [...prev, keyword.trim()]);
        }
    }, [watchlist, setWatchlist]);

    const removeKeyword = useCallback((keyword: string) => {
        setWatchlist(prev => prev.filter(k => k !== keyword));
    }, [setWatchlist]);

    const isMatch = useCallback((text: string): boolean => {
        const lowerText = text.toLowerCase();
        return watchlist.some(keyword => lowerText.includes(keyword.toLowerCase()));
    }, [watchlist]);

    return { watchlist, addKeyword, removeKeyword, isMatch };
}

// --- Debounce Hook ---
export function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => clearTimeout(handler);
    }, [value, delay]);

    return debouncedValue;
}

// --- Mobile Detection Hook ---
export function useIsMobile(breakpoint: number = 768): boolean {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < breakpoint);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, [breakpoint]);

    return isMobile;
}

// --- Keyboard Shortcut Hook ---
export function useKeyboardShortcut(key: string, callback: () => void, ctrlKey = false) {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === key && (!ctrlKey || e.ctrlKey || e.metaKey)) {
                e.preventDefault();
                callback();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [key, callback, ctrlKey]);
}
