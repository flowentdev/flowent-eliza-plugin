import { describe, it, expect } from "vitest";
import type { Asset, AssetList } from "@chain-registry/types";
import { getAvailableAssets } from "../shared/helpers/cosmos-assets.ts";

describe("getAvailableAssets", () => {
    it("should return all assets when no custom assets are provided", () => {
        const assets: AssetList[] = [
            { chain_name: "chain1", assets: [] },
            { chain_name: "chain2", assets: [] },
        ];
        const customAssets: AssetList[] = [];

        const result = getAvailableAssets(assets, customAssets);

        expect(result).toEqual(assets);
    });

    it("should include custom assets and exclude duplicates", () => {
        const assets: AssetList[] = [
            { chain_name: "chain1", assets: [] },
            { chain_name: "chain2", assets: [] },
        ];
        const customAssets: AssetList[] = [
            { chain_name: "chain2", assets: [{ symbol: "CUS2" } as Asset] },
            { chain_name: "chain3", assets: [{ symbol: "CUS3" } as Asset] },
        ];

        const expectedResult: AssetList[] = [
            { chain_name: "chain1", assets: [] },
            { chain_name: "chain2", assets: [{ symbol: "CUS2" } as Asset] },
            { chain_name: "chain3", assets: [{ symbol: "CUS3" } as Asset] },
        ];

        const result = getAvailableAssets(assets, customAssets);

        expect(result).toEqual(expectedResult);
    });

    it("should return only custom assets when no original assets are provided", () => {
        const assets: AssetList[] = [];
        const customAssets: AssetList[] = [
            { chain_name: "chain1", assets: [{ symbol: "CUS1" } as Asset] },
            { chain_name: "chain2", assets: [{ symbol: "CUS2" } as Asset] },
        ];

        const result = getAvailableAssets(assets, customAssets);

        expect(result).toEqual(customAssets);
    });

    it("should handle empty inputs gracefully", () => {
        const assets: AssetList[] = [];
        const customAssets: AssetList[] = [];

        const result = getAvailableAssets(assets, customAssets);

        expect(result).toEqual([]);
    });

    it("should handle undefined customAssets gracefully", () => {
        const assets: AssetList[] = [
            { chain_name: "chain1", assets: [] },
            { chain_name: "chain2", assets: [] },
        ];
        const customAssets: AssetList[] | undefined = undefined;

        const result = getAvailableAssets(assets, customAssets ?? []);

        expect(result).toEqual(assets);
    });

    it("should handle undefined assets gracefully", () => {
        const assets: AssetList[] | undefined = undefined;
        const customAssets: AssetList[] = [
            { chain_name: "chain1", assets: [{ symbol: "CUS1" } as Asset] },
            { chain_name: "chain2", assets: [{ symbol: "CUS2" } as Asset] },
        ];

        const result = getAvailableAssets(assets ?? [], customAssets);

        expect(result).toEqual(customAssets);
    });

    it("should handle both assets and customAssets as undefined gracefully", () => {
        const assets: AssetList[] | undefined = undefined;
        const customAssets: AssetList[] | undefined = undefined;

        const result = getAvailableAssets(assets ?? [], customAssets ?? []);

        expect(result).toEqual([]);
    });

    it("should handle assets and customAssets with nested values", () => {
        const assets: AssetList[] = [
            { chain_name: "chain1", assets: [{ symbol: "AS1" } as Asset] },
            { chain_name: "chain2", assets: [{ symbol: "AS2" } as Asset] },
        ];
        const customAssets: AssetList[] = [
            { chain_name: "chain2", assets: [{ symbol: "CUS2" } as Asset] },
            { chain_name: "chain3", assets: [{ symbol: "CUS3" } as Asset] },
        ];

        const expectedResult: AssetList[] = [
            { chain_name: "chain1", assets: [{ symbol: "AS1" } as Asset] },
            { chain_name: "chain2", assets: [{ symbol: "CUS2" } as Asset] },
            { chain_name: "chain3", assets: [{ symbol: "CUS3" } as Asset] },
        ];

        const result = getAvailableAssets(assets, customAssets);

        expect(result).toEqual(expectedResult);
    });
});
