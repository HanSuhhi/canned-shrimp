export function cannedShrimp() {
  return {
    name: "rollup-plugin-vue-canned-shrimp",
    transform(code, id) {
      if (id.includes("src/main")) {
        return {
          code: `import { coreStore } from "canned-shrimp";
import { mapKeys } from "lodash-es";

function getFilenameFromPath(path) {
  return path.split("/").pop().split(".").shift() || "";
}

function updateFilenameFromViteGlob(_, path) {
  return getFilenameFromPath(path);
}

coreStore.scenes = mapKeys(import.meta.glob("/src/scenes/**/*.scene.ts", { eager: true, import: "default" }), updateFilenameFromViteGlob);
coreStore.assetFiles = Object.keys(import.meta.glob(["/public/**/*.*", "!/public/vite.svg", "!/public/bitmap-font/*.*"]));
${code}`,
        };
      }
    },
  };
}
