<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from '@/i18n'

const { t } = useI18n()

const whatsappUrl = computed(() => {
  const message = encodeURIComponent(t.value('whatsapp.message'))
  return `https://wa.me/5542991583814?text=${message}`
})
</script>

<template>
  <a
    :href="whatsappUrl"
    target="_blank"
    rel="noopener noreferrer"
    class="whatsapp-btn"
    :aria-label="t('whatsapp.label')"
    :title="t('whatsapp.label')"
  >
    <font-awesome-icon :icon="['fab', 'whatsapp']" />
  </a>
</template>

<style scoped>
.whatsapp-btn {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  z-index: 999;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #25d366;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.75rem;
  box-shadow: 0 4px 20px rgba(37, 211, 102, 0.4);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  text-decoration: none;
}

.whatsapp-btn:hover {
  transform: scale(1.08);
  box-shadow: 0 6px 28px rgba(37, 211, 102, 0.55);
  color: #fff;
}
</style>
