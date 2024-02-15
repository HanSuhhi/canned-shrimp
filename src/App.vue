<script setup lang='ts'>
import { createDefaultApp } from "../lib/main";
</script>

<template>
  <canvas :ref="el => createDefaultApp(el as HTMLCanvasElement)" />
</template>
