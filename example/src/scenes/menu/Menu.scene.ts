import { defineScene, onSceneCreated, switchScene } from "canned-shrimp";
import { defineButton } from "../../prefabs/button/button.prefab";

export default defineScene(SCENES.Menu, () => {
  const button = defineButton("Play", () => switchScene(SCENES.Game));

  onSceneCreated(async (scene) => {
    scene.addChild(button);
  });
});
