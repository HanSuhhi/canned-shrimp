import type { Plugin } from "vue";
import type { SetupOption } from "./types/setup";
import { coreStore } from "./core-store";

export function createCannedShrimp({ keyboard: actionKey, defaultScene, pixiAppConfig, features }: SetupOption): Plugin {
  return {
    install() {
      if (actionKey) coreStore.actionKey = actionKey;

      coreStore.defaultScene = defaultScene;
      coreStore.pixiApplicationOptions = pixiAppConfig;

      if (features) {
        for (const key in features) {
          if (Object.prototype.hasOwnProperty.call(features, key)) {
            const k = key as keyof SetupOption["features"];
            const value = features[k];
            if (value) coreStore.features![k] = value;
          }
        }
      }
    },
  };
}
