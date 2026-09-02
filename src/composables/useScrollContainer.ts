export const SCROLL_CONTAINER_SELECTOR = '.fullpage-container'

export const LANDING_SECTIONS = ['home', 'projects', 'about', 'experience', 'contact'] as const

export type LandingSectionId = (typeof LANDING_SECTIONS)[number]

const RETRY_INTERVAL = 50
const RETRY_LIMIT = 40

export function getScrollContainer(): HTMLElement | null {
  return document.querySelector<HTMLElement>(SCROLL_CONTAINER_SELECTOR)
}

function isScrollable(el: HTMLElement): boolean {
  const overflowY = getComputedStyle(el).overflowY
  return (overflowY === 'auto' || overflowY === 'scroll') && el.scrollHeight > el.clientHeight
}

/** Sobe no DOM a partir de `from` até achar o elemento que realmente rola. */
export function findScrollableAncestor(from: HTMLElement | null): HTMLElement | null {
  let el: HTMLElement | null = from

  while (el && el !== document.body) {
    if (isScrollable(el)) return el
    el = el.parentElement
  }

  return null
}

/**
 * Container rolável da rota atual: o `.fullpage-container` da landing ou o wrapper
 * das páginas standalone (`.briefing-page`, `.cv-page`, `.projects-page`).
 */
export function getActiveScrollContainer(): HTMLElement | null {
  const landing = getScrollContainer()
  if (landing) return landing

  const root = document.getElementById('app')
  if (!root) return null

  for (const child of Array.from(root.children)) {
    if (child instanceof HTMLElement && isScrollable(child)) return child
  }

  return null
}

function getSectionScrollTop(section: HTMLElement, container: HTMLElement): number {
  const sectionRect = section.getBoundingClientRect()
  const containerRect = container.getBoundingClientRect()
  return sectionRect.top - containerRect.top + container.scrollTop
}

export function scrollToSection(sectionId: string, behavior: ScrollBehavior = 'smooth'): boolean {
  const section = document.getElementById(sectionId)
  if (!section) return false

  const container = getScrollContainer()
  if (container) {
    container.scrollTo({ top: getSectionScrollTop(section, container), behavior })
    return true
  }

  section.scrollIntoView({ behavior })
  return true
}

function retry(step: (giveUp: boolean) => boolean, tries = 0): void {
  if (step(tries >= RETRY_LIMIT)) return
  setTimeout(() => retry(step, tries + 1), RETRY_INTERVAL)
}

/**
 * Espera a landing montar antes de rolar. Usado na navegação entre rotas, onde o
 * `.fullpage-container` e as seções ainda não existem no momento do `scrollBehavior`.
 */
export function scrollToSectionWhenReady(
  sectionId: string,
  behavior: ScrollBehavior = 'smooth',
): Promise<boolean> {
  return new Promise((resolve) => {
    retry((giveUp) => {
      const section = document.getElementById(sectionId)
      const container = getScrollContainer()

      if (section && container) {
        container.scrollTo({ top: getSectionScrollTop(section, container), behavior })
        resolve(true)
        return true
      }

      if (giveUp) {
        resolve(scrollToSection(sectionId, behavior))
        return true
      }

      return false
    })
  })
}

export function waitForScrollContainer(): Promise<HTMLElement | null> {
  return new Promise((resolve) => {
    retry((giveUp) => {
      const container = getScrollContainer()

      if (container || giveUp) {
        resolve(container)
        return true
      }

      return false
    })
  })
}

export function getActiveLandingSection(container = getScrollContainer()): LandingSectionId {
  if (!container) return 'home'

  const marker = container.scrollTop + container.clientHeight * 0.42
  let current: LandingSectionId = 'home'

  for (const id of LANDING_SECTIONS) {
    const el = document.getElementById(id)
    if (!el) continue

    const top = getSectionScrollTop(el, container)
    if (top <= marker + 1) {
      current = id
    }
  }

  return current
}

export function bindActiveSectionTracking(onChange: (id: LandingSectionId) => void): (() => void) | null {
  const container = getScrollContainer()
  if (!container) return null

  const ratios = new Map<string, number>()

  const emitActive = () => {
    onChange(getActiveLandingSection(container))
  }

  const pickFromRatios = () => {
    let bestId: LandingSectionId = getActiveLandingSection(container)
    let bestRatio = 0

    for (const id of LANDING_SECTIONS) {
      const ratio = ratios.get(id) ?? 0
      if (ratio > bestRatio) {
        bestRatio = ratio
        bestId = id
      }
    }

    if (bestRatio > 0.15) {
      onChange(bestId)
      return
    }

    emitActive()
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        ratios.set(entry.target.id, entry.intersectionRatio)
      }
      pickFromRatios()
    },
    {
      root: container,
      threshold: [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1],
    },
  )

  for (const id of LANDING_SECTIONS) {
    const el = document.getElementById(id)
    if (el) observer.observe(el)
  }

  container.addEventListener('scroll', emitActive, { passive: true })
  emitActive()

  return () => {
    observer.disconnect()
    container.removeEventListener('scroll', emitActive)
  }
}
