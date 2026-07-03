<script setup lang="ts">
import { computed } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useI18n } from '@/i18n'

const { t } = useI18n()

const whatsappUrl = computed(() => {
  const message = encodeURIComponent(t.value('whatsapp.message'))
  return `https://wa.me/5542991583814?text=${message}`
})

const socials = [
  {
    key: 'linkedin',
    href: 'https://www.linkedin.com/in/igor-emanuel-roque/',
    icon: ['fab', 'linkedin'] as const,
    label: 'LinkedIn',
  },
  {
    key: 'github',
    href: 'https://github.com/iguemanuel',
    icon: ['fab', 'github'] as const,
    label: 'GitHub',
  },
  {
    key: 'instagram',
    href: 'https://www.instagram.com/iguemanuel/',
    icon: ['fab', 'instagram'] as const,
    label: 'Instagram',
  },
] as const
</script>

<template>
  <div class="contact-quick">
    <ul class="contact-quick__list" role="list">
      <li>
        <a href="mailto:igor17emanuel@gmail.com" class="contact-quick__item">
          <font-awesome-icon :icon="['fas', 'envelope']" aria-hidden="true" />
          <span>{{ t('contact.emailValue') }}</span>
        </a>
      </li>
      <li>
        <a
          :href="whatsappUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="contact-quick__item contact-quick__item--accent"
        >
          <font-awesome-icon :icon="['fab', 'whatsapp']" aria-hidden="true" />
          <span>{{ t('contact.whatsappValue') }}</span>
        </a>
      </li>
      <li>
        <span class="contact-quick__item contact-quick__item--static">
          <font-awesome-icon :icon="['fas', 'earth-americas']" aria-hidden="true" />
          <span>{{ t('contact.locationValue') }}</span>
        </span>
      </li>
    </ul>

    <div class="contact-quick__social" role="list" aria-label="Redes sociais">
      <a
        v-for="net in socials"
        :key="net.key"
        :href="net.href"
        target="_blank"
        rel="noopener noreferrer"
        class="contact-quick__social-btn"
        :aria-label="net.label"
      >
        <font-awesome-icon :icon="net.icon" aria-hidden="true" />
      </a>
    </div>
  </div>
</template>

<style scoped>
.contact-quick {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-top: 1.25rem;
  border-top: 1px solid rgba(237, 238, 237, 0.08);
}

.contact-quick__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}

.contact-quick__item {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  font-size: 0.78rem;
  color: rgba(237, 238, 237, 0.72);
  text-decoration: none;
  transition: color 0.2s ease;
}

a.contact-quick__item:hover {
  color: var(--section-accent, var(--tertiary-color));
}

.contact-quick__item svg {
  width: 0.95rem;
  flex-shrink: 0;
  color: var(--section-accent, var(--tertiary-color));
}

.contact-quick__item--accent svg {
  color: var(--section-accent, var(--tertiary-color));
}

.contact-quick__item--static {
  cursor: default;
}

.contact-quick__social {
  display: flex;
  gap: 0.5rem;
}

.contact-quick__social-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.1rem;
  height: 2.1rem;
  border-radius: 0.5rem;
  border: 1px solid rgba(237, 238, 237, 0.12);
  background: rgba(255, 255, 255, 0.03);
  color: rgba(237, 238, 237, 0.75);
  font-size: 0.95rem;
  text-decoration: none;
  transition: border-color 0.2s ease, color 0.2s ease, background 0.2s ease;
}

.contact-quick__social-btn:hover {
  border-color: rgba(var(--section-accent-rgb, 118, 192, 70), 0.45);
  color: var(--section-accent, var(--tertiary-color));
  background: rgba(var(--section-accent-rgb, 118, 192, 70), 0.08);
}
</style>
