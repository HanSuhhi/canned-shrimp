import { useMagicKeys } from "@vueuse/core";
import { forEach, isEqual, lowerCase, map } from "lodash-es";
import { utils } from "pixi.js";
import { watch } from "vue";
import { LibStore } from "./store";
import type { KeyboardEventKey } from "./types/keyboard";

enum Keyboard_State {
  ACTION = "67sml56z2spu",
}

export enum Button_State {
  Pressed,
  Release,
}

function createKeyboardActionKey(actionKey: Record<string | number, KeyboardEventKey | KeyboardEventKey[]>, numberEnum: boolean = true): Record<KeyboardEventKey, string | number> {
  const keyAction = Object.entries(actionKey).reduce<Record<string, string | number>>(
    (acc, [action, keys]) => {
      const action_value = numberEnum ? Number(action) : action;
      if (Array.isArray(keys)) keys.forEach(key => acc[key] = action_value);
      else acc[keys] = action_value;

      return acc;
    },
    {},
  );

  return keyAction;
}

type KeyboardAction = ReturnType<typeof createKeyboardActionKey>;

export class Keyboard extends utils.EventEmitter {
  private static _instance: Keyboard;

  public static get instance() {
    if (!this._instance) {
      const kb = createKeyboardActionKey(LibStore.instance.actionKey);
      this._instance = new Keyboard(kb);
    }
    return this._instance;
  }

  private magicKeys = useMagicKeys();
  private keyMap: KeyboardEventKey[] = [];
  private keyLabels: Record<string, boolean> = {};

  constructor(private keyAction: KeyboardAction) {
    super();
    forEach(keyAction, (_, key) => {
      const isCombination = key.includes("_");
      if (isCombination) this.keyLabels[key] = false;
      watch(this.magicKeys[key], (pressed) => {
        if (!isCombination) {
          if (pressed) this.onKeyPress(key);
          else this.onKeyRelease(key);
          return;
        }
        const keys = key.split("_");
        if (pressed) {
          if (this.keyMap.length !== keys.length) return;
          if (isEqual(map(keys, lowerCase), map(this.keyMap, lowerCase))) {
            this.onKeyPress(key);
            this.keyLabels[key] = true;
          }
          return;
        }
        if (this.keyLabels[key]) {
          this.onKeyRelease(key);
          this.keyLabels[key] = false;
        }
      });
    });
    watch(this.magicKeys.current, (key_set) => {
      this.keyMap = Array.from<KeyboardEventKey>(key_set as Set<KeyboardEventKey>);
    });
  }

  private onKeyPress = (key: KeyboardEventKey) => {
    if (!(key in this.keyAction)) return;
    this.emit(Keyboard_State.ACTION, {
      action: this.keyAction[key],
      button_state: Button_State.Pressed,
    });
  };

  private onKeyRelease = (key: KeyboardEventKey) => {
    if (!(key in this.keyAction)) return;
    this.emit(Keyboard_State.ACTION, {
      action: this.keyAction[key],
      button_state: Button_State.Release,
    });
  };

  public onAction<T>(callback: (e: {
    action: T;
    button_state: Button_State;
  }) => void) {
    this.on(Keyboard_State.ACTION, callback);

    return () => this.off(Keyboard_State.ACTION, callback);
  }
}
