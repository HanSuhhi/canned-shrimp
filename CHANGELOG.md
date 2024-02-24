# canned-shrimp

## 0.0.5

### Patch Changes

- 0bc06da: The scene life cycle is now a global function
- a8e0b25: coreStore is now more streamlined
- 9c372a2: Canned shrimp is now registered through a Vue plugin, rather than a separate function.
- edd4321: New Methods for Creating Prefabs
- 0abf7a8: Scene creation now uses lifecycle hooks instead of object assignment.

## 0.0.4

### Patch Changes

- Fixed plugin export issue

## 0.0.3

### Patch Changes

- d9f9c8e: Enabling automatic file import via Vite plugin
- d9f9c8e: Improve the defineScene method to support types

## 0.0.2

### Patch Changes

- 18cb26b: Add @pixi/sound to rollupOptions.external to solve the problem of too large package files
- f76995b: Now when the scene is unloaded, the `close` method of children will be automatically triggered.

## 0.0.1

### Patch Changes

- Basic functions of the engine, and example implementation
