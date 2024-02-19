import { Text } from "pixi.js";
import { Scenes } from "../../scenes.enum";
import { defineScene } from "@/core/scene";
import { switchScene } from "@/main";

export default function () {
  const scene = defineScene(Scenes.Init);

  const title = Object.assign(new Text("Loading", { fill: "white" }), {
    close() {
      // eslint-disable-next-line no-console
      console.log("close is triggered");
    },
  });

  scene.load = async () => {
    scene.addChild(title);
  };

  scene.start = async () => {
    switchScene(Scenes.Game);
  };

  return scene;
}
