import { createTitlePrefab } from "../../prefabs/title.prefab";
import { Scenes } from "../../scenes.enum";
import { defineScene } from "@/core/scene";

export default defineScene(Scenes.Game, (scene, { onCreated }) => {
  const title = createTitlePrefab("Game Title");

  onCreated(async () => {
    scene.addChild(title);
  });
});
