<script setup lang="ts">
import { useI18n } from '@/i18n'

const { t } = useI18n()
</script>

<template>
  <div class="container mt-5">
    <div
      class="card shadow-lg p-3 mx-auto text-white rounded-3"
      style="max-width: 500px; background-color: var(--skeleton-color)"
    >
      <h2 class="text-center mb-4">{{ t('contact.socialTitle') }}</h2>

      <div class="social-midias">
        <div class="social d-flex justify-content-center gap-4 p-4">
          <a href="https://www.instagram.com/iguemanuel/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <font-awesome-icon :icon="['fab', 'instagram']" class="fs-2" />
          </a>
          <a href="https://www.linkedin.com/in/igor-emanuel-roque/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <font-awesome-icon :icon="['fab', 'linkedin']" class="fs-2" />
          </a>
          <a href="https://github.com/iguemanuel" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <font-awesome-icon :icon="['fab', 'github']" class="fs-2" />
          </a>
          <a href="mailto:igor17emanuel@gmail.com" aria-label="Email">
            <font-awesome-icon :icon="['fas', 'envelope']" class="fs-2" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
