export interface SetupOption {
  keyboard?: Record<string, KeyboardEventKey | KeyboardEventKey[]>;
  defaultScene: string;
  pixiAppConfig?: ConstructorParameters<typeof import("pixi.js").Application>["0"];
}
