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
  <section class="container-fluid min-vh-100 d-flex flex-column">
    <!-- Navbar no topo -->
    <NavbarComponent class="navbar-sticky" />

    <div class="container d-flex justify-content-center align-items-center flex-column flex-grow-1">
      <!-- Conteúdo principal -->
      <div class="row w-100 text-center text-md-start flex-grow-1 d-flex align-items-center">
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
          class="d-none d-md-flex col-md-4 d-flex justify-content-center align-items-center mt-5"
        >
          <img
            src="@/assets/img/perfil.png"
            alt="Igor Emanuel"
            class="icon-perfil img-fluid rounded-circle"
            style="max-width: 300px; width: 100%"
          />
        </div>
      </div>

      <!-- Social -->
      <div class="social d-flex justify-content-center gap-4 p-4">
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
    </div>
  </section>
</template>

<style scoped>
h2 {
  color: var(--text-color);
}
.container-fluid {
  padding: 0;
}

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

/* Ajustes para responsividade da imagem */
.icon-perfil {
  max-width: 300px;
  width: 100%;
}

/* Ajustes de espaçamento para a navbar */
.navbar-sticky {
  position: sticky;
  top: 0;
  z-index: 100;
}

/* Ajuste para as redes sociais */
.social a {
  color: #fff;
  transition: color 0.3s ease;
}

.social a:hover {
  color: #7cfc00;
}

/* Centralização do conteúdo */
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

/* Ajuste para a altura do container */
section.container-fluid {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.row {
  flex-grow: 1;
}
</style>
