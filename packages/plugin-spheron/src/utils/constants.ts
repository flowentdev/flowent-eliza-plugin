export const SUPPORTED_TOKENS = {
    USDT: "USDT",
    USDC: "USDC",
    DAI: "DAI",
    WETH: "WETH",
    CST: "CST",
} as const;

export const DEPLOYMENT_CONFIGS = {
    DEFAULT_PROVIDER_PROXY_URL: "http://localhost:3040",
    NETWORK: "testnet",
} as const;

export const LEASE_STATES = {
    ACTIVE: "ACTIVE",
    TERMINATED: "TERMINATED",
} as const;

export const DEFAULT_PAGE_SIZE = 10;

export const AVAILABLE_GPU_MODELS = [
    "rtx4090",
    "h100",
    "rtx3090",
    "t4",
    "rtx4070tisuper",
    "rtx4070",
    "rtx4070ti",
    "rtx6000-ada",
    "t1000",
    "a100",
    "v100",
    "p4",
];
