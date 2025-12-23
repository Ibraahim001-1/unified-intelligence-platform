import { describe, it, expect, vi, beforeEach } from 'vitest';
import { generateAnalysis } from './geminiService';
import { AnalysisParams } from '../types';

// Mock the environment variables
const mocks = vi.hoisted(() => {
    return {
        GoogleGenerativeAI: vi.fn()
    };
});

vi.mock('@google/generative-ai', () => {
    return {
        GoogleGenerativeAI: mocks.GoogleGenerativeAI
    };
});

describe('geminiService', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.unstubAllEnvs();
    });

    it('should fall back to DEMO mode if no API key is present', async () => {
        // Clear API key
        vi.stubEnv('VITE_API_KEY', '');

        const params: AnalysisParams = {
            query: 'Test Query',
            secondaryQuery: '',
            selectedModel: 'gemini-1.5-flash',
            countryFocus: [],
            assetFocus: [],
            riskFocus: [],
            horizon: '1 Month',
            language: 'English'
        };

        const result = await generateAnalysis(params);

        expect(result).toBeDefined();
        // Demo mode always returns specific structure
        expect(result.text).toContain('Demo Mode');
        expect(result.warRoom).toBeDefined();
    });

    it('should use Real API if API key is present', async () => {
        // Set API KEY
        vi.stubEnv('VITE_API_KEY', 'TEST_KEY');

        const mockGenerateContent = vi.fn().mockResolvedValue({
            response: {
                text: () => 'Real AI Response <json>{"warRoom": {}}</json>'
            }
        });

        const mockGetGenerativeModel = vi.fn().mockReturnValue({
            generateContent: mockGenerateContent
        });

        mocks.GoogleGenerativeAI.mockImplementation(() => ({
            getGenerativeModel: mockGetGenerativeModel
        }));

        const params: AnalysisParams = {
            query: 'Real Test',
            secondaryQuery: '',
            selectedModel: 'gemini-1.5-flash',
            countryFocus: [],
            assetFocus: [],
            riskFocus: [],
            horizon: '1 Month',
            language: 'English'
        };

        const result = await generateAnalysis(params);

        expect(mocks.GoogleGenerativeAI).toHaveBeenCalledWith('TEST_KEY');
        expect(mockGetGenerativeModel).toHaveBeenCalled();
        expect(mockGenerateContent).toHaveBeenCalled();
        expect(result.text).toBe('Real AI Response');
    });
});
