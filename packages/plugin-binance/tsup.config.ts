import { defineConfig } from "tsup";

export default defineConfig({
    entry: ["src/index.ts"],
    outDir: "dist",
    sourcemap: true,
    clean: true,
    format: ["esm"],
    dts: true,
    splitting: false,
    bundle: true,
    minify: false,
    external: [
        "@binance/connector",
        "events",
        "crypto",
        "buffer",
        "url",
        "querystring",
        "os",
    ],
    platform: "node",
    target: "node18",
});
