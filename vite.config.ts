import { resolve } from "node:path";
import { env } from "node:process";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import vue from "@vitejs/plugin-vue";

const loadVuePlugin = env.NODE_ENV === "development" ? vue() : null;

export default defineConfig({
  plugins: [dts({
    copyDtsFiles: true,
    staticImport: true,
    include: ["lib"],
  }), loadVuePlugin],
  resolve: {
    alias: {
      "@": resolve(__dirname, "lib"),
    },
  },
  build: {
    outDir: "dist",
    lib: {
      entry: resolve(__dirname, "lib", "main.ts"),
      name: "CannedShrimp",
      fileName: "canned-shrimp",
    },
    rollupOptions: {
      external: ["vue", "pixi-js", "matter-js"],
      output: {
        globals: {
          "vue": "vue",
          "pixi-js": "PIXI",
          "matter-js": "Matter",
        },
      },
    },
  },
});
