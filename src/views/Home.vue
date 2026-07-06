<script setup lang="ts">
import { computed, ref, onMounted, watch } from 'vue'
import { RouterLink } from 'vue-router'
import Typewriter from 'typewriter-effect/dist/core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useI18n } from '@/i18n'
import { useReveal } from '@/composables/useReveal'
import { scrollToSection } from '@/composables/useScrollContainer'
import HeroStats from '@/components/hero/HeroStats.vue'
import HeroFloatingCard from '@/components/hero/HeroFloatingCard.vue'

const { t, tm, locale } = useI18n()
const { el, visible } = useReveal()

const typewriterElement = ref<HTMLElement | null>(null)

const proofItems = computed(() => tm.value('hero.proof'))

const scrollTo = (sectionId: string) => {
  scrollToSection(sectionId)
}

const initTypewriter = () => {
  if (!typewriterElement.value) return

  typewriterElement.value.innerHTML = ''
  const strings = tm.value('hero.headlineRotating')

  new Typewriter(typewriterElement.value, {
    strings,
    autoStart: true,
    loop: true,
    cursor: '|',
    delay: 70,
    deleteSpeed: 40,
  })
}

onMounted(() => initTypewriter())

watch(locale, () => initTypewriter())
</script>

<template>
  <header class="hero">
    <div class="hero-bg" aria-hidden="true" />

    <div ref="el" class="hero-inner" :class="{ 'is-revealed': visible }">
      <div class="hero-content">
        <div class="hero-text">
          <h1 class="hero-title reveal" style="--i: 0">
            <span class="hero-title__prefix">{{ t('hero.headlinePrefix') }}</span>
            <span ref="typewriterElement" class="hero-title__rotating" />
          </h1>

          <p class="hero-subheadline reveal" style="--i: 1">{{ t('hero.subheadline') }}</p>

          <HeroStats :items="proofItems" class="reveal" style="--i: 2" />

          <div class="hero-ctas reveal" style="--i: 3">
            <button class="btn-cta btn-cta-primary" @click="scrollTo('contact')">
              {{ t('hero.ctaContact') }}
            </button>
            <button class="btn-cta btn-cta-outline" @click="scrollTo('projects')">
              {{ t('hero.ctaProjects') }}
            </button>
            <RouterLink to="/cv" class="btn-cta btn-cta-ghost">
              {{ t('hero.ctaCv') }}
            </RouterLink>
          </div>

          <nav class="hero-social reveal" style="--i: 4" aria-label="Redes sociais">
            <a href="https://www.instagram.com/iguemanuel/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <font-awesome-icon :icon="['fab', 'instagram']" />
            </a>
            <a href="https://www.linkedin.com/in/igor-emanuel-roque/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <font-awesome-icon :icon="['fab', 'linkedin']" />
            </a>
            <a href="https://github.com/iguemanuel" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <font-awesome-icon :icon="['fab', 'github']" />
            </a>
          </nav>
        </div>

        <div class="hero-visual reveal" style="--i: 3">
          <div class="hero-visual__glow" aria-hidden="true" />

          <div class="perfil-wrapper">
            <img src="/img/perfil.png" :alt="t('hero.photoAlt')" class="icon-perfil" />
          </div>

          <HeroFloatingCard
            icon="briefcase"
            :label="t('hero.cards.experienceLabel')"
            :value="t('hero.cards.experienceValue')"
            class="hero-float hero-float--exp"
          />
          <HeroFloatingCard
            icon="rocket"
            :label="t('hero.cards.projectsLabel')"
            :value="t('hero.cards.projectsValue')"
            class="hero-float hero-float--projects"
          />
          <HeroFloatingCard
            icon="layer-group"
            :label="t('hero.cards.stackLabel')"
            :value="t('hero.cards.stackValue')"
            class="hero-float hero-float--stack"
          />
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.hero {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 0;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 60% 50% at 70% 20%, var(--section-glow, rgba(118, 192, 70, 0.12)) 0%, transparent 70%),
    radial-gradient(ellipse 40% 40% at 10% 80%, rgba(74, 111, 50, 0.15) 0%, transparent 60%);
  pointer-events: none;
}

.hero-inner {
  position: relative;
  z-index: 1;
  height: 100%;
  width: min(var(--site-width), var(--site-max-width));
  margin: 0 auto;
  padding: 5rem 0 1.25rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
}

.hero-content {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
  gap: clamp(1.5rem, 4vw, 3.5rem);
  align-items: center;
}

.hero-text {
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
  min-width: 0;
}

/* Reveal stagger */
.reveal {
  opacity: 0;
  transform: translateY(18px);
  transition:
    opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: calc(var(--i, 0) * 90ms);
}

.is-revealed .reveal {
  opacity: 1;
  transform: translateY(0);
}

.hero-title {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  font-family: var(--font-family-secondary);
  font-size: clamp(1.85rem, 3.6vw, 3rem);
  font-weight: 700;
  line-height: 1.14;
  margin: 0;
}

.hero-title__prefix {
  color: var(--text-color);
}

.hero-title__rotating {
  color: var(--section-accent, var(--tertiary-color));
  display: block;
  min-height: 1.2em;
}

