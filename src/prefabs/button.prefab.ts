import { Container, Graphics, Text } from "pixi.js";
import { CoreStore } from "@/main";

export function defineButton(title: string, callback: Function) {
  const container = new Container();

  const background = new Graphics();
  background.beginFill(0xFFFFFF);
  background.drawRect(0, 0, 100, 50);
  background.endFill();

  const text = new Text(title);
  text.anchor.set(0.5);
  text.position.set(background.width / 2, background.height / 2);

  container.addChild(background);
  container.addChild(text);

  container.eventMode = "static";
  container.cursor = "pointer";
  container.on("pointerdown", () => callback());

  container.position.set((CoreStore.instance.width - container.width) / 2, (CoreStore.instance.height - container.height) / 2);

  return container;
}
