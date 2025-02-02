import { elizaLogger } from "@elizaos/core";
import type { IAgentRuntime, Plugin, Action } from "@elizaos/core";

/**
 * Utility to inspect runtime plugin loading
 */
export function inspectRuntime(runtime: IAgentRuntime) {
    elizaLogger.info("=== Runtime Plugin Inspection ===");

    // Check if runtime has plugins array
    const hasPlugins = !!(runtime as any).plugins;
    elizaLogger.info("Runtime plugins status:", {
        hasPluginsArray: hasPlugins,
        pluginCount: hasPlugins ? (runtime as any).plugins.length : 0
    });

    // If plugins exist, check for our plugin
    if (hasPlugins) {
        const plugins = (runtime as any).plugins as Plugin[];
        const akashPlugin = plugins.find(p => p.name === "akash");

        elizaLogger.info("Akash plugin status:", {
            isLoaded: !!akashPlugin,
            pluginDetails: akashPlugin ? {
                name: akashPlugin.name,
                actionCount: akashPlugin.actions?.length || 0,
                actions: akashPlugin.actions?.map(a => a.name) || []
            } : null
        });
    }

    // Check registered actions
    const hasActions = !!(runtime as any).actions;
    if (hasActions) {
        const actions = (runtime as any).actions as Action[];
        const akashActions = actions.filter((action: Action) =>
            action.name === "CREATE_DEPLOYMENT" ||
            (action.similes || []).includes("CREATE_DEPLOYMENT")
        );

        elizaLogger.info("Akash actions status:", {
            totalActions: actions.length,
            akashActionsCount: akashActions.length,
            akashActions: akashActions.map((action: Action) => ({
                name: action.name,
                similes: action.similes
            }))
        });
    }
}

/**
 * Helper to check if a plugin is properly loaded
 */
export function isPluginLoaded(runtime: IAgentRuntime, pluginName: string): boolean {
    // Check plugins array
    const plugins = (runtime as any).plugins as Plugin[];
    if (!plugins) {
        elizaLogger.warn(`No plugins array found in runtime`);
        return false;
    }

    // Look for our plugin
    const plugin = plugins.find(p => p.name === pluginName);
    if (!plugin) {
        elizaLogger.warn(`Plugin ${pluginName} not found in runtime plugins`);
        return false;
    }

    // Check if actions are registered
    const actions = (runtime as any).actions as Action[];
    if (!actions || !actions.length) {
        elizaLogger.warn(`No actions found in runtime`);
        return false;
    }

    // Check if plugin's actions are registered
    const pluginActions = plugin.actions || [];
    const registeredActions = pluginActions.every(pluginAction =>
        actions.some((action: Action) => action.name === pluginAction.name)
    );

    if (!registeredActions) {
        elizaLogger.warn(`Not all ${pluginName} actions are registered in runtime`);
        return false;
    }

    elizaLogger.info(`Plugin ${pluginName} is properly loaded and registered`);
    return true;
}