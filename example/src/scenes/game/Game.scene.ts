import { CoreStore, defineScene, switchScene, update } from "canned-shrimp";
import { watch } from "vue";
import { createDiscreteApi, darkTheme } from "naive-ui";
import { defineSnake } from "../../prefabs/snake/Snake.prefab";
import { Scenes } from "../../scenes.enum";
import { defineGold } from "../../prefabs/gold/Gold.prefab";
import { SnakeState } from "../../prefabs/snake/snake.state";
import { GameChildrenIndex } from "./game.enum";
import { defineGameMap } from "./map";

const { dialog } = createDiscreteApi(
  ["dialog"],
  {
    configProviderProps: { theme: darkTheme },
  },
);

export default defineScene(Scenes.Game, (scene, { onLoad, onCreated }) => {
  let snake: Snake;
  let gold: Gold;
  let map: GameMap;

  onCreated(async () => {
    snake = defineSnake();
    scene.addChildAt(snake, GameChildrenIndex.Snake);

    gold = defineGold();
    scene.addChildAt(gold, GameChildrenIndex.Gold);

    map = defineGameMap();
    scene.addChildAt(map, GameChildrenIndex.Map);
  });

  onLoad(async () => {
    snake.init();
    gold.createNewGold();

    CoreStore.instance.app!.ticker.maxFPS = 10;

    const off = update(snake.move);
    const stopWatch = watch(snake.state, (newState) => {
      if (newState === SnakeState.Dead) {
        off();
        stopWatch();
        dialog.warning({
          title: "Game Over ~",
          content: snake.deadReason.value,
          positiveText: "Back",
          closable: false,
          maskClosable: false,
          onPositiveClick() {
            switchScene(Scenes.Menu);
          },
        });
      }
    });
  });
});
