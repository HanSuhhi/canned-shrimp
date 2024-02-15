interface SceneLifecycle {
  start?: () => void | Promise<void>;
  load?: () => void | Promise<void>;
  unload?: () => void | Promise<void>;
  update?: (delta: number) => void;
}

export type Scene = import("pixi.js").Container & {
  sceneName: string | number;
  index: number;
} & SceneLifecycle;
