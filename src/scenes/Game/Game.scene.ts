import { Text } from "pixi.js";
import { Scenes } from "../../scenes.enum";
import { defineScene } from "@/core/scene";

export default defineScene(Scenes.Game, (scene) => {
  const title = new Text("Gme", { fill: "white" });

  // const s = new Sprite(Texture.from("food"));

  scene.load = async () => {
    scene.addChild(title);
  };
});
