import { ref, watch } from "vue";
import { type Block, Gold, Snake } from "./block.model";

export enum BlockState {
  Empty,
  Snake,
  Gold,
}

export function useBlockState(blockModel: Block) {
  const state = ref<BlockState>(BlockState.Empty);

  const offState = watch(state, (newState) => {
    switch (newState) {
      case BlockState.Empty:
        blockModel.removeChildren();
        break;
      case BlockState.Snake:
        blockModel.removeChildren();
        blockModel.addChild(new Snake());
        break;
      case BlockState.Gold:
        blockModel.removeChildren();
        blockModel.addChild(new Gold());
        break;
      default:
        throw new Error("unknown block state");
    }
  });

  const updateState = (newState: BlockState) => {
    state.value = newState;
  };

  return { offState, updateState };
}
