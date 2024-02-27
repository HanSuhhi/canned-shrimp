import { defineConfig } from "vitepress";

export const zh = defineConfig({
  title: "Canned Shrimp",
  lang: "zh-Hans",
  description: "保持轻量，永远欢畅",
  themeConfig: {
    nav: [
      { text: "开始", link: "/cn/guide/" },
      { text: "Demo", link: "/cn/demo/" },
    ],

    docFooter: {
      prev: "上一页",
      next: "下一页",
    },

    lastUpdated: {
      text: "最后更新于",
      formatOptions: {
        dateStyle: "short",
        timeStyle: "medium",
      },
    },

    langMenuLabel: "多语言",
    returnToTopLabel: "回到顶部",
    sidebarMenuLabel: "菜单",
    darkModeSwitchLabel: "主题",
    lightModeSwitchTitle: "切换到浅色模式",
    darkModeSwitchTitle: "切换到深色模式",

    outline: {
      label: "本页导航",
    },

    sidebar: {
      "/cn/guide/": [
        {
          text: "简介",
          collapsed: false,
          items: [
            { text: "什么是 Canned Shrimp？", link: "/cn/guide/introduction" },
            { text: "快速开始", link: "/cn/guide/" },
          ],
        },
      ],
      "/cn/demo/": [
        { text: "示例", link: "/cn/demo/" },
      ],
    },

  },
});
