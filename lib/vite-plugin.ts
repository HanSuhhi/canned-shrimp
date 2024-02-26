import type { Plugin } from "vite";
import { mapKeys } from "lodash-es";

function cannedShrimp(): Plugin {
  return {
    name: "rollup-plugin-vue-canned-shrimp",
    transform(code, id) {
      if (id.includes("src/main")) {
        return {
          code: `import { CoreStore as __core_store__ } from "canned-shrimp";
import { cannedShrimp as __canned_shrimp__ } from 'canned-shrimp/vite-plugin'

function getFilenameFromPath(path) {
  return path.split("/").pop().split(".").shift() || "";
}

function updateFilenameFromViteGlob(_, path) {
  return getFilenameFromPath(path);
}

__core_store__.instance.scenes = __canned_shrimp__.__map_keys__(import.meta.glob("/src/scenes/**/*.scene.ts", { eager: true, import: "default" }), updateFilenameFromViteGlob);
__core_store__.instance.assetFiles = Object.keys(import.meta.glob(["/public/**/*.*", "!/public/vite.svg", "!/public/bitmap-font/*.*"]));
${code}`,
        };
      }
    },
  };
}

Reflect.set(cannedShrimp, "__map_keys__", mapKeys);

export { cannedShrimp };
