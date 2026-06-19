<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import ProjectShowcaseCard from '@/components/projects/ProjectShowcaseCard.vue'
import { useHorizontalScroll } from '@/composables/useHorizontalScroll'
import { useProjects } from '@/composables/useProjects'
import { useI18n } from '@/i18n'

const MOBILE_QUERY = '(max-width: 768px)'

const { t } = useI18n()
const { projects } = useProjects()

const trackRef = ref<HTMLElement | null>(null)
const isMobile = ref(false)
const { activeIndex, bind, unbind, prev, next, updateActiveIndex } = useHorizontalScroll(trackRef)

let mediaQuery: MediaQueryList | null = null

const projectCount = computed(() => projects.value.length)
const counterLabel = computed(
  () =>
    `${String(activeIndex.value + 1).padStart(2, '0')} / ${String(projectCount.value).padStart(2, '0')}`,
)

const setupCarousel = async () => {
  unbind()
  if (!isMobile.value) return
  await nextTick()
  bind()
}

const onMediaChange = (event: MediaQueryListEvent | MediaQueryList) => {
  isMobile.value = event.matches
}

onMounted(async () => {
  mediaQuery = window.matchMedia(MOBILE_QUERY)
  isMobile.value = mediaQuery.matches
  mediaQuery.addEventListener('change', onMediaChange)
  await setupCarousel()
})

onUnmounted(() => {
  mediaQuery?.removeEventListener('change', onMediaChange)
  unbind()
})

watch(isMobile, () => setupCarousel())

watch(
  () => projects.value.length,
  async () => {
    await nextTick()
    updateActiveIndex()
  },
)
</script>

<template>
  <div class="projects-section">
    <div class="projects-section__inner">
      <header class="projects-section__head">
        <p class="projects-section__label">{{ t('projects.sectionLabel') }}</p>
        <h2 id="projects-headline" class="projects-section__title">{{ t('projects.title') }}</h2>
      </header>

      <div
        ref="trackRef"
        class="projects-section__grid"
        :class="{ 'projects-section__grid--carousel': isMobile }"
        :role="isMobile ? 'region' : undefined"
        :aria-label="isMobile ? t('projects.title') : undefined"
      >
        <div
          v-for="(project, index) in projects"
          :key="project.slug"
          :data-slide="isMobile ? '' : undefined"
          class="projects-section__item"
          :class="{ 'projects-section__item--active': isMobile && index === activeIndex }"
        >
          <ProjectShowcaseCard :project="project" />
        </div>
      </div>

      <div v-if="isMobile" class="projects-section__nav">
        <button
          type="button"
          class="projects-section__arrow"
          :aria-label="t('projects.prev')"
          :disabled="activeIndex <= 0"
          @click="prev"
        >
          <font-awesome-icon icon="chevron-left" />
        </button>

        <span class="projects-section__counter" aria-live="polite">{{ counterLabel }}</span>

        <button
          type="button"
          class="projects-section__arrow"
          :aria-label="t('projects.next')"
          :disabled="activeIndex >= projectCount - 1"
          @click="next"
        >
          <font-awesome-icon icon="chevron-right" />
        </button>
      </div>

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

/* Desktop: grid */
.projects-section__grid {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  grid-auto-rows: 1fr;
  gap: 0.85rem;
  align-items: stretch;
}

.projects-section__item {
  min-height: 0;
  height: 100%;
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

.projects-section__nav {
  display: none;
}

@media (max-width: 1100px) {
  .projects-section__grid:not(.projects-section__grid--carousel) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-auto-rows: minmax(280px, 1fr);
  }
}

@media (max-width: 768px) {
  .projects-section {
    padding: 4.5rem 0 1.25rem;
    align-items: stretch;
  }

  .projects-section__inner {
    gap: 0.85rem;
  }

  .projects-section__grid--carousel {
    display: flex;
    align-items: stretch;
    gap: 0.75rem;
    overflow-x: auto;
    overflow-y: hidden;
    scroll-snap-type: x proximity;
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
    overscroll-behavior-x: contain;
    touch-action: pan-x;
    scrollbar-width: none;
    cursor: grab;
    padding-inline: 0.15rem;
  }

  .projects-section__grid--carousel::-webkit-scrollbar {
    display: none;
  }

  .projects-section__grid--carousel.is-dragging {
    cursor: grabbing;
    scroll-snap-type: none;
  }

  .projects-section__grid--carousel.is-dragging :deep(.project-card) {
    pointer-events: none;
  }

  .projects-section__grid--carousel .projects-section__item {
    flex: 0 0 min(88vw, 320px);
    height: auto;
    min-height: 360px;
    max-height: 100%;
    scroll-snap-align: center;
    transition: opacity 0.35s ease, transform 0.35s ease;
    opacity: 0.78;
    transform: scale(0.97);
  }

  .projects-section__item--active {
    opacity: 1;
    transform: scale(1);
  }

  .projects-section__nav {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.85rem;
    flex-shrink: 0;
  }

  .projects-section__arrow {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    border: 1px solid rgba(var(--section-accent-rgb, 118, 192, 70), 0.35);
    background: rgba(var(--section-accent-rgb, 118, 192, 70), 0.08);
    color: var(--section-accent, var(--tertiary-color));
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background 0.2s ease, opacity 0.2s ease;
  }

  .projects-section__arrow:hover:not(:disabled) {
    background: rgba(var(--section-accent-rgb, 118, 192, 70), 0.16);
  }

  .projects-section__arrow:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }

  .projects-section__counter {
    min-width: 3.5rem;
    text-align: center;
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    color: rgba(237, 238, 237, 0.55);
  }
}

@media (prefers-reduced-motion: reduce) {
  .projects-section__grid--carousel .projects-section__item {
    transition: none;
    opacity: 1;
    transform: none;
  }
}
</style>
