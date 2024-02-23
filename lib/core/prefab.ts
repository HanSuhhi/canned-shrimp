import type { DisplayObject } from "pixi.js";
import type { Prefab, PrefabSetup } from "./types/prefab";

export function definePrefab<T extends DisplayObject>(model: T, options: PrefabSetup): Prefab<T> {
  return Object.assign(model, {
    ...options,
    __CANNED_SHRIMP__PREFAB__: true,
  });
}
