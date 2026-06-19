export const SCROLL_CONTAINER_SELECTOR = '.fullpage-container'

export const LANDING_SECTIONS = ['home', 'projects', 'about', 'experience', 'contact'] as const

export type LandingSectionId = (typeof LANDING_SECTIONS)[number]

export function getScrollContainer(): HTMLElement | null {
  return document.querySelector<HTMLElement>(SCROLL_CONTAINER_SELECTOR)
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
