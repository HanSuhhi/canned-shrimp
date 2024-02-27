import { createApp } from "vue";
import App from "./App.vue";
import { createCannedShrimp } from "@/core/vue-plugin";

const cannedShrimp = createCannedShrimp({
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
