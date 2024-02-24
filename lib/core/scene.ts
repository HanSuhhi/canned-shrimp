import { ref, watch } from "vue";
import { LibStore } from "./store";
import type { Scene } from "./types/scene";
import { SceneLifecycle, SceneState } from "@/enum";

import { defineContainer } from "@/composables/core";

function createScene(name: string | number): Scene {
  const container = defineContainer(name.toString());

  return Object.assign(container, {
    sceneName: name,
    state: ref(),
  });
}

async function runSceneLifeCycle(cycle: SceneLifecycle, scene: Scene) {
  for (let index = 0; index < LibStore.instance.sceneLifeCycle[cycle].length; index++)
    await LibStore.instance.sceneLifeCycle[cycle][index](scene);
}

export function defineScene<T>(
  name: Parameters<typeof createScene>["0"],
  sceneSetup: () => T,
) {
  const creator = async () => {
    const scene: Scene = createScene(name);

    await sceneSetup();

    const stopWatch = watch(scene.state, async (newState) => {
      switch (newState) {
        case SceneState.Created:
          await runSceneLifeCycle(SceneLifecycle.onCreated, scene);
          LibStore.instance.sceneLifeCycle[SceneLifecycle.onCreated] = [];
          break;
        case SceneState.Load:
          await runSceneLifeCycle(SceneLifecycle.onLoad, scene);
          scene.state.value = SceneState.Alive;
          break;
        case SceneState.Hide:
          await runSceneLifeCycle(SceneLifecycle.onHide, scene);
          break;
        case SceneState.Destory:
          await runSceneLifeCycle(SceneLifecycle.onDestory, scene);
          LibStore.instance.resetSceneLifeCycle();
          stopWatch();
          break;
        case SceneState.Alive: break;
        default: throw new Error("unexpected error");
      }
    });

    return scene;
  };

  Reflect.set(creator, "sceneName", name);

  return creator;
}

export function onSceneCreated(fn: (scene: Scene) => any) {
  LibStore.instance.sceneLifeCycle[SceneLifecycle.onCreated].push(fn);
}
export function onSceneLoaded(fn: (scene: Scene) => any) {
  LibStore.instance.sceneLifeCycle[SceneLifecycle.onLoad].push(fn);
}
export function onSceneHide(fn: (scene: Scene) => any) {
  LibStore.instance.sceneLifeCycle[SceneLifecycle.onHide].push(fn);
}
export function onSceneDestory(fn: (scene: Scene) => any) {
  LibStore.instance.sceneLifeCycle[SceneLifecycle.onDestory].push(fn);
}
