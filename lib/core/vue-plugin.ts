import type { Plugin } from "vue";
import { LibStore } from "./store";
import type { SetupOption } from "./types/setup";

export function createCannedShrimp({ keyboard: actionKey, defaultScene, pixiAppConfig, features }: SetupOption): Plugin {
  return {
    install() {
      if (actionKey) LibStore.instance.actionKey = actionKey;

      LibStore.instance.defaultScene = defaultScene;
      LibStore.instance.pixiApplicationOptions = pixiAppConfig;

      if (features) {
        for (const key in features) {
          if (Object.prototype.hasOwnProperty.call(features, key)) {
            const k = key as keyof SetupOption["features"];
            const value = features[k];
            if (value) LibStore.instance.features![k] = value;
          }
        }
      }
    },
  };
}
