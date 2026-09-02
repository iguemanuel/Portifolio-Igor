<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import BriefingForm from '@/components/briefing/BriefingForm.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import { useI18n } from '@/i18n'

const { t } = useI18n()
</script>

<template>
  <div class="briefing-page">
    <div class="site-shell briefing-page__head">
      <RouterLink to="/" class="back-link">
        <font-awesome-icon icon="arrow-left" />
        {{ t('briefing.backHome') }}
      </RouterLink>
      <h1 class="briefing-page__title">{{ t('briefing.pageTitle') }}</h1>
      <p class="briefing-page__subtitle">{{ t('briefing.pageSubtitle') }}</p>
    </div>

    <div class="site-shell briefing-page__form">
      <BriefingForm />
    </div>

    <FooterComponent />
  </div>
</template>

<style scoped>
.briefing-page {
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;
  background: var(--bg-color);
  padding-top: 5rem;
}

.briefing-page__head {
  padding-bottom: 1.5rem;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
  color: var(--primary-color);
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: color 0.2s ease;
}

.back-link:hover {
  color: var(--tertiary-color);
}

.briefing-page__title {
  margin: 0 0 0.5rem;
  font-size: clamp(1.5rem, 3vw, 2rem);
  color: var(--text-color);
}

.briefing-page__subtitle {
  margin: 0;
  max-width: 65ch;
  font-size: 0.95rem;
  line-height: 1.6;
  color: rgba(237, 238, 237, 0.6);
}

.briefing-page__form {
  padding-bottom: 3rem;
}
</style>
