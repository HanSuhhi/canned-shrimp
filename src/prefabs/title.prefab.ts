import { Text } from "pixi.js";
import { definePrefab } from "../../lib/core/prefab";

class TitleText extends Text {
  constructor(text: string) {
    super(text, {
      fill: "white",
    });
  }
}

export function createTitlePrefab(text: string) {
  const model = new TitleText(text);

  return definePrefab(model, {
    close() {
      // eslint-disable-next-line no-console
      console.log(`${text} closed`);
    },
  });
}
