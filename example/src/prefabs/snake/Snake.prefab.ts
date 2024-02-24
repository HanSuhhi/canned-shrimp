import { Button_State, CoreStore, Keyboard, defineContainer, definePrefab } from "canned-shrimp";
import { floor, isEqual } from "lodash-es";
import { GameChildrenIndex } from "../../scenes/game/game.enum";
import { createBlockName } from "../../scenes/game/map";
import { GAME_MAP_X_LENGTH, GAME_MAP_Y_LENGTH } from "../../utils/var";
import { BlockState } from "../block/block.state";
import { SnakeDirection } from "./snake.enum";
import { SnakeState, useSnakeState } from "./snake.state";

function useSnakeMap() {
  const beginBlockX = floor(GAME_MAP_X_LENGTH / 2);
  const beginBlockY = floor(GAME_MAP_Y_LENGTH / 2);

  const contains: Array<BlockPosition> = [
    [beginBlockX, beginBlockY],
  ];

  function init() {
    const gameMap = CoreStore.instance.scene?.getChildAt(GameChildrenIndex.Map) as GameMap;

    contains.forEach((blockPosition) => {
      const block = gameMap.getChildByName(createBlockName(blockPosition)) as Block;
      block.updateState(BlockState.Snake);
    });
  }

  return { contains, init };
}

function useSnakeMove({ contains }: ReturnType<typeof useSnakeMap>, { state, deadReason }: ReturnType<typeof useSnakeState>) {
  let direction: SnakeDirection = SnakeDirection.Right;

  function move() {
    const gameMap = CoreStore.instance.scene?.getChildAt(GameChildrenIndex.Map) as GameMap;
    const goldController = CoreStore.instance.scene?.getChildAt(GameChildrenIndex.Gold) as Gold;
    const [currentX, currentY] = contains[contains.length - 1];

    let targetPosition: BlockPosition;
    switch (direction) {
      case SnakeDirection.Up:
        targetPosition = [currentX, currentY - 1];
        break;
      case SnakeDirection.Down:
        targetPosition = [currentX, currentY + 1];
        break;
      case SnakeDirection.Left:
        targetPosition = [currentX - 1, currentY];
        break;
      case SnakeDirection.Right:
        targetPosition = [currentX + 1, currentY];
        break;
      default: throw new Error("unknown direction");
    }

    if (targetPosition[0] > GAME_MAP_X_LENGTH - 1 || targetPosition[0] < 0 || targetPosition[1] > GAME_MAP_Y_LENGTH - 1 || targetPosition[1] < 0) {
      state.value = SnakeState.Dead;
      deadReason.value = "Touched the boundary!";
      return;
    };
    if (contains.some(item => isEqual(targetPosition, item))) {
      state.value = SnakeState.Dead;
      deadReason.value = "Attacked self!";
      return;
    }

    contains.push(targetPosition);
    const targetBlock = gameMap.getChildByName(createBlockName(targetPosition)) as Block;
    targetBlock.updateState(BlockState.Snake);

    const isGetGold = isEqual(contains[contains.length - 1], goldController.currentGoldPosition.value);
    if (!isGetGold) {
      const dropPosition = contains.shift()!;
      const dropBlock = gameMap.getChildByName(createBlockName(dropPosition)) as Block;
      dropBlock.updateState(BlockState.Empty);
    }
    else { goldController.createNewGold(); };
  }

  const keyboard = Keyboard.instance;
  const stopKeyboard = keyboard?.onAction<SnakeDirection>(({ action, button_state }) => {
    if (button_state === Button_State.Pressed) direction = action;
  });

  return { move, stopKeyboard };
}

export function defineSnake() {
  const snake = defineContainer("snake-controller");
  const snakeMap = useSnakeMap();
  const snakeState = useSnakeState();

  const { move, stopKeyboard } = useSnakeMove(snakeMap, snakeState);

  return definePrefab(Object.assign(snake, {
    contains: snakeMap.contains,
    init: snakeMap.init,
    state: snakeState.state,
    deadReason: snakeState.deadReason,
    move,
  }), {
    close() {
      stopKeyboard();
    },
  });
}
