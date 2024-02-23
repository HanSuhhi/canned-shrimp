import { ref } from "vue";

export enum SnakeState {
  Alive,
  Dead,
}

export function useSnakeState() {
  const state = ref<SnakeState>(SnakeState.Alive);
  const deadReason = ref("");

  return { state, deadReason };
}
