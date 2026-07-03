<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import ProjectDeviceMockup from '@/components/projects/ProjectDeviceMockup.vue'
import ProjectBadges from '@/components/projects/ProjectBadges.vue'
import type { Project } from '@/composables/useProjects'
import { useI18n } from '@/i18n'

const props = defineProps<{
  projects: Project[]
}>()

const { t } = useI18n()
const activeIndex = ref(0)

const activeProject = computed(() => props.projects[activeIndex.value] ?? props.projects[0])

const selectProject = (index: number) => {
  activeIndex.value = index
}

const prev = () => {
  if (activeIndex.value > 0) activeIndex.value -= 1
}

const next = () => {
  if (activeIndex.value < props.projects.length - 1) activeIndex.value += 1
}

const counterLabel = computed(
  () =>
    `${String(activeIndex.value + 1).padStart(2, '0')} / ${String(props.projects.length).padStart(2, '0')}`,
)

const visibleTags = computed(() => activeProject.value?.tags.slice(0, 4) ?? [])

const liveCta = computed(() => {
  const project = activeProject.value
  if (!project?.isOnline || !project.liveUrl) return null
  return { href: project.liveUrl, label: t.value('projects.viewProjectCta') }
})

const githubCta = computed(() => {
  const project = activeProject.value
  if (!project?.githubUrl) return null
  return { href: project.githubUrl, label: 'GitHub' }
})

watch(
  () => props.projects.map((p) => p.slug).join(','),
  () => {
    activeIndex.value = 0
  },
)
</script>

<template>
  <div class="spotlight">
    <nav class="spotlight__rail" :aria-label="t('projects.title')">
      <button
        v-for="(project, index) in projects"
        :key="project.slug"
        type="button"
        class="spotlight__rail-item"
        :class="{ 'spotlight__rail-item--active': index === activeIndex }"
        :aria-current="index === activeIndex ? 'true' : undefined"
        @click="selectProject(index)"
      >
        <span class="spotlight__rail-index">{{ String(index + 1).padStart(2, '0') }}</span>
        <span class="spotlight__rail-text">
          <span class="spotlight__rail-title">{{ project.title }}</span>
          <span class="spotlight__rail-meta">
            {{ project.year }} · {{ project.categoryLabel }}
          </span>
        </span>
        <span
          class="spotlight__rail-status"
          :class="{ 'spotlight__rail-status--offline': !project.isOnline }"
          :title="project.statusLabel"
          aria-hidden="true"
        />
      </button>
    </nav>

    <div class="spotlight__stage">
      <Transition name="spotlight-swap" mode="out-in">
        <article v-if="activeProject" :key="activeProject.slug" class="spotlight__panel">
          <div
            class="spotlight__mockup"
            :class="{ 'spotlight__mockup--offline': !activeProject.isOnline }"
          >
            <ProjectBadges :project="activeProject" />
            <ProjectDeviceMockup
              :desktop-src="activeProject.image"
              :mobile-src="activeProject.mobileImage"
              :title="activeProject.title"
            />
          </div>

          <div class="spotlight__info">
            <div class="spotlight__info-head">
              <span class="spotlight__category">{{ activeProject.categoryLabel }}</span>
              <time class="spotlight__year" :datetime="String(activeProject.year)">
                {{ activeProject.year }}
              </time>
            </div>

            <h3 class="spotlight__title">{{ activeProject.title }}</h3>
            <p class="spotlight__summary">{{ activeProject.summary }}</p>

            <ul v-if="visibleTags.length" class="spotlight__tags" role="list">
              <li v-for="tag in visibleTags" :key="tag" class="spotlight__tag">{{ tag }}</li>
            </ul>

            <div class="spotlight__actions">
              <a
                v-if="liveCta"
                :href="liveCta.href"
                target="_blank"
                rel="noopener noreferrer"
                class="spotlight__cta spotlight__cta--primary"
              >
                {{ liveCta.label }}
              </a>
              <a
                v-if="githubCta"
                :href="githubCta.href"
                target="_blank"
                rel="noopener noreferrer"
                class="spotlight__cta spotlight__cta--ghost"
              >
                <font-awesome-icon :icon="['fab', 'github']" aria-hidden="true" />
                {{ githubCta.label }}
              </a>
            </div>
          </div>
        </article>
      </Transition>

      <div class="spotlight__nav">
        <button
          type="button"
          class="spotlight__arrow"
          :aria-label="t('projects.prev')"
          :disabled="activeIndex <= 0"
          @click="prev"
        >
          <font-awesome-icon icon="chevron-left" />
        </button>
        <span class="spotlight__counter" aria-live="polite">{{ counterLabel }}</span>
        <button
          type="button"
          class="spotlight__arrow"
          :aria-label="t('projects.next')"
          :disabled="activeIndex >= projects.length - 1"
          @click="next"
        >
          <font-awesome-icon icon="chevron-right" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.spotlight {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: minmax(0, 0.42fr) minmax(0, 0.58fr);
  gap: 1rem;
  align-items: stretch;
}

.spotlight__rail {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  min-height: 0;
  overflow-y: auto;
  padding-right: 0.25rem;
  scrollbar-width: thin;
  scrollbar-color: rgba(var(--section-accent-rgb, 118, 192, 70), 0.35) transparent;
}

.spotlight__rail-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.7rem 0.85rem;
  border-radius: 0.65rem;
  border: 1px solid rgba(237, 238, 237, 0.08);
  background: rgba(255, 255, 255, 0.02);
  color: inherit;
  text-align: left;
  cursor: pointer;
  transition:
    border-color 0.25s ease,
    background 0.25s ease,
    transform 0.25s ease;
}

