<script setup lang="ts">
import { ref, computed } from 'vue'
import emailjs from 'emailjs-com'
import { useToast } from 'vue-toastification'
import { useLocaleStore } from '@/stores/locale'
import { storeToRefs } from 'pinia'
import { buildBriefingEmail, type BriefingFormData } from './briefingEmail'

const store = useLocaleStore()
const { t } = storeToRefs(store)
const toast = useToast()

const serviceId = import.meta.env.VITE_SERVICE_ID
const templateId = import.meta.env.VITE_TEMPLATE_ID
const apiKey = import.meta.env.VITE_API_KEY

const siteTypeKeys = [
  'landing',
  'sales',
  'institutional',
  'catalog',
  'ecommerce',
  'internal',
  'unsure',
] as const

const hasDomainKeys = ['yes', 'no'] as const
const logoStatusKeys = ['vector', 'image', 'none'] as const

const isSubmitting = ref(false)
const submitted = ref(false)

const form = ref<BriefingFormData>({
  companyName: '',
  contactName: '',
  contactEmail: '',
  contactPhone: '',
  siteContactData: '',
  hasDomain: '',
  domainNames: '',
  siteType: '',
  features: '',
  logoStatus: '',
  brandColors: '',
  referenceSite1: '',
  referenceSite1Notes: '',
  referenceSite2: '',
  referenceSite2Notes: '',
  aboutCompany: '',
  materialsDeadline: '',
  launchDate: '',
  filesLink: '',
})

const whatsappUrl = computed(() => {
  const message = encodeURIComponent(store.translate('whatsapp.message'))
  return `https://wa.me/5542991583814?text=${message}`
})

const emptyForm = (): BriefingFormData => ({
  companyName: '',
  contactName: '',
  contactEmail: '',
  contactPhone: '',
  siteContactData: '',
  hasDomain: '',
  domainNames: '',
  siteType: '',
  features: '',
  logoStatus: '',
  brandColors: '',
  referenceSite1: '',
  referenceSite1Notes: '',
  referenceSite2: '',
  referenceSite2Notes: '',
  aboutCompany: '',
  materialsDeadline: '',
  launchDate: '',
  filesLink: '',
})

