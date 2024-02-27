import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["lib/vite-plugin.ts"],
  format: ["cjs", "esm"],
  dts: true,
  external: ["lightningcss"],
  splitting: true,
});
