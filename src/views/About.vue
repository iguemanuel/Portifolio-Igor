<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from '@/i18n'
import { useReveal } from '@/composables/useReveal'

const { t, tm } = useI18n()
const { el, visible } = useReveal(0.15)

const tags = computed(() => {
  const list = tm.value('about.tags')
  return Array.isArray(list) ? list : []
})

interface AboutIndicator {
  icon: string
  label: string
}

const indicators = computed<AboutIndicator[]>(() => {
  const list = tm.value('about.indicators')
  if (!Array.isArray(list)) return []
  return list as unknown as AboutIndicator[]
})
</script>

<template>
  <section ref="el" class="about-premium" :class="{ 'is-revealed': visible }" aria-labelledby="about-headline">
    <div class="about-premium__inner site-shell">
      <div class="about-premium__grid">

        <!-- LEFT: Photo Card -->
        <div class="about-premium__visual reveal" style="--i: 0">
          <div class="about-premium__photo-card">
            <div class="about-premium__photo-wrap">
              <img
                src="/img/perfiligor.png"
                :alt="t('about.photoAlt')"
                class="about-premium__photo"
                loading="lazy"
              />
            </div>
            <div class="about-premium__card-info">
              <span class="about-premium__card-name">Igor Emanuel</span>
              <span class="about-premium__card-role">{{ t('about.cardRole') }}</span>
            </div>
          </div>
        </div>

        <!-- RIGHT: Content -->
        <div class="about-premium__content">
          <div class="about-premium__indicator reveal" style="--i: 1">
            <span class="about-premium__indicator-line" aria-hidden="true"></span>
            <span class="about-premium__indicator-label">{{ t('about.sectionLabel') }}</span>
          </div>

          <h2 id="about-headline" class="about-premium__headline reveal" style="--i: 2" v-html="t('about.headline')"></h2>

          <p class="about-premium__support reveal" style="--i: 3">{{ t('about.support') }}</p>

          <p class="about-premium__support-secondary reveal" style="--i: 4">{{ t('about.supportSecondary') }}</p>

          <!-- Indicators -->
          <div class="about-premium__indicators reveal" style="--i: 5">
            <div v-for="(indicator, idx) in indicators" :key="idx" class="about-premium__indicator-item">
              <span class="about-premium__indicator-icon" aria-hidden="true">{{ indicator.icon }}</span>
              <span class="about-premium__indicator-text">{{ indicator.label }}</span>
            </div>
          </div>

          <!-- Tech Badges -->
          <ul class="about-premium__tags reveal" style="--i: 6" role="list">
            <li v-for="tag in tags" :key="tag" class="about-premium__tag">{{ tag }}</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-premium {
  --about-accent: var(--tertiary-color);
  --about-accent-rgb: 118, 192, 70;
  --about-text: var(--text-color);
  --about-muted: rgba(237, 238, 237, 0.65);
  --about-muted-secondary: rgba(237, 238, 237, 0.45);
  --about-border: rgba(118, 192, 70, 0.2);

  position: relative;
  width: 100%;
  height: 100%;
  min-height: 0;
  background: transparent;
  display: flex;
  align-items: center;
  padding: 5rem 0 1.5rem;
  box-sizing: border-box;
  overflow: hidden;
}

.about-premium__inner {
  height: 100%;
  max-height: 100%;
  min-height: 0;
  display: flex;
  align-items: center;
}

.about-premium__grid {
  display: grid;
  grid-template-columns: minmax(0, 3fr) minmax(0, 7fr);
  gap: clamp(2rem, 3.5vw, 3.5rem);
  align-items: center;
  width: 100%;
  height: 100%;
  min-height: 0;
}

/* ─── Reveal stagger ─── */
.reveal {
  opacity: 0;
  transform: translateY(22px);
  transition:
    opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: calc(var(--i, 0) * 100ms);
}

.is-revealed .reveal {
  opacity: 1;
  transform: translateY(0);
}

/* ─── Photo Card ─── */
.about-premium__content {
  display: flex;
  flex-direction: column;
  gap: clamp(0.65rem, 1.2vh, 1rem);
  justify-content: center;
  min-height: 0;
  min-width: 0;
  width: 100%;
  overflow: hidden;
}

.about-premium__visual {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  min-height: 0;
  height: 100%;
  width: 100%;
}

.about-premium__photo-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(118, 192, 70, 0.12);
  border-radius: 16px;
  overflow: hidden;
  box-shadow:
    0 4px 24px rgba(0, 0, 0, 0.3),
    0 0 40px rgba(118, 192, 70, 0.04);
  transition: box-shadow 0.4s ease, border-color 0.4s ease;
  width: 100%;
  max-height: 100%;
  display: flex;
  flex-direction: column;
}

.about-premium__photo-card:hover {
  border-color: rgba(118, 192, 70, 0.25);
  box-shadow:
    0 8px 36px rgba(0, 0, 0, 0.35),
    0 0 56px rgba(118, 192, 70, 0.08);
}