const handleSubmit = async () => {
  isSubmitting.value = true

  const { subject, text, html } = buildBriefingEmail(form.value, store.translate)

  try {
    await emailjs.send(
      serviceId,
      templateId,
      {
        name: form.value.contactName,
        email: form.value.contactEmail,
        subject,
        message: text,
        message_html: html,
      },
      apiKey,
    )

    toast.success(store.translate('briefing.success'))
    form.value = emptyForm()
    submitted.value = true
  } catch (error: unknown) {
    console.error('Erro ao enviar briefing:', error)
    const errorMessage =
      error instanceof Error ? error.message : store.translate('briefing.unknownError')
    toast.error(store.translate('briefing.error', { message: errorMessage }))
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="form-card">
    <div class="form-card__glow" aria-hidden="true"></div>

    <header class="form-card__head">
      <div class="form-card__head-dot" aria-hidden="true"></div>
      <h3 class="form-card__title">{{ t('briefing.formTitle') }}</h3>
      <p class="form-card__subtitle">{{ t('briefing.formSubtitle') }}</p>
    </header>

    <div v-if="submitted" class="briefing-form__success">
      <p>{{ t('briefing.success') }}</p>
      <a
        :href="whatsappUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="briefing-form__whatsapp"
      >
        {{ t('briefing.whatsappAfterSubmit') }}
      </a>
    </div>

    <form v-else class="form-card__form" @submit.prevent="handleSubmit">
      <fieldset class="briefing-form__section">
        <legend class="briefing-form__legend">{{ t('briefing.sections.company') }}</legend>

        <div class="form-card__field">
          <label for="briefing-company">{{ t('briefing.companyName') }} *</label>
          <input
            id="briefing-company"
            v-model="form.companyName"
            type="text"
            :placeholder="t('briefing.companyNamePlaceholder')"
            required
          />
        </div>

        <div class="form-card__row">
          <div class="form-card__field">
            <label for="briefing-name">{{ t('briefing.contactName') }} *</label>
            <input
              id="briefing-name"
              v-model="form.contactName"
              type="text"
              autocomplete="name"
              :placeholder="t('briefing.contactNamePlaceholder')"
              required
            />
          </div>

          <div class="form-card__field">
            <label for="briefing-email">{{ t('briefing.contactEmail') }} *</label>
            <input
              id="briefing-email"
              v-model="form.contactEmail"
              type="email"
              autocomplete="email"
              :placeholder="t('briefing.contactEmailPlaceholder')"
              required
            />
          </div>
        </div>

        <div class="form-card__row">
          <div class="form-card__field">
            <label for="briefing-phone">{{ t('briefing.contactPhone') }}</label>
            <input
              id="briefing-phone"
              v-model="form.contactPhone"
              type="tel"
              autocomplete="tel"
              :placeholder="t('briefing.contactPhonePlaceholder')"
            />
          </div>

          <div class="form-card__field">
            <label for="briefing-site-contact">{{ t('briefing.siteContactData') }}</label>
            <input
              id="briefing-site-contact"
              v-model="form.siteContactData"
              type="text"
              :placeholder="t('briefing.siteContactDataPlaceholder')"
            />
          </div>
        </div>
      </fieldset>

      <fieldset class="briefing-form__section">
        <legend class="briefing-form__legend">{{ t('briefing.sections.project') }}</legend>

        <div class="form-card__row">
          <div class="form-card__field">
            <label for="briefing-domain">{{ t('briefing.hasDomain') }}</label>
            <select id="briefing-domain" v-model="form.hasDomain">
              <option value="">{{ t('briefing.hasDomainPlaceholder') }}</option>
              <option v-for="key in hasDomainKeys" :key="key" :value="key">
                {{ t(`briefing.hasDomainOptions.${key}`) }}
              </option>
            </select>
          </div>

          <div class="form-card__field">
            <label for="briefing-site-type">{{ t('briefing.siteType') }} *</label>
            <select id="briefing-site-type" v-model="form.siteType" required>
              <option value="" disabled>{{ t('briefing.siteTypePlaceholder') }}</option>
              <option v-for="key in siteTypeKeys" :key="key" :value="key">
                {{ t(`briefing.siteTypes.${key}`) }}
              </option>
            </select>
          </div>
        </div>

        <div class="form-card__field">
          <label for="briefing-domain-names">{{ t('briefing.domainNames') }}</label>
          <input
            id="briefing-domain-names"
            v-model="form.domainNames"
            type="text"
            :placeholder="t('briefing.domainNamesPlaceholder')"
          />
        </div>

        <div class="form-card__field">
          <label for="briefing-features">{{ t('briefing.features') }} *</label>
          <textarea
            id="briefing-features"
            v-model="form.features"
            rows="4"
            :placeholder="t('briefing.featuresPlaceholder')"
            required
          />
        </div>
      </fieldset>

      <fieldset class="briefing-form__section">
        <legend class="briefing-form__legend">{{ t('briefing.sections.brand') }}</legend>

        <div class="form-card__row">
          <div class="form-card__field">
            <label for="briefing-logo">{{ t('briefing.logoStatus') }}</label>
            <select id="briefing-logo" v-model="form.logoStatus">
              <option value="">{{ t('briefing.logoStatusPlaceholder') }}</option>
              <option v-for="key in logoStatusKeys" :key="key" :value="key">
                {{ t(`briefing.logoStatusOptions.${key}`) }}
              </option>
            </select>
          </div>

          <div class="form-card__field">
            <label for="briefing-colors">{{ t('briefing.brandColors') }}</label>
            <input
              id="briefing-colors"
              v-model="form.brandColors"
              type="text"
              :placeholder="t('briefing.brandColorsPlaceholder')"
            />
          </div>
        </div>

        <div class="form-card__row">
          <div class="form-card__field">
            <label for="briefing-ref1">{{ t('briefing.referenceSite1') }}</label>
            <input
              id="briefing-ref1"
              v-model="form.referenceSite1"
              type="url"
              :placeholder="t('briefing.referenceSite1Placeholder')"
            />
          </div>

          <div class="form-card__field">
            <label for="briefing-ref2">{{ t('briefing.referenceSite2') }}</label>
            <input
              id="briefing-ref2"
              v-model="form.referenceSite2"
              type="url"
              :placeholder="t('briefing.referenceSite2Placeholder')"
            />
          </div>
        </div>

        <div class="form-card__row">
          <div class="form-card__field">
            <label for="briefing-ref1-notes">{{ t('briefing.referenceSite1Notes') }}</label>
            <textarea
              id="briefing-ref1-notes"
              v-model="form.referenceSite1Notes"
              rows="2"
              :placeholder="t('briefing.referenceSite1NotesPlaceholder')"
            />
          </div>

          <div class="form-card__field">
            <label for="briefing-ref2-notes">{{ t('briefing.referenceSite2Notes') }}</label>
            <textarea
              id="briefing-ref2-notes"
              v-model="form.referenceSite2Notes"
              rows="2"
              :placeholder="t('briefing.referenceSite2NotesPlaceholder')"
            />
          </div>
        </div>

        <div class="form-card__field">
          <label for="briefing-about">{{ t('briefing.aboutCompany') }}</label>
          <textarea
            id="briefing-about"
            v-model="form.aboutCompany"
            rows="3"
            :placeholder="t('briefing.aboutCompanyPlaceholder')"
          />
        </div>

        <div class="form-card__row">
          <div class="form-card__field">
            <label for="briefing-materials">{{ t('briefing.materialsDeadline') }}</label>
            <input
              id="briefing-materials"
              v-model="form.materialsDeadline"
              type="text"
              :placeholder="t('briefing.materialsDeadlinePlaceholder')"
            />
          </div>

          <div class="form-card__field">
            <label for="briefing-launch">{{ t('briefing.launchDate') }}</label>
            <input
              id="briefing-launch"
              v-model="form.launchDate"
              type="text"
              :placeholder="t('briefing.launchDatePlaceholder')"
            />
          </div>
        </div>

        <div class="form-card__field">
          <label for="briefing-files">{{ t('briefing.filesLink') }}</label>
          <input
            id="briefing-files"
            v-model="form.filesLink"
            type="url"
            :placeholder="t('briefing.filesLinkPlaceholder')"
          />
          <p class="briefing-form__hint">{{ t('briefing.filesLinkHint') }}</p>
        </div>
      </fieldset>

      <button type="submit" class="form-card__submit" :disabled="isSubmitting">
        <span v-if="isSubmitting" class="form-card__spinner" aria-hidden="true" />
        {{ isSubmitting ? t('briefing.submitting') : t('briefing.submit') }}
      </button>
    </form>
  </div>
</template>

<style scoped>
.form-card {
  position: relative;
  padding: 2rem 2.25rem 2.25rem;
  border: 1px solid rgba(118, 192, 70, 0.12);
  border-radius: 1.25rem;
  background: linear-gradient(
    165deg,
    rgba(255, 255, 255, 0.04) 0%,
    rgba(255, 255, 255, 0.01) 100%
  );
  backdrop-filter: blur(12px);
  box-shadow:
    0 8px 40px rgba(0, 0, 0, 0.3),
    0 0 60px rgba(118, 192, 70, 0.04);
  overflow: hidden;
  transition: border-color 0.35s ease, box-shadow 0.35s ease;
}

.form-card:hover {
  border-color: rgba(118, 192, 70, 0.2);
  box-shadow:
    0 12px 48px rgba(0, 0, 0, 0.35),
    0 0 80px rgba(118, 192, 70, 0.06);
}

.form-card__glow {
  position: absolute;
  top: -60%;
  right: -40%;
  width: 80%;
  height: 120%;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(118, 192, 70, 0.06) 0%, transparent 70%);
  pointer-events: none;
}

.form-card__head {
  margin-bottom: 1.75rem;
  position: relative;
}

.form-card__head-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--tertiary-color);
  box-shadow: 0 0 12px rgba(118, 192, 70, 0.5);
  margin-bottom: 0.85rem;
}

