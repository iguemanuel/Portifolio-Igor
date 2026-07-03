<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from '@/i18n'

const { t } = useI18n()

const scrollToTop = () => {
  const home = document.getElementById('home')
  if (home) {
    home.scrollIntoView({ behavior: 'smooth' })
  }
}

const year = new Date().getFullYear()
const copyright = computed(() => t.value('footer.rights', { year }))
</script>

<template>
  <footer class="site-footer">
    <div class="site-shell d-flex flex-column flex-md-row align-items-center justify-content-between gap-3 py-4">
      <p class="mb-0 footer-copy">{{ copyright }}</p>

      <div class="footer-links d-flex gap-3">
        <a href="https://github.com/iguemanuel" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <font-awesome-icon :icon="['fab', 'github']" />
        </a>
        <a href="https://www.linkedin.com/in/igor-emanuel-roque/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <font-awesome-icon :icon="['fab', 'linkedin']" />
        </a>
        <a href="https://www.instagram.com/iguemanuel/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <font-awesome-icon :icon="['fab', 'instagram']" />
        </a>
      </div>

      <button class="back-to-top" @click="scrollToTop" :aria-label="t('footer.backToTop')">
        {{ t('footer.backToTop') }}
      </button>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  background: transparent;
  border-top: 1px solid rgba(var(--section-accent-rgb, 204, 255, 0), 0.08);
}

.footer-copy {
  color: rgba(237, 238, 237, 0.5);
  font-size: var(--font-size-sm);
}

.footer-links a {
  color: rgba(237, 238, 237, 0.6);
  font-size: 1.2rem;
  transition: color 0.2s ease;
}

.footer-links a:hover {
  color: var(--section-accent, var(--tertiary-color));
}

.back-to-top {
  background: transparent;
  border: 1px solid rgba(118, 192, 70, 0.3);
  color: var(--primary-color);
  padding: 0.35rem 0.9rem;
  border-radius: 0.4rem;
  cursor: pointer;
  font-size: var(--font-size-sm);
  transition: all 0.2s ease;
}

.back-to-top:hover {
  border-color: var(--section-accent, var(--tertiary-color));
  color: var(--section-accent, var(--tertiary-color));
}
</style>
