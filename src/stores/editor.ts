// ============================================================
// Editor Store — Tool Editor State
// ============================================================

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { EditorSlider, EditorPreset } from '@/types/index'
import { uniqueId } from '@utils/index'

export const useEditorStore = defineStore('editor', () => {
  // ---------- State ----------
  const uploadedFile = ref<File | null>(null)
  const previewUrl = ref<string | null>(null)
  const resultUrl = ref<string | null>(null)
  const isUploading = ref(false)
  const isProcessing = ref(false)
  const error = ref<string | null>(null)
  const sliders = ref<EditorSlider[]>([])
  const presets = ref<EditorPreset[]>([])
  const activePresetId = ref<string | null>(null)
  const creditsUsed = ref(0)

  // ---------- Computed ----------
  const isReady = computed(() => !!previewUrl.value && !isUploading.value)
  const hasResult = computed(() => !!resultUrl.value)
  const canProcess = computed(() => isReady.value && !isProcessing.value)

  // ---------- Actions ----------

  function setUploadedImage(file: File, url: string): void {
    uploadedFile.value = file
    previewUrl.value = url
    resultUrl.value = null
    error.value = null
  }

  function setUploading(value: boolean): void {
    isUploading.value = value
  }

  function setProcessing(value: boolean): void {
    isProcessing.value = value
  }

  function setResult(url: string, credits: number): void {
    resultUrl.value = url
    creditsUsed.value += credits
    isProcessing.value = false
  }

  function setError(msg: string | null): void {
    error.value = msg
    isUploading.value = false
    isProcessing.value = false
  }

  function updateSlider(sliderId: string, value: number): void {
    const slider = sliders.value.find((s) => s.id === sliderId)
    if (slider) {
      slider.value = value
      activePresetId.value = null
    }
  }

  function applyPreset(presetId: string): void {
    const preset = presets.value.find((p) => p.id === presetId)
    if (!preset) return

    activePresetId.value = presetId
    for (const slider of sliders.value) {
      if (slider.id in preset.value) {
        slider.value = preset.value[slider.id]
      }
    }
  }

  function initSliders(defs: Omit<EditorSlider, 'id'>[]): void {
    sliders.value = defs.map((d) => ({ ...d, id: uniqueId('slider') }))
  }

  function initPresets(defs: Omit<EditorPreset, 'id'>[]): void {
    presets.value = defs.map((d) => ({ ...d, id: uniqueId('preset') }))
  }

  function reset(): void {
    uploadedFile.value = null
    previewUrl.value = null
    resultUrl.value = null
    isUploading.value = false
    isProcessing.value = false
    error.value = null
    activePresetId.value = null
    creditsUsed.value = 0
    for (const slider of sliders.value) {
      slider.value = (slider.min + slider.max) / 2
    }
  }

  return {
    // State
    uploadedFile,
    previewUrl,
    resultUrl,
    isUploading,
    isProcessing,
    error,
    sliders,
    presets,
    activePresetId,
    creditsUsed,
    // Computed
    isReady,
    hasResult,
    canProcess,
    // Actions
    setUploadedImage,
    setUploading,
    setProcessing,
    setResult,
    setError,
    updateSlider,
    applyPreset,
    initSliders,
    initPresets,
    reset,
  }
})
