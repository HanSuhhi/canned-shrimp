<script setup lang='ts'>
import { createDefaultApp } from "canned-shrimp";
</script>

<template>
  <canvas :ref="el => createDefaultApp(el as HTMLCanvasElement)" class="game-canvas absolute" />
</template>

<style scoped>
@layer page {
  .game-canvas {
    z-index: var(--ground);
  }
}
</style>
