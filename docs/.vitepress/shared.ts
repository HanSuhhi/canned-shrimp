import { defineConfig } from "vitepress";

export const shared = defineConfig({
  lastUpdated: true,
  cleanUrls: true,
  metaChunk: true,

  themeConfig: {
    socialLinks: [
      { icon: "github", link: "https://github.com/HanSuhhi/canned-shrimp" },
    ],
  },

});
