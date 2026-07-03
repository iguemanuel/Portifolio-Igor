<script setup lang="ts">
import { computed } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useI18n } from '@/i18n'
import { useReveal } from '@/composables/useReveal'

const { compact = false } = defineProps<{ compact?: boolean }>()

const { t } = useI18n()
const { el, visible: revealVisible } = useReveal()
const visible = computed(() => compact || revealVisible.value)

const whatsappUrl = computed(() => {
  const message = encodeURIComponent(t.value('whatsapp.message'))
  return `https://wa.me/5542991583814?text=${message}`
})
</script>

<template>
  <header
    ref="el"
    class="contact-hero"
    :class="{ 'is-visible': visible, 'contact-hero--compact': compact }"
  >
    <div class="contact-hero__label">
      <span class="contact-hero__line" aria-hidden="true" />
      <span>{{ t('contact.sectionLabel') }}</span>
    </div>

    <h2 id="contact-headline" class="contact-hero__title" v-html="t('contact.headline')" />
    <p v-if="!compact" class="contact-hero__sub">{{ t('contact.subheadline') }}</p>
    <p v-else class="contact-hero__sub contact-hero__sub--compact">{{ t('contact.subheadline') }}</p>

    <div class="contact-hero__ctas">
      <a
        :href="whatsappUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="contact-cta contact-cta--primary"
      >
        <font-awesome-icon :icon="['fab', 'whatsapp']" aria-hidden="true" />
        <span>
          <strong>{{ t('contact.ctaWhatsapp') }}</strong>
          <small v-if="!compact">{{ t('contact.ctaWhatsappHint') }}</small>
        </span>
      </a>

      <a href="mailto:igor17emanuel@gmail.com" class="contact-cta contact-cta--secondary">
        <font-awesome-icon :icon="['fas', 'envelope']" aria-hidden="true" />
        <span>
          <strong>{{ t('contact.ctaEmail') }}</strong>
          <small v-if="!compact">{{ t('contact.ctaEmailHint') }}</small>
        </span>
      </a>
    </div>
  </header>
</template>

<style scoped>
.contact-hero {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}

.contact-hero.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.contact-hero__label {
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

.contact-hero__line {
  width: 2.5rem;
  height: 2px;
  background: var(--section-accent, var(--tertiary-color));
}

.contact-hero__title {
  font-family: var(--font-family-secondary);
  font-size: clamp(1.75rem, 3.5vw, 2.75rem);
  font-weight: 700;
  line-height: 1.2;
  color: var(--text-color);
  margin: 0 0 1rem;
  max-width: 18ch;
}

.contact-hero__title :deep(em) {
  color: var(--section-accent, var(--tertiary-color));
  font-style: normal;
}

.contact-hero__sub {
  font-size: 1rem;
  line-height: 1.75;
  color: var(--section-text-muted, rgba(237, 238, 237, 0.6));
  margin: 0 0 2rem;
  max-width: 52ch;
}

.contact-hero__ctas {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.contact-cta {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.5rem;
  border-radius: 0.75rem;
  text-decoration: none;
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
  min-width: min(100%, 280px);
}

.contact-cta svg {
  font-size: 1.35rem;
  flex-shrink: 0;
}

.contact-cta span {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  text-align: left;
}

.contact-cta strong {
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 0.02em;
}

.contact-cta small {
  font-size: 0.72rem;
  font-weight: 400;
  opacity: 0.75;
}

.contact-cta--primary {
  background: var(--section-accent, var(--tertiary-color));
  color: var(--bg-color);
  box-shadow: 0 4px 24px rgba(var(--section-accent-rgb, 118, 192, 70), 0.3);
}

.contact-cta--primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(var(--section-accent-rgb, 118, 192, 70), 0.45);
  color: var(--bg-color);
}

.contact-cta--secondary {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(237, 238, 237, 0.15);
  color: var(--text-color);
}

.contact-cta--secondary:hover {
  transform: translateY(-2px);
  border-color: rgba(var(--section-accent-rgb, 118, 192, 70), 0.45);
  box-shadow: 0 0 24px rgba(var(--section-accent-rgb, 118, 192, 70), 0.12);
  color: var(--text-color);
}

@media (prefers-reduced-motion: reduce) {
  .contact-hero {
    opacity: 1;
    transform: none;
    transition: none;
  }
}

.contact-hero--compact .contact-hero__label {
  margin-bottom: 0.5rem;
  font-size: 0.62rem;
}

.contact-hero--compact .contact-hero__line {
  width: 1.75rem;
}

.contact-hero--compact .contact-hero__title {
  font-size: clamp(1.5rem, 2.5vw, 2rem);
  margin-bottom: 0.4rem;
  max-width: none;
  line-height: 1.15;
}

.contact-hero--compact .contact-hero__sub--compact {
  font-size: 0.78rem;
  line-height: 1.5;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.contact-hero--compact .contact-hero__ctas {
  gap: 0.65rem;
}

.contact-hero--compact .contact-cta {
  padding: 0.7rem 1rem;
  min-width: 0;
  flex: 1;
  gap: 0.65rem;
}

.contact-hero--compact .contact-cta svg {
  font-size: 1.1rem;
}

.contact-hero--compact .contact-cta strong {
  font-size: 0.8rem;
}

.contact-hero--compact .contact-cta span {
  flex-direction: row;
  align-items: center;
}
</style>
