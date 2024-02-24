import { defineScene, onSceneCreated, onSceneLoaded, switchScene } from "canned-shrimp";
import { Text } from "pixi.js";
import { Scenes } from "../../scenes.enum";

export default defineScene(Scenes.Init, () => {
  const title = new Text("Loading", { fill: "white" });

  onSceneCreated(async (scene) => {
    scene.addChild(title);
  });

  onSceneLoaded(async () => {
    switchScene(Scenes.Menu);
  });
});
