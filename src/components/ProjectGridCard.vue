<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import type { Project } from '@/composables/useProjects'
import { useI18n } from '@/i18n'

defineProps<{
  project: Project
  compact?: boolean
}>()

const { t } = useI18n()
</script>

<template>
  <article class="project-card" :class="{ compact }">
    <div class="project-card__image-wrap">
      <img
        :src="project.image"
        :alt="t('projects.screenshotAlt', { title: project.title })"
        class="project-card__image"
        loading="lazy"
      />
      <div class="project-card__overlay">
        <div class="project-card__actions">
          <a
            v-if="project.liveUrl"
            :href="project.liveUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="project-card__btn project-card__btn--primary"
          >
            <font-awesome-icon icon="box-open" />
            {{ t('projects.deploy') }}
          </a>
          <a
            v-if="project.githubUrl"
            :href="project.githubUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="project-card__btn project-card__btn--secondary"
          >
            <font-awesome-icon :icon="['fab', 'github']" />
            {{ t('projects.github') }}
          </a>
        </div>
      </div>
    </div>

    <div class="project-card__body">
      <h3 class="project-card__title">{{ project.title }}</h3>
      <p class="project-card__description">{{ project.description }}</p>
      <div class="project-card__tags">
        <span v-for="tag in project.tags" :key="tag" class="project-card__tag">{{ tag }}</span>
      </div>
    </div>
  </article>
</template>

<style scoped>
.project-card {
  display: flex;
  flex-direction: column;
  background: var(--skeleton-color);
  border: 1px solid rgba(118, 192, 70, 0.12);
  border-radius: 0.75rem;
  overflow: hidden;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease,
    border-color 0.3s ease;
  height: 100%;
}

.project-card:hover {
  transform: translateY(-6px);
  border-color: rgba(118, 192, 70, 0.35);
  box-shadow:
    0 12px 40px rgba(0, 0, 0, 0.35),
    0 0 0 1px rgba(118, 192, 70, 0.1);
}

.project-card__image-wrap {
  position: relative;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.3);
}

.project-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.project-card:hover .project-card__image {
  transform: scale(1.05);
}

.project-card__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(16, 19, 14, 0.92) 0%,
    rgba(16, 19, 14, 0.4) 50%,
    transparent 100%
  );
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 1rem;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.project-card:hover .project-card__overlay {
  opacity: 1;
}

.project-card__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
}

.project-card__btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.45rem 0.9rem;
  border-radius: 0.4rem;
  font-size: 0.8rem;
  font-weight: 600;
  text-decoration: none;
  transition: opacity 0.2s ease;
}

.project-card__btn--primary {
  background: var(--tertiary-color);
  color: var(--bg-color);
}

.project-card__btn--secondary {
  background: rgba(255, 255, 255, 0.12);
  color: var(--text-color);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.project-card__btn:hover {
  opacity: 0.9;
  color: inherit;
}

.project-card__body {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 0.75rem;
}

.project-card__title {
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--text-color);
  margin: 0;
}

.project-card__description {
  color: rgba(237, 238, 237, 0.65);
  font-size: 0.9rem;
  line-height: 1.6;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
}

.project-card.compact .project-card__description {
  -webkit-line-clamp: 2;
}

.project-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: auto;
}

.project-card__tag {
  font-size: 0.7rem;
  font-weight: 600;
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
  background: rgba(118, 192, 70, 0.1);
  color: var(--tertiary-color);
  border: 1px solid rgba(118, 192, 70, 0.25);
}

@media (max-width: 768px) {
  .project-card__overlay {
    opacity: 1;
    background: linear-gradient(
      to top,
      rgba(16, 19, 14, 0.85) 0%,
      transparent 60%
    );
  }

  .project-card__actions {
    width: 100%;
  }

  .project-card__btn {
    flex: 1;
    justify-content: center;
    font-size: 0.75rem;
    padding: 0.4rem 0.6rem;
  }
}
</style>
