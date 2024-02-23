import type { DisplayObject } from "pixi.js";

export interface PrefabSetup {
  close?: () => void | Promise<void>;
}

export type Prefab<T = DisplayObject> = T & PrefabSetup & {
  __CANNED_SHRIMP__PREFAB__: boolean;
};
