<script setup lang="ts">
import { computed } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useI18n } from '@/i18n'
import { useReveal } from '@/composables/useReveal'

const { compact = false } = defineProps<{ compact?: boolean }>()

const { t } = useI18n()
const { el, visible: revealVisible } = useReveal(0.12)
const visible = computed(() => compact || revealVisible.value)

const whatsappUrl = computed(() => {
  const message = encodeURIComponent(t.value('whatsapp.message'))
  return `https://wa.me/5542991583814?text=${message}`
})
</script>

<template>
  <section
    ref="el"
    class="contact-channels"
    :class="{ 'is-visible': visible, 'contact-channels--compact': compact }"
    :aria-label="t('contact.channelsTitle')"
  >
    <h3 v-if="!compact" class="contact-channels__title">{{ t('contact.channelsTitle') }}</h3>

    <div class="contact-channels__grid">
      <a href="mailto:igor17emanuel@gmail.com" class="contact-channel">
        <span class="contact-channel__icon">
          <font-awesome-icon :icon="['fas', 'envelope']" aria-hidden="true" />
        </span>
        <span class="contact-channel__body">
          <strong>{{ t('contact.emailLabel') }}</strong>
          <small>{{ t('contact.emailHint') }}</small>
          <span class="contact-channel__value">{{ t('contact.emailValue') }}</span>
        </span>
      </a>

      <a
        :href="whatsappUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="contact-channel contact-channel--highlight"
      >
        <span class="contact-channel__icon">
          <font-awesome-icon :icon="['fab', 'whatsapp']" aria-hidden="true" />
        </span>
        <span class="contact-channel__body">
          <strong>{{ t('contact.whatsappLabel') }}</strong>
          <small>{{ t('contact.whatsappHint') }}</small>
          <span class="contact-channel__value">{{ t('contact.whatsappValue') }}</span>
        </span>
      </a>

      <div class="contact-channel contact-channel--static">
        <span class="contact-channel__icon">
          <font-awesome-icon :icon="['fas', 'earth-americas']" aria-hidden="true" />
        </span>
        <span class="contact-channel__body">
          <strong>{{ t('contact.locationLabel') }}</strong>
          <small>{{ t('contact.locationHint') }}</small>
          <span class="contact-channel__value">{{ t('contact.locationValue') }}</span>
        </span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact-channels {
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.55s ease 0.2s, transform 0.55s ease 0.2s;
}

.contact-channels.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.contact-channels__title {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(237, 238, 237, 0.4);
  margin: 0 0 1rem;
}

.contact-channels__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.85rem;
}

.contact-channel {
  display: flex;
  gap: 1rem;
  padding: 1.15rem 1.1rem;
  border: 1px solid rgba(237, 238, 237, 0.12);
  border-radius: 0.75rem;
  background: rgba(255, 255, 255, 0.03);
  text-decoration: none;
  transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
}

.contact-channel:hover {
  transform: translateY(-2px);
  border-color: rgba(var(--section-accent-rgb, 118, 192, 70), 0.4);
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.25);
}

.contact-channel--highlight {
  border-color: rgba(var(--section-accent-rgb, 118, 192, 70), 0.25);
  background: rgba(var(--section-accent-rgb, 118, 192, 70), 0.06);
}

.contact-channel--static {
  cursor: default;
}

.contact-channel__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  flex-shrink: 0;
  border-radius: 0.5rem;
  background: rgba(var(--section-accent-rgb, 118, 192, 70), 0.12);
  color: var(--section-accent, var(--tertiary-color));
  font-size: 1.1rem;
}

.contact-channel__body {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  min-width: 0;
}

.contact-channel__body strong {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--text-color);
}

.contact-channel__body small {
  font-size: 0.68rem;
  color: rgba(237, 238, 237, 0.45);
}

.contact-channel__value {
  font-size: 0.78rem;
  color: var(--primary-color);
  margin-top: 0.15rem;
  word-break: break-word;
}

@media (max-width: 768px) {
  .contact-channels__grid {
    grid-template-columns: 1fr;
  }
}

@media (prefers-reduced-motion: reduce) {
  .contact-channels {
    opacity: 1;
    transform: none;
    transition: none;
  }
}

.contact-channels--compact .contact-channels__grid {
  grid-template-columns: repeat(3, 1fr);
  gap: 0.4rem;
}

.contact-channels--compact .contact-channel {
  flex-direction: column;
  align-items: flex-start;
  gap: 0.35rem;
  padding: 0.55rem 0.6rem;
}

.contact-channels--compact .contact-channel__icon {
  width: 1.75rem;
  height: 1.75rem;
  font-size: 0.85rem;
}

.contact-channels--compact .contact-channel__body strong {
  font-size: 0.65rem;
}

.contact-channels--compact .contact-channel__body small {
  display: none;
}

.contact-channels--compact .contact-channel__value {
  font-size: 0.6rem;
  margin-top: 0;
}
</style>
