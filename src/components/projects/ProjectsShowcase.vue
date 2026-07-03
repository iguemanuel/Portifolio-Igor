<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import ProjectShowcaseCard from '@/components/projects/ProjectShowcaseCard.vue'
import ProjectMetrics from '@/components/projects/ProjectMetrics.vue'
import { useHorizontalScroll } from '@/composables/useHorizontalScroll'
import { useProjects } from '@/composables/useProjects'
import { useI18n } from '@/i18n'

withDefaults(
  defineProps<{
    showViewAll?: boolean
  }>(),
  { showViewAll: true },
)

const { t } = useI18n()
const { projects } = useProjects()

const trackRef = ref<HTMLElement | null>(null)
const { activeIndex, bind, unbind, prev, next, updateActiveIndex } = useHorizontalScroll(trackRef)

const projectCount = computed(() => projects.value.length)
const visibleSlots = computed(() => Math.min(projectCount.value, 4))
const showPeek = computed(() => projectCount.value > visibleSlots.value)
const showcaseStyle = computed(() => ({
  '--visible-slots': String(visibleSlots.value),
  '--peek': showPeek.value ? '2rem' : '0px',
}))
const counterLabel = computed(() => {
  const current = activeIndex.value + 1
  return `${String(current).padStart(2, '0')} / ${String(projectCount.value).padStart(2, '0')}`
})

onMounted(async () => {
  await nextTick()
  bind()
})

watch(
  () => projects.value.length,
  async () => {
    await nextTick()
    updateActiveIndex()
  },
)
</script>

<template>
  <div class="projects-showcase" :style="showcaseStyle">
    <aside class="projects-showcase__intro">
      <header class="intro-card__head">
        <p class="intro-card__label">
          <span class="intro-card__line" aria-hidden="true" />
          <span>{{ t('projects.sectionLabel') }}</span>
        </p>
        <h2 id="projects-headline" class="intro-card__title" v-html="t('projects.headline')" />
        <p class="intro-card__desc">{{ t('projects.showcaseDesc') }}</p>
      </header>

      <ProjectMetrics class="intro-card__metrics" compact />

      <div class="intro-card__nav">
        <button
          type="button"
          class="intro-card__arrow"
          :aria-label="t('projects.prev')"
          :disabled="activeIndex <= 0"
          @click="prev"
        >
          <font-awesome-icon icon="chevron-left" />
        </button>

        <Transition name="counter" mode="out-in">
          <span :key="counterLabel" class="intro-card__counter" aria-live="polite">
            {{ counterLabel }}
          </span>
        </Transition>

        <button
          type="button"
          class="intro-card__arrow"
          :aria-label="t('projects.next')"
          :disabled="activeIndex >= projectCount - 1"
          @click="next"
        >
          <font-awesome-icon icon="chevron-right" />
        </button>
      </div>

      <RouterLink v-if="showViewAll" to="/projects" class="intro-card__all">
        {{ t('projects.viewAll') }}
        <font-awesome-icon icon="arrow-right" />
      </RouterLink>
    </aside>

    <div class="projects-showcase__gallery">
      <div
        ref="trackRef"
        class="projects-showcase__track"
        role="region"
        :aria-label="t('projects.title')"
      >
        <div
          v-for="(project, index) in projects"
          :key="project.slug"
          data-slide
          class="projects-showcase__slide"
          :class="{ 'projects-showcase__slide--active': index === activeIndex }"
        >
          <ProjectShowcaseCard :project="project" compact />
        </div>
      </div>

      <div v-if="showPeek" class="projects-showcase__fade" aria-hidden="true" />
    </div>
  </div>
</template>

<style scoped>
.projects-showcase {
  --slide-gap: 0.75rem;
  --peek: 0px;
  --visible-slots: 4;

  position: relative;
  display: grid;
  grid-template-columns: minmax(240px, 22%) minmax(0, 1fr);
  gap: clamp(1.5rem, 2.5vw, 2.5rem);
  width: min(var(--site-width), var(--site-max-width));
  margin: 0 auto;
  height: 100%;
  min-height: 0;
  padding: 5rem 0 1.5rem;
  box-sizing: border-box;
  align-items: center;
}

.projects-showcase__intro {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.5rem;
  z-index: 2;
}

.intro-card__label {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.85rem;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: var(--section-accent, var(--tertiary-color));
}

.intro-card__line {
  width: 2rem;
  height: 2px;
  background: var(--section-accent, var(--tertiary-color));
}

.intro-card__title {
  font-family: var(--font-family-secondary);
  font-size: clamp(1.45rem, 2.4vw, 2.35rem);
  font-weight: 700;
  line-height: 1.12;
  color: var(--text-color);
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.01em;
}

.intro-card__title :deep(em) {
  color: var(--section-accent, var(--tertiary-color));
  font-style: normal;
}

.intro-card__desc {
  margin: 0.85rem 0 0;
  font-size: clamp(0.84rem, 1vw, 0.95rem);
  line-height: 1.65;
  color: var(--section-text-muted, rgba(237, 238, 237, 0.62));
  max-width: 36ch;
}

