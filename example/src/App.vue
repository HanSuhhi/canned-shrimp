<script setup lang='ts'>
import { createDefaultApp } from "canned-shrimp";
</script>

<template>
  <canvas :ref="el => createDefaultApp(el as HTMLCanvasElement)" />
</template>
