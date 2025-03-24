<template>
  <section class="py-5 px-4 bg-dark text-white">
    <div class="container text-center">
      <h2 class="display-4 text-success mb-3">Projetos</h2>
      <p class="text-muted mb-4">Conheça alguns dos projetos que desenvolvi.</p>

      <div class="position-relative">
        <!-- Project Card -->
        <div class="card bg-secondary rounded-lg shadow-lg overflow-hidden mx-auto max-w-4xl">
          <div class="row g-0">
            <!-- Project Image -->
            <div class="col-md-6">
              <img
                :src="projects[currentProject].img"
                :alt="projects[currentProject].title"
                class="img-fluid rounded-start"
              />
            </div>

            <!-- Project Info -->
            <div class="col-md-6 p-4 d-flex flex-column justify-content-center">
              <h3 class="h4 text-success mb-4">{{ projects[currentProject].title }}</h3>
              <p class="text-muted">{{ projects[currentProject].description }}</p>

              <div class="mt-4">
                <a href="#" class="btn btn-success">
                  Ver projeto
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation Buttons -->
        <button
          @click="prevProject"
          class="position-absolute top-50 start-0 translate-middle-y btn btn-dark btn-circle"
          aria-label="Projeto Anterior"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          @click="nextProject"
          class="position-absolute top-50 end-0 translate-middle-y btn btn-dark btn-circle"
          aria-label="Próximo Projeto"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      <!-- Indicators -->
      <div class="d-flex justify-content-center mt-4">
        <button
          v-for="(project, index) in projects"
          :key="index"
          @click="currentProject = index"
          class="btn btn-sm"
          :class="index === currentProject ? 'btn-success' : 'btn-outline-secondary'"
          aria-label="Selecionar Projeto"
          :aria-pressed="index === currentProject ? 'true' : 'false'"
        ></button>
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
    img: 'src/assets/img/barbaearia-machado.png', // Ajuste para caminho correto
  },
  {
    title: 'E-commerce de Roupas',
    description:
      'Desenvolvi um marketplace moderno e responsivo para uma marca de roupas, focado em UX e conversão.',
    img: '/assets/img/ecommerce-roupas.png', // Ajuste para caminho correto
  },
])

const nextProject = () => {
  currentProject.value = (currentProject.value + 1) % projects.value.length
}

const prevProject = () => {
  currentProject.value = (currentProject.value - 1 + projects.value.length) % projects.value.length
}
</script>
