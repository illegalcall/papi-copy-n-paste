import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./tests/setup.ts"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
      "@workspace/core": path.resolve(__dirname, "../../packages/core"),
      "@workspace/ui": path.resolve(__dirname, "../../packages/ui"),
    },
  },
});
