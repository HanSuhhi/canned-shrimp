import { Container, Graphics } from "pixi.js";
import { GAME_BLOCK_SIZE } from "../../utils/var";

export class Block extends Container {
  name: string | null = "block";
}

export class Snake extends Graphics {
  constructor() {
    super();
    this
      .beginFill(0xFFFFFF)
      .drawRect(0, 0, GAME_BLOCK_SIZE, GAME_BLOCK_SIZE)
      .endFill();
  }
}

export class Gold extends Graphics {
  constructor() {
    super();
    this
      .beginFill("hsl(45deg 86% 58%)")
      .drawRect(0, 0, GAME_BLOCK_SIZE, GAME_BLOCK_SIZE)
      .endFill();
  }
}
