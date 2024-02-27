import { resolve } from "node:path";
import { env } from "node:process";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import vue from "@vitejs/plugin-vue";
import { cannedShrimp } from "./lib/vite-plugin";

const loadVuePlugin = env.NODE_ENV === "development" ? vue() : null;
const loadTestPlugin = env.NODE_ENV === "development" ? cannedShrimp() : null;

export default defineConfig({
  plugins: [dts({
    copyDtsFiles: true,
    staticImport: true,
    include: ["lib"],
    exclude: ["lib/core/types/private.d.ts"],
  }), loadVuePlugin, loadTestPlugin],
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
      external: ["vue", "pixi.js", "matter-js", "@pixi/sound"],
      output: {
        globals: {
          "vue": "vue",
          "pixi.js": "pixi.js",
          "@pixi/sound": "@pixi/sound",
          "matter-js": "matter-js",
        },
      },
    },
  },
});
