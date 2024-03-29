import { defineConfig } from "vitepress";
import { shared } from "./shared";
import { zh } from "./cn.config";
import { en } from "./en.config";

export default defineConfig({
  ...shared,
  locales: {
    root: {
      label: "English",
      ...en,
    },
    cn: {
      label: "中文",
      ...zh,
    },
  },
});
