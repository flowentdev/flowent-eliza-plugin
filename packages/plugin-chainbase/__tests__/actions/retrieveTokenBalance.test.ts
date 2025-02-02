import { describe, expect, it, vi, beforeEach } from 'vitest';
import { retrieveTokenBalance } from '../../src/actions/retrieveTokenBalance';
import { getTokenBalances } from '../../src/libs/chainbase';
import { ModelClass, composeContext, generateObject, generateText } from '@elizaos/core';

// Mock external dependencies
vi.mock('@elizaos/core', () => ({
    elizaLogger: {
        log: vi.fn(),
        error: vi.fn()
    },
    composeContext: vi.fn(),
    generateObject: vi.fn(),
    generateText: vi.fn(),
    ModelClass: {
        SMALL: 'small',
        LARGE: 'large'
    }
}));

vi.mock('../../src/libs/chainbase', () => ({
    getTokenBalances: vi.fn()
}));

describe('retrieveTokenBalance', () => {
    let mockRuntime;
    let mockMessage;
    let mockState;
    let mockCallback;

    beforeEach(() => {
        mockRuntime = {
            character: {
                settings: {
                    secrets: {
                        CHAINBASE_API_KEY: 'test-api-key'
                    }
                }
            },
            composeState: vi.fn().mockResolvedValue({
                agentId: 'test-agent',
                roomId: 'test-room'
            }),
            updateRecentMessageState: vi.fn().mockImplementation(state => Promise.resolve(state))
        };

        mockMessage = {
            content: {
                text: 'Get token balances for address 0x123'
            }
        };

        mockState = {
            agentId: 'test-agent',
            roomId: 'test-room'
        };

        mockCallback = vi.fn();

        // Reset all mocks
        vi.clearAllMocks();
    });

    describe('validation', () => {
        it('should validate successfully when API key is present', async () => {
            const result = await retrieveTokenBalance.validate(mockRuntime, mockMessage);
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
            const result = await retrieveTokenBalance.validate(runtimeWithoutKey, mockMessage);
            expect(result).toBe(false);
        });
    });

    describe('handler', () => {
        it('should handle valid token balance request', async () => {
            const mockQueryParams = {
                object: {
                    chain_id: '1',
                    address: '0x1234567890123456789012345678901234567890',
                    contract_address: '0x4567890123456789012345678901234567890123'
                }
            };

            const mockTokens = [{
                name: 'Test Token',
                symbol: 'TEST',
                balance: '0x0de0b6b3a7640000', // 1 ETH in hex
                decimals: 18,
                contract_address: '0x456'
            }];

            const mockFormattedResponse = 'Test Token balance: 1.0 TEST';

            vi.mocked(composeContext).mockReturnValue('mock-context');
            vi.mocked(generateObject).mockResolvedValue(mockQueryParams);
            vi.mocked(getTokenBalances).mockResolvedValue(mockTokens);
            vi.mocked(generateText).mockResolvedValue(mockFormattedResponse);

            await retrieveTokenBalance.handler(mockRuntime, mockMessage, mockState, undefined, mockCallback);

            expect(composeContext).toHaveBeenCalled();
            expect(generateObject).toHaveBeenCalled();
            expect(getTokenBalances).toHaveBeenCalledWith({
                chain_id: 1,
                address: '0x1234567890123456789012345678901234567890',
                contract_address: '0x4567890123456789012345678901234567890123'
            });
            expect(mockCallback).toHaveBeenCalledWith({
                text: mockFormattedResponse
            });
        });

        it('should handle invalid query parameters', async () => {
            const mockInvalidQueryParams = {
                object: {
                    // Missing required fields
                }
            };

            vi.mocked(composeContext).mockReturnValue('mock-context');
            vi.mocked(generateObject).mockResolvedValue(mockInvalidQueryParams);

            await retrieveTokenBalance.handler(mockRuntime, mockMessage, mockState, undefined, mockCallback);

            expect(mockCallback).toHaveBeenCalledWith(
                {
                    text: 'Invalid query params. Please check the inputs.'
                },
                []
            );
            expect(getTokenBalances).not.toHaveBeenCalled();
        });

        it('should handle API errors gracefully', async () => {
            const mockQueryParams = {
                object: {
                    chain_id: '1',
                    address: '0x1234567890123456789012345678901234567890',
                    contract_address: '0x4567890123456789012345678901234567890123'
                }
            };

            vi.mocked(composeContext).mockReturnValue('mock-context');
            vi.mocked(generateObject).mockResolvedValue(mockQueryParams);
            vi.mocked(getTokenBalances).mockRejectedValue(new Error('API Error'));

            await retrieveTokenBalance.handler(mockRuntime, mockMessage, mockState, undefined, mockCallback);

            expect(mockCallback).toHaveBeenCalledWith({
                text: '❌ An error occurred while retrieving token balances. Please try again later.'
            });
        });

        it('should correctly format token balances', async () => {
            const mockQueryParams = {
                object: {
                    chain_id: '1',
                    address: '0x1234567890123456789012345678901234567890'
                }
            };

            const mockTokens = [
                {
                    name: 'Token1',
                    symbol: 'TK1',
                    balance: '0x0de0b6b3a7640000', // 1 ETH in hex
                    decimals: 18,
                    contract_address: '0x456'
                },
                {
                    name: 'Token2',
                    symbol: 'TK2',
                    balance: '0x0de0b6b3a7640000', // 1 ETH in hex
                    decimals: 6,
                    contract_address: '0x789'
                }
            ];

            const mockFormattedResponse = 'Token balances: 1.0 TK1, 1000000.0 TK2';

            vi.mocked(composeContext).mockReturnValue('mock-context');
            vi.mocked(generateObject).mockResolvedValue(mockQueryParams);
            vi.mocked(getTokenBalances).mockResolvedValue(mockTokens);
            vi.mocked(generateText).mockResolvedValue(mockFormattedResponse);

            await retrieveTokenBalance.handler(mockRuntime, mockMessage, mockState, undefined, mockCallback);

            expect(mockCallback).toHaveBeenCalledWith({
                text: mockFormattedResponse
            });
        });
    });

    describe('action properties', () => {
        it('should have correct action properties', () => {
            expect(retrieveTokenBalance.name).toBe('RETRIEVE_TOKEN_BALANCE');
            expect(retrieveTokenBalance.description).toBeDefined();
            expect(retrieveTokenBalance.similes).toBeDefined();
            expect(Array.isArray(retrieveTokenBalance.similes)).toBe(true);
            expect(retrieveTokenBalance.examples).toBeDefined();
            expect(Array.isArray(retrieveTokenBalance.examples)).toBe(true);
        });
    });
});
