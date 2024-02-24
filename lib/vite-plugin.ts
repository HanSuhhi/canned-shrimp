import type { Plugin } from "vite";

export function cannedShrimp(): Plugin {
  return {
    name: "rollup-plugin-vue-canned-shrimp",
    transform(code, id) {
      if (id.includes("src/main")) {
        return {
          code: `import { CoreStore } from "canned-shrimp";
import { mapKeys } from "lodash-es";

function getFilenameFromPath(path) {
  return path.split("/").pop().split(".").shift() || "";
}

function updateFilenameFromViteGlob(_, path) {
  return getFilenameFromPath(path);
}

CoreStore.instance.scenes = mapKeys(import.meta.glob("/src/scenes/**/*.scene.ts", { eager: true, import: "default" }), updateFilenameFromViteGlob);
CoreStore.instance.assetFiles = Object.keys(import.meta.glob(["/public/**/*.*", "!/public/vite.svg", "!/public/bitmap-font/*.*"]));
${code}`,
        };
      }
    },
  };
}
