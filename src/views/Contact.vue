<script setup lang="ts">
import { computed } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useI18n } from '@/i18n'
import { useReveal } from '@/composables/useReveal'
import ContactFormComponent from '@/components/ContactFormComponent.vue'

const { t, tm } = useI18n()
const { el, visible } = useReveal(0.12)

const benefits = computed(() => {
  const list = tm.value('contact.benefits')
  return Array.isArray(list) ? list : []
})

const whatsappUrl = computed(() => {
  const message = encodeURIComponent(t.value('whatsapp.message'))
  return `https://wa.me/5542991583814?text=${message}`
})

const scrollToForm = () => {
  const formEl = document.getElementById('contact-form-card')
  formEl?.scrollIntoView({ behavior: 'smooth', block: 'center' })
}
</script>

<template>
  <div ref="el" class="contact-section" :class="{ 'is-revealed': visible }">
    <div class="contact-section__grid">
      <!-- LEFT: Text + Benefits + Buttons -->
      <div class="contact-section__intro">
        <div class="contact-section__label reveal" style="--i: 0">
          <span class="contact-section__label-line" aria-hidden="true"></span>
          <span>{{ t('contact.sectionLabel') }}</span>
        </div>

        <h2 class="contact-section__title reveal" style="--i: 1" v-html="t('contact.headline')" />

        <p class="contact-section__sub reveal" style="--i: 2">{{ t('contact.subheadline') }}</p>

        <!-- Benefits -->
        <ul class="contact-section__benefits reveal" style="--i: 3" role="list">
          <li v-for="(benefit, idx) in benefits" :key="idx" class="contact-section__benefit">
            <span class="contact-section__benefit-check" aria-hidden="true">✓</span>
            <span>{{ benefit }}</span>
          </li>
        </ul>

        <!-- CTA Buttons -->
        <div class="contact-section__ctas reveal" style="--i: 4">
          <a
            :href="whatsappUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="contact-cta contact-cta--primary"
          >
            <font-awesome-icon :icon="['fab', 'whatsapp']" aria-hidden="true" />
            <span>{{ t('contact.ctaWhatsapp') }}</span>
          </a>

          <button class="contact-cta contact-cta--secondary" @click="scrollToForm">
            <font-awesome-icon :icon="['fas', 'paper-plane']" aria-hidden="true" />
            <span>{{ t('contact.ctaProposal') }}</span>
          </button>
        </div>

        <!-- Quick links -->
        <div class="contact-section__quick reveal" style="--i: 5">
          <a href="mailto:igor17emanuel@gmail.com" class="contact-section__quick-item">
            <font-awesome-icon :icon="['fas', 'envelope']" aria-hidden="true" />
            <span>{{ t('contact.emailValue') }}</span>
          </a>
          <span class="contact-section__quick-item contact-section__quick-item--static">
            <font-awesome-icon :icon="['fas', 'earth-americas']" aria-hidden="true" />
            <span>{{ t('contact.locationValue') }}</span>
          </span>
        </div>
      </div>

      <!-- RIGHT: Premium Form Card -->
      <div class="contact-section__form-wrap reveal" style="--i: 3">
        <ContactFormComponent id="contact-form-card" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.contact-section {
  width: min(var(--site-width), var(--site-max-width));
  margin: 0 auto;
  height: 100%;
  min-height: 0;
  padding: 4rem 0 2rem;
  box-sizing: border-box;
  display: flex;
  align-items: center;
}

.contact-section__grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr);
  gap: clamp(2.5rem, 5vw, 5rem);
  width: 100%;
  align-items: center;
}

.contact-section__intro {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 0;
}

.contact-section__form-wrap {
  align-self: center;
  width: 100%;
}

/* ─── Reveal stagger ─── */
.reveal {
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: calc(var(--i, 0) * 100ms);
}

.is-revealed .reveal {
  opacity: 1;
  transform: translateY(0);
}

/* ─── Section label ─── */
.contact-section__label {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.28em;
  text-transform: lowercase;
  color: var(--section-accent, var(--tertiary-color));
}

.contact-section__label-line {
  width: 2.5rem;
  height: 2px;
  background: var(--section-accent, var(--tertiary-color));
}

/* ─── Title ─── */
.contact-section__title {
  font-family: var(--font-family-secondary);
  font-size: clamp(1.5rem, 2.8vw, 2.35rem);
  font-weight: 700;
  line-height: 1.25;
  color: var(--text-color);
  margin: 0 0 1rem;
  max-width: 20ch;
}

.contact-section__title :deep(em) {
  color: var(--section-accent, var(--tertiary-color));
  font-style: normal;
}

/* ─── Subtitle ─── */
.contact-section__sub {
  font-size: 0.92rem;
  line-height: 1.75;
  color: rgba(237, 238, 237, 0.6);
  margin: 0 0 1.5rem;
  max-width: 48ch;
}

/* ─── Benefits ─── */
.contact-section__benefits {
  list-style: none;
  margin: 0 0 1.75rem;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.contact-section__benefit {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-family: var(--font-family);
  font-size: 0.85rem;
  color: rgba(237, 238, 237, 0.75);
}

.contact-section__benefit-check {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: rgba(118, 192, 70, 0.12);
  color: var(--tertiary-color);
  font-size: 0.65rem;
  font-weight: 700;
  flex-shrink: 0;
}

/* ─── CTAs ─── */
.contact-section__ctas {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1.75rem;
}

.contact-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.75rem 1.35rem;
  border-radius: 0.6rem;
  text-decoration: none;
  font-family: var(--font-family);
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
  border: none;
}

.contact-cta svg {
  font-size: 1.1rem;
  flex-shrink: 0;
}

.contact-cta--primary {
  background: var(--section-accent, var(--tertiary-color));
  color: var(--bg-color);
  box-shadow: 0 4px 20px rgba(118, 192, 70, 0.3);
}

.contact-cta--primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 28px rgba(118, 192, 70, 0.45);
  color: var(--bg-color);
}

.contact-cta--secondary {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(237, 238, 237, 0.15);
  color: var(--text-color);
}

.contact-cta--secondary:hover {
  transform: translateY(-2px);
  border-color: rgba(118, 192, 70, 0.4);
  box-shadow: 0 0 20px rgba(118, 192, 70, 0.1);
  color: var(--text-color);
}

/* ─── Quick links ─── */
.contact-section__quick {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.contact-section__quick-item {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  font-size: 0.75rem;
  color: rgba(237, 238, 237, 0.55);
  text-decoration: none;
  transition: color 0.2s ease;
}

a.contact-section__quick-item:hover {
  color: var(--section-accent, var(--tertiary-color));
}

.contact-section__quick-item svg {
  width: 0.85rem;
  color: var(--section-accent, var(--tertiary-color));
  flex-shrink: 0;
}

.contact-section__quick-item--static {
  cursor: default;
}

/* ─── Responsive ─── */
@media (max-width: 900px) {
  .contact-section {
    height: auto;
    min-height: calc(100vh - 4rem);
    align-items: flex-start;
    padding-bottom: 2.5rem;
  }

  .contact-section__grid {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }

  .contact-section__title {
    max-width: none;
  }

  .contact-section__sub {
    max-width: none;
  }
}

@media (max-height: 720px) and (min-width: 901px) {
  .contact-section {
    padding-top: 3.5rem;
    padding-bottom: 1rem;
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
