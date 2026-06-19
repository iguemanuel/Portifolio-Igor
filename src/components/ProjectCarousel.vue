<script setup lang="ts">
import { ref, computed } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import type { Project } from '@/composables/useProjects'
import { useI18n } from '@/i18n'

const props = defineProps<{
  projects: Project[]
}>()

const { t } = useI18n()
const currentIndex = ref(0)

const currentProject = computed(
  () =>
    props.projects[currentIndex.value] ?? {
      id: 0,
      title: '',
      description: '',
      image: '',
      tags: [],
    }
)

const goTo = (index: number) => {
  if (index >= 0 && index < props.projects.length) {
    currentIndex.value = index
  }
}

const prev = () => {
  currentIndex.value =
    (currentIndex.value - 1 + props.projects.length) % props.projects.length
}

const next = () => {
  currentIndex.value = (currentIndex.value + 1) % props.projects.length
}
</script>

<template>
  <div class="carousel">
    <Transition name="slide" mode="out-in">
      <article :key="currentIndex" class="carousel__card">
        <div class="carousel__image-col">
          <div class="carousel__image-frame">
            <img
              :src="currentProject.image"
              :alt="t('projects.screenshotAlt', { title: currentProject.title })"
              class="carousel__image"
            />
          </div>
        </div>

        <div class="carousel__content">
          <span class="carousel__counter">
            {{ String(currentIndex + 1).padStart(2, '0') }} /
            {{ String(projects.length).padStart(2, '0') }}
          </span>

          <h3 class="carousel__title">{{ currentProject.title }}</h3>
          <p class="carousel__description">{{ currentProject.description }}</p>

          <div class="carousel__tags">
            <span v-for="tag in currentProject.tags" :key="tag" class="carousel__tag">
              {{ tag }}
            </span>
          </div>

          <div class="carousel__actions">
            <a
              v-if="currentProject.liveUrl"
              :href="currentProject.liveUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="carousel__btn carousel__btn--primary"
            >
              <font-awesome-icon icon="box-open" />
              {{ t('projects.deploy') }}
            </a>
            <a
              v-if="currentProject.githubUrl"
              :href="currentProject.githubUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="carousel__btn carousel__btn--secondary"
            >
              <font-awesome-icon :icon="['fab', 'github']" />
              {{ t('projects.github') }}
            </a>
          </div>
        </div>
      </article>
    </Transition>

    <div class="carousel__controls">
      <button class="carousel__arrow" :aria-label="t('projects.prev')" @click="prev">
        <font-awesome-icon icon="chevron-left" />
      </button>

      <div class="carousel__thumbs">
        <button
          v-for="(project, index) in projects"
          :key="project.id"
          class="carousel__thumb"
          :class="{ active: index === currentIndex }"
          :aria-label="t('projects.viewProject', { n: index + 1 })"
          :aria-current="index === currentIndex ? 'true' : 'false'"
          @click="goTo(index)"
        >
          <img :src="project.image" :alt="project.title" />
          <span class="carousel__thumb-label">{{ project.title }}</span>
        </button>
      </div>

      <button class="carousel__arrow" :aria-label="t('projects.next')" @click="next">
        <font-awesome-icon icon="chevron-right" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.carousel {
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
}

.carousel__card {
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: var(--skeleton-color);
  border: 1px solid rgba(118, 192, 70, 0.15);
  border-radius: 0.85rem;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
  min-height: 340px;
}

.carousel__image-col {
  background: rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  overflow: hidden;
}

.carousel__image-frame {
  width: 100%;
  border-radius: 0.5rem;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.carousel__image {
  width: 100%;
  aspect-ratio: 16 / 10;
  object-fit: cover;
  display: block;
  transition: transform 0.5s ease;
}

.carousel__card:hover .carousel__image {
  transform: scale(1.03);
}

.carousel__content {
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.carousel__counter {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--tertiary-color);
  letter-spacing: 0.08em;
}

.carousel__title {
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--text-color);
  margin: 0;
  line-height: 1.3;
}

.carousel__description {
  color: rgba(237, 238, 237, 0.65);
  font-size: 0.9rem;
  line-height: 1.65;
  margin: 0;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.carousel__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.carousel__tag {
  font-size: 0.7rem;
  font-weight: 600;
  padding: 0.2rem 0.65rem;
  border-radius: 999px;
  background: rgba(118, 192, 70, 0.1);
  color: var(--tertiary-color);
  border: 1px solid rgba(118, 192, 70, 0.25);
}

.carousel__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-top: auto;
  padding-top: 0.5rem;
}

.carousel__btn {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.5rem 1rem;
  border-radius: 0.45rem;
  font-size: 0.85rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
}

.carousel__btn--primary {
  background: var(--tertiary-color);
  color: var(--bg-color);
}

.carousel__btn--primary:hover {
  background: var(--secondary-color);
  color: var(--text-color);
}

.carousel__btn--secondary {
  background: rgba(255, 255, 255, 0.06);
  color: var(--primary-color);
  border: 1px solid rgba(181, 203, 166, 0.3);
}

.carousel__btn--secondary:hover {
  border-color: var(--tertiary-color);
  color: var(--tertiary-color);
}

.carousel__controls {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 1.25rem;
}

.carousel__arrow {
  flex-shrink: 0;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  border: 1px solid rgba(118, 192, 70, 0.3);
  background: rgba(118, 192, 70, 0.08);
  color: var(--tertiary-color);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.carousel__arrow:hover {
  background: rgba(118, 192, 70, 0.2);
  border-color: var(--tertiary-color);
}

.carousel__thumbs {
  flex: 1;
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  padding: 0.25rem 0;
  scrollbar-width: thin;
  scrollbar-color: rgba(118, 192, 70, 0.3) transparent;
}

.carousel__thumb {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;
  background: none;
  border: 2px solid transparent;
  border-radius: 0.5rem;
  padding: 0.25rem;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 90px;
}

.carousel__thumb img {
  width: 80px;
  height: 50px;
  object-fit: cover;
  border-radius: 0.35rem;
  opacity: 0.5;
  transition: opacity 0.2s ease;
}

.carousel__thumb-label {
  font-size: 0.6rem;
  color: rgba(237, 238, 237, 0.45);
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 80px;
  transition: color 0.2s ease;
}

.carousel__thumb:hover img,
.carousel__thumb.active img {
  opacity: 1;
}

.carousel__thumb.active {
  border-color: var(--tertiary-color);
  background: rgba(118, 192, 70, 0.08);
}

.carousel__thumb.active .carousel__thumb-label {
  color: var(--tertiary-color);
}

/* Transição */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.35s ease;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(24px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-24px);
}

@media (max-width: 768px) {
  .carousel__card {
    grid-template-columns: 1fr;
    min-height: unset;
  }

  .carousel__image-col {
    padding: 0.75rem 0.75rem 0;
  }

  .carousel__content {
    padding: 1.25rem;
  }

  .carousel__description {
    -webkit-line-clamp: 4;
  }

  .carousel__arrow {
    display: none;
  }

  .carousel__thumbs {
    justify-content: center;
  }
}
</style>
