<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import ProjectSpotlightShowcase from '@/components/projects/ProjectSpotlightShowcase.vue'
import { useProjects } from '@/composables/useProjects'
import { useI18n } from '@/i18n'

const { t } = useI18n()
const { projects } = useProjects()
</script>

<template>
  <div class="projects-section">
    <div class="projects-section__inner">
      <header class="projects-section__head">
        <p class="projects-section__label">{{ t('projects.sectionLabel') }}</p>
        <h2 id="projects-headline" class="projects-section__title">{{ t('projects.title') }}</h2>
      </header>

      <ProjectSpotlightShowcase :projects="projects" />

      <RouterLink to="/projects" class="projects-section__all">
        {{ t('projects.viewAll') }}
        <font-awesome-icon icon="arrow-right" />
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.projects-section {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5rem 0 1.75rem;
  box-sizing: border-box;
  overflow: hidden;
}

.projects-section__inner {
  width: min(var(--site-width), var(--site-max-width));
  margin-inline: auto;
  height: 100%;
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.projects-section__head {
  flex-shrink: 0;
}

.projects-section__label {
  margin: 0 0 0.4rem;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--section-accent, var(--tertiary-color));
}

.projects-section__title {
  margin: 0;
  font-family: var(--font-family-secondary);
  font-size: clamp(1.35rem, 2vw, 1.75rem);
  font-weight: 700;
  color: var(--text-color);
  text-transform: uppercase;
}

.projects-section__all {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  width: fit-content;
  padding: 0.55rem 0.9rem;
  border-radius: 0.4rem;
  border: 1px solid rgba(var(--section-accent-rgb, 118, 192, 70), 0.3);
  color: var(--section-accent, var(--tertiary-color));
  font-size: 0.75rem;
  font-weight: 600;
  text-decoration: none;
  transition: background 0.2s ease, border-color 0.2s ease;
}

.projects-section__all:hover {
  background: rgba(var(--section-accent-rgb, 118, 192, 70), 0.1);
  border-color: var(--section-accent, var(--tertiary-color));
  color: var(--section-accent, var(--tertiary-color));
}

@media (max-width: 900px) {
  .projects-section {
    height: auto;
    overflow: visible;
    padding: 4.5rem 0 1.25rem;
    align-items: stretch;
  }

  .projects-section__inner {
    height: auto;
    gap: 0.85rem;
  }
}
</style>
