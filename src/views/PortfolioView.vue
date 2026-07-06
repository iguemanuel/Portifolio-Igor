<script setup lang="ts">
import About from './About.vue'
import Experience from './Experience.vue'
import Home from './Home.vue'
import Projects from './Projects.vue'
import Contact from './Contact.vue'
import FooterComponent from '@/components/FooterComponent.vue'
</script>

<template>
  <div class="fullpage-container">
    <section id="home" class="section section--home">
      <Home />
    </section>

    <section id="projects" class="section section--projects">
      <Projects />
    </section>

    <section id="about" class="section section--about section--about-premium">
      <About />
    </section>

    <section id="experience" class="section section--experience">
      <Experience />
    </section>

    <section id="contact" class="section section--contact">
      <Contact />
    </section>

    <FooterComponent class="site-footer-theme" />
  </div>
</template>

<style scoped>
.fullpage-container {
  scroll-snap-type: y mandatory;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100vh;
}

@media (max-width: 768px) {
  .fullpage-container {
    scroll-snap-type: none;
  }
}

.section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  scroll-snap-align: start;
  box-sizing: border-box;
}

.section--home {
  height: 100vh;
  min-height: 100vh;
  max-height: 100vh;
  padding: 0;
  align-items: stretch;
  overflow: hidden;
}

.section--projects {
  height: 100vh;
  min-height: 100vh;
  max-height: 100vh;
  padding: 0;
  align-items: stretch;
  overflow: hidden;
}

.section--about-premium {
  height: 100vh;
  min-height: 100vh;
  max-height: 100vh;
  padding: 0;
  align-items: stretch;
  overflow: hidden;
}

.section--experience {
  width: 100%;
  align-items: center;
  justify-content: flex-start;
  padding: 0;
}

.section--contact {
  width: 100%;
  align-items: stretch;
  justify-content: center;
  padding: 0;
  overflow: hidden;
  height: 100vh;
  max-height: 100vh;
  min-height: 100vh;
}

@media (max-width: 900px) {
  .section--home,
  .section--projects,
  .section--about-premium,
  .section--contact {
    height: auto;
    min-height: 100vh;
    max-height: none;
    overflow: visible;
  }
}
</style>
