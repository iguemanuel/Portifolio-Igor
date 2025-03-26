<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { computed, type PropType } from 'vue'

// Definição da estrutura de um projeto
interface Project {
  title: string
  description: string
  image: string
  tags?: string[]
  liveUrl?: string
  githubUrl?: string
}

// Definição das props com tipagem correta
const props = defineProps({
  projects: { type: Array as PropType<Project[]>, required: true },
  currentProject: { type: Number, required: true },
  setCurrentProject: { type: Function as PropType<(index: number) => void>, required: true },
  prevProject: { type: Function as PropType<() => void>, required: true },
  nextProject: { type: Function as PropType<() => void>, required: true },
})

// Garante que `project` sempre tenha um valor válido
const project = computed<Project>(
  () =>
    props.projects[props.currentProject] || {
      title: 'Projeto Desconhecido',
      description: 'Descrição não disponível.',
      image: '',
      tags: [],
      liveUrl: '',
      githubUrl: '',
    },
)
</script>

<template>
  <transition
    enter-active-class="transition-all duration-500 ease-out"
    leave-active-class="transition-all duration-500 ease-in"
    enter-from-class="opacity-0 scale-95"
    leave-to-class="opacity-0 scale-95"
    mode="out-in"
  >
    <div
      :key="currentProject"
      class="rounded-3 overflow-hidden shadow-lg"
      style="backdrop-filter: blur(10px); background-color: var(--skeleton-color)"
    >
      <div class="row g-0">
        <div class="col-md-6 position-relative overflow-hidden">
          <div class="ratio ratio-16x9 h-md-100 position-relative">
            <img
              :src="project.image"
              :alt="`Screenshot do projeto ${project.title}`"
              class="object-cover w-100 h-100 transition-transform hover-scale"
              style="transition-duration: 700ms"
            />
            <div
              class="position-absolute top-0 start-0 end-0 bottom-0 d-flex align-items-end justify-content-center p-3 bg-dark opacity-0 hover-opacity-100"
              style="transition: opacity 300ms; background-color: var(--skeleton-color)"
            ></div>
          </div>
        </div>
        <div class="col-md-6 p-4 d-flex flex-column justify-content-between">
          <div>
            <h3>{{ project.title }}</h3>
            <p class="mb-4">{{ project.description }}</p>
            <div class="d-flex flex-wrap gap-2 mb-4">
              <span
                v-for="(tag, index) in project.tags"
                :key="index"
                class="badge bg-secondary px-3 py-2"
              >
                {{ tag }}
              </span>
            </div>
          </div>
          <div class="mt-auto">
            <div class="d-flex align-items-left gap-2">
              <button
                v-for="(_, index) in props.projects.length"
                :key="index"
                @click="setCurrentProject(index)"
                :class="[
                  'rounded-pill transition-all duration-300',
                  index === currentProject ? 'bg-success w-3 h-1' : 'bg-secondary w-1 h-1',
                ]"
                style="border: none"
                :aria-label="`Ver projeto ${index + 1}`"
                :aria-current="index === currentProject ? 'true' : 'false'"
              />
            </div>
            <div class="mb-3 d-flex gap-3">
              <a
                v-if="project.liveUrl"
                :href="project.liveUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="btn rounded-lg d-flex align-items-center gap-2 duration-300 hover-bg-success"
                style="background-color: var(--tertiary-color)"
              >
                <span>Deploy <font-awesome-icon icon="box-open" /></span>
              </a>
              <a
                v-if="project.githubUrl"
                :href="project.githubUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="btn rounded-lg d-flex align-items-center gap-2"
                style="background-color: var(--primary-color)"
              >
                <span>Github <font-awesome-icon :icon="['fab', 'github']" class="fs-6" /></span>
              </a>
            </div>
            <div class="d-flex gap-2 justify-content-between">
              <button
                @click="prevProject"
                class="btn btn-outline-success rounded-circle d-flex align-items-center justify-content-center"
                aria-label="Projeto anterior"
              >
                &lt;
              </button>
              <button
                @click="nextProject"
                class="btn btn-outline-success rounded-circle d-flex align-items-center justify-content-center"
                aria-label="Próximo projeto"
              >
                &gt;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.hover-scale:hover {
  transform: scale(1.05);
}
.hover-opacity-100:hover {
  opacity: 0.5 !important;
}
.transition-all {
  transition: all 0.3s ease;
}
</style>
