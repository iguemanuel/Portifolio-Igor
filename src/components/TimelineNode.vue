<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from '@/i18n'

defineProps<{
  index: number
  period: string
  role: string
  company: string
  impact: string
  highlights: string[]
  stack: string[]
  current?: boolean
  education?: boolean
  revealed?: boolean
}>()

const { t } = useI18n()
const expanded = ref(false)
const COLLAPSED = 2
</script>

<template>
  <li
    class="tnode"
    :class="{ 'is-current': current, 'is-edu': education, 'is-revealed': revealed }"
    :style="{ '--delay': `${index * 90}ms` }"
  >
    <span class="tnode__marker" aria-hidden="true" />

    <article class="tnode__card" tabindex="0" :aria-current="current ? 'true' : undefined">
      <header class="tnode__head">
        <p class="tnode__period">
          {{ period }}
          <span v-if="current" class="tnode__badge">{{ t('career.currentBadge') }}</span>
          <span v-else-if="education" class="tnode__tag">{{ t('career.eduTag') }}</span>
        </p>
        <h3 class="tnode__role">{{ role }}</h3>
        <p class="tnode__company">{{ company }}</p>
      </header>

      <p v-if="impact" class="tnode__impact">{{ impact }}</p>

      <div v-if="highlights.length" class="tnode__deliverables">
        <ul class="tnode__highlights">
          <li v-for="(item, hi) in expanded ? highlights : highlights.slice(0, COLLAPSED)" :key="hi">
            {{ item }}
          </li>
        </ul>
        <button
          v-if="highlights.length > COLLAPSED"
          type="button"
          class="tnode__toggle"
          :aria-expanded="expanded"
          @click="expanded = !expanded"
        >
          {{ expanded ? t('career.showLess') : t('career.showMore') }}
        </button>
      </div>

      <ul v-if="stack.length" class="tnode__stack" :aria-label="t('career.stackLabel')">
        <li v-for="tag in stack" :key="tag" class="tnode__chip">{{ tag }}</li>
      </ul>
    </article>
  </li>
</template>

<style scoped>
.tnode {
  --marker: 16px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 0;
  /* estado inicial do reveal (sobrescrito por .is-visible no pai) */
  opacity: 0;
  transform: translateY(18px);
  transition:
    opacity 0.55s ease,
    transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: var(--delay, 0ms);
}

.tnode.is-revealed {
  opacity: 1;
  transform: translateY(0);
}

/* ── Marker ── */
.tnode__marker {
  position: relative;
  z-index: 2;
  flex-shrink: 0;
  width: var(--marker);
  height: var(--marker);
  border-radius: 50%;
  background: var(--bg-color, #10130e);
  border: 2px solid rgba(var(--section-accent-rgb, 118, 192, 70), 0.55);
  transition:
    background 0.3s ease,
    border-color 0.3s ease,
    box-shadow 0.3s ease;
}

/* haste curta conectando o marker ao card (desktop) */
.tnode__marker::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  width: 2px;
  height: 1.1rem;
  transform: translateX(-50%);
  background: rgba(var(--section-accent-rgb, 118, 192, 70), 0.25);
}

/* formação: marker em losango, traço diferenciado */
.is-edu .tnode__marker {
  border-radius: 3px;
  transform: rotate(45deg);
  border-style: dashed;
}
.is-edu .tnode__marker::after {
  transform: translateX(-50%) rotate(-45deg);
}

/* posição atual: preenchido, glow e pulso discreto */
.is-current .tnode__marker {
  background: var(--section-accent, #76c046);
  border-color: var(--section-accent, #76c046);
  box-shadow:
    0 0 0 4px rgba(var(--section-accent-rgb, 118, 192, 70), 0.16),
    0 0 16px rgba(var(--section-accent-rgb, 118, 192, 70), 0.55);
  animation: tnode-pulse 2.4s ease-in-out infinite;
}

@keyframes tnode-pulse {
  0%,
  100% {
    box-shadow:
      0 0 0 4px rgba(var(--section-accent-rgb, 118, 192, 70), 0.16),
      0 0 14px rgba(var(--section-accent-rgb, 118, 192, 70), 0.45);
  }
  50% {
    box-shadow:
      0 0 0 7px rgba(var(--section-accent-rgb, 118, 192, 70), 0.05),
      0 0 22px rgba(var(--section-accent-rgb, 118, 192, 70), 0.7);
  }
}

/* ── Card ── */
.tnode__card {
  position: relative;
  width: 100%;
  flex: 1;
  min-height: 360px;
  margin-top: 1.1rem;
  padding: 1.1rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  border: 1px solid rgba(237, 238, 237, 0.16);
  border-radius: 0.9rem;
  background: rgba(255, 255, 255, 0.03);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.18);
  outline: none;
  transition:
    transform 0.3s ease,
    border-color 0.3s ease,
    box-shadow 0.3s ease,
    background 0.3s ease;
}

.tnode__card:hover,
.tnode__card:focus-visible {
  transform: translateY(-4px);
  border-color: rgba(var(--section-accent-rgb, 118, 192, 70), 0.5);
  background: rgba(255, 255, 255, 0.05);
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.35);
}

