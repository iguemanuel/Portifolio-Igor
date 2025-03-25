<script setup lang="ts">
import ContactFormComponent from '@/components/ContactFormComponent.vue'
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="text-center mb-4">
        <h2 class="mb-2 fw-bold text-white fs-3 fs-md-2">About Me</h2>
        <div class="mx-auto linha-titulo" style="background-color: var(--tertiary-color)"></div>
        <p class="text-secondary mx-auto" style="max-width: 600px">
          Estou sempre aberto a novas oportunidades e colaborações. Preencha o formulário abaixo ou
          me contate através das redes sociais.
        </p>
      </div>
    </div>
    <ContactFormComponent />
  </div>
</template>

<style scoped>
.linha-titulo {
  width: 80px;
  height: 4px;
  background-color: var(--tertiary-color);
  margin-bottom: 1rem;
}
</style>
