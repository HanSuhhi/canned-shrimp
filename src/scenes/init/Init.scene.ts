import { Text } from "pixi.js";
import { Scenes } from "../../scenes.enum";
import { defineScene } from "@/core/scene";
import { switchScene } from "@/main";

export default function () {
  const scene = defineScene(Scenes.Init);

  const title = new Text("Loading", { fill: "white" });

  scene.load = async () => {
    scene.addChild(title);
  };

  scene.start = async () => {
    switchScene(Scenes.Game);
  };

  return scene;
}
