<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

defineProps<{
  items: string[]
}>()
</script>

<template>
  <ul class="hero-stats" role="list">
    <li v-for="item in items" :key="item" class="hero-stats__item">
      <font-awesome-icon :icon="['fas', 'circle-check']" class="hero-stats__check" aria-hidden="true" />
      <span>{{ item }}</span>
    </li>
  </ul>
</template>

<style scoped>
.hero-stats {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.5rem 1.25rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.hero-stats__item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.82rem;
  color: rgba(237, 238, 237, 0.72);
}

.hero-stats__check {
  color: var(--section-accent, var(--tertiary-color));
  font-size: 0.85rem;
  flex-shrink: 0;
}

@media (max-width: 768px) {
  .hero-stats {
    gap: 0.4rem 0.85rem;
  }

  .hero-stats__item {
    font-size: 0.76rem;
  }
}
</style>
