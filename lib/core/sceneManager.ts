import { useAssetLoader } from "./assetLoader";
import { coreStore } from "./core-store";
import type { Scene } from "./types/scene";
import { Debug } from "@/utils/console";
import { stopOnResizeWatch } from "@/composables/core";

const scene_instances: Record<string, Scene> = {};

function defineSceneRemover() {
  async function destoryScene(scene: Scene) {
    delete scene_instances[scene.sceneName];
    scene.destroy({ children: true });
  }

  async function removeStateScene(scene: Scene) {
    coreStore.app?.stage.removeChild(scene);
  }

  return async (destory: boolean = true) => {
    if (!coreStore.scene) return;

    const scene = coreStore.scene;

    // if children have close function, run it.
    scene.children.forEach(async (child: any) => {
      if (child.close) await child.close();
    });

    if (destory) destoryScene(coreStore.scene);
    else removeStateScene(coreStore.scene);

    if (scene.unload) await scene.unload();

    stopOnResizeWatch();
  };
}

function defineSceneCreator() {
  return async (scene_name: string | number) => {
    const scene = await coreStore.scenes[scene_name]();
    scene_instances[scene_name] = scene;

    if (scene.load) await scene.load();

    return scene;
  };
}

export async function defineSceneManager() {
  if (!coreStore.canvasNode) throw new Error("Failed to find canvas element");

  const removeCurrentScene = defineSceneRemover();
  const createScene = defineSceneCreator();

  Debug("Everything is ready to go.");

  return { removeCurrentScene, createScene };
}

export async function switchScene(scene_name: string | number, load_asset = true) {
  if (!coreStore.sceneManager) throw new Error("sceneManager is not initialized.");
  await coreStore.sceneManager.removeCurrentScene();
  if (load_asset) {
    const { loadAssetsGroup } = useAssetLoader();
    await loadAssetsGroup(scene_name);
  }

  const currentScene = (scene_instances[scene_name] || await coreStore.sceneManager.createScene(scene_name));

  if (!currentScene) throw new Error(`Failed to initialize scene: ${scene_name}`);

  coreStore.app!.stage.addChild(currentScene);

  if (currentScene.start) await currentScene.start();

  return currentScene;
}

export type SceneManager = Awaited<ReturnType<typeof defineSceneManager>>;
