import { defineScene, switchScene } from "canned-shrimp";
import { Scenes } from "../../scenes.enum";
import { defineButton } from "../../prefabs/button/button.prefab";

export default defineScene(Scenes.Menu, (scene) => {
  const button = defineButton("Play", () => switchScene(Scenes.Game));

  scene.load = async () => {
    scene.addChild(button);
  };
});
