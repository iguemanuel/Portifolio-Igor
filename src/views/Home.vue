<script setup lang="ts">
import { ref, onMounted } from 'vue'
import NavbarComponent from '@/components/NavbarComponent.vue'
import Typewriter from 'typewriter-effect/dist/core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const typewriterElement = ref<HTMLElement | null>(null)

onMounted(() => {
  if (typewriterElement.value) {
    new Typewriter(typewriterElement.value, {
      strings: ['Desenvolvedor Front-end', 'Data Analyst'],
      autoStart: true,
      loop: true,
      cursor: '|',
      delay: 150,
      deleteSpeed: 100,
    })
  }
})
</script>

<template>
  <NavbarComponent />
  <section
    class="container-fluid min-vh-100 d-flex flex-column justify-content-center align-items-center ms-md-3 me-md-3"
  >
    <div class="row w-100 text-center text-md-start">
      <!-- Texto -->
      <div class="col-md-8 d-flex flex-column justify-content-center p-5">
        <h2>Olá, sou Igor Emanuel</h2>
        <h1 ref="typewriterElement"></h1>
        <p class="text-justify">
          Construo e transformo necessidades em aplicações reais, envolventes e funcionais.
          Desenvolvo sistemas através da minha paixão pela tecnologia, contribuindo com soluções
          inovadoras e eficazes para desafios complexos.
        </p>
      </div>

      <!-- Imagem -->
      <div
        class="d-none d-md-flex perfil-container container-sm col-md-4 d-flex justify-content-end align-items-center sm:mt-5"
      >
        <img
          src="@/assets/perfil.png"
          alt="Igor Emanuel"
          class="icon-perfil img-fluid rounded-circle width-2/3 me-4"
          style="max-width: 300px"
        />
      </div>
    </div>

    <!-- Social -->
    <div class="social d-flex justify-content-center gap-3 p-4">
      <a href="https://www.instagram.com/iguemanuel/" target="_blank">
        <font-awesome-icon :icon="['fab', 'instagram']" class="fs-2" />
      </a>
      <a href="https://www.linkedin.com/in/igor-emanuel-roque/" target="_blank">
        <font-awesome-icon :icon="['fab', 'linkedin']" class="fs-2" />
      </a>
      <a href="https://github.com/iguemanuel" target="_blank">
        <font-awesome-icon :icon="['fab', 'github']" class="fs-2" />
      </a>
    </div>
  </section>
</template>

<style scoped>
.text-primary {
  color: var(--tertiary-color);
}

h1 {
  color: var(--tertiary-color);
}

p {
  color: rgb(206, 200, 200);
  font-weight: lighter;
}

@media screen and (max-width: 768px) {
  h1 {
    font-size: 2rem;
  }
  h2 {
    font-size: 1.8rem;
  }
  p {
    font-size: 1rem;
  }
}

@media screen and (max-width: 480px) {
  h1 {
    font-size: 1.15rem;
  }
  h2 {
    font-size: 1rem;
  }
  p {
    font-size: 0.8rem;
    text-align: justify;
  }
}
</style>
