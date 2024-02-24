import { defineScene, switchScene } from "canned-shrimp";
import { Text } from "pixi.js";
import { Scenes } from "../../scenes.enum";

export default defineScene(Scenes.Init, (scene, { onLoad, onCreated }) => {
  const title = new Text("Loading", { fill: "white" });

  onCreated(async () => {
    scene.addChild(title);
  });

  onLoad(async () => {
    switchScene(Scenes.Menu);
  });
});
