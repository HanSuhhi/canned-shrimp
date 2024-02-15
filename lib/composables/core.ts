import { useWindowSize } from "@vueuse/core";
import type { DisplayObject } from "pixi.js";
import { Container } from "pixi.js";
import type { WatchOptions, WatchStopHandle } from "vue";
import { watch } from "vue";
import { coreStore } from "@/core/core-store";

const watchStopHandles: WatchStopHandle[] = [];

export function onResize(func: () => void, watchOptions?: WatchOptions) {
  const { width, height } = useWindowSize();

  watchStopHandles.push(watch(width, func, watchOptions));
  watchStopHandles.push(watch(height, func, watchOptions));
}
export function stopOnResizeWatch() {
  watchStopHandles.forEach(handle => handle());
}

export function update(func: (ms?: number) => void) {
  coreStore.app!.ticker.add(func);
  return () => stopUpdate(func);
}

export function stopUpdate(func: (ms?: number) => void) {
  coreStore.app!.ticker.remove(func);
}

export function defineContainer<T extends DisplayObject>(name: string) {
  const container = new Container<T>();
  container.name = name;
  return container;
}
