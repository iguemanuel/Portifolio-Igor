import { storeToRefs } from 'pinia'
import { useLocaleStore } from '@/stores/locale'

export type { Locale } from '@/stores/locale'

export function useI18n() {
  const store = useLocaleStore()
  const { locale, t, tm } = storeToRefs(store)

  return {
    locale,
    t,
    tm,
    translate: store.translate,
    translateArray: store.translateArray,
    setLocale: store.setLocale,
  }
}

export function updateDocumentMeta() {
  const store = useLocaleStore()
  document.documentElement.lang = store.locale === 'en' ? 'en' : 'pt-BR'
  document.title = store.translate('meta.title')
  const metaDesc = document.querySelector('meta[name="description"]')
  if (metaDesc) metaDesc.setAttribute('content', store.translate('meta.description'))
}
