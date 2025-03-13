<template>
  <section class="home" data-scroll data-scroll-speed="2">
    <div class="text-container">
      <h2>Olá, sou Igor Emanuel</h2>
      <h1 ref="typewriterElement"></h1>
      <p>
        Construo e transformo necessidades em aplicações reais, envolventes e funcionais. Desenvolvo
        sistemas através da minha paixão pela tecnologia, contribuindo com soluções inovadoras e
        eficazes para desafios complexos.
      </p>
    </div>
    <div class="image-container">
      <img src="@/assets/perfil.png" alt="Igor Emanuel" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Typewriter from 'typewriter-effect/dist/core'

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

<style scoped>
.home {
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 2rem;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  width: 100%;
}

.text-container {
  text-align: left;
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
  font-size: 1.5rem;
  font-weight: 300;
  margin: 1rem 0;
  font-family: var(--font-family);
}

/* Imagem */
.image-container {
  display: flex;
  justify-content: center;
}

.image-container img {
  width: 100%;
  max-width: 300px;
  height: auto;
  border-radius: 50%;
}

/* Responsividade */
@media (max-width: 768px) {
  .home {
    display: flex;
    flex-direction: column;
    text-align: left;
  }

  h1 {
    font-size: 2rem;
  }

  h2 {
    font-size: 1.8rem;
  }

  p {
    font-size: 1.2rem;
  }

  .image-container img {
    max-width: 60%;
  }
}
</style>
