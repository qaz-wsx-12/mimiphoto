// ============================================================
// useScrollPosition — Track scroll state and direction
// ============================================================

import { ref, onMounted, onUnmounted } from 'vue'

export function useScrollPosition(threshold = 10) {
  const scrollY = ref(0)
  const isScrolled = ref(false)
  const isScrollingUp = ref(false)

  let lastScrollY = 0

  function onScroll(): void {
    scrollY.value = window.scrollY
    isScrolled.value = window.scrollY > threshold
    isScrollingUp.value = window.scrollY < lastScrollY
    lastScrollY = window.scrollY
  }

  onMounted(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
  })

  return { scrollY, isScrolled, isScrollingUp }
}
