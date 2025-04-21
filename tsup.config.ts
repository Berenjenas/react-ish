import { defineConfig } from "tsup";

export default defineConfig({
    entryPoints: ["src/index.ts"],
    format: ["cjs", "esm"],
    outDir: "dist",
    dts: true,
    clean: true,
    sourcemap: process.env.SOURCE_MAP?.trim() === "true"
});
