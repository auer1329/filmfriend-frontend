<script setup lang="ts">
import * as string_decoder from "string_decoder";

defineProps<{
      name: string,
      brand: string,
      iso: number,
      img: string
}>()
</script>

<template>
  <main>
    <h1>{{ name }}</h1>
    <p>{{ brand }}</p>
    <p>{{ iso }}</p>
    <img :src="img" alt="Film" />
  </main>
</template>

<style scoped>

</style>