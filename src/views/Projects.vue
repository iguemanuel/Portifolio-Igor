<template>
  <section class="projects-section py-5 px-3 px-md-5">
    <div class="container text-center">
      <h2 class="text-success fw-bold mb-3">Projetos</h2>
      <p class="text-light">Conheça alguns dos projetos que desenvolvi.</p>

      <div class="project-card mx-auto mt-4">
        <div class="project-image"></div>
        <div class="project-info">
          <h3 class="text-success fw-semibold">{{ projects[currentProject].title }}</h3>
          <p class="text-secondary">{{ projects[currentProject].description }}</p>
        </div>
      </div>

      <div class="d-flex justify-content-center align-items-center mt-4 gap-3">
        <button class="nav-btn" @click="prevProject" aria-label="Projeto Anterior">
          <i class="bi bi-chevron-left"></i>
        </button>

        <button
          v-for="(project, index) in projects"
          :key="index"
          @click="currentProject = index"
          class="indicator"
          :class="{ active: index === currentProject }"
          aria-label="Selecionar Projeto"
        ></button>

        <button class="nav-btn" @click="nextProject" aria-label="Próximo Projeto">
          <i class="bi bi-chevron-right"></i>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const currentProject = ref(0)

const projects = ref([
  {
    title: 'Barbearia Machado',
    description:
      'Transformei necessidades em soluções reais, inovadoras e funcionais, alinhadas às metas do cliente.',
  },
  {
    title: 'E-commerce de Roupas',
    description:
      'Desenvolvi um marketplace moderno e responsivo para uma marca de roupas, focado em UX e conversão.',
  },
])

const nextProject = () => {
  currentProject.value = (currentProject.value + 1) % projects.value.length
}

const prevProject = () => {
  currentProject.value = (currentProject.value - 1 + projects.value.length) % projects.value.length
}
</script>

<style scoped>
.project-card {
  max-width: 600px;
  background: #1e1e1e;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
}

.project-image img {
  max-width: 100%;
  border-radius: 8px;
}

.project-info {
  margin-top: 15px;
}

.nav-btn {
  background: none;
  border: 1px solid #7cfc00;
  color: #7cfc00;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  cursor: pointer;
  transition: 0.3s;
}

.nav-btn:hover {
  background: #7cfc00;
  color: black;
}

.indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: gray;
  border: none;
  transition: 0.3s;
}

.indicator.active {
  background: #7cfc00;
  transform: scale(1.2);
}
</style>
