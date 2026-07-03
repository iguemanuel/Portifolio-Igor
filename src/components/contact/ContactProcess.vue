<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from '@/i18n'
import { useReveal } from '@/composables/useReveal'

const { compact = false } = defineProps<{ compact?: boolean }>()

const { t, tm } = useI18n()
const { el, visible: revealVisible } = useReveal(0.12)
const visible = computed(() => compact || revealVisible.value)

type ProcessStep = { step: string; title: string; desc: string }

const steps = computed((): ProcessStep[] => {
  const list = tm.value('contact.process')
  if (!Array.isArray(list)) return []
  return list as unknown as ProcessStep[]
})
</script>

<template>
  <section
    ref="el"
    class="contact-process"
    :class="{ 'is-visible': visible, 'contact-process--compact': compact }"
    :aria-label="t('contact.processTitle')"
  >
    <h3 v-if="!compact" class="contact-process__title">{{ t('contact.processTitle') }}</h3>

    <ol class="contact-process__steps" role="list">
      <li
        v-for="(step, i) in steps"
        :key="step.step"
        class="contact-process__step"
        :style="{ '--i': i }"
      >
        <span class="contact-process__num">{{ step.step }}</span>
        <div class="contact-process__content">
          <strong>{{ step.title }}</strong>
          <span v-if="!compact">{{ step.desc }}</span>
        </div>
        <span v-if="i < steps.length - 1" class="contact-process__arrow" aria-hidden="true">↓</span>
      </li>
    </ol>
  </section>
</template>

<style scoped>
.contact-process {
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.55s ease 0.15s, transform 0.55s ease 0.15s;
}

.contact-process.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.contact-process__title {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(237, 238, 237, 0.4);
  margin: 0 0 1.25rem;
}

.contact-process__steps {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.contact-process__step {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  padding: 1.15rem 1rem;
  border: 1px solid rgba(237, 238, 237, 0.1);
  border-radius: 0.75rem;
  background: rgba(255, 255, 255, 0.02);
  transition: border-color 0.25s ease, transform 0.25s ease;
}

.contact-process__step:hover {
  border-color: rgba(var(--section-accent-rgb, 118, 192, 70), 0.35);
  transform: translateY(-2px);
}

.contact-process__num {
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: var(--section-accent, var(--tertiary-color));
}

.contact-process__content {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.contact-process__content strong {
  font-size: 0.88rem;
  font-weight: 700;
  color: var(--text-color);
  line-height: 1.3;
}

.contact-process__content span {
  font-size: 0.74rem;
  line-height: 1.5;
  color: rgba(237, 238, 237, 0.5);
}

.contact-process__arrow {
  display: none;
}

@media (max-width: 900px) {
  .contact-process__steps {
    grid-template-columns: 1fr;
  }

  .contact-process__arrow {
    display: block;
    text-align: center;
    color: rgba(var(--section-accent-rgb, 118, 192, 70), 0.4);
    font-size: 1rem;
    margin-top: 0.25rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .contact-process {
    opacity: 1;
    transform: none;
    transition: none;
  }
}

.contact-process--compact .contact-process__steps {
  gap: 0.4rem;
}

.contact-process--compact .contact-process__step {
  padding: 0.55rem 0.45rem;
  gap: 0.25rem;
}

.contact-process--compact .contact-process__num {
  font-size: 0.58rem;
}

.contact-process--compact .contact-process__content strong {
  font-size: 0.62rem;
  line-height: 1.25;
}
</style>
