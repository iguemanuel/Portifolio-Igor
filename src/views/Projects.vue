<script setup lang="ts">
import { ref } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { projects as ProjectData } from '@/db/Projects'
import ProjectCard from '@/components/ProjectCard.vue'

// Estado reativo
const currentProject = ref(0)
const projects = ProjectData

// Métodos para navegação
const setCurrentProject = (index: number) => {
  if (index >= 0 && index < projects.length) {
    currentProject.value = index
  }
}

const nextProject = () => {
  currentProject.value = (currentProject.value + 1) % projects.length
}

const prevProject = () => {
  currentProject.value = (currentProject.value - 1 + projects.length) % projects.length
}
</script>

<template>
  <section class="container py-3 text-white">
    <div class="container">
      <div class="text-center mb-5">
        <h2 class="mb-2 fw-bold text-white fs-3 fs-md-2">Projetos</h2>
        <div
          class="mx-auto linha-titulo mb-3"
          style="background-color: var(--tertiary-color)"
        ></div>
        <p class="text-secondary mx-auto" style="max-width: 600px">
          Conheça alguns dos projetos que desenvolvi com foco em design moderno e experiência do
          usuário.
        </p>
      </div>

      <div class="position-relative">
        <ProjectCard
          :projects="projects"
          :currentProject="currentProject"
          :setCurrentProject="setCurrentProject"
          :prevProject="prevProject"
          :nextProject="nextProject"
        />
      </div>

      <div class="text-center mt-5">
        <a
          href="https://github.com/iguemanuel?tab=repositories"
          class="text-decoration-none d-inline-flex align-items-center gap-2"
          target="_blank"
        >
          <span> Ver todos os projetos </span>
          &gt;
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.linha-titulo {
  width: 80px;
  height: 4px;
}
</style>
