import { Text } from "pixi.js";
import { Scenes } from "../../scenes.enum";
import { defineScene } from "@/core/scene";

export default function () {
  const scene = defineScene(Scenes.Game);

  const title = new Text("Gme", { fill: "white" });

  scene.load = async () => {
    scene.addChild(title);
  };

  return scene;
}
