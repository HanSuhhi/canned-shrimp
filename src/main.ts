import { createApp } from "vue";
import { mapKeys } from "lodash-es";
import App from "./App.vue";
import { Scenes } from "./scenes.enum";
import type { SceneCreator } from "@/core/types/scene";
import { createCannedShrimp } from "@/core/vue-plugin";
import { CoreStore } from "@/core/store";

function getFilenameFromPath(path: string): string {
  return path.split("/").pop()!.split(".").shift() || "";
}

function updateFilenameFromViteGlob(_: any, path: string): string {
  return getFilenameFromPath(path);
}

CoreStore.instance.scenes = mapKeys(import.meta.glob<SceneCreator>("/src/scenes/**/*.scene.ts", { eager: true, import: "default" }), updateFilenameFromViteGlob);
CoreStore.instance.assetFiles = Object.keys(import.meta.glob(["/public/**/*.*", "!/public/vite.svg", "!/public/plugin.ts", "!/public/bitmap-font/*.*"]));

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