.about-premium__photo-wrap {
  position: relative;
  overflow: hidden;
  aspect-ratio: 4 / 4.5;
  flex: 1 1 auto;
  min-height: 0;
  max-height: min(44vh, 400px);
}

.about-premium__photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 18%;
  display: block;
  transform: scale(1.06);
  transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}

.about-premium__photo-card:hover .about-premium__photo {
  transform: scale(1.1);
}

.about-premium__card-info {
  padding: 0.9rem 1.1rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  flex-shrink: 0;
}

.about-premium__card-name {
  font-family: var(--font-family-secondary);
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--about-text);
  letter-spacing: -0.01em;
}

.about-premium__card-role {
  font-family: var(--font-family);
  font-size: 0.78rem;
  font-weight: 500;
  color: var(--about-accent);
  letter-spacing: 0.04em;
}

/* ─── Section indicator ─── */
.about-premium__indicator {
  display: flex;
  align-items: center;
  gap: 0.85rem;
}

.about-premium__indicator-line {
  display: block;
  width: 2.5rem;
  height: 2px;
  background: var(--about-accent);
  flex-shrink: 0;
}

.about-premium__indicator-label {
  font-family: var(--font-family);
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.28em;
  text-transform: lowercase;
  color: var(--about-accent);
}

/* ─── Headline ─── */
.about-premium__headline {
  font-family: var(--font-family-secondary);
  font-size: clamp(1.35rem, 2.5vw, 2.1rem);
  font-weight: 700;
  line-height: 1.22;
  color: var(--about-text);
  margin: 0.25rem 0 0;
  max-width: none;
}

.about-premium__headline :deep(em),
.about-premium__headline :deep(strong) {
  color: var(--about-accent);
  font-weight: 700;
  font-style: normal;
}

/* ─── Support text ─── */
.about-premium__support {
  font-family: var(--font-family);
  font-size: clamp(0.82rem, 1.05vw, 0.92rem);
  line-height: 1.65;
  color: var(--about-muted);
  margin: 0.15rem 0 0;
  max-width: none;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.about-premium__support-secondary {
  font-family: var(--font-family);
  font-size: clamp(0.74rem, 0.95vw, 0.82rem);
  line-height: 1.55;
  color: var(--about-muted-secondary);
  margin: 0;
  max-width: none;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* ─── Indicators grid ─── */
.about-premium__indicators {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1rem;
  margin-top: 0.15rem;
}

.about-premium__indicator-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-family);
  font-size: 0.78rem;
  font-weight: 500;
  color: rgba(237, 238, 237, 0.7);
  letter-spacing: 0.02em;
}

.about-premium__indicator-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 5px;
  background: rgba(118, 192, 70, 0.1);
  border: 1px solid rgba(118, 192, 70, 0.15);
  font-size: 0.7rem;
  color: var(--about-accent);
  flex-shrink: 0;
}

/* ─── Tech badges ─── */
.about-premium__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  list-style: none;
  margin: 0.15rem 0 0;
  padding: 0;
}

.about-premium__tag {
  font-family: var(--font-family);
  font-size: 0.58rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(237, 238, 237, 0.5);
  border: 1px solid var(--about-border);
  border-radius: 999px;
  padding: 0.32rem 0.65rem;
  transition: border-color 0.25s ease, color 0.25s ease, background 0.25s ease;
}

.about-premium__tag:hover {
  border-color: rgba(118, 192, 70, 0.45);
  color: var(--about-accent);
  background: rgba(118, 192, 70, 0.06);
}

/* ─── Responsive ─── */
@media (max-height: 760px) {
  .about-premium {
    padding-top: 4.5rem;
    padding-bottom: 1rem;
  }

  .about-premium__photo-wrap {
    max-height: min(34vh, 240px);
  }

  .about-premium__support {
    -webkit-line-clamp: 3;
  }

  .about-premium__support-secondary {
    -webkit-line-clamp: 1;
  }
}

@media (max-width: 900px) {
  .about-premium {
    padding: 4.5rem 0 1.25rem;
    align-items: stretch;
    overflow-y: auto;
  }

  .about-premium__inner {
    height: auto;
    max-height: none;
  }

  .about-premium__grid {
    grid-template-columns: 1fr;
    gap: 1.25rem;
    height: auto;
  }

  .about-premium__content {
    overflow: visible;
  }

  .about-premium__visual {
    order: -1;
    height: auto;
  }

  .about-premium__photo-card {
    max-width: min(280px, 100%);
    margin-inline: auto;
  }

  .about-premium__photo-wrap {
    aspect-ratio: 4 / 3.5;
    max-height: 260px;
  }

  .about-premium__photo {
    object-position: center 22%;
    transform: scale(1.08);
  }

  .about-premium__support,
  .about-premium__support-secondary {
    max-width: none;
    -webkit-line-clamp: unset;
    overflow: visible;
    display: block;
  }

  .about-premium__headline {
    max-width: none;
  }
}

@media (max-width: 600px) {
  .about-premium__photo-card {
    max-width: min(200px, 72vw);
  }

  .about-premium__indicators {
    gap: 0.5rem 0.75rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .reveal {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>
