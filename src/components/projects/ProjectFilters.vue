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

const emit = defineEmits<{
  reset: []
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

const hasActiveFilters = computed(
  () => origin.value !== 'all' || category.value !== 'all' || status.value !== 'all',
)
</script>

<template>
  <div class="project-filters">
    <div class="project-filters__row">
      <span class="project-filters__label">{{ t('projects.filters.originTitle') }}</span>
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
        </button>
      </div>
    </div>

    <div class="project-filters__row">
      <span class="project-filters__label">{{ t('projects.filters.categoryTitle') }}</span>
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
        </button>
      </div>
    </div>

    <div class="project-filters__row">
      <span class="project-filters__label">{{ t('projects.filters.statusTitle') }}</span>
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
        </button>
      </div>
    </div>

    <button v-if="hasActiveFilters" type="button" class="project-filters__clear" @click="emit('reset')">
      {{ t('projects.filters.clear') }}
    </button>
  </div>
</template>

<style scoped>
.project-filters {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.project-filters__row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.65rem 0.85rem;
}

.project-filters__label {
  flex-shrink: 0;
  min-width: 4.5rem;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: rgba(237, 238, 237, 0.45);
}

.project-filters__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.filter-chip {
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  border: 1px solid rgba(237, 238, 237, 0.14);
  background: transparent;
  color: rgba(237, 238, 237, 0.72);
  font-size: 0.78rem;
  font-weight: 500;
  cursor: pointer;
  transition: color 0.2s ease, border-color 0.2s ease, background 0.2s ease;
}

.filter-chip:hover {
  color: var(--text-color);
  border-color: rgba(237, 238, 237, 0.28);
}

.filter-chip--active {
  background: rgba(118, 192, 70, 0.12);
  border-color: var(--tertiary-color);
  color: var(--tertiary-color);
  font-weight: 600;
}

.project-filters__clear {
  align-self: flex-start;
  margin-top: 0.15rem;
  padding: 0;
  border: none;
  background: none;
  color: rgba(237, 238, 237, 0.5);
  font-size: 0.75rem;
  font-weight: 500;
  text-decoration: underline;
  text-underline-offset: 3px;
  cursor: pointer;
  transition: color 0.2s ease;
}

.project-filters__clear:hover {
  color: var(--tertiary-color);
}

@media (max-width: 640px) {
  .project-filters__row {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.45rem;
  }

  .project-filters__label {
    min-width: 0;
  }
}
</style>
