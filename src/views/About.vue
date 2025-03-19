<script setup lang="ts"></script>

<template>
  <section class="container-fluid min-h-screen flex flex-col justify-center items-center px-4">
    <div class="container grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
      <!-- About me Section - ocupa 100% da largura -->
      <div class="col-span-1 md:col-span-2 text-center md:text-left">
        <h2 class="text-3xl font-bold text-primary">About me</h2>
        <p class="mt-2 text-lg text-gray-600">
          Aqui você pode encontrar mais informações sobre mim.
        </p>
      </div>

      <!-- Quem sou eu Section -->
      <div class="col-span-1 shadow-md rounded-lg p-6">
        <h2 class="text-2xl font-semibold text-secondary">Quem sou eu?</h2>
        <p class="mt-2 text-base text-gray-700">
          Sou Desenvolvedor e Data Analyst apaixonado por tecnologia e dados desde os 16 anos.
          Atualmente, curso Sistemas para Internet na UTFPR e busco constantemente aprimorar minhas
          habilidades na área. Como desenvolvedor, tenho estudado e trabalhado em projetos desde o
          fim do ensino médio, iniciando aplicações do zero e contribuindo para soluções inovadoras.
          Além disso, possuo um ano de experiência como Data Analyst, desenvolvendo insights e
          dashboards para transformar dados em decisões estratégicas. Estou sempre em busca de novos
          desafios e oportunidades para evoluir profissionalmente. Vamos conversar?
        </p>
      </div>

      <!-- Minhas Skills Section -->
      <div class="col-span-1 shadow-md rounded-lg p-6">
        <h2 class="text-2xl font-semibold text-secondary">Minhas Skills</h2>
        <h3 class="mt-4 text-xl font-medium text-primary">Desenvolvimento Web</h3>
        <ul class="mt-2 list-disc list-inside text-gray-700">
          <li>Vue.js, React, Angular</li>
          <li>TypeScript, JavaScript, TailwindCSS</li>
          <li>Power BI, SQL, Python</li>
          <li>Versionamento com Git/GitHub</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
h2 {
  font-family: var(--font-family-secondary);
}

.text-primary {
  color: var(--tertiary-color);
}

.text-secondary {
  color: var(--secondary-color);
}
</style>
