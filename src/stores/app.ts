// ============================================================
// App Store — Global UI State
// ============================================================

import { defineStore } from 'pinia'
import { ref } from 'vue'
import { storage } from '@utils/index'

export const useAppStore = defineStore('app', () => {
  // ---------- State ----------
  const isMobileMenuOpen = ref(false)
  const isDarkMode = ref(storage.get<boolean>('theme-dark', true))
  const activeCategory = ref<'all' | 'image' | 'video'>('all')
  const searchQuery = ref('')
  const isScrolled = ref(false)
  const toasts = ref<Array<{ id: string; message: string; type: 'success' | 'error' | 'info' }>>([])

  // ---------- Actions ----------

  function toggleMobileMenu(): void {
    isMobileMenuOpen.value = !isMobileMenuOpen.value
    document.body.style.overflow = isMobileMenuOpen.value ? 'hidden' : ''
  }

  function closeMobileMenu(): void {
    isMobileMenuOpen.value = false
    document.body.style.overflow = ''
  }

  function setActiveCategory(cat: 'all' | 'image' | 'video'): void {
    activeCategory.value = cat
  }

  function setSearchQuery(query: string): void {
    searchQuery.value = query
  }

  function setScrolled(value: boolean): void {
    isScrolled.value = value
  }

  function toggleDarkMode(): void {
    isDarkMode.value = !isDarkMode.value
    storage.set('theme-dark', isDarkMode.value)
    document.documentElement.setAttribute('data-theme', isDarkMode.value ? 'dark' : 'light')
  }

  function addToast(message: string, type: 'success' | 'error' | 'info' = 'info'): void {
    const id = `toast-${Date.now()}`
    toasts.value.push({ id, message, type })
    setTimeout(() => removeToast(id), 4000)
  }

  function removeToast(id: string): void {
    toasts.value = toasts.value.filter((t) => t.id !== id)
  }

  return {
    // State
    isMobileMenuOpen,
    isDarkMode,
    activeCategory,
    searchQuery,
    isScrolled,
    toasts,
    // Actions
    toggleMobileMenu,
    closeMobileMenu,
    setActiveCategory,
    setSearchQuery,
    setScrolled,
    toggleDarkMode,
    addToast,
    removeToast,
  }
})
