import { createTitlePrefab } from "../../prefabs/title.prefab";
import { Scenes } from "../../scenes.enum";
import { defineButton } from "../../prefabs/button.prefab";
import { defineScene, onSceneCreated } from "@/core/scene";
import { switchScene } from "@/main";

export default defineScene(Scenes.A, () => {
  const title = createTitlePrefab("Scene A");
  const button = defineButton("To B", () => switchScene(Scenes.B));

  onSceneCreated(async (scene) => {
    scene.addChild(title, button);
  });
});
