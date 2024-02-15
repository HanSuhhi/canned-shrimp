import { createApp } from "vue";
import "./style.css";
import { setup } from "canned-shrimp";
import App from "./App.vue";
import { Scenes } from "./scenes.enum";

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
