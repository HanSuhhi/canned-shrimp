import { createApp } from "vue";
import { mapKeys } from "lodash-es";
import App from "./App.vue";
import { Scenes } from "./scenes.enum";
import { coreStore } from "@/core/core-store";
import type { SceneCreator } from "@/core/types/scene";
import { createCannedShrimp } from "@/core/vue-plugin";

function getFilenameFromPath(path: string): string {
  return path.split("/").pop()!.split(".").shift() || "";
}

function updateFilenameFromViteGlob(_: any, path: string): string {
  return getFilenameFromPath(path);
}

coreStore.scenes = mapKeys(import.meta.glob<SceneCreator>("/src/scenes/**/*.scene.ts", { eager: true, import: "default" }), updateFilenameFromViteGlob);
coreStore.assetFiles = Object.keys(import.meta.glob(["/public/**/*.*", "!/public/vite.svg", "!/public/plugin.ts", "!/public/bitmap-font/*.*"]));

const cannedShrimp = createCannedShrimp({
  defaultScene: Scenes.Init,
  pixiAppConfig: {
    autoDensity: true,
    resolution: 2,
    background: "black",
    powerPreference: "high-performance",
    width: 500,
    height: 500,
  },
});

createApp(App)
  .use(cannedShrimp)
  .mount("#app");
