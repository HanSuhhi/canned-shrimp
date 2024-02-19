import { defineScene, switchScene } from "canned-shrimp";
import { Text } from "pixi.js";
import { Scenes } from "../../scenes.enum";

export default function () {
  const scene = defineScene(Scenes.Init);

  const title = new Text("Loading", { fill: "white" });

  scene.load = async () => {
    scene.addChild(title);
  };

  scene.start = async () => {
    switchScene(Scenes.Menu);
  };

  return scene;
}
