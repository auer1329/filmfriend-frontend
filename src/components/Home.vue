<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>
      Hello filmfriend. What's next? <br />
      <a href="https://github.com/ZieglerAaron/filmfriend-frontend/">Check out our GitHub Repository for more information.</a>
    </h3>
  </div>
</template>

<style scoped>
</style>
