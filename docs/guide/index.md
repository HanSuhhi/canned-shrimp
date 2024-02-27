# Quick Start

## Tips

- Currently only supports use in [Vite](https://vitejs.dev/) + [Vue.js](https://vuejs.org/) projects.
- The engine relies on [Pixi.js](https://pixijs.com/) and [Vue.js](https://vuejs.org/), having some knowledge of both will make development a lot easier.

## Installation

Before you start, make sure you have a [Vite](https://vitejs.dev/) + [Vue.js](https://vuejs.org/) project, refer to [Scaffolding your first Vite project](https://vitejs.dev/guide/#scaffolding-your-first-vite-project).

### Install dependencies

Use your favorite package manager to install `canned-shrimp` :

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

You also need to install [`pixi.js`](https://pixijs.com/) :

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

### Use vite plugin

After installation, you first need to use the provided vite plugin in `vite.config.ts`:

```js {3,6}
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { cannedShrimp } from "canned-shrimp/vite-plugin";

export default defineConfig({
  plugins: [vue(), cannedShrimp()]
});
```

### Use vue plugin

Then you need to create a `canned-shrimp plugin` and pass it to the vue application:

```js {2,5,8}
import { createApp } from "vue";
import { createCannedShrimp } from "canned-shrimp";
import App from "./App.vue";

const cannedShrimp = createCannedShrimp({ defaultScene: "Init" });

createApp(App)
  .use(cannedShrimp)
  .mount("#app");
```
The `createCannedShrimp` function has a required string parameter `defaultScene`, which is used to represent the name of the initial scene. For more information on the parameters of the `createCannedShrimp` function, you can check the `vue-plugin`.

:::tip
For scenes, using enum or object to represent the scene enumeration is a good idea. For example:

```ts
export enum Scenes {
  Init = "Init",
  Menu = "Menu",
}
```
This way you can keep the scene names consistent in development and avoid problems caused by naming errors. When you do this, the `canned-shrimp` plugin will be created like this:

```ts
const cannedShrimp = createCannedShrimp({ defaultScene: Scenes.Init });
```
:::

### More

At this point, `canned-shrimp` has been successfully installed into the project.
