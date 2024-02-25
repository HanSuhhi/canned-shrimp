# 快速开始

## 提示

- 目前仅支持在 [Vite](https://cn.vitejs.dev/) + [Vue.js](https://cn.vuejs.org/) 项目中使用。
- 引擎依赖于 [Pixi.js](https://pixijs.com/) 和 [Vue.js](https://cn.vuejs.org/)，对两者有所涉猎会为开发增添不少便利。

## 安装

开始之前，务必确保拥有一个 [Vite](https://cn.vitejs.dev/) + [Vue.js](https://cn.vuejs.org/) 的项目，参考 [搭建第一个 Vite 项目](https://cn.vitejs.dev/guide/#scaffolding-your-first-vite-project)。

### 下载依赖

使用喜欢的包管理器安装 `canned-shrimp` ：

::: code-group

```sh [npm]
$ npm add canned-shrimp
```

```sh [pnpm]
$ pnpm add canned-shrimp
```

```sh [yarn]
$ yarn add canned-shrimp
```

```sh [bun]
$ bun add canned-shrimp
```

:::

同时还需要安装 [`pixi.js`](https://pixijs.com/) ：

::: code-group

```sh [npm]
$ npm add pixi.js
```

```sh [pnpm]
$ pnpm add pixi.js
```

```sh [yarn]
$ yarn add pixi.js
```

```sh [bun]
$ bun add pixi.js
```

:::

### 使用 vite 插件

安装完成之后，首先需要在 `vite.config.ts` 中使用所提供的 vite 插件：

```js {3,6}
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { cannedShrimp } from "canned-shrimp/plugin";

export default defineConfig({
  plugins: [vue(), cannedShrimp()]
});
```

### 使用 vue 插件

接着需要创建一个 `canned-shrimp` 插件传递给 vue 应用：

```js {2,5,8}
import { createApp } from "vue";
import { createCannedShrimp } from "canned-shrimp";
import App from "./App.vue";

const cannedShrimp = createCannedShrimp({ defaultScene: "Init" });

createApp(App)
  .use(cannedShrimp)
  .mount("#app");
```

`createCannedShrimp` 函数有一个必须的字符串参数 `defaultScene`，用来表示初始场景的名称。对于 `createCannedShrimp` 函数的相关参数，你可以在 `vue-plugin` 中查看更多详情。

:::tip
对于场景而言，使用 enum 或者 object 来表示场景的枚举是一个不错的主意。例如：
```ts
export enum Scenes {
  Init = "Init",
  Menu = "Menu",
}
```
这样可以保持在开发中保持场景名称的一致，避免一些名称错误导致的问题。当你如此做后，`canned-shrimp` 插件就会被这样创建。

```ts
const cannedShrimp = createCannedShrimp({ defaultScene: Scenes.Init });
```
:::

### 更多

至此，`canned-shrimp` 已经成功安装到项目之中。
