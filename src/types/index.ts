// ============================================================
// Tool & Category Types
// ============================================================

/** Supported tool categories */
export type ToolCategory = 'image' | 'video'

/** Tool status badge */
export type ToolBadge = 'hot' | 'free' | 'new' | null

/** Editor control type */
export type EditorControlType =
  'sliders' | 'prompt' | 'multi-upload' | 'dual-upload' | 'time-slider'

/** A single AI tool definition */
export interface Tool {
  id: string
  name: string
  slug: string
  description: string
  category: ToolCategory
  badge: ToolBadge
  creditCost: string | number
  icon: string
  href: string
  features?: string[]
  editorType: EditorControlType
  /** Tool-specific controls config */
  controls?: {
    /** For prompt type: placeholder text */
    promptPlaceholder?: string
    /** For multi-upload: max files */
    maxFiles?: number
    /** For sliders: custom slider definitions */
    sliders?: Array<{
      label: string
      min: number
      max: number
      step: number
      defaultValue: number
    }>
    /** Additional settings like quality, duration, etc. */
    settings?: Array<{
      label: string
      type: 'select' | 'toggle' | 'number'
      options?: string[]
      defaultValue: string | number | boolean
    }>
  }
}

/** Tool category with tools list */
export interface ToolCategoryGroup {
  category: ToolCategory
  tools: Tool[]
  count: number
}

// ============================================================
// Pricing Types
// ============================================================

export type BillingCycle = 'monthly' | 'yearly'

export interface PricingPlan {
  id: BillingCycle
  name: string
  price: number
  originalPrice?: number
  period: string
  billingNote?: string
  description: string
  features: string[]
  credits: number
  highlight?: boolean
  badge?: string
}

export interface CreditCostItem {
  name: string
  credits: string
  category: ToolCategory
}

// ============================================================
// Feature / Value Proposition Types
// ============================================================

export interface FeatureItem {
  icon: string
  title: string
  description: string
}

export interface FAQItem {
  id: string
  question: string
  answer: string
}

// ============================================================
// Upload & Editor Types
// ============================================================

export type FileFormat = 'png' | 'jpg' | 'jpeg' | 'webp'
export const MAX_FILE_SIZE = 15 * 1024 * 1024 // 15MB

export interface UploadState {
  file: File | null
  previewUrl: string | null
  isDragging: boolean
  isUploading: boolean
  error: string | null
}

export interface EditorPreset {
  id: string
  label: string
  value: Record<string, number>
}

export interface EditorSlider {
  id: string
  label: string
  min: number
  max: number
  step: number
  value: number
}

// ============================================================
// API Response Types
// ============================================================

export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  total: number
  page: number
  pageSize: number
}

// ============================================================
// User & Auth Types
// ============================================================

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  credits: number
  plan: BillingCycle | null
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  token: string | null
}

// ============================================================
// Navigation Types
// ============================================================

export interface NavItem {
  label: string
  href: string
  icon?: string
  children?: NavItem[]
}
