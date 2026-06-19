<script setup lang="ts">
import { computed } from 'vue'
import {
  useProjects,
  type ProjectCategory,
  type ProjectOrigin,
  type ProjectStatus,
} from '@/composables/useProjects'
import { useI18n } from '@/i18n'

const props = defineProps<{
  origins: ProjectOrigin[]
  categories: ProjectCategory[]
  statuses: ProjectStatus[]
}>()

const origin = defineModel<ProjectOrigin | 'all'>('origin', { required: true })
const category = defineModel<ProjectCategory | 'all'>('category', { required: true })
const status = defineModel<ProjectStatus | 'all'>('status', { required: true })

const { t } = useI18n()
const { projects } = useProjects()

const originOptions = computed(() => [
  { value: 'all' as const, label: t.value('projects.filters.all') },
  ...props.origins.map((o) => ({ value: o, label: t.value(`projects.origins.${o}`) })),
])
const categoryOptions = computed(() => [
  { value: 'all' as const, label: t.value('projects.filters.all') },
  ...props.categories.map((c) => ({ value: c, label: t.value(`projects.categories.${c}`) })),
])
const statusOptions = computed(() => [
  { value: 'all' as const, label: t.value('projects.filters.all') },
  ...props.statuses.map((s) => ({ value: s, label: t.value(`projects.status.${s}`) })),
])

const countBy = (dimension: 'origin' | 'category' | 'status', value: string) => {
  if (value === 'all') return projects.value.length
  return projects.value.filter((p) => p[dimension] === value).length
}
</script>

<template>
  <div class="project-filters" role="group">
    <fieldset class="project-filters__group">
      <legend class="project-filters__legend">{{ t('projects.filters.originTitle') }}</legend>
      <div class="project-filters__chips">
        <button
          v-for="opt in originOptions"
          :key="opt.value"
          type="button"
          class="filter-chip"
          :class="{ 'filter-chip--active': origin === opt.value }"
          :aria-pressed="origin === opt.value"
          @click="origin = opt.value"
        >
          {{ opt.label }}
          <span class="filter-chip__count">{{ countBy('origin', opt.value) }}</span>
        </button>
      </div>
    </fieldset>

    <fieldset class="project-filters__group">
      <legend class="project-filters__legend">{{ t('projects.filters.categoryTitle') }}</legend>
      <div class="project-filters__chips">
        <button
          v-for="opt in categoryOptions"
          :key="opt.value"
          type="button"
          class="filter-chip"
          :class="{ 'filter-chip--active': category === opt.value }"
          :aria-pressed="category === opt.value"
          @click="category = opt.value"
        >
          {{ opt.label }}
          <span class="filter-chip__count">{{ countBy('category', opt.value) }}</span>
        </button>
      </div>
    </fieldset>

    <fieldset class="project-filters__group">
      <legend class="project-filters__legend">{{ t('projects.filters.statusTitle') }}</legend>
      <div class="project-filters__chips">
        <button
          v-for="opt in statusOptions"
          :key="opt.value"
          type="button"
          class="filter-chip"
          :class="{ 'filter-chip--active': status === opt.value }"
          :aria-pressed="status === opt.value"
          @click="status = opt.value"
        >
          {{ opt.label }}
          <span class="filter-chip__count">{{ countBy('status', opt.value) }}</span>
        </button>
      </div>
    </fieldset>
  </div>
</template>

<style scoped>
.project-filters {
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
}

.project-filters__group {
  border: none;
  margin: 0;
  padding: 0;
  min-inline-size: 0;
}

.project-filters__legend {
  padding: 0;
  margin-bottom: 0.55rem;
  font-size: 0.66rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(237, 238, 237, 0.4);
}

.project-filters__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.filter-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.4rem 0.9rem;
  border-radius: 999px;
  border: 1px solid rgba(237, 238, 237, 0.12);
  background: rgba(255, 255, 255, 0.03);
  color: rgba(237, 238, 237, 0.7);
  font-size: 0.78rem;
  font-weight: 600;
  cursor: pointer;
  transition:
    border-color 0.25s ease,
    background 0.25s ease,
    color 0.25s ease,
    transform 0.25s ease;
}

.filter-chip:hover {
  border-color: rgba(var(--section-accent-rgb, 118, 192, 70), 0.4);
  color: var(--text-color);
  transform: translateY(-1px);
}

.filter-chip--active {
  background: rgba(var(--section-accent-rgb, 118, 192, 70), 0.15);
  border-color: var(--section-accent, var(--tertiary-color));
  color: var(--section-accent, var(--tertiary-color));
}

.filter-chip__count {
  min-width: 1.2rem;
  text-align: center;
  background: rgba(0, 0, 0, 0.3);
  padding: 0.05rem 0.4rem;
  border-radius: 999px;
  font-size: 0.66rem;
}

@media (prefers-reduced-motion: reduce) {
  .filter-chip {
    transition: none;
  }
  .filter-chip:hover {
    transform: none;
  }
}
</style>
