import type { Chain } from "@chain-registry/types";

export const getAvailableChains = (chains: Chain[], customChains: Chain[]) => [
    ...(chains?.filter(
        (chain) =>
            !(customChains ?? [])
                ?.map((customChain) => customChain.chain_name)
                ?.includes(chain.chain_name)
    ) ?? []),
    ...(customChains ?? []),
];
