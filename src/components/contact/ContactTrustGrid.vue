<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from '@/i18n'
import { useReveal } from '@/composables/useReveal'

const { compact = false } = defineProps<{ compact?: boolean }>()

const { t, tm } = useI18n()
const { el, visible: revealVisible } = useReveal(0.12)
const visible = computed(() => compact || revealVisible.value)

const items = computed(() => {
  const list = tm.value('contact.trust')
  return Array.isArray(list) ? list : []
})
</script>

<template>
  <section
    ref="el"
    class="contact-trust"
    :class="{ 'is-visible': visible, 'contact-trust--compact': compact }"
    :aria-label="t('contact.trustTitle')"
  >
    <h3 v-if="!compact" class="contact-trust__title">{{ t('contact.trustTitle') }}</h3>
    <ul class="contact-trust__grid" role="list">
      <li v-for="item in items" :key="item" class="contact-trust__item">
        <span class="contact-trust__check" aria-hidden="true">✓</span>
        {{ item }}
      </li>
    </ul>
  </section>
</template>

<style scoped>
.contact-trust {
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.55s ease 0.1s, transform 0.55s ease 0.1s;
}

.contact-trust.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.contact-trust__title {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(237, 238, 237, 0.4);
  margin: 0 0 1rem;
}

.contact-trust__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 0.65rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.contact-trust__item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.65rem 0.85rem;
  border: 1px solid rgba(237, 238, 237, 0.1);
  border-radius: 0.5rem;
  background: rgba(255, 255, 255, 0.02);
  font-size: 0.78rem;
  font-weight: 500;
  color: rgba(237, 238, 237, 0.7);
  transition: border-color 0.2s ease, background 0.2s ease;
}

.contact-trust__item:hover {
  border-color: rgba(var(--section-accent-rgb, 118, 192, 70), 0.3);
  background: rgba(var(--section-accent-rgb, 118, 192, 70), 0.06);
}

.contact-trust__check {
  color: var(--section-accent, var(--tertiary-color));
  font-weight: 700;
  font-size: 0.85rem;
}

@media (prefers-reduced-motion: reduce) {
  .contact-trust {
    opacity: 1;
    transform: none;
    transition: none;
  }
}

.contact-trust--compact .contact-trust__grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.contact-trust--compact .contact-trust__item {
  padding: 0.3rem 0.55rem;
  font-size: 0.62rem;
  border-radius: 999px;
}

.contact-trust--compact .contact-trust__check {
  font-size: 0.7rem;
}
</style>
