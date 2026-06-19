<script setup lang="ts">
import { computed } from 'vue'
import ProjectDeviceMockup from '@/components/projects/ProjectDeviceMockup.vue'
import type { Project } from '@/composables/useProjects'
import { useI18n } from '@/i18n'

const props = defineProps<{
  project: Project
}>()

const { t } = useI18n()

const cta = computed(() => {
  if (props.project.isOnline && props.project.liveUrl) {
    return { href: props.project.liveUrl, label: t.value('projects.viewProjectCta') }
  }
  if (props.project.githubUrl) {
    return { href: props.project.githubUrl, label: t.value('projects.viewCaseStudyCta') }
  }
  return null
})
</script>

<template>
  <article class="project-card">
    <div class="project-card__preview">
      <ProjectDeviceMockup
        :desktop-src="project.image"
        :mobile-src="project.mobileImage"
        :title="project.title"
      />
    </div>

    <div class="project-card__body">
      <span class="project-card__category">{{ project.categoryLabel }}</span>
      <h3 class="project-card__title">{{ project.title }}</h3>
      <time class="project-card__year" :datetime="String(project.year)">{{ project.year }}</time>

      <a
        v-if="cta"
        :href="cta.href"
        target="_blank"
        rel="noopener noreferrer"
        class="project-card__cta"
      >
        {{ cta.label }}
      </a>
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

.project-card__preview {
  flex: 1 1 58%;
  min-height: 0;
  overflow: hidden;
}

.project-card__body {
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  padding: 1rem 1.1rem 1.15rem;
  background: rgba(0, 0, 0, 0.35);
  border-top: 1px solid rgba(237, 238, 237, 0.06);
}

.project-card__category {
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--section-accent, var(--tertiary-color));
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

.project-card__year {
  font-size: 0.78rem;
  color: rgba(237, 238, 237, 0.45);
}

.project-card__cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  margin-top: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 0.35rem;
  border: 1px solid rgba(237, 238, 237, 0.18);
  background: rgba(255, 255, 255, 0.04);
  color: var(--text-color);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  text-decoration: none;
  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease;
}

.project-card__cta:hover {
  background: rgba(var(--section-accent-rgb, 118, 192, 70), 0.12);
  border-color: rgba(var(--section-accent-rgb, 118, 192, 70), 0.4);
  color: var(--section-accent, var(--tertiary-color));
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
