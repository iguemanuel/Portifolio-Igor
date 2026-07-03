<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavbarComponent from './components/NavbarComponent.vue'
import WhatsAppButton from './components/WhatsAppButton.vue'
import { useI18n } from './i18n'

const { locale } = useI18n()
</script>

<template>
  <NavbarComponent />
  <WhatsAppButton />
  <RouterView :key="locale" />
</template>
