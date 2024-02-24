import { createTitlePrefab } from "../../prefabs/title.prefab";
import { Scenes } from "../../scenes.enum";
import { switchScene } from "@/main";
import { defineScene } from "@/core/scene";

export default defineScene(Scenes.Init, (scene, { onCreated, onLoad }) => {
  const title = createTitlePrefab("Loading");

  onCreated(() => {
    scene.addChild(title);
  });

  onLoad(() => {
    switchScene(Scenes.Game);
  });
});
