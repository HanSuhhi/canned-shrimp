import type { Application } from "pixi.js";
import type { KeyboardEventKey } from "./types/keyboard";
import type { Scene } from "./types/scene";
import type { SetupOption } from "./types/setup";
import { useImportModule } from "@/utils/glob";

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
  private _scenes: Record<string, () => Scene> = {};
  public get scenes(): Record<string, () => Scene> {
    return this._scenes;
  }

  public set scenes(value: Record<string, () => Scene>) {
    this._scenes = useImportModule<() => Scene>(value, true);
  }
}

const coreStore = new CoreStore();

export { coreStore };
