/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly GAME_MAP_X_LENGTH: number;
  readonly GAME_BLOCK_SIZE: number;
  readonly GAME_MAP_Y_LENGTH: number;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
