import type { Ref } from "vue";
import type { SceneState } from "@/enum";

export type Scene = import("pixi.js").Container & {
  sceneName: string | number;
  state: Ref<SceneState>;
};

export type SceneCreator = () => Promise<Scene>;
