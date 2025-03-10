<script setup lang="ts">
import { ref } from 'vue'
</script>

<template>
  <section class="home" data-scroll data-scroll-speed="2">
    <div class="container">
      <h1>Igor Emanuel</h1>
      <h2>Developer & Data Analyst</h2>
      <p>Construo aplicações intuitivas e eficientes.</p>
      <button class="btn">Ver Projetos</button>
    </div>
  </section>
</template>

<style scoped>
.home {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.btn {
  background: #00bfff;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
}
</style>
