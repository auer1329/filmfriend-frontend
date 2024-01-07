<script setup lang="ts">

</script>

<template>
  <div class="loading-container">
    <div class="spinner-grow text-primary" role="status">
      <span class="sr-only"></span>
    </div>
    <div class="spinner-grow text-success" role="status">
      <span class="sr-only"></span>
    </div>
    <div class="spinner-grow text-danger" role="status">
      <span class="sr-only"></span>
    </div>
    <div class="spinner-grow text-warning" role="status">
      <span class="sr-only"></span>
    </div>
    <div class="spinner-grow text-info" role="status">
      <span class="sr-only"></span>
    </div>
  </div>
</template>

<style scoped>
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20vh;
}

.spinner-grow
{
  width: 3rem;
  height: 3rem;
  margin: 0.5em;
}
</style>