import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getWalletDetails } from '../src/utils';
import { Coinbase, Wallet } from '@coinbase/coinbase-sdk';

vi.mock('@coinbase/coinbase-sdk');

// Mock the runtime
const mockRuntime = {
    getSetting: vi.fn()
        .mockReturnValueOnce('test-seed')  // COINBASE_GENERATED_WALLET_HEX_SEED
        .mockReturnValueOnce('test-wallet-id'), // COINBASE_GENERATED_WALLET_ID
    getProvider: vi.fn().mockReturnValue({ apiKey: 'test-api-key' }),
    character: {
        name: 'test-character'
    }
};

// Mock Wallet class
const mockWallet = {
    getDefaultAddress: vi.fn().mockResolvedValue('0x123'),
    getNetworkId: vi.fn().mockReturnValue('eth-mainnet'),
    listBalances: vi.fn().mockResolvedValue([
        ['ETH', { toString: () => '1.0' }]
    ]),
    getTransactions: vi.fn().mockResolvedValue([]),
    export: vi.fn().mockReturnValue({
        seed: 'test-seed',
        walletId: 'test-wallet-id'
    })
};

describe('Utils', () => {
    describe('getWalletDetails', () => {
        beforeEach(() => {
            vi.clearAllMocks();
            (Coinbase as any).networks = {
                EthereumMainnet: 'eth-mainnet'
            };
            (Wallet as any).import = vi.fn().mockResolvedValue(mockWallet);
        });

        it('should fetch wallet details successfully', async () => {
            const result = await getWalletDetails(mockRuntime as any);
            
            expect(result).toEqual({
                balances: [{ asset: 'ETH', amount: '1.0' }],
                transactions: []
            });

            expect(Wallet.import).toHaveBeenCalledWith({
                seed: 'test-seed',
                walletId: 'test-wallet-id'
            });
        });

        it('should handle errors when fetching wallet details', async () => {
            (Wallet as any).import = vi.fn().mockRejectedValue(new Error('Unable to retrieve wallet details.'));

            await expect(getWalletDetails(mockRuntime as any))
                .rejects
                .toThrow('Unable to retrieve wallet details.');
        });
    });
});
