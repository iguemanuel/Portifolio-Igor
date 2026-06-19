<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useLocaleStore } from '@/stores/locale'

const store = useLocaleStore()
const { locale, t } = storeToRefs(store)
</script>

<template>
  <div class="lang-switcher" role="group">
    <button
      class="lang-btn"
      :class="{ active: locale === 'pt-BR' }"
      :aria-label="t('language.switchTo', { lang: t('language.pt') })"
      :aria-pressed="locale === 'pt-BR'"
      @click="store.setLocale('pt-BR')"
      title="PT-BR"
    >
      <svg class="flag" viewBox="0 0 28 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect width="28" height="20" fill="#009B3A" />
        <polygon points="14,2 26,10 14,18 2,10" fill="#FFDF00" />
        <circle cx="14" cy="10" r="4" fill="#002776" />
      </svg>
      <span class="lang-label">PT</span>
    </button>

    <button
      class="lang-btn"
      :class="{ active: locale === 'en' }"
      :aria-label="t('language.switchTo', { lang: t('language.en') })"
      :aria-pressed="locale === 'en'"
      @click="store.setLocale('en')"
      title="EN"
    >
      <svg class="flag" viewBox="0 0 28 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect width="28" height="20" fill="#B22234" />
        <rect y="1.54" width="28" height="1.54" fill="#fff" />
        <rect y="4.62" width="28" height="1.54" fill="#fff" />
        <rect y="7.69" width="28" height="1.54" fill="#fff" />
        <rect y="10.77" width="28" height="1.54" fill="#fff" />
        <rect y="13.85" width="28" height="1.54" fill="#fff" />
        <rect y="16.92" width="28" height="1.54" fill="#fff" />
        <rect width="11.2" height="10.77" fill="#3C3B6E" />
      </svg>
      <span class="lang-label">EN</span>
    </button>
  </div>
</template>

<style scoped>
.lang-switcher {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(118, 192, 70, 0.2);
  border-radius: 0.5rem;
  padding: 0.2rem;
}

.lang-btn {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  background: transparent;
  border: none;
  border-radius: 0.35rem;
  padding: 0.3rem 0.55rem;
  cursor: pointer;
  color: rgba(237, 238, 237, 0.6);
  transition: all 0.2s ease;
  line-height: 1;
}

.lang-btn:hover {
  color: var(--text-color);
  background: rgba(118, 192, 70, 0.1);
}

.lang-btn.active {
  background: rgba(118, 192, 70, 0.2);
  color: var(--tertiary-color);
  box-shadow: 0 0 0 1px rgba(118, 192, 70, 0.3);
}

.flag {
  width: 22px;
  height: 16px;
  border-radius: 2px;
  flex-shrink: 0;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.15);
}

.lang-label {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.03em;
}

@media (max-width: 768px) {
  .lang-label {
    display: none;
  }

  .lang-btn {
    padding: 0.35rem 0.45rem;
  }
}
</style>
