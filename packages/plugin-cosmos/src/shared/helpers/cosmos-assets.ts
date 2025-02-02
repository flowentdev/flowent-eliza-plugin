import type { AssetList } from "@chain-registry/types";

export const getAvailableAssets = (
    assets: AssetList[],
    customAssets: AssetList[]
) => {
    const result: AssetList[] = [];
    const safeAssets = assets || [];
    const safeCustomAssets = customAssets || [];

    // Get custom asset chain names for faster lookup
    const customChainNames = new Set(
        safeCustomAssets.map(asset => asset.chain_name)
    );

    // Add non-duplicate assets
    for (const asset of safeAssets) {
        if (!customChainNames.has(asset.chain_name)) {
            result.push(asset);
        }
    }

    // Add all custom assets
    result.push(...safeCustomAssets);

    return result;
}