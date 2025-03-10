<script setup lang="ts">
import NavbarComponent from './components/NavbarComponent.vue'
import Home from './views/Home.vue'
</script>

<template>
  <!-- <NavbarComponent /> -->
  <div class="fullpage-container">
    <section id="home" class="section">
      <Home />
    </section>
    <section id="about" class="section">About</section>
    <section id="projects" class="section">Projects</section>
    <section id="contact" class="section">Contact</section>
  </div>
</template>

<style scoped>
.fullpage-container {
  scroll-snap-type: y mandatory;
  overflow-y: scroll;
  height: 100vh;
}

.section {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: bold;
  scroll-snap-align: start;
}
</style>
