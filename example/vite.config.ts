import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { cannedShrimp } from "canned-shrimp/plugin";

export default defineConfig({
  plugins: [vue(), cannedShrimp()],
  envPrefix: [
    "GAME_MAP_X_LENGTH",
    "GAME_MAP_Y_LENGTH",
    "GAME_BLOCK_SIZE",
  ],
});
