<script setup>
import RouterView from 'vue-router'
import Navbar from './components/navbar/Navbar.vue';
</script>

<template>
  <main class="flex-shrink-0">
    <div class="container">
      <header>
        <Navbar />
      </header>
      <RouterView />
    </div>
  </main>
</template>

<style scoped>
</style>
