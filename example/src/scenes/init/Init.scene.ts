import { Text } from "pixi.js";
import { defineScene } from "canned-shrimp";
import { Scenes } from "../../scenes.enum";

export default function () {
  const scene = defineScene(Scenes.Init);

  const title = new Text("Loading", { fill: "white" });

  scene.load = async () => {
    scene.addChild(title);
  };

  return scene;
}
