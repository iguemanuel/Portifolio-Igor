<script setup lang="ts">
import SectionHeader from '@/components/SectionHeader.vue'
import ProfessionalTimeline from '@/components/ProfessionalTimeline.vue'
import { useI18n } from '@/i18n'

const { t } = useI18n()
</script>

<template>
  <div class="experience-section">
    <SectionHeader :title="t('career.title')" :subtitle="t('career.subtitle')" />
    <div class="experience-section__track">
      <ProfessionalTimeline />
    </div>
  </div>
</template>

<style scoped>
.experience-section {
  width: min(var(--site-width), var(--site-max-width));
  margin: 0 auto;
  padding: 6rem 0 4rem;
  min-height: 100vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 2.5rem;
}

.experience-section__track {
  width: 100%;
}
</style>
