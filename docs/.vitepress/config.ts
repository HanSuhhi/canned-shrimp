import { defineConfig } from "vitepress";

export default defineConfig({
  title: "Canned Shrimp",
  description: "Keep Lightweight, always be fun",
  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      // { text: "Examples", link: "/markdown-examples" },
    ],

    sidebar: [
      // {
      //   text: "Examples",
      //   items: [
      //     { text: "Markdown Examples", link: "/markdown-examples" },
      //     { text: "Runtime API Examples", link: "/api-examples" },
      //   ],
      // },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/HanSuhhi/canned-shrimp" },
    ],
  },
  locales: {
    root: {
      label: "English",
      lang: "en",
    },
    cn: {
      label: "中文",
      lang: "cn",
    },
  },
});
