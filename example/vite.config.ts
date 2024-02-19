import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  envPrefix: [
    "GAME_MAP_X_LENGTH",
    "GAME_MAP_Y_LENGTH",
    "GAME_BLOCK_SIZE",
  ],
});
