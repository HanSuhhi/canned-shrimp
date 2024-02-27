import { resolve } from "node:path";
import process from "node:process";
import { promises as fs } from "node:fs";
import type { Plugin } from "vite";
import fg from "fast-glob";
import { keyBy } from "lodash-es";
import { slash } from "@antfu/utils";

function getFilenameFromPath(path: string): string {
  return path.split("/").pop()!.split(".").shift() || "";
}

export function cannedShrimp(): Plugin {
  return {
    name: "rollup-plugin-vue-canned-shrimp",
    async config(config) {
      const sceneNames = fg.sync([
        slash(resolve(process.cwd(), "src", "scenes", "*.scene.ts")),
        slash(resolve(process.cwd(), "src", "scenes", "**", "*.scene.ts")),
      ])
        .reduce<string[]>((arr, c) => {
          const fileName = getFilenameFromPath(c);
          // if same filename, warn in vue-plugin
          if (!arr.includes(fileName)) arr.push(fileName);
          return arr;
        }, []);

      config.define = {
        ...config.define,
        SCENES: keyBy(sceneNames),
      };

      // write d.ts
      const dts = `declare const SCENES: {
${sceneNames.map((sceneName, index) => {
        return `  ${sceneName}: string;${(index === sceneNames.length - 1) ? "" : "\n"}`;
      }).join("")}
}`;

      await fs.writeFile(resolve(process.cwd(), "src", "canned-shrimp.d.ts"), dts, "utf-8");
    },
    transform(code, id) {
      if (id.includes("src/main")) {
        // @TODO CI
        return {
          code: `import { CoreStore as __core_store__ } from 'canned-shrimp';
import { CoreStore } from 'canned-shrimp';

const sceneFiles = import.meta.glob("/src/scenes/**/*.scene.ts", { eager: true, import: "default" });

Reflect.set(__core_store__.prototype, "scenes", sceneFiles);
Reflect.set(__core_store__.prototype, "assetFiles", Object.keys(import.meta.glob(["/public/**/*.*", "!/public/vite.svg", "!/public/plugin.ts", "!/public/bitmap-font/*.*"])));

${code}`,
        };
      }
    },
  };
}
