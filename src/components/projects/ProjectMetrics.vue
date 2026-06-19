<script setup lang="ts">
import { useProjectMetrics } from '@/composables/useProjects'

withDefaults(
  defineProps<{
    compact?: boolean
  }>(),
  { compact: false },
)

const { metrics } = useProjectMetrics()
</script>

<template>
  <ul class="project-metrics" :class="{ 'project-metrics--compact': compact }" role="list">
    <li v-for="metric in metrics" :key="metric.key" class="project-metrics__item">
      <strong class="project-metrics__value">{{ metric.value }}</strong>
      <span class="project-metrics__label">{{ metric.label }}</span>
    </li>
  </ul>
</template>

<style scoped>
.project-metrics {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem 2.25rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.project-metrics__item {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.project-metrics__value {
  font-family: var(--font-family-secondary);
  font-size: clamp(1.6rem, 3vw, 2.4rem);
  font-weight: 800;
  line-height: 1;
  color: var(--section-accent, var(--tertiary-color));
}

.project-metrics__label {
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: rgba(237, 238, 237, 0.55);
}

.project-metrics--compact {
  gap: 0.85rem 1.4rem;
}

.project-metrics--compact .project-metrics__value {
  font-size: clamp(1.1rem, 2.2vw, 1.5rem);
}

.project-metrics--compact .project-metrics__label {
  font-size: 0.6rem;
}
</style>
