import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        exclude: ["src/index.ts", "node_modules", "dist"],
        coverage: {
            reporter: ["text", "html"],
            include: ["src/**/*.ts"],
            exclude: ["src/index.ts", "node_modules", "dist"],
            extension: [".ts"],
            all: true
        }
    }
});