.hero-subheadline {
  color: rgba(237, 238, 237, 0.78);
  font-weight: 300;
  max-width: 38rem;
  line-height: 1.6;
  margin: 0;
  font-size: clamp(0.92rem, 1.2vw, 1.05rem);
}

.hero-ctas {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
}

.btn-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: 0.7rem 1.35rem;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 0.92rem;
  cursor: pointer;
  transition: all 0.25s ease;
  text-decoration: none;
  border: 2px solid transparent;
}

.btn-cta-primary {
  background-color: var(--section-accent, var(--tertiary-color));
  color: var(--bg-color);
  border-color: var(--section-accent, var(--tertiary-color));
  box-shadow: 0 8px 28px rgba(var(--section-accent-rgb, 118, 192, 70), 0.28);
}

.btn-cta-primary:hover {
  background-color: var(--secondary-color);
  border-color: var(--secondary-color);
  color: var(--text-color);
  transform: translateY(-2px);
  box-shadow: 0 12px 34px rgba(var(--section-accent-rgb, 118, 192, 70), 0.4);
}

.btn-cta-outline {
  background: transparent;
  color: var(--section-accent, var(--tertiary-color));
  border-color: var(--section-accent, var(--tertiary-color));
}

.btn-cta-outline:hover {
  background: rgba(var(--section-accent-rgb, 118, 192, 70), 0.12);
  transform: translateY(-2px);
}

.btn-cta-ghost {
  background: transparent;
  color: var(--primary-color);
  border-color: transparent;
  padding-inline: 0.85rem;
}

.btn-cta-ghost:hover {
  color: var(--section-accent, var(--tertiary-color));
}

.hero-social {
  display: flex;
  gap: 1.25rem;
  padding-top: 0.15rem;
}

.hero-social a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 44px;
  min-height: 44px;
  color: rgba(237, 238, 237, 0.7);
  font-size: 1.2rem;
  transition: color 0.3s ease, transform 0.2s ease;
}

.hero-social a:hover {
  color: var(--section-accent, var(--tertiary-color));
  transform: translateY(-2px);
}

/* Visual / Avatar */
.hero-visual {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 0;
}

.hero-visual__glow {
  position: absolute;
  width: 115%;
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(
    circle at 50% 45%,
    rgba(var(--section-accent-rgb, 118, 192, 70), 0.28) 0%,
    rgba(var(--section-accent-rgb, 118, 192, 70), 0.06) 42%,
    transparent 70%
  );
  filter: blur(6px);
  animation: hero-glow-pulse 6s ease-in-out infinite;
  pointer-events: none;
}

@keyframes hero-glow-pulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 0.85;
  }
  50% {
    transform: scale(1.06);
    opacity: 1;
  }
}

.perfil-wrapper {
  position: relative;
  z-index: 1;
}

.perfil-wrapper::before {
  content: '';
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--section-accent, var(--tertiary-color)), var(--secondary-color));
  z-index: 0;
}

.icon-perfil {
  position: relative;
  z-index: 1;
  width: clamp(190px, 22vw, 280px);
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 50%;
  border: 3px solid var(--bg-color);
  display: block;
}

.hero-float {
  position: absolute;
  z-index: 2;
  animation: hero-float-move 6s ease-in-out infinite;
}

.hero-float--exp {
  top: 8%;
  left: -4%;
  animation-delay: 0s;
}

.hero-float--projects {
  top: 18%;
  right: -6%;
  animation-delay: 1.4s;
}

.hero-float--stack {
  bottom: 16%;
  left: -8%;
  animation-delay: 2.1s;
}

@keyframes hero-float-move {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-9px);
  }
}

@media (max-width: 900px) {
  .hero {
    height: auto;
    overflow: visible;
  }

  .hero-inner {
    height: auto;
    padding-top: 4.75rem;
    justify-content: flex-start;
  }

  .hero-content {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: left;
  }

  .hero-visual {
    order: -1;
    margin-bottom: 0.5rem;
  }

  .hero-subheadline {
    max-width: none;
  }

  .hero-float--stack {
    display: none;
  }

  .hero-float--exp,
  .hero-float--projects {
    max-width: 46%;
  }

  .hero-float--exp {
    left: 0;
    top: 4%;
  }

  .hero-float--projects {
    right: 0;
    top: 4%;
  }
}

@media (max-width: 600px) {
  .hero-text {
    gap: 0.9rem;
  }

  .icon-perfil {
    width: clamp(150px, 42vw, 200px);
  }

  .hero-ctas .btn-cta-primary,
  .hero-ctas .btn-cta-outline {
    flex: 1 1 auto;
  }
}

@media (max-width: 480px) {
  .hero-ctas {
    flex-direction: column;
    align-items: stretch;
  }

  .hero-ctas .btn-cta {
    width: 100%;
  }
}

@media (max-height: 720px) and (min-width: 901px) {
  .hero-inner {
    padding-top: 4.5rem;
  }

  .hero-text {
    gap: 0.8rem;
  }

  .icon-perfil {
    width: clamp(170px, 18vw, 220px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .reveal {
    opacity: 1;
    transform: none;
    transition: none;
  }

  .hero-visual__glow,
  .hero-float {
    animation: none;
  }
}
</style>
