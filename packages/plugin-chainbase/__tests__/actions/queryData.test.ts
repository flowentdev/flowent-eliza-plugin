import { describe, expect, it, vi, beforeEach } from 'vitest';
import { queryBlockChainData } from '../../src/actions/queryData';
import { generateSQL, executeQuery } from '../../src/libs/chainbase';
import { ModelClass, generateText } from '@elizaos/core';

// Mock external dependencies
vi.mock('@elizaos/core', () => ({
    elizaLogger: {
        log: vi.fn(),
        error: vi.fn()
    },
    generateText: vi.fn(),
    ModelClass: {
        SMALL: 'small',
        LARGE: 'large'
    }
}));

vi.mock('../../src/libs/chainbase', () => ({
    generateSQL: vi.fn(),
    executeQuery: vi.fn()
}));

describe('queryBlockChainData', () => {
    let mockRuntime;
    let mockMessage;
    let mockCallback;

    beforeEach(() => {
        mockRuntime = {
            character: {
                settings: {
                    secrets: {
                        CHAINBASE_API_KEY: 'test-api-key'
                    }
                }
            }
        };

        mockMessage = {
            content: {
                text: 'query onchain data: Get the latest block number'
            }
        };

        mockCallback = vi.fn();

        // Reset all mocks
        vi.clearAllMocks();
    });

    describe('validation', () => {
        it('should validate successfully when API key is present', async () => {
            const result = await queryBlockChainData.validate(mockRuntime, mockMessage);
            expect(result).toBe(true);
        });

        it('should fail validation when API key is missing', async () => {
            const runtimeWithoutKey = {
                character: {
                    settings: {
                        secrets: {}
                    }
                }
            };
            const result = await queryBlockChainData.validate(runtimeWithoutKey, mockMessage);
            expect(result).toBe(false);
        });
    });

    describe('handler', () => {
        it('should handle valid query and return formatted response', async () => {
            const mockSQL = 'SELECT block_number FROM ethereum.blocks ORDER BY block_number DESC LIMIT 1';
            const mockQueryResult = {
                columns: ['block_number'],
                data: [[12345678]],
                totalRows: 1
            };
            const mockFormattedResponse = 'The latest block number is 12345678';

            vi.mocked(generateSQL).mockResolvedValue(mockSQL);
            vi.mocked(executeQuery).mockResolvedValue(mockQueryResult);
            vi.mocked(generateText).mockResolvedValue(mockFormattedResponse);

            await queryBlockChainData.handler(mockRuntime, mockMessage, undefined, undefined, mockCallback);

            expect(generateSQL).toHaveBeenCalledWith('Get the latest block number');
            expect(executeQuery).toHaveBeenCalledWith(mockSQL);
            expect(generateText).toHaveBeenCalled();
            expect(mockCallback).toHaveBeenCalledWith({
                text: mockFormattedResponse
            });
        });

        it('should handle missing query prefix', async () => {
            const messageWithoutPrefix = {
                content: {
                    text: 'Get the latest block number'
                }
            };

            await queryBlockChainData.handler(mockRuntime, messageWithoutPrefix, undefined, undefined, mockCallback);

            expect(mockCallback).toHaveBeenCalledWith({
                text: expect.stringContaining('Please use the format: query onchain data:')
            });
            expect(generateSQL).not.toHaveBeenCalled();
        });

        it('should handle empty query', async () => {
            const messageWithEmptyQuery = {
                content: {
                    text: 'query onchain data: '
                }
            };

            await queryBlockChainData.handler(mockRuntime, messageWithEmptyQuery, undefined, undefined, mockCallback);

            expect(mockCallback).toHaveBeenCalledWith({
                text: expect.stringContaining('Please provide a specific query')
            });
            expect(generateSQL).not.toHaveBeenCalled();
        });

        it('should handle API errors gracefully', async () => {
            vi.mocked(generateSQL).mockRejectedValue(new Error('API Error'));

            await queryBlockChainData.handler(mockRuntime, mockMessage, undefined, undefined, mockCallback);

            expect(mockCallback).toHaveBeenCalledWith({
                text: expect.stringContaining('An error occurred')
            });
        });
    });

    describe('action properties', () => {
        it('should have correct action properties', () => {
            expect(queryBlockChainData.name).toBe('QUERY_BLOCKCHAIN_DATA');
            expect(queryBlockChainData.description).toBeDefined();
            expect(queryBlockChainData.similes).toBeDefined();
            expect(Array.isArray(queryBlockChainData.similes)).toBe(true);
            expect(queryBlockChainData.examples).toBeDefined();
            expect(Array.isArray(queryBlockChainData.examples)).toBe(true);
        });
    });
});
