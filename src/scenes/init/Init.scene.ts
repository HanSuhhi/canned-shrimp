import { createTitlePrefab } from "../../prefabs/title.prefab";
import { Scenes } from "../../scenes.enum";
import { defineScene } from "@/core/scene";
import { switchScene } from "@/main";

export default defineScene(Scenes.Init, (scene) => {
  const title = createTitlePrefab("Loading");

  scene.load = async () => {
    scene.addChild(title);
  };

  scene.start = async () => {
    switchScene(Scenes.Game);
  };
});