.form-card__title {
  font-family: var(--font-family-secondary);
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-color);
  margin: 0 0 0.35rem;
}

.form-card__subtitle {
  font-size: 0.78rem;
  color: rgba(237, 238, 237, 0.45);
  margin: 0;
  line-height: 1.5;
}

.form-card__form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.briefing-form__section {
  margin: 0;
  padding: 0;
  border: none;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.briefing-form__legend {
  width: 100%;
  padding-bottom: 0.5rem;
  margin-bottom: 0.25rem;
  border-bottom: 1px solid rgba(237, 238, 237, 0.08);
  font-family: var(--font-family-secondary);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--tertiary-color);
}

.form-card__row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-card__field {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.form-card__field label {
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(237, 238, 237, 0.5);
}

.form-card__field input,
.form-card__field select,
.form-card__field textarea {
  width: 100%;
  padding: 0.8rem 1rem;
  font-size: 0.88rem;
  font-family: var(--font-family);
  color: var(--text-color);
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(237, 238, 237, 0.1);
  border-radius: 0.6rem;
  outline: none;
  transition: border-color 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
}

.form-card__field input::placeholder,
.form-card__field textarea::placeholder {
  color: rgba(237, 238, 237, 0.25);
}

.form-card__field select {
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%2376c046' d='M6 8 0 0h12z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  padding-right: 2.25rem;
}

.form-card__field select option {
  background: #1a1f17;
  color: var(--text-color);
}

.form-card__field input:focus,
.form-card__field select:focus,
.form-card__field textarea:focus {
  border-color: rgba(118, 192, 70, 0.5);
  background: rgba(255, 255, 255, 0.05);
  box-shadow: 0 0 0 3px rgba(118, 192, 70, 0.1);
}

.form-card__field textarea {
  resize: vertical;
  min-height: 4.5rem;
}

.briefing-form__hint {
  margin: 0;
  font-size: 0.72rem;
  line-height: 1.45;
  color: rgba(237, 238, 237, 0.4);
}

.form-card__submit {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 0.25rem;
  padding: 0.9rem 1.75rem;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: var(--bg-color);
  background: linear-gradient(135deg, var(--tertiary-color) 0%, #5fa832 100%);
  border: none;
  border-radius: 0.6rem;
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease, opacity 0.25s ease;
  box-shadow:
    0 4px 20px rgba(118, 192, 70, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.15);
}

.form-card__submit:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow:
    0 8px 32px rgba(118, 192, 70, 0.45),
    inset 0 1px 0 rgba(255, 255, 255, 0.15);
}

.form-card__submit:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.form-card__spinner {
  width: 1rem;
  height: 1rem;
  border: 2px solid rgba(16, 19, 14, 0.3);
  border-top-color: var(--bg-color);
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

.briefing-form__success {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  border: 1px solid rgba(118, 192, 70, 0.25);
  border-radius: 0.75rem;
  background: rgba(118, 192, 70, 0.08);
}

.briefing-form__success p {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.55;
  color: rgba(237, 238, 237, 0.85);
}

.briefing-form__whatsapp {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  padding: 0.65rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid rgba(118, 192, 70, 0.4);
  background: rgba(118, 192, 70, 0.15);
  color: var(--tertiary-color);
  font-size: 0.85rem;
  font-weight: 600;
  text-decoration: none;
  transition: background 0.2s ease, border-color 0.2s ease;
}

.briefing-form__whatsapp:hover {
  background: rgba(118, 192, 70, 0.22);
  border-color: var(--tertiary-color);
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 640px) {
  .form-card {
    padding: 1.5rem 1.25rem 1.75rem;
  }

  .form-card__row {
    grid-template-columns: 1fr;
  }
}

@media (prefers-reduced-motion: reduce) {
  .form-card__spinner {
    animation: none;
  }
}
</style>
