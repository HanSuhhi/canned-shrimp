import { Text } from "pixi.js";
import { Scenes } from "../../scenes.enum";
import { defineScene } from "@/core/scene";

export default function () {
  const scene = defineScene(Scenes.Init);

  const title = new Text("Loading", { fill: "white" });

  scene.load = async () => {
    scene.addChild(title);
  };

  return scene;
}
