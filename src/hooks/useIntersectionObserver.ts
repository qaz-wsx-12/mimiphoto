// ============================================================
// useIntersectionObserver — Animate elements on scroll
// ============================================================

import { ref, onMounted, onUnmounted } from 'vue'
import type { Ref } from 'vue'

export function useIntersectionObserver(options: IntersectionObserverInit = {}): {
  target: Ref<HTMLElement | null>
  isVisible: Ref<boolean>
} {
  const target = ref<HTMLElement | null>(null)
  const isVisible = ref(false)

  let observer: IntersectionObserver | null = null

  onMounted(() => {
    if (!target.value) return

    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          isVisible.value = true
          observer?.disconnect()
        }
      },
      { threshold: 0.1, ...options },
    )

    observer.observe(target.value)
  })

  onUnmounted(() => {
    observer?.disconnect()
  })

  return { target, isVisible }
}
