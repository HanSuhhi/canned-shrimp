import { ref } from "vue";
import type { Scene, SceneModel, SceneSetupLifeCycle } from "./types/scene";
import { defineContainer } from "@/composables/core";
import { SceneState } from "@/enum";

function createSceneModel(name: string | number): SceneModel {
  const container = defineContainer(name.toString());

  return Object.assign(container, {
    sceneName: name,
    state: ref(SceneState.Create),
  });
}

function createSceneCycle() {
  const fns: Function[] = [];
  const addFn: SceneSetupLifeCycle[keyof SceneSetupLifeCycle] = (fn: Function) => {
    fns.push(fn);
  };
  const run = async () => {
    for (let index = 0; index < fns.length; index++) {
      const fn = fns[index];
      await fn();
    }
  };
  return { addFn, run };
}

export function defineScene<T>(
  name: Parameters<typeof createSceneModel>["0"],
  sceneSetup: (scene: SceneModel, { onCreated, onLoad, onUnload }: SceneSetupLifeCycle) => T,
) {
  const creator = async () => {
    const scene: Scene = createSceneModel(name);
    const { addFn: addCreatedFn, run: runCreated } = createSceneCycle();
    const { addFn: addLoadedFn, run: runLoaded } = createSceneCycle();
    const { addFn: addUnloadedFn, run: runUnloaded } = createSceneCycle();

    await sceneSetup(scene, {
      onCreated: addCreatedFn,
      onLoad: addLoadedFn,
      onUnload: addUnloadedFn,
    });

    scene.onCreated = runCreated;
    scene.onLoad = runLoaded;
    scene.onUnload = runUnloaded;

    return scene;
  };

  Reflect.set(creator, "sceneName", name);

  return creator;
}
