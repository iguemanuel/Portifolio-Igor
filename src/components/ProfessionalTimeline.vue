<script setup lang="ts">
import { computed } from 'vue'
import { careerItemCount, careerMeta } from '@/db/Skills'
import { useI18n } from '@/i18n'
import { useReveal } from '@/composables/useReveal'
import TimelineNode from './TimelineNode.vue'

const { t, tm } = useI18n()
const { el, visible } = useReveal()

// Exibe do mais antigo (esquerda) ao mais recente (direita): passado → presente.
const orderedIndices = computed(() =>
  Array.from({ length: careerItemCount }, (_, i) => careerItemCount - 1 - i),
)

const getHighlights = (index: number): string[] => {
  const list = tm.value(`career.timeline.${index}.highlights`)
  return Array.isArray(list) ? list : []
}

const getStack = (index: number): string[] => {
  const raw = t.value(`career.timeline.${index}.stack`)
  return raw && raw.includes(',') ? raw.split(', ') : raw ? [raw] : []
}
</script>

<template>
  <section
    ref="el"
    class="timeline"
    :class="{ 'is-visible': visible }"
    :style="{ '--count': careerItemCount }"
    :aria-label="t('career.title')"
  >
    <ol class="timeline__rail" role="list">
      <TimelineNode
        v-for="(index, pos) in orderedIndices"
        :key="index"
        :index="pos"
        :revealed="visible"
        :period="t(`career.timeline.${index}.period`)"
        :role="t(`career.timeline.${index}.role`)"
        :company="t(`career.timeline.${index}.company`)"
        :impact="t(`career.timeline.${index}.impact`)"
        :highlights="getHighlights(index)"
        :stack="getStack(index)"
        :current="careerMeta[index]?.current"
        :education="careerMeta[index]?.kind === 'education'"
      />
    </ol>
  </section>
</template>

<style scoped>
.timeline {
  --marker: 16px;
  position: relative;
  width: 100%;
  margin: 0 auto;
  padding: clamp(1.25rem, 2vw, 2rem);
  border: 1px solid rgba(var(--section-accent-rgb, 118, 192, 70), 0.2);
  border-radius: 1.25rem;
  background: rgba(0, 0, 0, 0.25);
  box-sizing: border-box;
}

.timeline__rail {
  position: relative;
  display: grid;
  grid-template-columns: repeat(var(--count, 5), minmax(0, 1fr));
  gap: clamp(0.75rem, 1.2vw, 1.25rem);
  align-items: stretch;
  list-style: none;
  margin: 0;
  padding: 0;
}

/* trilho base — do centro do 1º ao centro do último marker */
.timeline__rail::before,
.timeline__rail::after {
  content: '';
  position: absolute;
  top: calc(var(--marker) / 2 - 1px);
  left: calc(100% / var(--count, 5) / 2);
  right: calc(100% / var(--count, 5) / 2);
  height: 2px;
  border-radius: 2px;
  pointer-events: none;
}

.timeline__rail::before {
  background: rgba(var(--section-accent-rgb, 118, 192, 70), 0.18);
}

/* trilho preenchido (verde) — "desenha" a carreira ao entrar na viewport */
.timeline__rail::after {
  background: linear-gradient(
    90deg,
    rgba(var(--section-accent-rgb, 118, 192, 70), 0.45),
    var(--section-accent, #76c046)
  );
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 1s cubic-bezier(0.22, 1, 0.36, 1);
  box-shadow: 0 0 12px rgba(var(--section-accent-rgb, 118, 192, 70), 0.4);
}

.timeline.is-visible .timeline__rail::after {
  transform: scaleX(1);
}

/* ── Layout vertical (tablet / mobile): trilho à esquerda ── */
@media (max-width: 1023px) {
  .timeline__rail {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .timeline__rail::before,
  .timeline__rail::after {
    top: 0;
    bottom: 0;
    left: calc(var(--marker) / 2 - 1px);
    right: auto;
    width: 2px;
    height: auto;
  }

  .timeline__rail::after {
    background: linear-gradient(
      180deg,
      rgba(var(--section-accent-rgb, 118, 192, 70), 0.45),
      var(--section-accent, #76c046)
    );
    transform: scaleY(0);
    transform-origin: top center;
  }

  .timeline.is-visible .timeline__rail::after {
    transform: scaleY(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .timeline__rail::after {
    transition: none;
  }
}
</style>