.intro-card__metrics {
  margin-top: -0.25rem;
}

.intro-card__nav {
  display: flex;
  align-items: center;
  gap: 0.85rem;
}

@media (max-height: 720px) {
  .intro-card__metrics {
    display: none;
  }
}

.intro-card__arrow {
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 50%;
  border: 1px solid rgba(var(--section-accent-rgb, 118, 192, 70), 0.35);
  background: rgba(var(--section-accent-rgb, 118, 192, 70), 0.08);
  color: var(--section-accent, var(--tertiary-color));
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition:
    background 0.28s cubic-bezier(0.22, 1, 0.36, 1),
    border-color 0.28s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.28s cubic-bezier(0.22, 1, 0.36, 1),
    opacity 0.28s ease;
}

.intro-card__arrow:hover:not(:disabled) {
  background: rgba(var(--section-accent-rgb, 118, 192, 70), 0.18);
  border-color: var(--section-accent, var(--tertiary-color));
  transform: translateY(-2px) scale(1.04);
}

.intro-card__arrow:active:not(:disabled) {
  transform: scale(0.96);
}

.intro-card__arrow:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.intro-card__counter {
  display: inline-block;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: rgba(237, 238, 237, 0.55);
  min-width: 3.5rem;
  text-align: center;
}

.counter-enter-active,
.counter-leave-active {
  transition:
    opacity 0.22s ease,
    transform 0.22s cubic-bezier(0.22, 1, 0.36, 1);
}

.counter-enter-from {
  opacity: 0;
  transform: translateY(6px);
}

.counter-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

.intro-card__all {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  width: fit-content;
  padding: 0.6rem 1rem;
  border-radius: 0.45rem;
  border: 1px solid rgba(var(--section-accent-rgb, 118, 192, 70), 0.3);
  color: var(--section-accent, var(--tertiary-color));
  font-size: 0.78rem;
  font-weight: 600;
  text-decoration: none;
  transition:
    background 0.28s ease,
    border-color 0.28s ease,
    transform 0.28s cubic-bezier(0.22, 1, 0.36, 1);
}

.intro-card__all:hover {
  background: rgba(var(--section-accent-rgb, 118, 192, 70), 0.1);
  border-color: var(--section-accent, var(--tertiary-color));
  transform: translateX(3px);
  color: var(--section-accent, var(--tertiary-color));
}

.projects-showcase__gallery {
  position: relative;
  width: 100%;
  min-width: 0;
  height: calc(100vh - 6.5rem);
  max-height: 620px;
  min-height: 480px;
  overflow: hidden;
  container-type: inline-size;
  container-name: gallery;
}

.projects-showcase__track {
  display: flex;
  align-items: stretch;
  gap: var(--slide-gap);
  height: 100%;
  padding: 0;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-snap-type: x proximity;
  scroll-padding-inline: 0;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior-x: contain;
  touch-action: pan-x;
  scrollbar-width: none;
  cursor: grab;
  will-change: scroll-position;
}

.projects-showcase__track::-webkit-scrollbar {
  display: none;
}

.projects-showcase__track.is-dragging {
  cursor: grabbing;
  scroll-snap-type: none;
  user-select: none;
}

.projects-showcase__track.is-dragging :deep(.showcase-card) {
  pointer-events: none;
}

.projects-showcase__slide {
  scroll-snap-align: start;
  flex-shrink: 0;
  width: calc(
    (100cqw - var(--peek) - (var(--visible-slots) - 1) * var(--slide-gap)) / var(--visible-slots)
  );
  height: 100%;
  transition:
    opacity 0.55s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
  opacity: 0.82;
  transform: scale(0.985);
}

.projects-showcase__slide--active {
  opacity: 1;
  transform: scale(1);
}

.projects-showcase__fade {
  position: absolute;
  top: 0;
  right: 0;
  width: 2rem;
  height: 100%;
  pointer-events: none;
  background: linear-gradient(to left, rgba(10, 10, 10, 0.55) 0%, transparent 100%);
}

@media (max-width: 1024px) {
  .projects-showcase {
    grid-template-columns: minmax(240px, 30%) minmax(0, 1fr);
  }
}

@media (max-width: 900px) {
  .projects-showcase {
    --visible-slots: 1;
    --peek: 2.75rem;
    grid-template-columns: 1fr;
    width: min(var(--site-width), var(--site-max-width));
    padding: 4.75rem 0 1.5rem;
    align-items: flex-start;
  }

  .projects-showcase__gallery {
    width: 100%;
    height: auto;
    min-height: 500px;
    max-height: none;
  }

  .projects-showcase__slide {
    width: calc(100cqw - var(--peek));
  }
}

@media (prefers-reduced-motion: reduce) {
  .projects-showcase__slide,
  .intro-card__arrow,
  .intro-card__all,
  .counter-enter-active,
  .counter-leave-active {
    transition: none;
  }

  .projects-showcase__slide {
    opacity: 1;
  }
}
</style>
