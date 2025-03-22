<script setup>
const skills = [
  { name: 'HTML', icon: 'html5' },
  { name: 'CSS', icon: 'css3' },
  { name: 'JavaScript', icon: 'javascript' },
  { name: 'TypeScript', icon: 'typescript' },
  { name: 'Git', icon: 'git' },
  { name: 'Node.js', icon: 'nodejs' },
  { name: 'Vue.js', icon: 'vuejs' },
  { name: 'Angular', icon: 'angular' },
  { name: 'Php', icon: 'php' },
  { name: 'Bootstrap', icon: 'bootstrap' },
  { name: 'Tailwind', icon: 'tailwindcss' },
  { name: 'Docker', icon: 'docker' },
]
</script>

<template>
  <section id="about" class="py-5 px-3 ms-md-3 me-md-3">
    <div class="mb-4 text-center">
      <h2 class="mb-2 fw-bold text-white fs-3 fs-md-2">About Me</h2>
      <div class="mx-auto bg-primary" style="width: 80px; height: 4px"></div>
    </div>

    <div class="row g-4">
      <div class="col-md-6 p-5">
        <h3 class="mb-3 fw-bold text-primary fs-4 fs-md-5">Quem sou eu</h3>
        <p class="mb-3 text-secondary fs-6 fs-md-5">
          Sou um desenvolvedor front-end apaixonado por criar interfaces modernas e intuitivas. Com
          mais de 5 anos de experiência no desenvolvimento web, tenho trabalhado com as tecnologias
          mais recentes para entregar produtos de alta qualidade.
        </p>
        <p class="mb-3 text-secondary fs-6 fs-md-5">
          Minha jornada começou com HTML, CSS e JavaScript, e desde então venho me aprimorando
          constantemente, adotando frameworks modernos como Vue.js, além de ferramentas que melhoram
          a produtividade e a qualidade do código.
        </p>
        <p class="text-secondary fs-6 fs-md-5">
          Além do desenvolvimento, tenho grande interesse em design de interfaces, experiência do
          usuário e acessibilidade web, buscando sempre criar produtos que sejam não apenas bonitos,
          mas também funcionais e inclusivos.
        </p>
      </div>

      <div class="col-md-6 p-5">
        <h3 class="mb-4 fw-bold text-primary fs-4 fs-md-5">Minhas habilidades</h3>
        <div class="row row-cols-3 row-cols-md-4 g-3">
          <div
            v-for="skill in skills"
            :key="skill.name"
            class="col d-flex flex-column align-items-center text-center"
          >
            <div
              class="icon-container d-flex align-items-center justify-content-center rounded-circle p-2 p-md-3"
              style="width: 70px; height: 70px; background-color: var(--skeleton-color)"
            >
              <img
                :src="`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${skill.icon}/${skill.icon}-original.svg`"
                :alt="skill.name"
                class="img-fluid"
                style="max-width: 40px; max-height: 40px"
              />
            </div>
            <span class="skill-text text-secondary mt-2 fs-6">{{ skill.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.icon-container {
  width: 70px;
  height: 70px;
  transition: transform 0.3s ease-in-out;
}

.icon-container:hover {
  transform: scale(1.2); /* Aumenta o tamanho em 20% */
}

.icon {
  max-width: 40px;
  max-height: 40px;
  transition: transform 0.3s ease-in-out;
}

.icon-container:hover .icon {
  transform: scale(1.2); /* Aumenta o ícone junto com o contêiner */
}
.icon-container:hover + .skill-text {
  color: var(--tertiary-color); /* Substitua pela cor desejada */
  font-weight: bold;
}
</style>
