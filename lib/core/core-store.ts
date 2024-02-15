import type { Application } from "pixi.js";
import type { KeyboardEventKey } from "./types/keyboard";
import type { Scene } from "./types/scene";
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
  private _app: Application | undefined;
  public get app(): Application | undefined {
    return this._app;
  }

  public set app(value: Application | undefined) {
    this._app = value;
  }

  public get scene(): Scene | null {
    return this.app?.stage.children.length ? this.app!.stage.getChildAt(0) as Scene : null;
  }

  // default scene
  private _defaultScene: string = "";
  public get defaultScene(): string {
    return this._defaultScene;
  }

  public set defaultScene(value: string) {
    this._defaultScene = value;
  }

  // application options
  public pixiApplicationOptions?: SetupOption["pixiAppConfig"];
}

const coreStore = new CoreStore();

export { coreStore };
