import { coreStore, defineContainer } from "canned-shrimp";
import { isEqual, random } from "lodash-es";
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

    let goldPosition: BlockPosition = [random(0, GAME_MAP_X_LENGTH - 1), random(0, GAME_MAP_Y_LENGTH - 1)];

    while (snake.contains.some(contain => isEqual(goldPosition, contain))) goldPosition = [random(0, GAME_MAP_X_LENGTH - 1), random(0, GAME_MAP_Y_LENGTH - 1)];

    currentGoldPosition.value = goldPosition;
    const block = gameMap.getChildByName(createBlockName(goldPosition)) as Block;
    block.updateState(BlockState.Gold);
  }

  return Object.assign(gold, {
    createNewGold,
    currentGoldPosition,
  });
}
