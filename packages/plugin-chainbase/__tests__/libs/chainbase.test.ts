import { describe, expect, it, vi, beforeEach } from 'vitest';
import { generateSQL, executeQuery, getTokenBalances } from '../../src/libs/chainbase';
import { CHAINBASE_API_URL_ENDPOINT } from '../../src/constants';

// Mock fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

// Mock environment variables
process.env.CHAINBASE_API_KEY = 'test-api-key';

describe('chainbase library', () => {
    beforeEach(() => {
        mockFetch.mockReset();
    });

    describe('generateSQL', () => {
        it('should generate SQL from natural language prompt', async () => {
            const mockResponse = {
                sql: 'SELECT block_number FROM ethereum.blocks LIMIT 1'
            };
            mockFetch.mockResolvedValueOnce({
                json: () => Promise.resolve(mockResponse)
            });

            const result = await generateSQL('Get the latest block number');

            expect(mockFetch).toHaveBeenCalledWith(
                `${CHAINBASE_API_URL_ENDPOINT}/api/v1/text2sql`,
                expect.objectContaining({
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: expect.any(String)
                })
            );
            expect(result).toBe(mockResponse.sql);
        });

        it('should handle API errors', async () => {
            mockFetch.mockRejectedValueOnce(new Error('API Error'));

            await expect(generateSQL('Invalid query')).rejects.toThrow('API Error');
        });
    });

    describe('executeQuery', () => {
        it('should execute SQL query and return results', async () => {
            const mockExecuteResponse = {
                data: [{
                    executionId: 'test-execution-id'
                }]
            };

            const mockPollResponse = {
                data: {
                    status: 'FINISHED',
                    columns: ['block_number'],
                    data: [[12345678]],
                    total_row_count: 1
                }
            };

            vi.mocked(fetch)
                .mockResolvedValueOnce({
                    json: () => Promise.resolve(mockExecuteResponse)
                } as Response)
                .mockResolvedValueOnce({
                    json: () => Promise.resolve(mockPollResponse)
                } as Response);

            const result = await executeQuery('SELECT block_number FROM ethereum.blocks LIMIT 1');
            expect(result).toEqual({
                columns: ['block_number'],
                data: [[12345678]],
                totalRows: 1
            });
        });

        it('should handle missing execution ID', async () => {
            const mockExecuteResponse = {
                data: [{}] // No executionId
            };

            mockFetch.mockResolvedValueOnce({
                json: () => Promise.resolve(mockExecuteResponse)
            });

            await expect(executeQuery('SELECT * FROM invalid.table'))
                .rejects.toThrow('Failed to get execution_id');
        });

        it('should handle query execution errors', async () => {
            const mockExecuteResponse = {
                data: [{
                    executionId: 'test-execution-id'
                }]
            };

            const mockPollResponse = {
                data: {
                    status: 'FAILED',
                    message: 'Query execution failed'
                }
            };

            vi.mocked(fetch)
                .mockResolvedValueOnce({
                    json: () => Promise.resolve(mockExecuteResponse)
                } as Response)
                .mockResolvedValueOnce({
                    json: () => Promise.resolve(mockPollResponse)
                } as Response);

            await expect(executeQuery('SELECT * FROM invalid.table'))
                .rejects.toThrow('Query execution failed');
        });

        it('should handle timeout after max retries', async () => {
            // Mock a shorter MAX_RETRIES value for testing
            const originalMaxRetries = process.env.MAX_RETRIES;
            process.env.MAX_RETRIES = '2';

            const mockExecuteResponse = {
                data: [{
                    executionId: 'test-execution-id'
                }]
            };

            const mockPollResponse = {
                data: {
                    status: 'RUNNING'
                }
            };

            vi.mocked(fetch)
                .mockResolvedValueOnce({
                    json: () => Promise.resolve(mockExecuteResponse)
                } as Response)
                .mockResolvedValue({
                    json: () => Promise.resolve(mockPollResponse)
                } as Response);

            // Mock setTimeout to resolve immediately
            vi.spyOn(global, 'setTimeout').mockImplementation((callback: any) => {
                callback();
                return 0 as any;
            });

            await expect(executeQuery('SELECT * FROM large.table'))
                .rejects.toThrow('Query timeout after 180 seconds');

            // Restore original MAX_RETRIES value
            process.env.MAX_RETRIES = originalMaxRetries;
        });
    });

    describe('getTokenBalances', () => {
        it('should retrieve token balances for an address', async () => {
            const mockResponse = {
                data: [{
                    name: 'Test Token',
                    symbol: 'TEST',
                    balance: '0x0de0b6b3a7640000',
                    decimals: 18,
                    contract_address: '0x123'
                }]
            };

            vi.mocked(fetch).mockResolvedValueOnce({
                json: () => Promise.resolve(mockResponse)
            } as Response);

            const result = await getTokenBalances({
                chain_id: 1,
                address: '0x123',
                contract_address: '0x456'
            });

            expect(fetch).toHaveBeenCalledWith(
                expect.stringContaining('/v1/account/tokens'),
                expect.objectContaining({
                    headers: {
                        'x-api-key': 'test-api-key'
                    },
                    method: 'GET'
                })
            );

            expect(result).toEqual(mockResponse.data);
        });

        it('should handle API errors', async () => {
            mockFetch.mockRejectedValueOnce(new Error('API Error'));

            await expect(getTokenBalances({
                chain_id: 1,
                address: '0x123'
            })).rejects.toThrow('API Error');
        });

        it('should handle empty response', async () => {
            const mockResponse = {
                data: []
            };

            mockFetch.mockResolvedValueOnce({
                json: () => Promise.resolve(mockResponse)
            });

            const result = await getTokenBalances({
                chain_id: 1,
                address: '0x123'
            });

            expect(result).toEqual([]);
        });
    });
});
