import { Assets } from "pixi.js";
import { coreStore } from "./core-store";

interface Asset {
  name: string;
  url: string;
  ext: string;
  category: string;
  group: string;
}

function createManifest() {
  const assetsManifest: Asset[] = [];
  const assetPathRegexp = /public\/(?<group>[\w.-]+)\/(?<category>[\w.-]+)\/(?<name>[\w.-]+)\.(?<ext>\w+)$/;

  coreStore.assetFiles.forEach((assetPath) => {
    const match = assetPathRegexp.exec(assetPath);

    if (!match || !match.groups) {
      return console.error(
        `Invalid asset path: ${assetPath}, should match ${assetPathRegexp}`,
      );
    }

    const { group, category, name, ext } = match.groups;

    // Skip image files in the spine or spritesheets category
    if (category === "spritesheets" && ext !== "json")
      return;

    if (category === "spine" && ext !== "json" && ext !== "skel")
      return;

    assetsManifest.push({
      group,
      category,
      name,
      ext,
      url: assetPath.replace(/.*public/, ""),
    });
  });

  return assetsManifest;
}

export function useAssetLoader() {
  const manifest = createManifest();

  async function loadAssetsGroup<T>(group: T) {
    const sceneAssets = manifest.filter(asset => asset.group === group);

    for (const asset of sceneAssets) {
      Assets.add({
        alias: asset.name,
        src: asset.url,
      });
    }

    const resources = await Assets.load(sceneAssets.map(asset => asset.name));

    return resources;
  }

  return { loadAssetsGroup };
}
