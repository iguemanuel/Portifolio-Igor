<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useI18n } from '@/i18n'

const { t } = useI18n()

const pdfUrl = computed(() => t.value('cv.pdfUrl'))
const viewerSrc = computed(() => `${pdfUrl.value}#view=FitH&toolbar=1`)
</script>

<template>
  <div class="cv-page">
    <header class="cv-page__toolbar site-shell">
      <RouterLink to="/" class="cv-page__back">
        <font-awesome-icon icon="arrow-left" aria-hidden="true" />
        {{ t('cv.backHome') }}
      </RouterLink>

      <h1 class="cv-page__title">{{ t('cv.pageTitle') }}</h1>

      <div class="cv-page__actions">
        <a
          :href="pdfUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="cv-page__action cv-page__action--ghost"
        >
          {{ t('cv.openPdf') }}
        </a>
        <a :href="pdfUrl" download class="cv-page__action cv-page__action--primary">
          <font-awesome-icon icon="download" aria-hidden="true" />
          {{ t('cv.downloadPdf') }}
        </a>
      </div>
    </header>

    <div class="cv-page__viewer site-shell">
      <iframe
        :key="pdfUrl"
        :src="viewerSrc"
        :title="t('cv.viewerTitle')"
        class="cv-page__frame"
      />
      <p class="cv-page__fallback">
        {{ t('cv.fallback') }}
        <a :href="pdfUrl" target="_blank" rel="noopener noreferrer">{{ t('cv.openPdf') }}</a>.
      </p>
    </div>
  </div>
</template>

<style scoped>
.cv-page {
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: #0c0e0b;
  padding-top: 4rem;
}

.cv-page__toolbar {
  flex-shrink: 0;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 1rem;
  padding-block: 1rem 0.85rem;
  border-bottom: 1px solid rgba(237, 238, 237, 0.07);
}

.cv-page__back {
  justify-self: start;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  color: rgba(237, 238, 237, 0.62);
  text-decoration: none;
  font-size: 0.82rem;
  font-weight: 500;
  transition: color 0.2s ease;
}

.cv-page__back:hover {
  color: rgba(237, 238, 237, 0.92);
}

.cv-page__title {
  margin: 0;
  font-family: var(--font-family-secondary);
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: rgba(237, 238, 237, 0.88);
  text-align: center;
}

.cv-page__actions {
  justify-self: end;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.cv-page__action {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.45rem 0.85rem;
  border-radius: 0.35rem;
  font-size: 0.78rem;
  font-weight: 600;
  text-decoration: none;
  transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease;
}

.cv-page__action--ghost {
  border: 1px solid rgba(237, 238, 237, 0.14);
  background: transparent;
  color: rgba(237, 238, 237, 0.72);
}

.cv-page__action--ghost:hover {
  border-color: rgba(237, 238, 237, 0.28);
  color: rgba(237, 238, 237, 0.95);
}

.cv-page__action--primary {
  border: 1px solid rgba(237, 238, 237, 0.18);
  background: rgba(237, 238, 237, 0.06);
  color: rgba(237, 238, 237, 0.92);
}

.cv-page__action--primary:hover {
  background: rgba(237, 238, 237, 0.1);
  border-color: rgba(237, 238, 237, 0.3);
}

.cv-page__viewer {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding-block: 1rem 1.25rem;
}

.cv-page__frame {
  flex: 1;
  width: 100%;
  min-height: 0;
  border: 1px solid rgba(237, 238, 237, 0.1);
  border-radius: 0.25rem;
  background: #fff;
}

.cv-page__fallback {
  display: none;
  margin: 0;
  font-size: 0.8rem;
  color: rgba(237, 238, 237, 0.5);
  text-align: center;
}

.cv-page__fallback a {
  color: rgba(237, 238, 237, 0.78);
}

@media (max-width: 768px) {
  .cv-page__toolbar {
    grid-template-columns: 1fr;
    justify-items: stretch;
  }

  .cv-page__title {
    order: -1;
    text-align: left;
    font-size: 0.88rem;
  }

  .cv-page__actions {
    justify-self: stretch;
  }

  .cv-page__action {
    flex: 1;
    justify-content: center;
  }

  .cv-page__frame {
    display: none;
  }

  .cv-page__fallback {
    display: block;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem 1rem;
    border: 1px solid rgba(237, 238, 237, 0.1);
    border-radius: 0.25rem;
  }
}
</style>
