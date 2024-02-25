import { defineConfig } from "vitepress";
import { shared } from "./shared";
import { zh } from "./cn.config";

export default defineConfig({
  ...shared,
  locales: {
    root: {
      label: "English",
      lang: "en",

    },
    cn: {
      label: "中文",
      ...zh,
    },
  },
});
