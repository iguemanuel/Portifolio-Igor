<script>
import { onMounted, ref } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { projects as ProjectData } from '@/db/Projects'

export default {
  components: {
    FontAwesomeIcon,
  },
  setup() {
    const currentProject = ref(0)
    const projects = ProjectData

    const setCurrentProject = (index) => {
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

    return {
      currentProject,
      projects,
      setCurrentProject,
      nextProject,
      prevProject,
    }
  },
}
</script>

<template>
  <section class="container py-5 text-white">
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
        <!-- Project Card -->
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
                    :src="projects[currentProject]?.image || ''"
                    :alt="`Screenshot do projeto ${projects[currentProject]?.title || ''}`"
                    class="object-cover w-100 h-100 transition-transform hover-scale"
                    style="transition-duration: 700ms"
                  />
                  <div
                    class="position-absolute top-0 start-0 end-0 bottom-0 d-flex align-items-end justify-content-center p-3 bg-dark opacity-0 hover-opacity-100"
                    style="transition: opacity 300ms; background-color: var(--skeleton-color)"
                  >
                    <div class="d-flex gap-3">
                      <a
                        v-if="projects[currentProject]?.liveUrl"
                        :href="projects[currentProject].liveUrl"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="btn rounded-lg d-flex align-items-center gap-2 duration-300 hover-bg-success"
                        style="background-color: var(--tertiary-color)"
                      >
                        <span>Deploy <font-awesome-icon icon="box-open" /> </span>
                      </a>
                      <a
                        v-if="projects[currentProject]?.githubUrl"
                        :href="projects[currentProject].githubUrl"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="btn rounded-lg d-flex align-items-center gap-2"
                        style="background-color: var(--primary-color)"
                      >
                        <span
                          >Github
                          <font-awesome-icon :icon="['fab', 'github']" class="fs-6" />
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-6 p-4 d-flex flex-column justify-content-between">
                <div>
                  <h3>{{ projects[currentProject]?.title }}</h3>
                  <p class="text-secondary mb-4">{{ projects[currentProject]?.description }}</p>
                  <div class="d-flex flex-wrap gap-2 mb-4">
                    <span
                      v-for="(tag, index) in projects[currentProject]?.tags || []"
                      :key="index"
                      class="badge bg-opacity-50 px-3 py-2"
                    >
                      {{ tag }}
                    </span>
                  </div>
                </div>

                <div class="mt-auto">
                  <div class="d-flex align-items-left gap-2">
                    <button
                      v-for="(_, index) in projects"
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
      </div>

      <div class="text-center mt-5">
        <a
          href="https://github.com/iguemanuel?tab=repositories"
          class="text-decoration-none d-inline-flex align-items-center gap-2"
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
.hover-scale:hover {
  transform: scale(1.05);
}
.hover-opacity-100:hover {
  opacity: 0.5 !important;
}
.transition-all {
  transition: all 0.3s ease;
}
.bg-opacity-25 {
  background-color: rgba(108, 117, 125, 0.25);
}
.bg-opacity-50 {
  background-color: rgba(108, 117, 125, 0.5);
}
.bg-opacity-80 {
  background-color: rgba(33, 37, 41, 0.8);
}
</style>
