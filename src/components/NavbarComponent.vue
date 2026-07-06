<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'
import { useI18n } from '@/i18n'
import {
  bindActiveSectionTracking,
  getScrollContainer,
  scrollToSection,
  type LandingSectionId,
} from '@/composables/useScrollContainer'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()

const menuOpen = ref(false)
const activeSection = ref<LandingSectionId>('home')

const sections = ['home', 'projects', 'about', 'experience', 'contact'] as const

const navLabels: Record<(typeof sections)[number], string> = {
  home: 'nav.home',
  projects: 'nav.projects',
  about: 'nav.about',
  experience: 'nav.experience',
  contact: 'nav.contact',
}

const pageRoutes: Partial<Record<(typeof sections)[number], string>> = {}

const navigate = async (sectionId: (typeof sections)[number]) => {
  menuOpen.value = false

  const pageRoute = pageRoutes[sectionId]
  if (pageRoute) {
    activeSection.value = sectionId
    await router.push(pageRoute)
    return
  }

  if (route.path !== '/') {
    activeSection.value = sectionId
    await router.push({ path: '/', hash: `#${sectionId}` })
    return
  }

  activeSection.value = sectionId
  scrollToSection(sectionId)
}

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

let unbindScroll: (() => void) | null = null
let retryTimer: ReturnType<typeof setTimeout> | null = null

const teardownTracking = () => {
  if (retryTimer) {
    clearTimeout(retryTimer)
    retryTimer = null
  }
  unbindScroll?.()
  unbindScroll = null
}

const setupTracking = async () => {
  teardownTracking()

  if (route.path !== '/') return

  await nextTick()

  const attempt = (tries = 0) => {
    const unbind = bindActiveSectionTracking((id) => {
      activeSection.value = id
    })

    if (unbind) {
      unbindScroll = unbind
      return
    }

    if (tries < 12) {
      retryTimer = setTimeout(() => attempt(tries + 1), 50)
    }
  }

  attempt()
}

const syncActiveFromRoute = () => {
  if (route.path === '/projects') {
    activeSection.value = 'projects'
    return
  }

  if (route.path === '/') {
    const hash = route.hash.replace('#', '')
    if (hash && sections.includes(hash as (typeof sections)[number])) {
      activeSection.value = hash as LandingSectionId
    }
  }
}

watch(
  () => route.path,
  (path) => {
    menuOpen.value = false
    if (path === '/') {
      setupTracking()
      syncActiveFromRoute()
    } else {
      syncActiveFromRoute()
      teardownTracking()
    }
  },
  { immediate: true },
)

watch(
  () => route.hash,
  () => {
    if (route.path !== '/') return
    syncActiveFromRoute()
  },
)

watch(menuOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
  const container = getScrollContainer()
  if (container) {
    container.style.overflow = open ? 'hidden' : ''
  }
})

onMounted(() => {
  syncActiveFromRoute()
  setupTracking()
})

onUnmounted(() => {
  teardownTracking()
  document.body.style.overflow = ''
  const container = getScrollContainer()
  if (container) container.style.overflow = ''
})
</script>

<template>
  <nav class="navbar-container" :class="{ 'navbar-container--open': menuOpen }">
    <div class="navbar site-shell">
      <div class="navbar-brand">
        <a href="/" @click.prevent="navigate('home')" :aria-label="t('nav.goToHome')">
          <img src="@/assets/logo.svg" alt="Logo Igor Emanuel" />
        </a>
      </div>

      <ul class="navbar-links" :class="{ 'navbar-links--open': menuOpen }">
        <li v-for="section in sections" :key="section">
          <a
            :href="pageRoutes[section] ?? `/#${section}`"
            :class="{ active: activeSection === section }"
            @click.prevent="navigate(section)"
          >
            {{ t(navLabels[section]) }}
          </a>
        </li>
        <li class="navbar-links__lang">
          <LanguageSwitcher />
        </li>
      </ul>

      <div class="navbar-actions">
        <LanguageSwitcher class="navbar-lang-desktop" />

        <button
          type="button"
          class="navbar-toggle"
          :aria-expanded="menuOpen"
          :aria-label="t('nav.openMenu')"
          @click="toggleMenu"
        >
          <font-awesome-icon :icon="menuOpen ? ['fas', 'xmark'] : ['fas', 'bars']" />
        </button>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar-container {
  --navbar-height: 4rem;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(26, 31, 23, 0.88);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(118, 192, 70, 0.12);
}

.navbar {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  min-height: var(--navbar-height);
  padding-block: 0.65rem;
}

.navbar-brand {
  flex-shrink: 0;
  z-index: 2;
}

.navbar-brand img {
  width: 3.25rem;
  display: block;
}

.navbar-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;
  z-index: 2;
}

.navbar-lang-desktop {
  display: flex;
}

.navbar-toggle {
  display: none;
  align-items: center;
  justify-content: center;
  min-width: 48px;
  min-height: 48px;
  background: none;
  border: none;
  color: var(--text-color);
  font-size: 1.35rem;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  line-height: 1;
}

.navbar-links {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  gap: clamp(0.65rem, 1.5vw, 1.25rem);
  list-style: none;
  padding: 0;
  margin: 0;
  max-width: calc(100% - 12rem);
}

.navbar-links a {
  text-decoration: none;
  font-weight: 600;
  color: rgba(237, 238, 237, 0.72);
  transition:
    color 0.35s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
  font-size: clamp(0.78rem, 1.1vw, 0.92rem);
  position: relative;
  padding: 0.35rem 0.1rem 0.55rem;
  white-space: nowrap;
}

.navbar-links a::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 2px;
  background: var(--tertiary-color);
  border-radius: 2px;
  transform: scaleX(0);
  transform-origin: center;
  transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
}

.navbar-links a.active {
  transform: translateY(-1px);
}

.navbar-links a:hover {
  color: var(--text-color);
}

.navbar-links a.active {
  color: var(--tertiary-color);
}

.navbar-links a.active::after {
  transform: scaleX(1);
}

.navbar-links__lang {
  display: none;
}

@media (max-width: 1024px) {
  .navbar-links {
    max-width: calc(100% - 10rem);
    gap: 0.55rem;
  }

  .navbar-links a {
    font-size: 0.78rem;
  }
}

@media (max-width: 900px) {
  .navbar-brand img {
    width: 2.85rem;
  }

  .navbar-links {
    position: fixed;
    top: var(--navbar-height);
    left: 0;
    right: 0;
    transform: none;
    max-width: none;
    width: 100%;
    flex-direction: column;
    align-items: stretch;
    gap: 0;
    padding: 0.5rem 0 1rem;
    background: rgba(26, 31, 23, 0.97);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(118, 192, 70, 0.15);
    max-height: calc(100vh - var(--navbar-height));
    overflow-y: auto;
    display: none;
    z-index: 999;
  }

  .navbar-links--open {
    display: flex;
  }

  .navbar-links li {
    width: 100%;
    text-align: center;
  }

  .navbar-links a {
    display: block;
    padding: 0.85rem 1rem;
    font-size: 1rem;
  }

  .navbar-links a::after {
    left: 50%;
    right: auto;
    width: 2rem;
    transform: translateX(-50%) scaleX(0);
  }

  .navbar-links a.active::after {
    transform: translateX(-50%) scaleX(1);
  }

  .navbar-links a.active {
    background: rgba(118, 192, 70, 0.08);
  }

  .navbar-links__lang {
    display: flex;
    justify-content: center;
    margin-top: 0.5rem;
  }

  .navbar-lang-desktop {
    display: none;
  }

  .navbar-toggle {
    display: flex;
  }
}
</style>