/* hover / foco acende o marker correspondente */
.tnode:hover .tnode__marker,
.tnode:focus-within .tnode__marker {
  border-color: var(--section-accent, #76c046);
}

/* destaque do card atual */
.is-current .tnode__card {
  border-color: rgba(var(--section-accent-rgb, 118, 192, 70), 0.45);
  box-shadow:
    0 8px 36px rgba(0, 0, 0, 0.35),
    0 0 0 1px rgba(var(--section-accent-rgb, 118, 192, 70), 0.18),
    0 0 42px -10px rgba(var(--section-accent-rgb, 118, 192, 70), 0.45);
}

/* ── Conteúdo ── */
.tnode__head {
  display: flex;
  flex-direction: column;
  gap: 0.22rem;
}

.tnode__period {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.4rem;
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--section-accent, #76c046);
  margin: 0;
}

.tnode__badge {
  font-size: 0.56rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  padding: 0.12rem 0.45rem;
  border-radius: 999px;
  color: var(--section-accent, #76c046);
  background: rgba(var(--section-accent-rgb, 118, 192, 70), 0.14);
  border: 1px solid rgba(var(--section-accent-rgb, 118, 192, 70), 0.45);
}

.tnode__tag {
  font-size: 0.56rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  padding: 0.12rem 0.45rem;
  border-radius: 999px;
  color: rgba(237, 238, 237, 0.5);
  border: 1px solid rgba(237, 238, 237, 0.18);
}

.tnode__role {
  font-family: var(--font-family-secondary);
  font-size: clamp(0.92rem, 1.1vw, 1.05rem);
  font-weight: 700;
  line-height: 1.25;
  color: var(--text-color);
  margin: 0;
}

.tnode__company {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--primary-color);
  margin: 0;
}

.tnode__impact {
  font-size: 0.78rem;
  line-height: 1.5;
  color: rgba(237, 238, 237, 0.72);
  margin: 0;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(237, 238, 237, 0.08);
}

.tnode__deliverables {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
  min-height: 0;
}

.tnode__highlights {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.tnode__highlights li {
  position: relative;
  font-size: 0.7rem;
  line-height: 1.45;
  color: rgba(237, 238, 237, 0.55);
  padding-left: 0.8rem;
}

.tnode__highlights li::before {
  content: '→';
  position: absolute;
  left: 0;
  font-size: 0.62rem;
  color: var(--section-accent, #76c046);
}

.tnode__toggle {
  align-self: flex-start;
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--section-accent, #76c046);
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  opacity: 0.85;
  transition: opacity 0.2s ease;
}

.tnode__toggle:hover {
  opacity: 1;
}

.tnode__stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
  align-content: flex-start;
  min-height: 2.75rem;
  margin-top: auto;
  padding: 0.6rem 0 0;
  list-style: none;
  border-top: 1px solid rgba(237, 238, 237, 0.08);
}

.tnode__chip {
  font-size: 0.58rem;
  font-weight: 600;
  padding: 0.18rem 0.45rem;
  border-radius: 999px;
  color: var(--section-accent, #76c046);
  background: rgba(var(--section-accent-rgb, 118, 192, 70), 0.1);
  border: 1px solid rgba(var(--section-accent-rgb, 118, 192, 70), 0.28);
}

/* ── Layout vertical (tablet / mobile) ── */
@media (max-width: 1023px) {
  .tnode {
    flex-direction: row;
    align-items: flex-start;
    gap: 1rem;
  }

  .tnode__marker {
    margin-top: 0.3rem;
  }

  .tnode__marker::after {
    display: none;
  }

  .is-edu .tnode__marker::after {
    display: none;
  }

  .tnode__card {
    margin-top: 0;
    min-height: auto;
  }
}

@media (prefers-reduced-motion: reduce) {
  .tnode,
  .tnode.is-revealed {
    opacity: 1;
    transform: none;
    transition: none;
  }
  .is-current .tnode__marker {
    animation: none;
  }
}
</style>
