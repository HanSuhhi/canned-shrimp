import { defineScene, switchScene } from "canned-shrimp";
import { Scenes } from "../../scenes.enum";
import { defineButton } from "../../prefabs/button/button.prefab";

export default function () {
  const scene = defineScene(Scenes.Menu);

  const button = defineButton("Play", () => switchScene(Scenes.Game));

  scene.load = async () => {
    scene.addChild(button);
  };

  return scene;
}
