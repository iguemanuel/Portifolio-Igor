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
    class="container-fluid min-vh-100 d-flex flex-column justify-content-center align-items-center ms-3 me-3"
  >
    <div class="row w-100 text-center text-md-start mt-auto">
      <!-- Texto -->
      <div class="col-md-8 d-flex flex-column justify-content-center p-5">
        <h2>Olá, sou Igor Emanuel</h2>
        <h1 ref="typewriterElement"></h1>
        <p>
          Construo e transformo necessidades em aplicações reais, envolventes e funcionais.
          Desenvolvo sistemas através da minha paixão pela tecnologia, contribuindo com soluções
          inovadoras e eficazes para desafios complexos.
        </p>
      </div>

      <!-- Imagem -->
      <div
        class="perfil-container container-sm col-md-4 d-flex justify-content-end align-items-center sm:mt-5"
      >
        <img
          src="@/assets/perfil.png"
          alt="Igor Emanuel"
          class="icon-perfil img-fluid rounded-circle"
          style="max-width: 400px"
        />
      </div>
    </div>

    <!-- Social -->
    <div class="social d-flex justify-content-center gap-3 mt-auto p-4">
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
a {
  text-decoration: none;
  color: var(--text-color);
  padding: 0;
}

.social {
  height: 15rem;
}

h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 1rem 0;
  color: var(--tertiary-color);
  font-family: var(--font-family-secondary);
}

h2 {
  font-size: 2rem;
  font-weight: 400;
  margin: 1rem 0;
  font-family: var(--font-family);
}

p {
  font-size: 2rem;
  font-weight: 300;
  margin: 1rem 0;
  font-family: var(--font-family);
}

.social svg {
  transition: color 0.3s ease-in-out;
  cursor: pointer;
}

.social svg:hover {
  color: var(--tertiary-color);
}

/* Responsividade */
@media screen and (max-width: 768px) {
  h1 {
    font-size: 1.8rem;
  }

  h2 {
    font-size: 1.5rem;
  }

  p {
    font-size: 1rem;
  }

  .perfil-container {
    justify-content: center !important;
  }

  .icon-perfil {
    max-width: 200px;
    max-height: 200px;
  }

  .social {
    height: auto;
    margin-top: 1rem;
  }
}

@media screen and (max-width: 480px) {
  h1 {
    font-size: 1.5rem;
  }

  h2 {
    font-size: 1.25rem;
  }

  p {
    font-size: 0.9rem;
  }

  .icon-perfil {
    max-width: 150px;
    max-height: 150px;
  }
}
</style>
