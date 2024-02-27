import { mapKeys } from "lodash-es";
import { type Plugin, warn } from "vue";
import { CoreStore, LibStore } from "./store";
import type { SetupOption } from "./types/setup";

function getFilenameFromPath(path: string): string {
  return path.split("/").pop()!.split(".").shift() || "";
}

function updateFilenameFromViteGlob(_: any, path: string): string {
  return getFilenameFromPath(path);
}

function findSameElements(arr: string[]): string[] {
  const sameEle: string[] = [];
  arr.sort().reduce((p, c) => {
    if (p === c) sameEle.push(p);
    return c;
  }, "");
  return sameEle;
}

export function createCannedShrimp({ keyboard: actionKey, defaultScene, pixiAppConfig, features }: SetupOption): Plugin {
  return {
    install() {
      if (actionKey) LibStore.instance.actionKey = actionKey;

      const scenes = Reflect.get(CoreStore.prototype, "scenes");
      const sameEles = findSameElements(Object.keys(scenes).map(scene => getFilenameFromPath(scene)));
      if (sameEles.length > 0)
        warn("Please do not use the same scene name.", `(${sameEles.toString()})`);

      LibStore.instance.scenes = mapKeys(scenes, updateFilenameFromViteGlob);

      LibStore.instance.defaultScene = defaultScene || "Init" || "init" || Object.keys(scenes)[0];
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
