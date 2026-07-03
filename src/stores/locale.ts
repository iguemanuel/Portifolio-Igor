import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import ptBR from '@/i18n/locales/pt-BR'
import en from '@/i18n/locales/en'

export type Locale = 'pt-BR' | 'en'

const messages: Record<Locale, typeof ptBR> = { 'pt-BR': ptBR, en }

function getNestedValue(obj: Record<string, unknown>, path: string): unknown {
  return path.split('.').reduce<unknown>((acc, key) => {
    if (acc !== null && acc !== undefined && typeof acc === 'object' && key in (acc as object)) {
      return (acc as Record<string, unknown>)[key]
    }
    return undefined
  }, obj)
}

function interpolate(template: string, params?: Record<string, string | number>): string {
  if (!params) return template
  return template.replace(/\{(\w+)\}/g, (_, key) => String(params[key] ?? `{${key}}`))
}

export const useLocaleStore = defineStore('locale', () => {
  const saved = localStorage.getItem('locale') as Locale | null
  const browserDefault: Locale = navigator.language.startsWith('pt') ? 'pt-BR' : 'en'
  const locale = ref<Locale>(
    saved === 'en' || saved === 'pt-BR' ? saved : browserDefault
  )

  const t = computed(() => {
    const msgs = messages[locale.value]
    return (key: string, params?: Record<string, string | number>): string => {
      const value = getNestedValue(msgs as Record<string, unknown>, key)
      if (typeof value === 'string') return interpolate(value, params)
      return key
    }
  })

  const tm = computed(() => {
    const msgs = messages[locale.value]
    return (key: string): string[] => {
      const value = getNestedValue(msgs as Record<string, unknown>, key)
      return Array.isArray(value) ? (value as string[]) : []
    }
  })

  function translate(key: string, params?: Record<string, string | number>): string {
    return t.value(key, params)
  }

  function translateArray(key: string): string[] {
    return tm.value(key)
  }

  function setLocale(lang: Locale) {
    locale.value = lang
    localStorage.setItem('locale', lang)
    document.documentElement.lang = lang === 'en' ? 'en' : 'pt-BR'
    document.title = translate('meta.title')
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) metaDesc.setAttribute('content', translate('meta.description'))
  }

  return { locale, t, tm, translate, translateArray, setLocale }
})
