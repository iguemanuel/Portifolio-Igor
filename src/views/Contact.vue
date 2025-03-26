<script setup lang="ts">
import ContactFormComponent from '@/components/ContactFormComponent.vue'
import ContactInfoComponent from '@/components/ContactInfoComponent.vue'
import SocialMidiasComponent from '@/components/SocialMidiasComponent.vue'
</script>

<template>
  <div class="container py-3">
    <div class="row">
      <div class="text-center mb-4">
        <h2 class="mb-2 fw-bold text-white fs-3 fs-md-2">Contato</h2>
        <div class="mx-auto linha-titulo" style="background-color: var(--tertiary-color)"></div>
        <p class="text-secondary mx-auto" style="max-width: 600px; max-height:">
          Estou sempre aberto a novas oportunidades e colaborações. Preencha o formulário abaixo ou
          me contate através das redes sociais.
        </p>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <ContactFormComponent />
      </div>
      <div class="col d-flex flex-column justify-content-between">
        <ContactInfoComponent />
        <SocialMidiasComponent />
      </div>
    </div>
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
