<script setup lang="ts">
import type { Project } from '@/composables/useProjects'

defineProps<{
  project: Project
}>()
</script>

<template>
  <div class="project-badges">
    <span class="project-badges__origin" :data-origin="project.origin">
      {{ project.originLabel }}
    </span>

    <span class="project-badges__status" :data-status="project.status">
      <span class="project-badges__dot" aria-hidden="true" />
      {{ project.statusLabel }}
    </span>
  </div>
</template>

<style scoped>
.project-badges {
  position: absolute;
  inset: 0.8rem 0.8rem auto;
  z-index: 4;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  pointer-events: none;
}

.project-badges__origin,
.project-badges__status {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.28rem 0.6rem;
  border-radius: 999px;
  font-size: 0.58rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  backdrop-filter: blur(8px);
  border: 1px solid transparent;
}

.project-badges__origin {
  color: #0c0c0c;
  background: rgba(237, 238, 237, 0.85);
}

.project-badges__origin[data-origin='client'] {
  color: #0c0c0c;
  background: var(--section-accent, var(--tertiary-color));
  box-shadow: 0 0 18px rgba(var(--section-accent-rgb, 118, 192, 70), 0.45);
}

.project-badges__origin[data-origin='freelance'] {
  color: #d7ecff;
  background: rgba(70, 138, 222, 0.22);
  border-color: rgba(70, 138, 222, 0.5);
}

.project-badges__origin[data-origin='academic'] {
  color: #e6d8ff;
  background: rgba(150, 110, 222, 0.22);
  border-color: rgba(150, 110, 222, 0.5);
}

.project-badges__origin[data-origin='personal'] {
  color: rgba(237, 238, 237, 0.85);
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(237, 238, 237, 0.2);
}

.project-badges__status {
  color: rgba(237, 238, 237, 0.85);
  background: rgba(12, 12, 12, 0.55);
  border-color: rgba(237, 238, 237, 0.14);
}

.project-badges__dot {
  width: 0.42rem;
  height: 0.42rem;
  border-radius: 50%;
  background: rgba(237, 238, 237, 0.5);
}

.project-badges__status[data-status='online'] {
  color: #c9f5b3;
  background: rgba(34, 84, 18, 0.5);
  border-color: rgba(var(--section-accent-rgb, 118, 192, 70), 0.55);
}

.project-badges__status[data-status='online'] .project-badges__dot {
  background: var(--section-accent, var(--tertiary-color));
  box-shadow: 0 0 0 0 rgba(var(--section-accent-rgb, 118, 192, 70), 0.7);
  animation: badge-pulse 2.4s ease-out infinite;
}

.project-badges__status[data-status='in-development'] {
  color: #ffe2ad;
  border-color: rgba(230, 168, 64, 0.5);
}

.project-badges__status[data-status='in-development'] .project-badges__dot {
  background: #e6a840;
}

.project-badges__status[data-status='private'] .project-badges__dot {
  background: rgba(237, 238, 237, 0.55);
}

.project-badges__status[data-status='offline'] {
  color: rgba(237, 238, 237, 0.55);
  background: rgba(12, 12, 12, 0.65);
  border-color: rgba(237, 238, 237, 0.12);
}

.project-badges__status[data-status='offline'] .project-badges__dot {
  background: rgba(237, 238, 237, 0.35);
}

@keyframes badge-pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(var(--section-accent-rgb, 118, 192, 70), 0.65);
  }
  70% {
    box-shadow: 0 0 0 0.5rem rgba(var(--section-accent-rgb, 118, 192, 70), 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(var(--section-accent-rgb, 118, 192, 70), 0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .project-badges__status[data-status='online'] .project-badges__dot {
    animation: none;
  }
}
</style>
