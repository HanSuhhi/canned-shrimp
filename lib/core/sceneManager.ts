import { useAssetLoader } from "./assetLoader";
import type { Scene } from "./types/scene";
import { CoreStore, LibStore } from "./store";
import { Debug } from "@/utils/console";
import { stopOnResizeWatch } from "@/composables/core";

const scene_instances: Record<string, Scene> = {};

function defineSceneRemover() {
  async function destoryScene(scene: Scene) {
    delete scene_instances[scene.sceneName];
    scene.destroy({ children: true });
  }

  async function removeStateScene(scene: Scene) {
    CoreStore.instance.app?.stage.removeChild(scene);
  }

  return async (destory: boolean = true) => {
    if (!CoreStore.instance.scene) return;

    const scene = CoreStore.instance.scene;

    // if children have close function, run it.
    scene.children.forEach(async (child: any) => {
      if (child.close) await child.close();
    });

    if (destory) destoryScene(CoreStore.instance.scene);
    else removeStateScene(CoreStore.instance.scene);

    if (scene.onUnload) await scene.onUnload();

    stopOnResizeWatch();
  };
}

function defineSceneCreator() {
  return async (scene_name: string | number) => {
    const scene = await CoreStore.instance.scenes[scene_name]();
    scene_instances[scene_name] = scene;

    if (scene.onCreated) await scene.onCreated();

    return scene;
  };
}

export async function defineSceneManager() {
  if (!LibStore.instance.canvasNode) throw new Error("Failed to find canvas element");

  const removeCurrentScene = defineSceneRemover();
  const createScene = defineSceneCreator();

  Debug("Everything is ready to go.");

  return { removeCurrentScene, createScene };
}

export async function switchScene(scene_name: string | number, load_asset = true) {
  if (!LibStore.instance.sceneManager) throw new Error("sceneManager is not initialized.");
  await LibStore.instance.sceneManager.removeCurrentScene();
  if (load_asset) {
    const { loadAssetsGroup } = useAssetLoader();
    await loadAssetsGroup(scene_name);
  }

  const currentScene = (scene_instances[scene_name] || await LibStore.instance.sceneManager.createScene(scene_name));

  if (!currentScene) throw new Error(`Failed to initialize scene: ${scene_name}`);

  CoreStore.instance.app!.stage.addChild(currentScene);

  if (currentScene.onLoad) await currentScene.onLoad();

  return currentScene;
}

export type SceneManager = Awaited<ReturnType<typeof defineSceneManager>>;
