import type { Application } from "pixi.js";
import type { KeyboardEventKey } from "./types/keyboard";
import type { Scene, SceneCreator } from "./types/scene";
import type { SetupOption } from "./types/setup";

class CoreStore {
  private _actionKey: Record<string, KeyboardEventKey | KeyboardEventKey[]> = {};

  public get actionKey(): Record<string, KeyboardEventKey | KeyboardEventKey[]> {
    return this._actionKey;
  }

  public set actionKey(value: Record<string, KeyboardEventKey | KeyboardEventKey[]>) {
    this._actionKey = value;
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

  // default scene
  public defaultScene: string = "";

  // application options
  public pixiApplicationOptions?: SetupOption["pixiAppConfig"];

  // scenes
  public scenes: Record<string, SceneCreator> = {};
  // assetfiles
  public assetFiles: string[] = [];

  // features
  public features: SetupOption["features"] = {
    matterJs: false,
  };
}

const coreStore = new CoreStore();

export { coreStore };
