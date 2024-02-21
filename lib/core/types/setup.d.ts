import type { KeyboardEventKey } from "./keyboard";

export interface SetupOption {
  defaultScene: string;
  keyboard?: Record<string, KeyboardEventKey | KeyboardEventKey[]>;
  pixiAppConfig?: ConstructorParameters<typeof import("pixi.js").Application>["0"];
  features?: {
    matterJs: boolean;
  };
}
