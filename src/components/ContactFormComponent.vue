<script setup lang="ts">
import { ref, computed } from 'vue'
import emailjs from 'emailjs-com'
import { useToast } from 'vue-toastification'
import { useLocaleStore } from '@/stores/locale'
import { storeToRefs } from 'pinia'

const store = useLocaleStore()
const { t } = storeToRefs(store)
const toast = useToast()

const serviceId = import.meta.env.VITE_SERVICE_ID
const templateId = import.meta.env.VITE_TEMPLATE_ID
const apiKey = import.meta.env.VITE_API_KEY

const projectTypeKeys = ['system', 'app', 'api', 'automation', 'other'] as const

const isSubmitting = ref(false)
const form = ref({
  name: '',
  email: '',
  projectType: '',
  message: '',
})

const handleSubmit = async () => {
  isSubmitting.value = true

  const typeLabel = form.value.projectType
    ? store.translate(`contact.projectTypes.${form.value.projectType}`)
    : store.translate('contact.projectTypes.other')

  const subject = typeLabel

  const fullMessage = [
    `${store.translate('contact.projectType')}: ${typeLabel}`,
    '',
    form.value.message,
  ]
    .filter(Boolean)
    .join('\n')

  try {
    await emailjs.send(
      serviceId,
      templateId,
      {
        name: form.value.name,
        email: form.value.email,
        subject,
        message: fullMessage,
      },
      apiKey,
    )

    toast.success(store.translate('contact.success'))

    form.value = { name: '', email: '', projectType: '', message: '' }
  } catch (error: unknown) {
    console.error('Erro ao enviar:', error)
    const errorMessage =
      error instanceof Error ? error.message : store.translate('contact.unknownError')
    toast.error(store.translate('contact.error', { message: errorMessage }))
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="form-card">
    <!-- Card glow effect -->
    <div class="form-card__glow" aria-hidden="true"></div>

    <header class="form-card__head">
      <div class="form-card__head-dot" aria-hidden="true"></div>
      <h3 class="form-card__title">{{ t('contact.formTitle') }}</h3>
      <p class="form-card__subtitle">{{ t('contact.formSubtitle') }}</p>
    </header>

    <form class="form-card__form" @submit.prevent="handleSubmit">
      <div class="form-card__row">
        <div class="form-card__field">
          <label for="contact-name">{{ t('contact.name') }}</label>
          <input
            id="contact-name"
            v-model="form.name"
            type="text"
            autocomplete="name"
            :placeholder="t('contact.namePlaceholder')"
            required
          />
        </div>

        <div class="form-card__field">
          <label for="contact-email">{{ t('contact.email') }}</label>
          <input
            id="contact-email"
            v-model="form.email"
            type="email"
            autocomplete="email"
            :placeholder="t('contact.emailPlaceholder')"
            required
          />
        </div>
      </div>

      <div class="form-card__field">
        <label for="contact-type">{{ t('contact.projectType') }}</label>
        <select id="contact-type" v-model="form.projectType" required>
          <option value="" disabled>{{ t('contact.projectTypePlaceholder') }}</option>
          <option v-for="key in projectTypeKeys" :key="key" :value="key">
            {{ t(`contact.projectTypes.${key}`) }}
          </option>
        </select>
      </div>

      <div class="form-card__field">
        <label for="contact-message">{{ t('contact.message') }}</label>
        <textarea
          id="contact-message"
          v-model="form.message"
          rows="4"
          :placeholder="t('contact.messagePlaceholder')"
          required
        />
      </div>

      <button type="submit" class="form-card__submit" :disabled="isSubmitting">
        <span v-if="isSubmitting" class="form-card__spinner" aria-hidden="true" />
        {{ isSubmitting ? t('contact.submitting') : t('contact.submit') }}
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

/* ─── Header ─── */
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

/* ─── Form ─── */
.form-card__form {
  display: flex;
  flex-direction: column;
  gap: 1.15rem;
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
  resize: none;
  min-height: 5.5rem;
}

/* ─── Submit ─── */
.form-card__submit {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
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

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* ─── Responsive ─── */
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
