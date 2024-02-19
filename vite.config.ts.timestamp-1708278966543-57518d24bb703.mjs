// vite.config.ts
import { resolve } from "node:path";
import { env } from "node:process";
import { defineConfig } from "file:///D:/programs/open/canned-shrimp/node_modules/.pnpm/vite@5.1.2_@types+node@20.11.17/node_modules/vite/dist/node/index.js";
import dts from "file:///D:/programs/open/canned-shrimp/node_modules/.pnpm/vite-plugin-dts@3.7.2_@types+node@20.11.17_typescript@5.3.3_vite@5.1.2/node_modules/vite-plugin-dts/dist/index.mjs";
import vue from "file:///D:/programs/open/canned-shrimp/node_modules/.pnpm/@vitejs+plugin-vue@5.0.4_vite@5.1.2_vue@3.4.19/node_modules/@vitejs/plugin-vue/dist/index.mjs";
var __vite_injected_original_dirname = "D:\\programs\\open\\canned-shrimp";
var loadVuePlugin = env.NODE_ENV === "development" ? vue() : null;
var vite_config_default = defineConfig({
  plugins: [dts({
    copyDtsFiles: true,
    staticImport: true,
    include: ["lib"]
  }), loadVuePlugin],
  resolve: {
    alias: {
      "@": resolve(__vite_injected_original_dirname, "lib")
    }
  },
  build: {
    outDir: "dist",
    lib: {
      entry: resolve(__vite_injected_original_dirname, "lib", "main.ts"),
      name: "CannedShrimp",
      fileName: "canned-shrimp"
    },
    rollupOptions: {
      external: ["vue", "pixi.js", "matter-js"],
      output: {
        globals: {
          "vue": "vue",
          "pixi.js": "pixi.js",
          "matter-js": "matter-js"
        }
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxwcm9ncmFtc1xcXFxvcGVuXFxcXGNhbm5lZC1zaHJpbXBcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXHByb2dyYW1zXFxcXG9wZW5cXFxcY2FubmVkLXNocmltcFxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovcHJvZ3JhbXMvb3Blbi9jYW5uZWQtc2hyaW1wL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gXCJub2RlOnBhdGhcIjtcbmltcG9ydCB7IGVudiB9IGZyb20gXCJub2RlOnByb2Nlc3NcIjtcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XG5pbXBvcnQgZHRzIGZyb20gXCJ2aXRlLXBsdWdpbi1kdHNcIjtcbmltcG9ydCB2dWUgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXZ1ZVwiO1xuXG5jb25zdCBsb2FkVnVlUGx1Z2luID0gZW52Lk5PREVfRU5WID09PSBcImRldmVsb3BtZW50XCIgPyB2dWUoKSA6IG51bGw7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtkdHMoe1xuICAgIGNvcHlEdHNGaWxlczogdHJ1ZSxcbiAgICBzdGF0aWNJbXBvcnQ6IHRydWUsXG4gICAgaW5jbHVkZTogW1wibGliXCJdLFxuICB9KSwgbG9hZFZ1ZVBsdWdpbl0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgXCJAXCI6IHJlc29sdmUoX19kaXJuYW1lLCBcImxpYlwiKSxcbiAgICB9LFxuICB9LFxuICBidWlsZDoge1xuICAgIG91dERpcjogXCJkaXN0XCIsXG4gICAgbGliOiB7XG4gICAgICBlbnRyeTogcmVzb2x2ZShfX2Rpcm5hbWUsIFwibGliXCIsIFwibWFpbi50c1wiKSxcbiAgICAgIG5hbWU6IFwiQ2FubmVkU2hyaW1wXCIsXG4gICAgICBmaWxlTmFtZTogXCJjYW5uZWQtc2hyaW1wXCIsXG4gICAgfSxcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBleHRlcm5hbDogW1widnVlXCIsIFwicGl4aS5qc1wiLCBcIm1hdHRlci1qc1wiXSxcbiAgICAgIG91dHB1dDoge1xuICAgICAgICBnbG9iYWxzOiB7XG4gICAgICAgICAgXCJ2dWVcIjogXCJ2dWVcIixcbiAgICAgICAgICBcInBpeGkuanNcIjogXCJwaXhpLmpzXCIsXG4gICAgICAgICAgXCJtYXR0ZXItanNcIjogXCJtYXR0ZXItanNcIixcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFvUixTQUFTLGVBQWU7QUFDNVMsU0FBUyxXQUFXO0FBQ3BCLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sU0FBUztBQUNoQixPQUFPLFNBQVM7QUFKaEIsSUFBTSxtQ0FBbUM7QUFNekMsSUFBTSxnQkFBZ0IsSUFBSSxhQUFhLGdCQUFnQixJQUFJLElBQUk7QUFFL0QsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUyxDQUFDLElBQUk7QUFBQSxJQUNaLGNBQWM7QUFBQSxJQUNkLGNBQWM7QUFBQSxJQUNkLFNBQVMsQ0FBQyxLQUFLO0FBQUEsRUFDakIsQ0FBQyxHQUFHLGFBQWE7QUFBQSxFQUNqQixTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLFFBQVEsa0NBQVcsS0FBSztBQUFBLElBQy9CO0FBQUEsRUFDRjtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsUUFBUTtBQUFBLElBQ1IsS0FBSztBQUFBLE1BQ0gsT0FBTyxRQUFRLGtDQUFXLE9BQU8sU0FBUztBQUFBLE1BQzFDLE1BQU07QUFBQSxNQUNOLFVBQVU7QUFBQSxJQUNaO0FBQUEsSUFDQSxlQUFlO0FBQUEsTUFDYixVQUFVLENBQUMsT0FBTyxXQUFXLFdBQVc7QUFBQSxNQUN4QyxRQUFRO0FBQUEsUUFDTixTQUFTO0FBQUEsVUFDUCxPQUFPO0FBQUEsVUFDUCxXQUFXO0FBQUEsVUFDWCxhQUFhO0FBQUEsUUFDZjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
