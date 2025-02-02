import type { Plugin } from "@elizaos/core";

import { depinDataProvider } from "./providers/depinData";
import { depinProjects } from "./actions/depinProjects";
import { sentientAI } from "./actions/sentientai";

export const depinPlugin: Plugin = {
    name: "depin",
    description: "DePIN plugin for Sentient AI",
    providers: [depinDataProvider],
    evaluators: [],
    services: [],
    actions: [sentientAI, depinProjects],
};

export default depinPlugin;
