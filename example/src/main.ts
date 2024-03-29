import { createCannedShrimp } from "canned-shrimp";
import { createApp } from "vue";
import App from "./App.vue";
import { SnakeDirection } from "./prefabs/snake/snake.enum";
import "./style.css";
import { GAME_MAP_X, GAME_MAP_Y } from "./utils/var";

const cannedShrimp = createCannedShrimp({
  pixiAppConfig: {
    autoDensity: true,
    resolution: 2,
    background: "black",
    powerPreference: "high-performance",
    height: GAME_MAP_Y,
    width: GAME_MAP_X,
  },
  keyboard: {
    [SnakeDirection.Down]: ["ArrowDown", "s"],
    [SnakeDirection.Left]: ["ArrowLeft", "a"],
    [SnakeDirection.Right]: ["ArrowRight", "d"],
    [SnakeDirection.Up]: ["ArrowUp", "w"],
  },
});

createApp(App)
  .use(cannedShrimp)
  .mount("#app");
