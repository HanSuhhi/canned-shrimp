import { createTitlePrefab } from "../../prefabs/title.prefab";
import { Scenes } from "../../scenes.enum";
import { defineScene } from "@/core/scene";

export default defineScene(Scenes.Game, (scene) => {
  const title = createTitlePrefab("Game Title");

  scene.load = async () => {
    scene.addChild(title);
  };
});
