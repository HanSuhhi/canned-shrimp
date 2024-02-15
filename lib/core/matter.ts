import { Engine, Mouse, MouseConstraint, Runner, World } from "matter-js";
import { Debug } from "@/utils/console";

const engine = Engine.create();

export function useMatter() {
  return { engine };
}

function useMouseConstraint(canvas: HTMLCanvasElement) {
  const mouse = Mouse.create(canvas);
  mouse.pixelRatio = 2;
  const mouseConstraint = MouseConstraint.create(engine, {
    mouse,
    collisionFilter: {
      mask: 0b1,
    },
  });
  World.add(engine.world, mouseConstraint);
}

export function defineMatter(canvas: HTMLCanvasElement) {
  useMouseConstraint(canvas);

  engine.gravity.y = 0;

  Runner.run(engine);

  Debug("Matter is ready to go.");
}
