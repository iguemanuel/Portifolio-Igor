<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import FooterComponent from '@/components/FooterComponent.vue'
import { useI18n } from '@/i18n'

interface CvHighlight {
  label: string
  text: string
}

interface CvExperience {
  period: string
  role: string
  company: string
  highlights: CvHighlight[]
  stack: string
}

interface CvEducation {
  period: string
  role: string
  company: string
  description: string
}

interface CvSkillGroup {
  label: string
  items: string[]
}

interface CvCertification {
  title: string
  provider: string
  period: string
  items: string[]
}

interface CvLanguage {
  name: string
  level: string
}

const { t, tm } = useI18n()

const asArray = <T,>(value: unknown): T[] => (Array.isArray(value) ? (value as T[]) : [])

const skillGroups = computed(() => asArray<CvSkillGroup>(tm.value('cv.skillGroups')))
const experience = computed(() => asArray<CvExperience>(tm.value('cv.experience')))
const education = computed(() => asArray<CvEducation>(tm.value('cv.education')))
const certifications = computed(() => asArray<CvCertification>(tm.value('cv.certifications')))
const languages = computed(() => asArray<CvLanguage>(tm.value('cv.languages')))
</script>

<template>
  <div class="cv-page">
    <div class="site-shell cv-page__head">
      <RouterLink to="/" class="cv-page__back">
        <font-awesome-icon icon="arrow-left" />
        {{ t('cv.backHome') }}
      </RouterLink>

      <div class="cv-page__hero">
        <div class="cv-page__identity">
          <p class="cv-page__label">{{ t('cv.pageLabel') }}</p>
          <h1 class="cv-page__name">{{ t('cv.name') }}</h1>
          <p class="cv-page__role">{{ t('cv.role') }}</p>
          <p class="cv-page__location">{{ t('cv.location') }}</p>
        </div>

        <div class="cv-page__actions">
          <a :href="t('cv.pdfUrl')" download class="cv-page__download">
            <font-awesome-icon icon="download" aria-hidden="true" />
            {{ t('cv.downloadPdf') }}
          </a>
        </div>
      </div>

      <div class="cv-page__contact">
        <div class="cv-page__contact-row">
          <a href="mailto:igor17emanuel@gmail.com" class="cv-page__contact-link">
            {{ t('contact.emailValue') }}
          </a>
          <a href="tel:+5542991583814" class="cv-page__contact-link">
            {{ t('cv.phone') }}
          </a>
        </div>
        <div class="cv-page__contact-row">
          <RouterLink to="/" class="cv-page__contact-link">
            {{ t('cv.portfolioLabel') }}
          </RouterLink>
          <a
            href="https://www.linkedin.com/in/igor-emanuel-roque/"
            target="_blank"
            rel="noopener noreferrer"
            class="cv-page__contact-link"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/iguemanuel"
            target="_blank"
            rel="noopener noreferrer"
            class="cv-page__contact-link"
          >
            GitHub
          </a>
        </div>
      </div>
    </div>

    <div class="site-shell cv-page__body">
      <section class="cv-section">
        <h2 class="cv-section__title">{{ t('cv.summaryTitle') }}</h2>
        <p class="cv-section__text">{{ t('cv.summary') }}</p>
      </section>

      <section class="cv-section">
        <h2 class="cv-section__title">{{ t('cv.skillsTitle') }}</h2>
        <div class="cv-skills">
          <div v-for="group in skillGroups" :key="group.label" class="cv-skills__group">
            <h3 class="cv-skills__label">{{ group.label }}</h3>
            <ul class="cv-skills__list" role="list">
              <li v-for="skill in group.items" :key="skill" class="cv-skills__item">
                {{ skill }}
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section class="cv-section">
        <h2 class="cv-section__title">{{ t('cv.experienceTitle') }}</h2>
        <ul class="cv-list" role="list">
          <li v-for="(entry, index) in experience" :key="index" class="cv-entry">
            <div class="cv-entry__head">
              <div>
                <h3 class="cv-entry__role">{{ entry.role }}</h3>
                <p v-if="entry.company" class="cv-entry__company">{{ entry.company }}</p>
              </div>
              <time class="cv-entry__period">{{ entry.period }}</time>
            </div>
            <ul v-if="entry.highlights.length" class="cv-entry__highlights" role="list">
              <li v-for="(item, hi) in entry.highlights" :key="hi">
                <strong>{{ item.label }}:</strong> {{ item.text }}
              </li>
            </ul>
            <p class="cv-entry__stack">
              <span class="cv-entry__stack-label">{{ t('cv.stackLabel') }}:</span>
              {{ entry.stack }}
            </p>
          </li>
        </ul>
      </section>

      <section v-if="education.length" class="cv-section">
        <h2 class="cv-section__title">{{ t('cv.educationTitle') }}</h2>
        <ul class="cv-list" role="list">
          <li v-for="(entry, index) in education" :key="index" class="cv-entry">
            <div class="cv-entry__head">
              <div>
                <h3 class="cv-entry__role">{{ entry.role }}</h3>
                <p class="cv-entry__company">{{ entry.company }}</p>
              </div>
              <time class="cv-entry__period">{{ entry.period }}</time>
            </div>
            <p class="cv-entry__desc">{{ entry.description }}</p>
          </li>
        </ul>
      </section>

      <section v-if="certifications.length" class="cv-section">
        <h2 class="cv-section__title">{{ t('cv.certificationsTitle') }}</h2>
        <ul class="cv-list" role="list">
          <li v-for="(cert, index) in certifications" :key="index" class="cv-entry">
            <div class="cv-entry__head">
              <div>
                <h3 class="cv-entry__role">{{ cert.title }}</h3>
                <p class="cv-entry__company">{{ cert.provider }}</p>
              </div>
              <time class="cv-entry__period">{{ cert.period }}</time>
            </div>
            <ul v-if="cert.items.length" class="cv-entry__highlights" role="list">
              <li v-for="(item, ci) in cert.items" :key="ci">{{ item }}</li>
            </ul>
          </li>
        </ul>
      </section>

      <section v-if="languages.length" class="cv-section">
        <h2 class="cv-section__title">{{ t('cv.languagesTitle') }}</h2>
        <ul class="cv-languages" role="list">
          <li v-for="lang in languages" :key="lang.name" class="cv-languages__item">
            <span class="cv-languages__name">{{ lang.name }}</span>
            <span class="cv-languages__level">{{ lang.level }}</span>
          </li>
        </ul>
      </section>
    </div>

    <FooterComponent />
  </div>
