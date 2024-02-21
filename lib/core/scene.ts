import type { Scene } from "./types/scene";
import { defineContainer } from "@/composables/core";

function createScene(name: string | number): Scene {
  const container = defineContainer(name.toString());

  return Object.assign(container, { sceneName: name, index: -1 });
}

export function defineScene<T>(name: Parameters<typeof createScene>["0"], sceneSetup: (scene: Scene) => T) {
  const creator = async () => {
    const scene = createScene(name);
    await sceneSetup(scene);

    return scene;
  };

  Reflect.set(creator, "sceneName", name);

  return creator;
}
