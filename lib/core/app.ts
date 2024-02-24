import { Application } from "pixi.js";
import { defineMatter } from "./matter";
import { defineSceneManager, switchScene } from "./sceneManager";
import { CoreStore, LibStore } from "./store";
import { Debug } from "@/utils/console";

function definePixiApp() {
  const app = new Application({
    view: LibStore.instance.canvasNode,
    ...LibStore.instance.pixiApplicationOptions,
  });
  CoreStore.instance.app = app;
  // eslint-disable-next-line ts/ban-ts-comment, ts/prefer-ts-expect-error
  // @ts-ignore
  globalThis.__PIXI_APP__ = CoreStore.instance.app;
}

export async function createDefaultApp(canvas: HTMLCanvasElement) {
  if (LibStore.instance.canvasNode || LibStore.instance.sceneManager) return;
  LibStore.instance.canvasNode = canvas;
  definePixiApp();
  if (LibStore.instance.features?.matterJs) defineMatter(LibStore.instance.canvasNode);
  LibStore.instance.sceneManager = await defineSceneManager();
  Debug("Pixi application created");

  switchScene(LibStore.instance.defaultScene);
};
