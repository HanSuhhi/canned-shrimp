import type { DisplayObject } from "pixi.js";
import type { Prefab, PrefabSetup } from "./types/prefab";
import { KeyEnum } from "@/enum";

export function definePrefab<T extends DisplayObject>(model: T, options?: PrefabSetup): Prefab<T> {
  return Object.assign(model, {
    ...options,
    [KeyEnum.IsPreFab]: true,
  });
}
