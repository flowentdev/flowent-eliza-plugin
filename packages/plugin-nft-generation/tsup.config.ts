import { defineConfig } from "tsup";
import * as fs from 'fs'

export default defineConfig({
    entry: ["src/index.ts"],
    outDir: "dist",
    sourcemap: true,
    clean: true,
    esbuildPlugins: [
        {
            name: 'sol-loader',
            setup(build) {
                build.onLoad({ filter: /\.sol$/ }, async (args) => {
                    const content = await fs.promises.readFile(args.path, 'utf8')
                    return {
                        contents: `export default ${JSON.stringify(content)}`,
                        loader: 'js'
                    }
                })
            }
        }
    ],
    format: ["esm"], // Ensure you're targeting CommonJS
    external: [
        "dotenv", // Externalize dotenv to prevent bundling
        "fs", // Externalize fs to use Node.js built-in module
        "path", // Externalize other built-ins if necessary
        "@reflink/reflink",
        "@node-llama-cpp",
        "https",
        "http",
        "agentkeepalive",
        "safe-buffer",
        "viem",
        // Add other modules you want to externalize
    ],
});
