import { AnimatedSprite, Assets, Texture } from "pixi.js";
import { sound } from "@pixi/sound";
import { keys } from "lodash-es";
import type { AnimationStruct } from "./types/animation";
import { defineContainer } from "@/composables/core";

interface SpriteSheetAnimationProps {
  speed?: number;
};

export function useSpritesheetAnimation<T extends string>(name: T, props?: SpriteSheetAnimationProps) {
  const speed = props?.speed || 1;
  const container = defineContainer("spritesheet");
  const spritesheet = Assets.get(name);
  const { animations: animation_textures, data: { frames } } = spritesheet;
  const animations = new Map<string, AnimatedSprite>();
  let sprite: AnimatedSprite | undefined;
  let current_animation: string | undefined;

  if (!Object.keys(animation_textures).length) spritesheet.animations.default = keys(frames).map(frame => Texture.from(frame));

  function initAnimation(animation: string) {
    const textures = animation_textures[animation];

    if (!textures) {
      console.error(`Animation ${animation} not found`);

      return;
    }

    const sprite = new AnimatedSprite(textures);

    sprite.name = animation;
    sprite.anchor.set(0.5);

    sprite.animationSpeed = speed;

    return sprite;
  }

  function play({ animation, sound_name, loop = false, speed: _speed = speed, reverse }: AnimationStruct) {
    if (sprite) {
      sprite.stop();

      container.removeChild(sprite);
    }

    sprite = animations.get(animation);

    if (!sprite) {
      sprite = initAnimation(animation);
      if (!sprite) return;
      animations.set(animation, sprite);
    }

    current_animation = animation;

    sprite.loop = loop;
    sprite.animationSpeed = _speed;
    if (reverse) {
      if (loop) sprite.animationSpeed = -sprite.animationSpeed;
      else sprite.textures = sprite.textures.reverse();
    }
    sprite.gotoAndPlay(0);

    if (sound_name) sound.play(sound_name);

    container.addChild(sprite);

    sprite.onComplete = () => current_animation = undefined;
  }

  return Object.assign(container, { play, current_animation });
}
