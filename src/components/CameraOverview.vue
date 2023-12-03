<script setup lang="ts">
defineProps<{
  title: string
  format35: boolean
  format120: boolean
  brand: string
  model: string
  img: string
}>()
</script>

<template>
  <main>
    <h1>{{ title }}</h1>
    <p>{{ brand }} {{ model }}</p>
    <img :src="img" alt="Kamera" />
    <p>Format 35mm: {{ format35 }}</p>
    <p>Format 120: {{ format120 }}</p>
  </main>
</template>

<style scoped>

</style>