<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Typewriter from 'typewriter-effect/dist/core' // Importação correta para Vue

const typewriterElement = ref<HTMLElement | null>(null) // Referência ao elemento

onMounted(() => {
  if (typewriterElement.value) {
    new Typewriter(typewriterElement.value, {
      strings: ['Desenvolvedor Front-end', 'Data Analyst'],
      autoStart: true,
      loop: true,
      cursor: '|', // Define o cursor de digitação
      delay: 75, // Velocidade da digitação
      deleteSpeed: 50, // Velocidade ao apagar
    })
  }
})
</script>

<template>
  <section class="home" data-scroll data-scroll-speed="2">
    <div class="container">
      <h1>Olá, sou Igor Emanuel</h1>
      <h2 ref="typewriterElement"></h2>
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