</template>

<style scoped>
.cv-page {
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;
  background: var(--bg-color);
  padding-top: 5rem;
}

.cv-page__head {
  padding-bottom: 2rem;
  border-bottom: 1px solid rgba(237, 238, 237, 0.08);
}

.cv-page__back {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  color: var(--primary-color);
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: color 0.2s ease;
}

.cv-page__back:hover {
  color: var(--tertiary-color);
}

.cv-page__hero {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1.25rem;
  margin-bottom: 1rem;
}

.cv-page__label {
  margin: 0 0 0.35rem;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--tertiary-color);
}

.cv-page__name {
  margin: 0 0 0.25rem;
  font-family: var(--font-family-secondary);
  font-size: clamp(1.75rem, 4vw, 2.35rem);
  font-weight: 700;
  color: var(--text-color);
}

.cv-page__role {
  margin: 0 0 0.35rem;
  font-size: 1rem;
  font-weight: 600;
  color: var(--tertiary-color);
}

.cv-page__location {
  margin: 0;
  font-size: 0.88rem;
  color: rgba(237, 238, 237, 0.55);
}

.cv-page__download {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.65rem 1.15rem;
  border-radius: 0.5rem;
  border: 1px solid rgba(118, 192, 70, 0.45);
  background: rgba(118, 192, 70, 0.12);
  color: var(--tertiary-color);
  font-size: 0.85rem;
  font-weight: 600;
  text-decoration: none;
  transition: background 0.2s ease, border-color 0.2s ease;
}

.cv-page__download:hover {
  background: rgba(118, 192, 70, 0.22);
  border-color: var(--tertiary-color);
}

.cv-page__contact {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.cv-page__contact-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem 1.25rem;
}

.cv-page__contact-link {
  font-size: 0.85rem;
  color: rgba(237, 238, 237, 0.72);
  text-decoration: none;
  transition: color 0.2s ease;
}

.cv-page__contact-link:hover {
  color: var(--tertiary-color);
}

.cv-page__body {
  padding: 2rem 0 3rem;
  display: flex;
  flex-direction: column;
  gap: 2.25rem;
}

.cv-section__title {
  margin: 0 0 1rem;
  font-family: var(--font-family-secondary);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--tertiary-color);
}

.cv-section__text {
  margin: 0;
  max-width: 72ch;
  line-height: 1.65;
  color: rgba(237, 238, 237, 0.82);
  font-size: 0.95rem;
}

.cv-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.cv-entry {
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(237, 238, 237, 0.07);
}

.cv-entry:last-child {
  padding-bottom: 0;
  border-bottom: none;
}

.cv-entry__head {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.5rem 1rem;
  margin-bottom: 0.65rem;
}

.cv-entry__role {
  margin: 0 0 0.15rem;
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--text-color);
}

.cv-entry__company {
  margin: 0;
  font-size: 0.88rem;
  font-weight: 600;
  color: rgba(237, 238, 237, 0.65);
}

.cv-entry__period {
  font-size: 0.78rem;
  color: rgba(237, 238, 237, 0.45);
  white-space: nowrap;
}

.cv-entry__desc {
  margin: 0;
  font-size: 0.88rem;
  line-height: 1.55;
  color: rgba(237, 238, 237, 0.72);
}

.cv-entry__highlights {
  margin: 0 0 0.65rem;
  padding-left: 1.1rem;
  font-size: 0.84rem;
  line-height: 1.55;
  color: rgba(237, 238, 237, 0.72);
}

.cv-entry__highlights li + li {
  margin-top: 0.35rem;
}

.cv-entry__highlights strong {
  color: rgba(237, 238, 237, 0.9);
  font-weight: 600;
}

.cv-entry__stack {
  margin: 0;
  font-size: 0.78rem;
  line-height: 1.5;
  color: rgba(237, 238, 237, 0.55);
}

.cv-entry__stack-label {
  font-weight: 700;
  color: var(--tertiary-color);
}

.cv-skills {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.cv-skills__label {
  margin: 0 0 0.45rem;
  font-size: 0.78rem;
  font-weight: 700;
  color: rgba(237, 238, 237, 0.85);
}

.cv-skills__list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.cv-skills__item {
  padding: 0.28rem 0.6rem;
  border-radius: 999px;
  border: 1px solid rgba(118, 192, 70, 0.22);
  background: rgba(118, 192, 70, 0.07);
  font-size: 0.74rem;
  font-weight: 600;
  color: rgba(237, 238, 237, 0.78);
}

.cv-languages {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.cv-languages__item {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem 0.75rem;
  font-size: 0.9rem;
}

.cv-languages__name {
  font-weight: 600;
  color: var(--text-color);
}

.cv-languages__level {
  color: rgba(237, 238, 237, 0.62);
}

@media (max-width: 640px) {
  .cv-page__hero {
    flex-direction: column;
  }
}
</style>
