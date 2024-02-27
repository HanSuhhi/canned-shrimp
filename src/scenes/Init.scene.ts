import { createTitlePrefab } from "../prefabs/title.prefab";
import { Scenes } from "../scenes.enum";
import { switchScene } from "@/main";
import { defineScene, onSceneCreated, onSceneLoaded } from "@/core/scene";

export default defineScene(Scenes.Init, () => {
  const title = createTitlePrefab("Loading");

  onSceneCreated((scene) => {
    scene.addChild(title);
  });

  onSceneLoaded(() => {
    switchScene(Scenes.A);
  });
});
