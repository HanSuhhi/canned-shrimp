import { defineContainer } from "canned-shrimp";
import { range } from "lodash-es";
import { defineBlock } from "../../prefabs/block/block.prefab";
import { GAME_BLOCK_SIZE, GAME_MAP_X_LENGTH, GAME_MAP_Y_LENGTH } from "../../utils/var";

export const createBlockName = ([x, y]: BlockPosition) => `block-${x}-${y}`;

export function defineGameMap() {
  const map = defineContainer("map");

  range(GAME_MAP_Y_LENGTH).forEach((y) => {
    range(GAME_MAP_X_LENGTH).forEach((x) => {
      const block = defineBlock();
      block.position.set(x * GAME_BLOCK_SIZE, y * GAME_BLOCK_SIZE);
      block.name = createBlockName([x, y]);
      map.addChild(block);
    });
  });

  const close = () => {
    map.children.forEach(block => (block as Block).close());
    console.log("close");
  };

  return Object.assign(map, {
    close,
  });
}
