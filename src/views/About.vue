<script setup>
const skills = [
  { name: 'HTML', icon: 'html5' },
  { name: 'CSS', icon: 'css3' },
  { name: 'JavaScript', icon: 'javascript' },
  { name: 'TypeScript', icon: 'typescript' },
  { name: 'PHP', icon: 'php' },
  { name: 'Git', icon: 'git' },
  { name: 'Node.js', icon: 'nodejs' },
  { name: 'Vue.js', icon: 'vuejs' },
  { name: 'Angular', icon: 'angular' },
  { name: 'Bootstrap', icon: 'bootstrap' },
  { name: 'Tailwind', icon: 'tailwindcss' },
  { name: 'Docker', icon: 'docker' },
  { name: 'SQL', icon: 'mysql' },
  { name: 'MongoDB', icon: 'mongodb' },
]
</script>

<template>
  <section id="about" class="py-5 px-3 ms-md-3 me-md-3" data-scroll-section>
    <div class="container">
      <!-- Linha separada para o título -->
      <div class="row">
        <div class="text-center mb-4">
          <h2 class="mb-2 fw-bold text-white fs-3 fs-md-2">About Me</h2>
          <div class="mx-auto linha-titulo" style="background-color: var(--tertiary-color)"></div>
        </div>
      </div>
      <!-- Linha com as duas colunas -->
      <div class="row">
        <div class="col-md-6 p-5">
          <h3 class="mb-3 fw-bold fs-4 fs-md-5">Quem sou eu</h3>
          <p>
            Desde os 16 anos, sou fascinado por tecnologia e dados. Essa paixão me levou a cursar
            Sistemas para Internet na UTFPR e a me dedicar ao desenvolvimento de aplicações e
            análise de dados. Atualmente, trabalho como Desenvolvedor e Data Analyst Freelancer,
            criando soluções do zero e transformando dados em insights estratégicos.
          </p>
          <p>
            Tenho experiência no desenvolvimento de dashboards, automação de processos e na
            construção de aplicações que realmente fazem a diferença. Gosto de desafios e estou
            sempre em busca de oportunidades para aprender e evoluir profissionalmente.
          </p>
          <p>
            Fora do trabalho, sou daqueles que adoram um bom jogo de futebol, seja na vida real ou
            no FIFA. Também curto basquete e CS, e se for para falar de time, sou Corinthians! Se
            minha trajetória fizer sentido para sua empresa, ficarei feliz em bater um papo!
          </p>
          <p>
            Para conhecer mais sobre minha experiência e habilidades, você pode acessar meu
            currículo abaixo
          </p>

          <button class="btn btn-primary mt-4">Baixar CV</button>
        </div>

        <div class="col-md-6 p-5">
          <h3 class="mb-4 fw-bold fs-4 fs-md-5">Minhas habilidades</h3>
          <div class="row row-cols-3 row-cols-md-4 g-3">
            <div
              v-for="skill in skills"
              :key="skill.name"
              class="col d-flex flex-column align-items-center text-center"
            >
              <div
                class="icon-container d-flex align-items-center justify-content-center rounded-circle p-2 p-md-3"
              >
                <img
                  :src="`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${skill.icon}/${skill.icon}-original.svg`"
                  :alt="skill.name"
                  class="img-fluid icon"
                />
              </div>
              <span class="text-secondary mt-2 fs-6">{{ skill.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.linha-titulo {
  width: 80px;
  height: 4px;
}

.icon-container {
  width: 70px;
  height: 70px;
  background-color: var(--skeleton-color);
  transition: transform 0.3s ease-in-out;
}

.icon-container:hover {
  transform: scale(1.2);
}

.icon {
  max-width: 40px;
  max-height: 40px;
  transition: transform 0.3s ease-in-out;
}

.icon-container:hover .icon {
  transform: scale(1.2);
}
</style>
