import type { Application } from "pixi.js";
import { SceneLifecycle } from "../enum";
import type { SceneManager } from "./sceneManager";
import type { KeyboardEventKey } from "./types/keyboard";
import type { Scene, SceneCreator } from "./types/scene";
import type { SetupOption } from "./types/setup";

class CoreStore {
  private static _instance: CoreStore;

  public static get instance() {
    if (!this._instance) this._instance = new CoreStore();
    return this._instance;
  }

  // app
  public app: Application | undefined;

  public get scene(): Scene | null {
    return this.app?.stage.children.length ? this.app!.stage.getChildAt(0) as Scene : null;
  }

  public get height(): number {
    return this.app?.screen.height || 0;
  }

  public get width(): number {
    return this.app?.screen.width || 0;
  }
}

class LibStore {
  private static _instance: LibStore;

  public static get instance() {
    if (!this._instance) this._instance = new LibStore();
    return this._instance;
  }

  // action key
  private _actionKey: Record<string, KeyboardEventKey | KeyboardEventKey[]> = {};

  public get actionKey(): Record<string, KeyboardEventKey | KeyboardEventKey[]> {
    return this._actionKey;
  }

  public set actionKey(value: Record<string, KeyboardEventKey | KeyboardEventKey[]>) {
    this._actionKey = value;
  }

  // scenes
  public scenes: Record<string, SceneCreator> = {};

  // default scene
  public defaultScene: string = "";

  // application options
  public pixiApplicationOptions?: SetupOption["pixiAppConfig"];

  // features
  public features: SetupOption["features"] = {
    matterJs: false,
  };

  // sceneManager
  public sceneManager?: SceneManager;
  // canvasNode
  public canvasNode?: HTMLCanvasElement;

  // scene lifecycle
  public sceneLifeCycle: Record<SceneLifecycle, Array<(scene: Scene) => any>> = {
    [SceneLifecycle.onCreated]: [],
    [SceneLifecycle.onDestory]: [],
    [SceneLifecycle.onHide]: [],
    [SceneLifecycle.onLoad]: [],
  };

  public resetSceneLifeCycle() {
    this.sceneLifeCycle = {
      [SceneLifecycle.onCreated]: [],
      [SceneLifecycle.onDestory]: [],
      [SceneLifecycle.onHide]: [],
      [SceneLifecycle.onLoad]: [],
    };
  }
}

export { CoreStore, LibStore };
