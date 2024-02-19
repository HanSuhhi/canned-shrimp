import { coreStore, defineContainer } from "canned-shrimp";
import { random, sample } from "lodash-es";
import { ref } from "vue";
import { GAME_MAP_X_LENGTH, GAME_MAP_Y_LENGTH } from "../../utils/var";
import { GameChildrenIndex } from "../../scenes/game/game.enum";
import { createBlockName } from "../../scenes/game/map";
import { BlockState } from "../block/block.state";

export function defineGold() {
  const gold = defineContainer("gold-controller");

  const currentGoldPosition = ref<BlockPosition>();

  function createNewGold() {
    const snake = coreStore.scene?.getChildAt(GameChildrenIndex.Snake) as Snake;
    const gameMap = coreStore.scene?.getChildAt(GameChildrenIndex.Map) as GameMap;

    const x = random(0, GAME_MAP_X_LENGTH - 1);
    let y: number;
    const xInSnakeContains = snake.contains.some(([blockX]) => blockX === x);
    if (xInSnakeContains) {
      const contains = snake.contains
        .filter(([blockX]) => blockX === x)
        .sort((a, b) => a[1] - b[1]);

      const intervals = [[0, GAME_MAP_Y_LENGTH - 1]];

      for (const [x, y] of contains) {
        const index = intervals.findIndex(interval => interval[1] >= y);

        if (index !== -1) {
          const [start, end] = intervals[index];
          intervals.splice(index, 1, [start, x - 1], [x + 1, end]);
        }
      }

      const [min, max] = sample(intervals)!;
      y = random(min, max);
    }
    else {
      y = random(0, GAME_MAP_Y_LENGTH - 1);
    }

    currentGoldPosition.value = [x, y];
    const block = gameMap.getChildByName(createBlockName(currentGoldPosition.value)) as Block;
    block.updateState(BlockState.Gold);
  }

  return Object.assign(gold, {
    createNewGold,
    currentGoldPosition,
  });
}
