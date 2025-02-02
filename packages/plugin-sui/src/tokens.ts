import { SUI_DECIMALS } from "@mysten/sui/utils";

export interface TokenMetadata {
    symbol: string;
    decimals: number;
    tokenAddress: string;
}

export const tokens: Map<string, TokenMetadata> = new Map([
    [
        "SUI",
        {
            symbol: "SUI",
            decimals: SUI_DECIMALS,
            tokenAddress: "0x2::sui::SUI",
        },
    ],
    [
        "USDC",
        {
            symbol: "USDC",
            decimals: 6,
            tokenAddress:
                "0xdba34672e30cb065b1f93e3ab55318768fd6fef66c15942c9f7cb846e2f900e7::usdc::USDC",
        },
    ],
]);

export const getTokenMetadata = (symbol: string) => {
    return tokens.get(symbol.toUpperCase());
};

export const getAmount = (amount: string, meta: TokenMetadata) => {
    const v = parseFloat(amount);
    return BigInt(v * 10 ** meta.decimals);
};
