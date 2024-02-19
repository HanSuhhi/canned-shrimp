import { ref } from "vue";

export enum SnakeState {
  Alive,
  Dead,
}

export function useSnakeState() {
  const state = ref<SnakeState>(SnakeState.Alive);

  return { state };
}
