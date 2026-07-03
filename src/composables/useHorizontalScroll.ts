import { onBeforeUnmount, ref, type Ref } from 'vue'

const easeOutQuint = (t: number) => 1 - (1 - t) ** 5

export function useHorizontalScroll(trackRef: Ref<HTMLElement | null>) {
  const activeIndex = ref(0)
  const isDragging = ref(false)
  const scrollProgress = ref(0)

  let dragStartX = 0
  let dragScrollLeft = 0
  let velocity = 0
  let lastMoveX = 0
  let lastMoveTime = 0
  let rafId = 0
  let scrollRafId = 0
  let animating = false

  const getSlides = () => {
    const track = trackRef.value
    if (!track) return []
    return Array.from(track.querySelectorAll<HTMLElement>('[data-slide]'))
  }

  const getSlideTargetLeft = (slide: HTMLElement, track: HTMLElement) => {
    const styles = getComputedStyle(track)
    const paddingLeft = parseFloat(styles.paddingLeft) || 0
    return slide.offsetLeft - paddingLeft
  }

  const updateActiveIndex = () => {
    const track = trackRef.value
    const slides = getSlides()
    if (!track || slides.length === 0) return

    const marker = track.scrollLeft + 16
    let closest = 0
    let minDist = Infinity

    slides.forEach((slide, index) => {
      const dist = Math.abs(slide.offsetLeft - marker)
      if (dist < minDist) {
        minDist = dist
        closest = index
      }
    })

    activeIndex.value = closest

    const maxScroll = track.scrollWidth - track.clientWidth
    scrollProgress.value = maxScroll > 0 ? track.scrollLeft / maxScroll : 0
  }

  const scheduleIndexUpdate = () => {
    if (scrollRafId) return
    scrollRafId = requestAnimationFrame(() => {
      scrollRafId = 0
      updateActiveIndex()
    })
  }

  const animateScrollTo = (
    targetLeft: number,
    duration = 720,
    onComplete?: () => void,
  ) => {
    const track = trackRef.value
    if (!track) return

    cancelAnimationFrame(rafId)
    animating = true

    const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth)
    const clampedTarget = Math.max(0, Math.min(targetLeft, maxScroll))
    const startLeft = track.scrollLeft
    const distance = clampedTarget - startLeft
    const startTime = performance.now()

    const step = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      track.scrollLeft = startLeft + distance * easeOutQuint(progress)
      scheduleIndexUpdate()

      if (progress < 1) {
        rafId = requestAnimationFrame(step)
      } else {
        animating = false
        updateActiveIndex()
        onComplete?.()
      }
    }

    rafId = requestAnimationFrame(step)
  }

  const scrollToIndex = (index: number, duration = 720) => {
    const track = trackRef.value
    const slides = getSlides()
    const slide = slides[index]
    if (!track || !slide || animating) return

    animateScrollTo(getSlideTargetLeft(slide, track), duration)
  }

  const snapToNearest = (duration = 580) => {
    const track = trackRef.value
    const slides = getSlides()
    if (!track || slides.length === 0) return

    const marker = track.scrollLeft + 16
    let closest = 0
    let minDist = Infinity

    slides.forEach((slide, index) => {
      const dist = Math.abs(slide.offsetLeft - marker)
      if (dist < minDist) {
        minDist = dist
        closest = index
      }
    })

    scrollToIndex(closest, duration)
  }

  const prev = () => {
    scrollToIndex(Math.max(0, activeIndex.value - 1))
  }

  const next = () => {
    const slides = getSlides()
    scrollToIndex(Math.min(slides.length - 1, activeIndex.value + 1))
  }

  const onScroll = () => {
    if (!animating) scheduleIndexUpdate()
  }

  const onWheel = (event: WheelEvent) => {
    const track = trackRef.value
    if (!track) return

    const absX = Math.abs(event.deltaX)
    const absY = Math.abs(event.deltaY)
    if (absX <= absY && absY > 0) return

    event.preventDefault()
    const delta = (event.deltaX || event.deltaY) * 0.85
    animateScrollTo(track.scrollLeft + delta, 320)
  }

  const onPointerDown = (event: PointerEvent) => {
    const track = trackRef.value
    if (!track || event.button !== 0) return

    const target = event.target as HTMLElement
    if (target.closest('a, button')) return

    isDragging.value = true
    dragStartX = event.clientX
    dragScrollLeft = track.scrollLeft
    lastMoveX = event.clientX
    lastMoveTime = performance.now()
    velocity = 0

    cancelAnimationFrame(rafId)
    animating = false
    track.classList.add('is-dragging')
    track.setPointerCapture(event.pointerId)
  }

  const onPointerMove = (event: PointerEvent) => {
    const track = trackRef.value
    if (!isDragging.value || !track) return

    const now = performance.now()
    const delta = event.clientX - dragStartX
    track.scrollLeft = dragScrollLeft - delta * 0.92

    const dt = now - lastMoveTime
    if (dt > 0) {
      velocity = (event.clientX - lastMoveX) / dt
    }
    lastMoveX = event.clientX
    lastMoveTime = now
    scheduleIndexUpdate()
  }

  const onPointerUp = (event: PointerEvent) => {
    const track = trackRef.value
    if (!isDragging.value || !track) return

    isDragging.value = false
    track.classList.remove('is-dragging')
    track.releasePointerCapture(event.pointerId)

    const momentum = velocity * 120
    if (Math.abs(momentum) > 6) {
      animateScrollTo(track.scrollLeft - momentum, 520, () => snapToNearest(580))
    } else {
      snapToNearest(580)
    }
  }

  const bind = () => {
    const track = trackRef.value
    if (!track) return

    track.addEventListener('scroll', onScroll, { passive: true })
    track.addEventListener('wheel', onWheel, { passive: false })
    track.addEventListener('pointerdown', onPointerDown)
    track.addEventListener('pointermove', onPointerMove)
    track.addEventListener('pointerup', onPointerUp)
    track.addEventListener('pointercancel', onPointerUp)
    updateActiveIndex()
  }

  const unbind = () => {
    const track = trackRef.value
    cancelAnimationFrame(rafId)
    cancelAnimationFrame(scrollRafId)

    track?.removeEventListener('scroll', onScroll)
    track?.removeEventListener('wheel', onWheel)
    track?.removeEventListener('pointerdown', onPointerDown)
    track?.removeEventListener('pointermove', onPointerMove)
    track?.removeEventListener('pointerup', onPointerUp)
    track?.removeEventListener('pointercancel', onPointerUp)
  }

  onBeforeUnmount(unbind)

  return {
    activeIndex,
    isDragging,
    scrollProgress,
    bind,
    unbind,
    prev,
    next,
    scrollToIndex,
    updateActiveIndex,
  }
}
