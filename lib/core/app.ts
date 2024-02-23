import { Application } from "pixi.js";
import { coreStore } from "./core-store";
import { defineMatter } from "./matter";
import { defineSceneManager, switchScene } from "./sceneManager";
import { Debug } from "@/utils/console";

function definePixiApp() {
  const app = new Application({
    view: coreStore.canvasNode,
    ...coreStore.pixiApplicationOptions,
  });
  coreStore.app = app;
  // eslint-disable-next-line ts/ban-ts-comment, ts/prefer-ts-expect-error
  // @ts-ignore
  globalThis.__PIXI_APP__ = coreStore.app;
}

export async function createDefaultApp(canvas: HTMLCanvasElement) {
  if (coreStore.canvasNode || coreStore.sceneManager) return;
  coreStore.canvasNode = canvas;
  definePixiApp();
  if (coreStore.features?.matterJs) defineMatter(coreStore.canvasNode);
  coreStore.sceneManager = await defineSceneManager();
  Debug("Pixi application created");

  switchScene(coreStore.defaultScene);
};
