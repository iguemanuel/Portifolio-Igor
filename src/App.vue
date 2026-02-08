<script setup lang="ts">
import About from './views/About.vue'
import Home from './views/Home.vue'
import Projects from './views/Projects.vue'
import Contact from './views/Contact.vue'
</script>

<template>
  <div class="fullpage-container">
    <section id="home" class="home">
      <Home />
    </section>
    <section id="projects" class="section">
      <Projects />
    </section>
    <section id="about" class="section">
      <About />
    </section>
    <section id="contact" class="section">
      <Contact />
    </section>
  </div>
</template>

<style scoped>
.fullpage-container {
  scroll-snap-type: y mandatory;
  overflow-y: auto;
  height: 100vh;
}

/* No mobile, desativamos o scroll-snap */
@media (max-width: 768px) {
  .fullpage-container {
    scroll-snap-type: none;
  }
}
section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  scroll-snap-align: start;
  box-sizing: border-box;
  overflow: hidden;
}

.home {
  height: 100vh;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: bold;
  scroll-snap-align: start;
}
</style>
