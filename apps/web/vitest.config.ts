import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  // Vitest uses esbuild for tsx transforms. Default JSX runtime is "classic"
  // which expects React in scope; we match Next/React 19 which uses the
  // automatic runtime. This lets *.test.tsx files render components without
  // importing React explicitly.
  esbuild: {
    jsx: "automatic",
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./tests/setup.ts"],
    include: ["tests/unit/**/*.test.{ts,tsx}"],
  },
  resolve: {
    alias: [
      // Subpath exports from @workspace/ui map into packages/ui/src/*.
      // Declared before the bare-package alias so more specific entries win.
      {
        find: /^@workspace\/ui\/components\/(.*)$/,
        replacement: path.resolve(
          __dirname,
          "../../packages/ui/src/components/$1.tsx",
        ),
      },
      {
        find: /^@workspace\/ui\/lib\/(.*)$/,
        replacement: path.resolve(
          __dirname,
          "../../packages/ui/src/lib/$1.ts",
        ),
      },
      {
        find: /^@workspace\/ui\/hooks\/(.*)$/,
        replacement: path.resolve(
          __dirname,
          "../../packages/ui/src/hooks/$1.ts",
        ),
      },
      {
        find: "@workspace/core",
        replacement: path.resolve(__dirname, "../../packages/core"),
      },
      {
        find: "@workspace/ui",
        replacement: path.resolve(__dirname, "../../packages/ui"),
      },
      { find: "@", replacement: path.resolve(__dirname, ".") },
    ],
  },
});
