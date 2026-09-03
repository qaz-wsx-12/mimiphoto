// ============================================================
// MimicPhoto Utility Functions
// ============================================================

import type { FileFormat } from '@/types/index'

// ---------- Formatting ----------

/** Format a number with commas (e.g. 1000 → "1,000") */
export function formatNumber(n: number): string {
  return n.toLocaleString('en-US')
}

/** Format a price with dollar sign */
export function formatPrice(price: number, decimals = 0): string {
  return `$${price.toFixed(decimals)}`
}

/** Format credit cost display */
export function formatCredits(credits: number | string): string {
  if (typeof credits === 'string') return credits
  return `${credits} cr`
}

// ---------- File Validation ----------

const ALLOWED_TYPES: Record<FileFormat, string[]> = {
  png: ['image/png'],
  jpg: ['image/jpeg'],
  jpeg: ['image/jpeg'],
  webp: ['image/webp'],
}

export const ACCEPTED_FORMATS = 'image/png, image/jpeg, image/webp'

/** Validate uploaded file format and size */
export function validateFile(file: File, maxSize: number): { valid: boolean; error?: string } {
  const ext = file.name.split('.').pop()?.toLowerCase() as FileFormat | undefined

  if (!ext || !ALLOWED_TYPES[ext]) {
    return { valid: false, error: 'Unsupported file format. Please use PNG, JPG, or WEBP.' }
  }

  if (file.size > maxSize) {
    const maxMB = Math.round(maxSize / (1024 * 1024))
    return { valid: false, error: `File too large. Maximum size is ${maxMB}MB.` }
  }

  return { valid: true }
}

// ---------- URL / Slug Helpers ----------

/** Convert a tool name to a URL-friendly slug */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

/** Get the image path for an asset based on its name */
export function getAssetPath(name: string): string {
  return new URL(`../assets/${name}`, import.meta.url).href
}

// ---------- Debounce ----------

export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay = 300,
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout> | null = null
  return (...args: Parameters<T>) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }
}

// ---------- Scroll ----------

/** Smooth scroll to an element by selector */
export function scrollToElement(selector: string): void {
  const el = document.querySelector(selector)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

/** Check if an element is in viewport */
export function isInViewport(el: HTMLElement, threshold = 0.1): boolean {
  const rect = el.getBoundingClientRect()
  return (
    rect.top < (window.innerHeight || document.documentElement.clientHeight) * (1 - threshold) &&
    rect.bottom > 0
  )
}

// ---------- Local Storage ----------

export const storage = {
  get<T>(key: string, fallback: T): T {
    try {
      const raw = localStorage.getItem(key)
      return raw ? (JSON.parse(raw) as T) : fallback
    } catch {
      return fallback
    }
  },

  set(key: string, value: unknown): void {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      console.warn('Failed to save to localStorage')
    }
  },

  remove(key: string): void {
    localStorage.removeItem(key)
  },
}

// ---------- ID Generation ----------

let idCounter = 0

export function uniqueId(prefix = 'id'): string {
  idCounter += 1
  return `${prefix}-${Date.now()}-${idCounter}`
}
