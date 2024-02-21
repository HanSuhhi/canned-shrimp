import { defineScene, switchScene } from "canned-shrimp";
import { Text } from "pixi.js";
import { Scenes } from "../../scenes.enum";

export default defineScene(Scenes.Init, (scene) => {
  const title = new Text("Loading", { fill: "white" });

  scene.load = async () => {
    scene.addChild(title);
  };

  scene.start = async () => {
    switchScene(Scenes.Menu);
  };
});
