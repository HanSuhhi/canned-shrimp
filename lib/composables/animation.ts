import { computed, ref } from "vue";
import type { AnimationStruct } from "../core/types/animation";

export function useAnimationState<T extends number | string>(structs: Record<T, AnimationStruct>) {
  const currentAnimationState = ref<T>();
  const currentAnimationStruct = computed(() => {
    if (currentAnimationState.value === undefined) return;
    return structs[currentAnimationState.value];
  });

  return { currentAnimationState, currentAnimationStruct };
}
