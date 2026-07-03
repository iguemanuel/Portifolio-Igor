<script setup lang="ts">
import { computed } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import ProjectDeviceMockup from '@/components/projects/ProjectDeviceMockup.vue'
import ProjectBadges from '@/components/projects/ProjectBadges.vue'
import type { Project } from '@/composables/useProjects'
import { useI18n } from '@/i18n'

const props = defineProps<{
  project: Project
}>()

const { t } = useI18n()

const visibleTags = computed(() => props.project.tags.slice(0, 4))

const liveCta = computed(() => {
  if (props.project.isOnline && props.project.liveUrl) {
    return { href: props.project.liveUrl, label: t.value('projects.viewProjectCta') }
  }
  return null
})

const githubCta = computed(() => {
  if (!props.project.githubUrl) return null
  return { href: props.project.githubUrl, label: 'GitHub' }
})
</script>

<template>
  <article class="project-card" :class="{ 'project-card--offline': !project.isOnline }">
    <div class="project-card__preview">
      <ProjectBadges :project="project" />
      <ProjectDeviceMockup
        :desktop-src="project.image"
        :mobile-src="project.mobileImage"
        :title="project.title"
      />
    </div>

    <div class="project-card__body">
      <div class="project-card__head">
        <span class="project-card__category">{{ project.categoryLabel }}</span>
        <time class="project-card__year" :datetime="String(project.year)">{{ project.year }}</time>
      </div>

      <h3 class="project-card__title">{{ project.title }}</h3>
      <p class="project-card__summary">{{ project.summary }}</p>

      <ul v-if="visibleTags.length" class="project-card__tags" role="list">
        <li v-for="tag in visibleTags" :key="tag" class="project-card__tag">{{ tag }}</li>
      </ul>

      <div v-if="liveCta || githubCta" class="project-card__actions">
        <a
          v-if="liveCta"
          :href="liveCta.href"
          target="_blank"
          rel="noopener noreferrer"
          class="project-card__cta project-card__cta--primary"
        >
          {{ liveCta.label }}
        </a>
        <a
          v-if="githubCta"
          :href="githubCta.href"
          target="_blank"
          rel="noopener noreferrer"
          class="project-card__cta project-card__cta--ghost"
        >
          <font-awesome-icon :icon="['fab', 'github']" aria-hidden="true" />
          {{ githubCta.label }}
        </a>
      </div>
    </div>
  </article>
</template>

<style scoped>
.project-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 320px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(237, 238, 237, 0.1);
  border-radius: 0.75rem;
  overflow: hidden;
  transition:
    border-color 0.25s ease,
    transform 0.25s ease,
    box-shadow 0.25s ease;
}

.project-card:hover {
  border-color: rgba(var(--section-accent-rgb, 118, 192, 70), 0.35);
  transform: translateY(-3px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3);
}

.project-card--offline .project-card__preview :deep(.device-stage) {
  filter: grayscale(0.75) brightness(0.72);
}

.project-card__preview {
  position: relative;
  flex: 1 1 58%;
  min-height: 0;
  overflow: hidden;
}

.project-card__body {
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  padding: 1rem 1.1rem 1.15rem;
  background: rgba(0, 0, 0, 0.35);
  border-top: 1px solid rgba(237, 238, 237, 0.06);
}

.project-card__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

.project-card__category {
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--section-accent, var(--tertiary-color));
}

.project-card__year {
  font-size: 0.72rem;
  color: rgba(237, 238, 237, 0.4);
}

.project-card__title {
  margin: 0;
  font-family: var(--font-family-secondary);
  font-size: clamp(0.9rem, 1.2vw, 1.05rem);
  font-weight: 700;
  line-height: 1.2;
  color: var(--text-color);
  text-transform: uppercase;
  letter-spacing: 0.02em;
}

.project-card__summary {
  margin: 0;
  font-size: 0.78rem;
  line-height: 1.5;
  color: rgba(237, 238, 237, 0.58);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.project-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.project-card__tag {
  padding: 0.18rem 0.5rem;
  border-radius: 999px;
  border: 1px solid rgba(var(--section-accent-rgb, 118, 192, 70), 0.22);
  background: rgba(var(--section-accent-rgb, 118, 192, 70), 0.07);
  font-size: 0.58rem;
  font-weight: 600;
  color: rgba(237, 238, 237, 0.72);
}

.project-card__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin-top: 0.35rem;
}

.project-card__cta {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.45rem 0.85rem;
  border-radius: 0.35rem;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  text-decoration: none;
  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease;
}

.project-card__cta--primary {
  border: 1px solid rgba(var(--section-accent-rgb, 118, 192, 70), 0.4);
  background: rgba(var(--section-accent-rgb, 118, 192, 70), 0.12);
  color: var(--section-accent, var(--tertiary-color));
}

.project-card__cta--primary:hover {
  background: rgba(var(--section-accent-rgb, 118, 192, 70), 0.22);
}

.project-card__cta--ghost {
  border: 1px solid rgba(237, 238, 237, 0.16);
  background: rgba(255, 255, 255, 0.04);
  color: rgba(237, 238, 237, 0.85);
}

.project-card__cta--ghost:hover {
  border-color: rgba(237, 238, 237, 0.28);
  color: var(--text-color);
}

@media (prefers-reduced-motion: reduce) {
  .project-card,
  .project-card__cta {
    transition: none;
  }

  .project-card:hover {
    transform: none;
  }
}
</style>
