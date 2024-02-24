import { defineScene, onSceneCreated, switchScene } from "canned-shrimp";
import { Scenes } from "../../scenes.enum";
import { defineButton } from "../../prefabs/button/button.prefab";

export default defineScene(Scenes.Menu, () => {
  const button = defineButton("Play", () => switchScene(Scenes.Game));

  onSceneCreated(async (scene) => {
    scene.addChild(button);
  });
});
