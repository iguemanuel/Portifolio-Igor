<script setup lang="ts">
import { Skills as skills } from '@/db/Skills'
</script>

<template>
  <section id="about" class="py-5 px-3 ms-md-3 me-md-3" data-scroll-section>
    <div class="container">
      <div class="row">
        <div class="text-center mb-4">
          <h2 class="mb-2 fw-bold text-white fs-3 fs-md-2">Sobre</h2>
          <div
            class="mb-2 mx-auto linha-titulo"
            style="background-color: var(--tertiary-color)"
          ></div>
          <p class="text-secondary mx-auto">
            Veja um pouco mais sobre mim, minhas habilidades e experiências.
          </p>
        </div>
      </div>
      <div class="row mt-2">
        <div class="col-md-6 p-3">
          <h3 class="mb-3 fw-bold fs-4 fs-md-5 text-center">Quem sou eu</h3>
          <p>
            Minha paixão por tecnologia começou cedo, aos 16 anos, quando descobri o impacto que a
            combinação entre desenvolvimento e dados pode gerar nos negócios. Por isso decidi cursar
            <strong>Sistemas para Internet na UTFPR</strong> e a atuar de forma prática no
            desenvolvimento de aplicações e na análise de dados.
          </p>
          <p>
            Hoje trabalho como <strong>Desenvolvedor Web</strong>, criando soluções que vão desde a
            construção de interfaces e APIs até a automação de processos e análise de indicadores.
            Gosto de entender o problema de negócio, estudar as possibilidades e entregar algo que
            gere resultado real para quem usa.
          </p>
          <p>
            Sou movido por desafios e aprendizado contínuo — seja aprimorando meu código, estudando
            novas integrações ou buscando formas de transformar dados em decisões estratégicas.
            Acredito em soluções simples, eficientes e feitas com propósito.
          </p>
          <p>
            Fora da rotina técnica, sou apaixonado por esportes e games. Futebol, basquete e CS
            fazem parte do meu dia a dia.
          </p>
          <p>
            Caso meu perfil faça sentido para sua empresa ou projeto, será um prazer conversar.
            Abaixo, você encontra meu currículo com mais detalhes sobre minhas experiências e
            habilidades.
          </p>

          <a href="/curriculo-igor.pdf" download>
            <button class="btn btn-primary mt-4">Baixar CV</button>
          </a>
        </div>

        <div class="col-md-6 p-3">
          <h3 class="mb-4 fw-bold fs-4 fs-md-5 text-center">Minhas habilidades</h3>
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
                  v-if="skill.custom"
                  :src="`/src/assets/${skill.icon}.png`"
                  :alt="skill.name"
                  class="img-fluid icon"
                />
                <img
                  v-else
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
  transition:
    transform,
    0.3s ease-in-out;
}

.icon-container:hover {
  transform: scale(1.2);
  box-shadow: var(--tertiary-color) 0px 0px 10px;
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
