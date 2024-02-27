import { defineConfig } from "vitepress";

export const en = defineConfig({
  title: "Canned Shrimp",
  lang: "en",
  description: "Keep Lightweight, always be fun",

  themeConfig: {
    nav: [
      { text: "Guide", link: "/guide/" },
      { text: "Demo", link: "/demo/" },
    ],

    sidebar: {
      "/guide/": [
        {
          text: "Description",
          collapsed: false,
          items: [
            { text: "What is Canned Shrimp?", link: "/guide/introduction" },
            { text: "Guide", link: "/guide/" },
          ],
        },
      ],
      "/demo/": [
        { text: "Examples", link: "/demo/" },
      ],
    },

  },
});
