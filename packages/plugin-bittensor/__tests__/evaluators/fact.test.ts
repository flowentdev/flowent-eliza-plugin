import { describe, expect, it, vi, beforeEach } from 'vitest';
import { factEvaluator } from '../../src/evaluators/fact';
import { composeContext, generateObjectArray, MemoryManager } from '@elizaos/core';

vi.mock('@elizaos/core', () => ({
    composeContext: vi.fn(),
    generateObjectArray: vi.fn(),
    MemoryManager: vi.fn().mockImplementation((config: any) => ({
        getMemoriesByEvaluator: vi.fn().mockResolvedValue([]),
        addMemory: vi.fn().mockResolvedValue(true),
        addEmbeddingToMemory: vi.fn().mockResolvedValue({
            id: 'test-memory-id',
            content: {
                text: 'Test memory content'
            }
        }),
        createMemory: vi.fn().mockResolvedValue({
            id: 'test-memory-id',
            content: {
                text: 'Test memory content'
            }
        })
    })),
    ModelClass: {
        SMALL: 'small'
    }
}));

describe('factEvaluator', () => {
    let mockRuntime;
    let mockMessage;

    beforeEach(() => {
        mockRuntime = {
            character: {
                settings: {}
            },
            messageManager: {
                countMemories: vi.fn().mockResolvedValue(5)
            },
            composeState: vi.fn().mockResolvedValue({
                agentId: 'test-agent',
                roomId: 'test-room'
            }),
            getConversationLength: vi.fn().mockReturnValue(10)
        };

        mockMessage = {
            content: {
                text: 'I live in New York and work as a software engineer.'
            },
            roomId: 'test-room'
        };

        // Reset all mocks
        vi.clearAllMocks();
    });

    describe('validation', () => {
        it('should validate successfully', async () => {
            const result = await factEvaluator.validate(mockRuntime, mockMessage);
            expect(result).toBe(true);
            expect(mockRuntime.messageManager.countMemories).toHaveBeenCalledWith('test-room');
            expect(mockRuntime.getConversationLength).toHaveBeenCalled();
        });
    });

    describe('evaluator properties', () => {
        it('should have correct evaluator properties', () => {
            expect(factEvaluator.name).toBe('GET_FACTS');
            expect(factEvaluator.similes).toContain('GET_CLAIMS');
            expect(factEvaluator.description).toBeDefined();
            expect(factEvaluator.description).toContain('Extract factual information');
            expect(factEvaluator.examples).toBeDefined();
            expect(Array.isArray(factEvaluator.examples)).toBe(true);
        });

        it('should have valid examples', () => {
            factEvaluator.examples.forEach(example => {
                expect(example).toBeDefined();
                // Will add more specific example validations based on the example structure
            });
        });
    });

    describe('fact extraction', () => {
        it('should handle fact extraction', async () => {
            const mockFacts = [
                {
                    claim: 'User lives in New York',
                    type: 'fact',
                    in_bio: false,
                    already_known: false
                },
                {
                    claim: 'User works as a software engineer',
                    type: 'fact',
                    in_bio: false,
                    already_known: false
                }
            ];

            vi.mocked(composeContext).mockReturnValue('mock-context');
            vi.mocked(generateObjectArray).mockResolvedValue(mockFacts);

            const result = await factEvaluator.handler(mockRuntime, mockMessage);

            expect(composeContext).toHaveBeenCalled();
            expect(generateObjectArray).toHaveBeenCalled();
            expect(result).toBeDefined();
        });
    });
});
