<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import LocomotiveScroll from 'locomotive-scroll'
import NavbarComponent from './components/NavbarComponent.vue'
import About from './views/About.vue'
import Home from './views/Home.vue'
import Projects from './views/Projects.vue'
import Contact from './views/Contact.vue'

const locoScroll = ref<LocomotiveScroll | null>(null)

onMounted(() => {
  if (window.innerWidth > 768) {
    locoScroll.value = new LocomotiveScroll({
      el: document.querySelector('.fullpage-container') as HTMLElement,
      smooth: true,
    })
  } else {
    document.documentElement.style.overflow = 'auto' // Garante que o mobile tenha scroll normal
    document.body.style.overflow = 'auto'
  }
})

onUnmounted(() => {
  locoScroll.value?.destroy()
})
</script>
<template>
  <div class="fullpage-container">
    <section id="home" class="home">
      <Home />
    </section>
    <section id="about" class="section">
      <About />
    </section>
    <section id="projects" class="section">
      <Projects />
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
