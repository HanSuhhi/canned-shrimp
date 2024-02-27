import { useAssetLoader } from "./assetLoader";
import type { Scene } from "./types/scene";
import { CoreStore, LibStore } from "./store";
import { Debug } from "@/utils/console";
import { stopOnResizeWatch } from "@/composables/core";
import { SceneState } from "@/enum";

const scene_instances: Record<string, Scene> = {};

function defineSceneRemover() {
  async function destoryScene(scene: Scene) {
    scene.state.value = SceneState.Destory;
    delete scene_instances[scene.sceneName];
    scene.destroy({ children: true });
    stopOnResizeWatch();
  }

  async function hideScene(scene: Scene) {
    CoreStore.instance.app?.stage.removeChild(scene);
    scene.state.value = SceneState.Hide;
  }

  return async (destory = true) => {
    if (!CoreStore.instance.scene) return;

    const scene = CoreStore.instance.scene;

    if (destory) destoryScene(scene);
    else hideScene(scene);
  };
}

export async function defineSceneManager() {
  if (!LibStore.instance.canvasNode) throw new Error("Failed to find canvas element");

  const removeCurrentScene = defineSceneRemover();
  const createScene = async (scene_name: string | number) => {
    const scene = await LibStore.instance.scenes[scene_name]();
    scene_instances[scene_name] = scene;

    scene.state.value = SceneState.Created;

    return scene;
  };

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

  const currentScene = scene_instances[scene_name] || await LibStore.instance.sceneManager.createScene(scene_name);
  if (!currentScene) throw new Error(`Failed to initialize scene: ${scene_name}`);

  CoreStore.instance.app!.stage.addChild(currentScene);
  currentScene.state.value = SceneState.Load;

  return currentScene;
}

export type SceneManager = Awaited<ReturnType<typeof defineSceneManager>>;
