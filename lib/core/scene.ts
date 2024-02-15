import type { Scene } from "./types/scene";
import { defineContainer } from "@/composables/core";

export function defineScene(name: string | number): Scene {
  const container = defineContainer(name.toString());

  return Object.assign(container, { sceneName: name, index: -1 });
}
