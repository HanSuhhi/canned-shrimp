import * as PIXI from "pixi.js";
import { ref } from "vue";
import { useAssetLoader } from "./assetLoader";
import { coreStore } from "./core-store";
import { defineMatter } from "./matter";
import type { Scene } from "./types/scene";
import { Debug } from "@/utils/console";
import { stopOnResizeWatch } from "@/composables/core";

let scene_manager: Awaited<ReturnType<typeof defineSceneManager>>;
let createScene: (scene_name: string | number) => Promise<Scene>;
let removeCurrentScene: (destory?: boolean) => Promise<void>;
const canvas_node = ref<HTMLCanvasElement>();
const scene_instances: Record<string, Scene> = {};

function defineSceneRemover() {
  async function destoryScene(scene: Scene) {
    delete scene_instances[scene.sceneName];
    scene.destroy({ children: true });
  }

  async function removeStateScene(scene: Scene) {
    coreStore.app?.stage.removeChild(scene);
  }

  removeCurrentScene = async (destory: boolean = true) => {
    if (!coreStore.scene) return;

    const scene = coreStore.scene;

    if (destory) destoryScene(coreStore.scene);
    else removeStateScene(coreStore.scene);

    if (scene.unload) await scene.unload();
    stopOnResizeWatch();
  };
}

function defineSceneCreator() {
  createScene = async (scene_name: string | number) => {
    const scene = coreStore.scenes[scene_name]();
    scene_instances[scene_name] = scene;

    if (scene.load) await scene.load();

    return scene;
  };
}

function definePixiApp() {
  const app = new PIXI.Application({
    view: canvas_node.value,
    ...coreStore.pixiApplicationOptions,
  });
  coreStore.app = app;
  // eslint-disable-next-line ts/ban-ts-comment
  // @ts-expect-error
  globalThis.__PIXI_APP__ = coreStore.app;
}

async function defineSceneManager() {
  if (!canvas_node.value) throw new Error("Failed to find canvas element");

  Debug("Pixi application created");

  defineSceneRemover();
  defineSceneCreator();

  Debug("Everything is ready to go.");

  return { removeCurrentScene, createScene };
}

export async function createDefaultApp(canvas: HTMLCanvasElement) {
  if (canvas_node.value || scene_manager) return;
  canvas_node.value = canvas;
  definePixiApp();
  defineMatter(canvas_node.value);
  scene_manager = await defineSceneManager();

  switchScene(coreStore.defaultScene);
};

export async function switchScene(scene_name: string | number, load_asset = true) {
  await removeCurrentScene();
  if (load_asset) {
    const { loadAssetsGroup } = useAssetLoader();
    await loadAssetsGroup(scene_name);
  }

  const currentScene = (scene_instances[scene_name] || await createScene(scene_name));

  if (!currentScene) throw new Error(`Failed to initialize scene: ${scene_name}`);

  coreStore.app!.stage.addChild(currentScene);

  if (currentScene.start) await currentScene.start();

  return currentScene;
}
