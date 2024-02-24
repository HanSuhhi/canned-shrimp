import { createTitlePrefab } from "../../prefabs/title.prefab";
import { Scenes } from "../../scenes.enum";
import { defineButton } from "../../prefabs/button.prefab";
import { defineScene, onSceneCreated } from "@/core/scene";
import { switchScene } from "@/main";

export default defineScene(Scenes.B, () => {
  const title = createTitlePrefab("Scene B");
  const button = defineButton("To A", () => switchScene(Scenes.A));

  onSceneCreated(async (scene) => {
    scene.addChild(title, button);
  });
});
