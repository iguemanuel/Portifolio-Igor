<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import ProjectShowcaseCard from '@/components/projects/ProjectShowcaseCard.vue'
import ProjectFilters from '@/components/projects/ProjectFilters.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import { useProjectFilters } from '@/composables/useProjects'
import { useI18n } from '@/i18n'

const { t } = useI18n()
const {
  origin,
  category,
  status,
  availableOrigins,
  availableCategories,
  availableStatuses,
  filteredProjects,
  resetFilters,
} = useProjectFilters()
</script>

<template>
  <div class="projects-page">
    <div class="site-shell projects-page__head">
      <RouterLink to="/" class="back-link">
        <font-awesome-icon icon="arrow-left" />
        {{ t('projects.backHome') }}
      </RouterLink>
      <h1 class="projects-page__title">{{ t('projects.pageTitle') }}</h1>
      <p class="projects-page__subtitle">{{ t('projects.pageSubtitle') }}</p>
    </div>

    <div class="site-shell projects-page__filters">
      <ProjectFilters
        v-model:origin="origin"
        v-model:category="category"
        v-model:status="status"
        :origins="availableOrigins"
        :categories="availableCategories"
        :statuses="availableStatuses"
        @reset="resetFilters"
      />
    </div>

    <div class="site-shell projects-page__grid-wrap">
      <TransitionGroup tag="div" name="grid" class="projects-grid">
        <ProjectShowcaseCard
          v-for="project in filteredProjects"
          :key="project.slug"
          :project="project"
        />
      </TransitionGroup>

      <div v-if="filteredProjects.length === 0" class="empty-state">
        <p>{{ t('projects.noResults') }}</p>
        <button type="button" class="empty-state__reset" @click="resetFilters">
          {{ t('projects.filters.all') }}
        </button>
      </div>
    </div>

    <div class="site-shell text-center projects-page__github">
      <a
        href="https://github.com/iguemanuel?tab=repositories"
        class="github-link"
        target="_blank"
        rel="noopener noreferrer"
      >
        <font-awesome-icon :icon="['fab', 'github']" />
        {{ t('projects.viewGithub') }}
      </a>
    </div>

    <FooterComponent />
  </div>
</template>

<style scoped>
.projects-page {
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;
  background: var(--bg-color);
  padding-top: 5rem;
}

.projects-page__head {
  padding-bottom: 1.5rem;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
  color: var(--primary-color);
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: color 0.2s ease;
}

.back-link:hover {
  color: var(--tertiary-color);
}

.projects-page__title {
  margin: 0 0 0.5rem;
  font-size: clamp(1.5rem, 3vw, 2rem);
  color: var(--text-color);
}

.projects-page__subtitle {
  margin: 0;
  max-width: 60ch;
  font-size: 0.95rem;
  line-height: 1.6;
  color: rgba(237, 238, 237, 0.6);
}

.projects-page__filters {
  padding-bottom: 1.5rem;
}

.projects-page__grid-wrap {
  padding-bottom: 3rem;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  grid-auto-rows: 1fr;
  gap: 1rem;
}

.grid-move,
.grid-enter-active,
.grid-leave-active {
  transition:
    transform 0.45s cubic-bezier(0.22, 1, 0.36, 1),
    opacity 0.45s ease;
}

.grid-enter-from,
.grid-leave-to {
  opacity: 0;
  transform: translateY(12px) scale(0.98);
}

.grid-leave-active {
  position: absolute;
}

.empty-state {
  text-align: center;
  color: rgba(237, 238, 237, 0.5);
  padding: 3rem 0;
}

.empty-state__reset {
  margin-top: 1rem;
  padding: 0.5rem 1.25rem;
  border-radius: 999px;
  border: 1px solid var(--tertiary-color);
  background: rgba(118, 192, 70, 0.12);
  color: var(--tertiary-color);
  font-weight: 600;
  cursor: pointer;
}

.projects-page__github {
  padding-bottom: 2rem;
}

.github-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  border: 1px solid rgba(118, 192, 70, 0.25);
  border-radius: 0.5rem;
  transition: all 0.2s ease;
}

.github-link:hover {
  border-color: var(--tertiary-color);
  color: var(--tertiary-color);
  background: rgba(118, 192, 70, 0.08);
}
</style>
