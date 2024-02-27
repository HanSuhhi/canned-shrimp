import { defineScene, onSceneCreated, onSceneLoaded, switchScene } from "canned-shrimp";
import { Text } from "pixi.js";

export default defineScene(SCENES.Init, () => {
  const title = new Text("Loading", { fill: "white" });

  onSceneCreated(async (scene) => {
    scene.addChild(title);
  });

  onSceneLoaded(async () => {
    switchScene(SCENES.Menu);
  });
});
