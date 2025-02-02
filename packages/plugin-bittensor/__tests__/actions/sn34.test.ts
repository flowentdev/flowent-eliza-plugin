import { describe, expect, it, vi, beforeEach } from 'vitest';
import { analyzeImage, analysisHistory } from '../../src/actions/sn34';
import { elizaLogger } from '@elizaos/core';

vi.mock('@elizaos/core', () => ({
    elizaLogger: {
        info: vi.fn(),
        error: vi.fn(),
        debug: vi.fn(),
    }
}));

describe('sn34', () => {
    let mockRuntime;
    let mockMessage;
    let mockState;
    let mockCallback;

    beforeEach(() => {
        mockRuntime = {
            character: {
                settings: {
                    secrets: {
                        BITMIND: 'test-api-key'
                    }
                }
            }
        };

        mockMessage = {
            content: {
                text: 'analyze this image: https://example.com/image.jpg'
            }
        };

        mockState = {};
        mockCallback = vi.fn();

        // Reset all mocks
        vi.clearAllMocks();
    });

    describe('analyzeImage', () => {
        describe('validation', () => {
            it('should validate when image URL is present', async () => {
                const result = await analyzeImage.validate(mockRuntime, mockMessage);
                expect(result).toBe(true);
                expect(elizaLogger.info).toHaveBeenCalledWith('🔍 BitMind: Validating analysis request...');
            });

            it('should fail validation when no image URL is present', async () => {
                mockMessage.content.text = 'analyze this image';
                const result = await analyzeImage.validate(mockRuntime, mockMessage);
                expect(result).toBe(false);
                expect(elizaLogger.error).toHaveBeenCalledWith('❌ BitMind: No image URL found in request');
            });

            it('should fail validation when API credentials are missing', async () => {
                mockRuntime.character.settings.secrets.BITMIND = undefined;
                const result = await analyzeImage.validate(mockRuntime, mockMessage);
                expect(result).toBe(false);
                expect(elizaLogger.error).toHaveBeenCalledWith('❌ BitMind: API credentials not configured');
            });
        });

        describe('action properties', () => {
            it('should have correct action properties', () => {
                expect(analyzeImage.name).toBe('DETECT_IMAGE');
                expect(analyzeImage.similes).toEqual([
                    'ANALYZE_IMAGE',
                    'VERIFY_IMAGE',
                    'BITMIND_DETECTION',
                    'AI_DETECTION',
                    'REAL_OR_FAKE'
                ]);
                expect(analyzeImage.examples).toBeDefined();
                expect(Array.isArray(analyzeImage.examples)).toBe(true);
            });

            it('should have valid examples', () => {
                analyzeImage.examples.forEach(example => {
                    expect(Array.isArray(example)).toBe(true);
                    example.forEach(interaction => {
                        expect(interaction).toHaveProperty('user');
                        expect(interaction).toHaveProperty('content');
                    });
                });
            });
        });
    });

    describe('analysisHistory', () => {
        describe('validation', () => {
            it('should validate successfully', async () => {
                const result = await analysisHistory.validate(mockRuntime);
                expect(result).toBe(true);
            });
        });

        describe('action properties', () => {
            it('should have correct action properties', () => {
                expect(analysisHistory.name).toBe('IMAGE_REPORT');
                expect(analysisHistory.similes).toEqual([
                    'SHOW_DETECTIONS',
                    'IMAGE_HISTORY',
                    'PAST_ANALYSES',
                    'DETECTION_HISTORY'
                ]);
                expect(analysisHistory.description).toBe('Display history of AI image analysis results');
                expect(analysisHistory.examples).toBeDefined();
                expect(Array.isArray(analysisHistory.examples)).toBe(true);
            });

            it('should have valid examples', () => {
                analysisHistory.examples.forEach(example => {
                    expect(Array.isArray(example)).toBe(true);
                    example.forEach(interaction => {
                        expect(interaction).toHaveProperty('user');
                        expect(interaction).toHaveProperty('content');
                    });
                });
            });
        });
    });
});
