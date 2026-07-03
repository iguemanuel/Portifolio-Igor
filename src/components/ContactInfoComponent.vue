<script setup lang="ts">
import { useI18n } from '@/i18n'

const { t } = useI18n()
</script>

<template>
  <div class="container mt-5">
    <div
      class="card shadow-lg p-4 mx-auto text-white rounded-3"
      style="max-width: 500px; background-color: var(--skeleton-color)"
    >
      <h2 class="text-center mb-4">{{ t('contact.infoTitle') }}</h2>

      <div class="info">
        <div class="email">
          <h3>
            <font-awesome-icon :icon="['fas', 'envelope']" />
            {{ t('contact.email') }}
          </h3>
          <p>
            <a href="mailto:igor17emanuel@gmail.com">igor17emanuel@gmail.com</a>
          </p>
        </div>
        <div class="phone">
          <h3>
            <font-awesome-icon :icon="['fas', 'phone']" />
            {{ t('contact.phone') }}
          </h3>
          <p>
            <a
              href="https://wa.me/5542991583814"
              target="_blank"
              rel="noopener noreferrer"
            >
              (42) 99158-3814
            </a>
          </p>
        </div>
        <div class="address">
          <h3>
            <font-awesome-icon :icon="['fas', 'earth-americas']" />
            {{ t('contact.address') }}
          </h3>
          <p>{{ t('contact.location') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
h3 {
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--primary-color);
  font-family: var(--font-family-secondary);
}

p {
  color: var(--primary-color);
}

p a {
  color: var(--primary-color);
  text-decoration: none;
  transition: color 0.2s ease;
}

p a:hover {
  color: var(--tertiary-color);
}
</style>
