import { coreStore } from "./core-store";
import type { SetupOption } from "./types/setup";

export function setup({ keyboard: actionKey, defaultScene, pixiAppConfig, scenes }: SetupOption) {
  if (actionKey) coreStore.actionKey = actionKey;

  coreStore.defaultScene = defaultScene;
  coreStore.pixiApplicationOptions = pixiAppConfig;
  coreStore.scenes = scenes;
}
