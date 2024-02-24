import { defineButton } from "../../prefabs/button.prefab";
import { Scenes } from "../../scenes.enum";
import { defineScene, onSceneCreated, switchScene } from "@/main";

export default defineScene(Scenes.Menu, () => {
  const button = defineButton("Play", () => switchScene(Scenes.A));

  onSceneCreated(async (scene) => {
    scene.addChild(button);
  });
});