.spotlight__rail-item:hover {
  border-color: rgba(var(--section-accent-rgb, 118, 192, 70), 0.28);
  background: rgba(255, 255, 255, 0.04);
}

.spotlight__rail-item--active {
  border-color: rgba(var(--section-accent-rgb, 118, 192, 70), 0.45);
  background: rgba(var(--section-accent-rgb, 118, 192, 70), 0.1);
  transform: translateX(4px);
}

.spotlight__rail-index {
  flex-shrink: 0;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  color: var(--section-accent, var(--tertiary-color));
  opacity: 0.85;
}

.spotlight__rail-text {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.12rem;
}

.spotlight__rail-title {
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--text-color);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.spotlight__rail-meta {
  font-size: 0.68rem;
  color: rgba(237, 238, 237, 0.45);
}

.spotlight__rail-status {
  flex-shrink: 0;
  width: 0.45rem;
  height: 0.45rem;
  border-radius: 50%;
  background: var(--section-accent, var(--tertiary-color));
  box-shadow: 0 0 8px rgba(var(--section-accent-rgb, 118, 192, 70), 0.6);
}

.spotlight__rail-status--offline {
  background: rgba(237, 238, 237, 0.35);
  box-shadow: none;
}

.spotlight__stage {
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.spotlight__panel {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-rows: minmax(0, 1fr) auto;
  gap: 0.85rem;
  border-radius: 0.85rem;
  border: 1px solid rgba(237, 238, 237, 0.1);
  background: rgba(255, 255, 255, 0.025);
  overflow: hidden;
}

.spotlight__mockup {
  position: relative;
  min-height: 0;
  overflow: hidden;
}

.spotlight__mockup--offline :deep(.device-stage) {
  filter: grayscale(0.75) brightness(0.72);
}

.spotlight__info {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  padding: 0 1rem 1rem;
}

.spotlight__info-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

.spotlight__category {
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--section-accent, var(--tertiary-color));
}

.spotlight__year {
  font-size: 0.72rem;
  color: rgba(237, 238, 237, 0.4);
}

.spotlight__title {
  margin: 0;
  font-family: var(--font-family-secondary);
  font-size: clamp(1rem, 1.5vw, 1.25rem);
  font-weight: 700;
  color: var(--text-color);
  text-transform: uppercase;
  letter-spacing: 0.02em;
}

.spotlight__summary {
  margin: 0;
  font-size: 0.82rem;
  line-height: 1.55;
  color: rgba(237, 238, 237, 0.62);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.spotlight__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.spotlight__tag {
  padding: 0.22rem 0.55rem;
  border-radius: 999px;
  border: 1px solid rgba(var(--section-accent-rgb, 118, 192, 70), 0.25);
  background: rgba(var(--section-accent-rgb, 118, 192, 70), 0.08);
  font-size: 0.62rem;
  font-weight: 600;
  color: rgba(237, 238, 237, 0.75);
}

.spotlight__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.25rem;
}

.spotlight__cta {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 0.95rem;
  border-radius: 0.4rem;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  text-decoration: none;
  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease;
}

.spotlight__cta--primary {
  border: 1px solid rgba(var(--section-accent-rgb, 118, 192, 70), 0.45);
  background: rgba(var(--section-accent-rgb, 118, 192, 70), 0.14);
  color: var(--section-accent, var(--tertiary-color));
}

.spotlight__cta--primary:hover {
  background: rgba(var(--section-accent-rgb, 118, 192, 70), 0.24);
}

.spotlight__cta--ghost {
  border: 1px solid rgba(237, 238, 237, 0.16);
  background: rgba(255, 255, 255, 0.04);
  color: rgba(237, 238, 237, 0.85);
}

.spotlight__cta--ghost:hover {
  border-color: rgba(237, 238, 237, 0.28);
  color: var(--text-color);
}

.spotlight__nav {
  display: none;
}

.spotlight-swap-enter-active,
.spotlight-swap-leave-active {
  transition:
    opacity 0.35s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}

.spotlight-swap-enter-from {
  opacity: 0;
  transform: translateX(12px);
}

.spotlight-swap-leave-to {
  opacity: 0;
  transform: translateX(-12px);
}

@media (max-width: 900px) {
  .spotlight {
    grid-template-columns: 1fr;
    grid-template-rows: auto minmax(0, 1fr);
    gap: 0.75rem;
  }

  .spotlight__rail {
    flex-direction: row;
    overflow-x: auto;
    overflow-y: hidden;
    padding-right: 0;
    padding-bottom: 0.15rem;
    scrollbar-width: none;
  }

  .spotlight__rail::-webkit-scrollbar {
    display: none;
  }

  .spotlight__rail-item {
    flex: 0 0 auto;
    min-width: 11.5rem;
    transform: none;
  }

  .spotlight__rail-item--active {
    transform: none;
  }

  .spotlight__nav {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.85rem;
    flex-shrink: 0;
  }

  .spotlight__arrow {
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

  .spotlight__arrow:hover:not(:disabled) {
    background: rgba(var(--section-accent-rgb, 118, 192, 70), 0.16);
  }

  .spotlight__arrow:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }

  .spotlight__counter {
    min-width: 3.5rem;
    text-align: center;
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    color: rgba(237, 238, 237, 0.55);
  }
}

@media (prefers-reduced-motion: reduce) {
  .spotlight-swap-enter-active,
  .spotlight-swap-leave-active,
  .spotlight__rail-item {
    transition: none;
  }

  .spotlight__rail-item--active {
    transform: none;
  }
}
</style>
