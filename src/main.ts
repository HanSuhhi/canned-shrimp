import { createApp } from "vue";
import App from "./App.vue";
import { Scenes } from "./scenes.enum";
import { setup } from "@/core/setup";

createApp(App).mount("#app");

setup({
  scenes: import.meta.glob("./scenes/**/*.scene.ts", { eager: true }),
  defaultScene: Scenes.Init,
  pixiAppConfig: {
    autoDensity: true,
    resizeTo: window,
    resolution: 2,
    background: "black",
    powerPreference: "high-performance",
  },
});
