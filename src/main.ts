import { createApp } from "vue";
import { mapKeys } from "lodash-es";
import App from "./App.vue";
import { Scenes } from "./scenes.enum";
import { setup } from "@/core/setup";
import { coreStore } from "@/core/core-store";
import type { SceneCreator } from "@/core/types/scene";

function getFilenameFromPath(path: string): string {
  return path.split("/").pop()!.split(".").shift() || "";
}

function updateFilenameFromViteGlob(_: any, path: string): string {
  return getFilenameFromPath(path);
}

coreStore.scenes = mapKeys(import.meta.glob<SceneCreator>("/src/scenes/**/*.scene.ts", { eager: true, import: "default" }), updateFilenameFromViteGlob);
coreStore.assetFiles = Object.keys(import.meta.glob(["/public/**/*.*", "!/public/vite.svg", "!/public/plugin.ts", "!/public/bitmap-font/*.*"]));

createApp(App).mount("#app");

setup({
  defaultScene: Scenes.Init,
  pixiAppConfig: {
    autoDensity: true,
    resizeTo: window,
    resolution: 2,
    background: "black",
    powerPreference: "high-performance",
  },
});
