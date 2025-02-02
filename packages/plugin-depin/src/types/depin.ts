export type DepinScanMetrics = {
    date: string;
    total_projects: string;
    market_cap: string;
    total_device: string;
};

export type DepinScanProject = {
    project_name: string;
    slug: string;
    token: string;
    layer_1: string[];
    categories: string[];
    market_cap: string;
    token_price: string;
    total_devices: string;
    avg_device_cost: string;
    days_to_breakeven: string;
    estimated_daily_earnings: string;
    chainid: string;
    coingecko_id: string;
    fully_diluted_valuation: string;
};
