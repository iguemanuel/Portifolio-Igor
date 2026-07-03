<script setup lang="ts">
defineProps<{
  label: string
}>()
</script>

<template>
  <span class="hero-badge">
    <span class="hero-badge__dot" aria-hidden="true" />
    {{ label }}
  </span>
</template>

<style scoped>
.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.4rem 0.85rem;
  border-radius: 999px;
  border: 1px solid rgba(var(--section-accent-rgb, 118, 192, 70), 0.3);
  background: rgba(var(--section-accent-rgb, 118, 192, 70), 0.08);
  color: var(--section-accent, var(--tertiary-color));
  font-size: 0.74rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  width: fit-content;
}

.hero-badge__dot {
  position: relative;
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: var(--section-accent, var(--tertiary-color));
  flex-shrink: 0;
}

.hero-badge__dot::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: var(--section-accent, var(--tertiary-color));
  animation: hero-badge-pulse 1.8s ease-out infinite;
}

@keyframes hero-badge-pulse {
  0% {
    transform: scale(1);
    opacity: 0.7;
  }
  70%,
  100% {
    transform: scale(2.6);
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-badge__dot::after {
    animation: none;
  }
}
</style>
