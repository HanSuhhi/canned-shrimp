import { Block } from "./block.model";
import { useBlockState } from "./block.state";

export function defineBlock() {
  const block = new Block();

  const { offState, updateState } = useBlockState(block);

  const close = () => {
    offState();
  };

  return Object.assign(block, {
    updateState,
    close,
  });
}
