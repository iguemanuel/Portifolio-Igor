<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

defineProps<{
  icon: string
  label: string
  value: string
}>()
</script>

<template>
  <div class="hero-card">
    <span class="hero-card__icon" aria-hidden="true">
      <font-awesome-icon :icon="['fas', icon]" />
    </span>
    <span class="hero-card__body">
      <span class="hero-card__label">{{ label }}</span>
      <strong class="hero-card__value">{{ value }}</strong>
    </span>
  </div>
</template>

<style scoped>
.hero-card {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.7rem 0.9rem;
  border-radius: 0.85rem;
  border: 1px solid rgba(237, 238, 237, 0.1);
  background: rgba(20, 24, 18, 0.72);
  backdrop-filter: blur(10px);
  box-shadow: 0 14px 36px rgba(0, 0, 0, 0.35);
  transition:
    transform 0.3s cubic-bezier(0.22, 1, 0.36, 1),
    border-color 0.3s ease,
    box-shadow 0.3s ease;
}

.hero-card:hover {
  transform: translateY(-3px);
  border-color: rgba(var(--section-accent-rgb, 118, 192, 70), 0.4);
  box-shadow:
    0 18px 44px rgba(0, 0, 0, 0.42),
    0 0 28px rgba(var(--section-accent-rgb, 118, 192, 70), 0.16);
}

.hero-card__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.1rem;
  height: 2.1rem;
  flex-shrink: 0;
  border-radius: 0.6rem;
  background: rgba(var(--section-accent-rgb, 118, 192, 70), 0.14);
  color: var(--section-accent, var(--tertiary-color));
  font-size: 0.95rem;
}

.hero-card__body {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  min-width: 0;
}

.hero-card__label {
  font-size: 0.6rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(237, 238, 237, 0.5);
}

.hero-card__value {
  font-size: 0.86rem;
  font-weight: 700;
  color: var(--text-color);
  white-space: nowrap;
}
</style>
