import type { Scene } from "./Scene";
import type { KeyboardEventKey } from "./keyboard";

export interface SetupOption {
  scenes: Record<string, () => Scene>;
  defaultScene: string;
  keyboard?: Record<string, KeyboardEventKey | KeyboardEventKey[]>;
  pixiAppConfig?: ConstructorParameters<typeof import("pixi.js").Application>["0"];
}
