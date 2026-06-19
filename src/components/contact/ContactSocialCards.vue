<script setup lang="ts">
import { computed } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useI18n } from '@/i18n'
import { useReveal } from '@/composables/useReveal'

const { compact = false } = defineProps<{ compact?: boolean }>()

const { t } = useI18n()
const { el, visible: revealVisible } = useReveal(0.12)
const visible = computed(() => compact || revealVisible.value)

const networks = [
  {
    key: 'linkedin',
    href: 'https://www.linkedin.com/in/igor-emanuel-roque/',
    icon: ['fab', 'linkedin'] as const,
  },
  {
    key: 'github',
    href: 'https://github.com/iguemanuel',
    icon: ['fab', 'github'] as const,
  },
  {
    key: 'instagram',
    href: 'https://www.instagram.com/iguemanuel/',
    icon: ['fab', 'instagram'] as const,
  },
] as const
</script>

<template>
  <section
    ref="el"
    class="contact-social"
    :class="{ 'is-visible': visible, 'contact-social--compact': compact }"
    :aria-label="t('contact.socialTitle')"
  >
    <h3 v-if="!compact" class="contact-social__title">{{ t('contact.socialTitle') }}</h3>

    <div class="contact-social__grid">
      <a
        v-for="net in networks"
        :key="net.key"
        :href="net.href"
        target="_blank"
        rel="noopener noreferrer"
        class="contact-social__card"
      >
        <span class="contact-social__icon">
          <font-awesome-icon :icon="net.icon" aria-hidden="true" />
        </span>
        <span class="contact-social__body">
          <strong>{{ t(`contact.social.${net.key}.title`) }}</strong>
          <span v-if="!compact">{{ t(`contact.social.${net.key}.desc`) }}</span>
        </span>
        <span v-if="!compact" class="contact-social__arrow" aria-hidden="true">→</span>
      </a>
    </div>
  </section>
</template>

<style scoped>
.contact-social {
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.55s ease 0.25s, transform 0.55s ease 0.25s;
}

.contact-social.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.contact-social__title {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(237, 238, 237, 0.4);
  margin: 0 0 1rem;
}

.contact-social__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.85rem;
}

.contact-social__card {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 1rem 1.1rem;
  border: 1px solid rgba(237, 238, 237, 0.12);
  border-radius: 0.75rem;
  background: rgba(255, 255, 255, 0.02);
  text-decoration: none;
  transition: transform 0.25s ease, border-color 0.25s ease, background 0.25s ease;
}

.contact-social__card:hover {
  transform: translateY(-2px);
  border-color: rgba(var(--section-accent-rgb, 118, 192, 70), 0.4);
  background: rgba(var(--section-accent-rgb, 118, 192, 70), 0.05);
}

.contact-social__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  flex-shrink: 0;
  font-size: 1.15rem;
  color: var(--section-accent, var(--tertiary-color));
}

.contact-social__body {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  flex: 1;
  min-width: 0;
}

.contact-social__body strong {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--text-color);
}

.contact-social__body span {
  font-size: 0.72rem;
  line-height: 1.4;
  color: rgba(237, 238, 237, 0.5);
}

.contact-social__arrow {
  color: rgba(237, 238, 237, 0.25);
  font-size: 0.9rem;
  transition: color 0.2s ease, transform 0.2s ease;
}

.contact-social__card:hover .contact-social__arrow {
  color: var(--section-accent, var(--tertiary-color));
  transform: translateX(3px);
}

@media (max-width: 768px) {
  .contact-social__grid {
    grid-template-columns: 1fr;
  }
}

@media (prefers-reduced-motion: reduce) {
  .contact-social {
    opacity: 1;
    transform: none;
    transition: none;
  }
}

.contact-social--compact .contact-social__grid {
  grid-template-columns: repeat(3, 1fr);
  gap: 0.4rem;
}

.contact-social--compact .contact-social__card {
  padding: 0.45rem 0.55rem;
  gap: 0.45rem;
}

.contact-social--compact .contact-social__icon {
  width: 1.5rem;
  height: 1.5rem;
  font-size: 0.95rem;
}

.contact-social--compact .contact-social__body strong {
  font-size: 0.62rem;
}
</style>
