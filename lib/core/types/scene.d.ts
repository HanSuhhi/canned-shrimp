import type { Ref } from "vue";
import type { SceneState } from "@/enum";

interface SceneLifecycle {
  onCreated?: () => void | Promise<void>;
  onLoad?: () => void | Promise<void>;
  onUnload?: () => void | Promise<void>;
}

export type SceneSetupLifeCycle = Record<keyof SceneLifecycle, (fn: Funciton) => void>;

export type SceneModel = import("pixi.js").Container & {
  sceneName: string | number;
  state: Ref<SceneState>;
};

export type Scene = SceneModel & SceneLifecycle;

export type SceneCreator = () => Promise<Scene>;
