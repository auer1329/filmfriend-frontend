<script setup lang="ts">

import Navbar from "@/components/Navbar.vue";
</script>

<template>
  <navbar />
  <div class="view-container">
    <RouterView />
  </div>
</template>

<style>
  .navbar {
    margin-bottom: 20px;
  }
  .view-container {
    margin-right: 120px;
    margin-left: 120px;
  }
</style>