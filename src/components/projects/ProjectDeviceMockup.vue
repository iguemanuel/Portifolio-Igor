<script setup lang="ts">
import { useI18n } from '@/i18n'

defineProps<{
  desktopSrc: string
  mobileSrc: string
  title: string
}>()

const { t } = useI18n()
</script>

<template>
  <div class="device-stage">
    <div class="device-stage__grid" aria-hidden="true" />

    <div class="device-stage__cluster">
      <div class="laptop">
        <div class="laptop__bezel">
          <div class="laptop__camera" />
          <img
            :src="desktopSrc"
            :alt="t('projects.screenshotAlt', { title })"
            class="laptop__screen"
            loading="lazy"
            draggable="false"
          />
        </div>
        <div class="laptop__base">
          <div class="laptop__trackpad" />
        </div>
      </div>

      <div class="phone">
        <div class="phone__frame">
          <div class="phone__notch" />
          <img
            :src="mobileSrc"
            :alt="t('projects.mobileScreenshotAlt', { title })"
            class="phone__screen"
            loading="lazy"
            draggable="false"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.device-stage {
  position: relative;
  height: 100%;
  min-height: 0;
  border-radius: 0;
  overflow: hidden;
  background:
    radial-gradient(ellipse 80% 70% at 50% 30%, rgba(var(--section-accent-rgb, 118, 192, 70), 0.08), transparent 70%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%);
}

.device-stage__grid {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(rgba(255, 255, 255, 0.07) 1px, transparent 1px);
  background-size: 18px 18px;
  opacity: 0.35;
  pointer-events: none;
}

.laptop {
  position: relative;
  flex: 1 1 auto;
  width: 72%;
  max-width: 240px;
  z-index: 1;
  transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}

.laptop__bezel {
  position: relative;
  padding: 0.45rem 0.45rem 0.35rem;
  background: #1c1f1a;
  border-radius: 0.65rem 0.65rem 0 0;
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.35);
}

.laptop__camera {
  position: absolute;
  top: 0.22rem;
  left: 50%;
  transform: translateX(-50%);
  width: 0.35rem;
  height: 0.35rem;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
}

.laptop__screen {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 10;
  object-fit: cover;
  object-position: top center;
  border-radius: 0.25rem;
  background: #0a0a0a;
  transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
}

.laptop__base {
  height: 0.55rem;
  margin: 0 auto;
  width: 108%;
  margin-left: -4%;
  background: linear-gradient(180deg, #2a2f28 0%, #171a15 100%);
  border-radius: 0 0 0.45rem 0.45rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-top: none;
  position: relative;
}

.laptop__trackpad {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 22%;
  height: 0.12rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
}

.device-stage__cluster {
  position: absolute;
  left: 50%;
  top: 52%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  width: 92%;
  max-width: 300px;
  transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}

.phone {
  position: relative;
  flex: 0 0 auto;
  width: 26%;
  max-width: 72px;
  margin-left: -10%;
  margin-bottom: 7%;
  z-index: 2;
  filter: drop-shadow(0 12px 24px rgba(0, 0, 0, 0.45));
  transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}

.phone__frame {
  position: relative;
  padding: 0.28rem;
  background: #111411;
  border-radius: 0.85rem;
  border: 1px solid rgba(255, 255, 255, 0.14);
}

.phone__notch {
  position: absolute;
  top: 0.38rem;
  left: 50%;
  transform: translateX(-50%);
  width: 36%;
  height: 0.22rem;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.85);
  z-index: 2;
}

.phone__screen {
  display: block;
  width: 100%;
  aspect-ratio: 9 / 19;
  object-fit: cover;
  object-position: top center;
  border-radius: 0.62rem;
  background: #0a0a0a;
  transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
}
</style>
