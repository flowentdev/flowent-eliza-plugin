import { describe, it, expect } from "vitest";
import type { Chain } from "@chain-registry/types";
import { getAvailableChains } from "../shared/helpers/cosmos-chains.ts";

describe("getAvailableChains", () => {
    it("should return all chains when no custom chains are provided", () => {
        const chains: Chain[] = [
            { chain_name: "chain1" } as Chain,
            { chain_name: "chain2" } as Chain,
        ];
        const customChains: Chain[] = [];

        const result = getAvailableChains(chains, customChains);

        expect(result).toEqual(chains);
    });

    it("should include custom chains and exclude duplicates", () => {
        const chains: Chain[] = [
            { chain_name: "chain1" } as Chain,
            { chain_name: "chain2" } as Chain,
        ];
        const customChains: Chain[] = [
            { chain_name: "chain2" } as Chain,
            { chain_name: "chain3" } as Chain,
        ];

        const result = getAvailableChains(chains, customChains);

        expect(result).toEqual([
            { chain_name: "chain1" } as Chain,
            { chain_name: "chain2" } as Chain,
            { chain_name: "chain3" } as Chain,
        ]);
    });

    it("should return only custom chains when no original chains are provided", () => {
        const chains: Chain[] = [];
        const customChains: Chain[] = [
            { chain_name: "chain1" } as Chain,
            { chain_name: "chain2" } as Chain,
        ];

        const result = getAvailableChains(chains, customChains);

        expect(result).toEqual(customChains);
    });

    it("should handle empty inputs gracefully", () => {
        const chains: Chain[] = [];
        const customChains: Chain[] = [];

        const result = getAvailableChains(chains, customChains);

        expect(result).toEqual([]);
    });

    it("should handle undefined customChains gracefully", () => {
        const chains: Chain[] = [
            { chain_name: "chain1" } as Chain,
            { chain_name: "chain2" } as Chain,
        ];
        const customChains: Chain[] | undefined = undefined;

        const result = getAvailableChains(chains, customChains);

        expect(result).toEqual(chains);
    });

    it("should handle undefined chains gracefully", () => {
        const chains: Chain[] | undefined = undefined;
        const customChains: Chain[] = [
            { chain_name: "chain1" } as Chain,
            { chain_name: "chain2" } as Chain,
        ];

        const result = getAvailableChains(chains ?? [], customChains);

        expect(result).toEqual(customChains);
    });
});
