<script setup lang="ts">
import { skillCategories } from '@/db/Skills'
import { useI18n } from '@/i18n'

const { t } = useI18n()
</script>

<template>
  <div class="skills-block">
    <div v-for="category in skillCategories" :key="category.key" class="skill-group">
      <span class="skill-group__label">{{ t(`about.skillCategories.${category.key}`) }}</span>
      <div class="skill-group__list">
        <div
          v-for="skill in category.skills"
          :key="skill.name"
          class="skill-chip"
          :title="skill.name"
        >
          <img
            v-if="'custom' in skill && skill.custom"
            :src="`/img/${skill.icon}.png`"
            :alt="skill.name"
            class="skill-chip__icon"
          />
          <img
            v-else
            :src="`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${skill.icon}/${skill.icon}-original.svg`"
            :alt="skill.name"
            class="skill-chip__icon"
          />
          <span>{{ skill.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.skills-block {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem 1.5rem;
}

.skill-group__label {
  display: block;
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: rgba(237, 238, 237, 0.4);
  margin-bottom: 0.6rem;
}

.skill-group__list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

.skill-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.35rem 0.7rem;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(118, 192, 70, 0.15);
  border-radius: 999px;
  font-size: 0.78rem;
  font-weight: 600;
  color: rgba(237, 238, 237, 0.8);
  transition: all 0.2s ease;
}

.skill-chip:hover {
  border-color: var(--tertiary-color);
  color: var(--tertiary-color);
  background: rgba(118, 192, 70, 0.08);
}

.skill-chip__icon {
  width: 16px;
  height: 16px;
  object-fit: contain;
}

@media (max-width: 500px) {
  .skills-block {
    grid-template-columns: 1fr;
  }
}
</style>
