<script setup lang="ts">
defineProps<{
  title: string
  subtitle?: string
}>()
</script>

<template>
  <div class="section-header text-center mb-5">
    <h2 class="section-header__title">{{ title }}</h2>
    <div class="section-header__line mx-auto"></div>
    <p v-if="subtitle" class="section-header__subtitle mx-auto">{{ subtitle }}</p>
  </div>
</template>

<style scoped>
.section-header__title {
  font-size: var(--font-size-2xl);
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 0.5rem;
}

.section-header__line {
  width: 80px;
  height: 4px;
  background-color: var(--section-accent, var(--tertiary-color));
  margin-bottom: 1rem;
}

.section-header__subtitle {
  color: var(--section-text-muted, rgba(237, 238, 237, 0.55));
  max-width: 600px;
  line-height: 1.7;
}
</style>
