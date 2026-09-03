// ============================================================
// useFileUpload — File upload with drag & drop
// ============================================================

import { ref, onUnmounted } from 'vue'
import { validateFile, ACCEPTED_FORMATS } from '@utils/index'
import { MAX_FILE_SIZE } from '@/types/index'

export function useFileUpload(maxSize = MAX_FILE_SIZE) {
  const file = ref<File | null>(null)
  const previewUrl = ref<string | null>(null)
  const isDragging = ref(false)
  const isUploading = ref(false)
  const error = ref<string | null>(null)

  let dragCounter = 0

  function handleFile(selected: File): void {
    error.value = null
    const result = validateFile(selected, maxSize)

    if (!result.valid) {
      error.value = result.error ?? 'Invalid file'
      return
    }

    // Revoke previous preview
    if (previewUrl.value) {
      URL.revokeObjectURL(previewUrl.value)
    }

    file.value = selected
    previewUrl.value = URL.createObjectURL(selected)
  }

  function onFileInput(event: Event): void {
    const input = event.target as HTMLInputElement
    const selected = input.files?.[0]
    if (selected) handleFile(selected)
    input.value = '' // reset so same file can be re-selected
  }

  function onDragEnter(event: DragEvent): void {
    event.preventDefault()
    dragCounter++
    isDragging.value = true
  }

  function onDragOver(event: DragEvent): void {
    event.preventDefault()
  }

  function onDragLeave(event: DragEvent): void {
    event.preventDefault()
    dragCounter--
    if (dragCounter === 0) {
      isDragging.value = false
    }
  }

  function onDrop(event: DragEvent): void {
    event.preventDefault()
    isDragging.value = false
    dragCounter = 0
    const dropped = event.dataTransfer?.files[0]
    if (dropped) handleFile(dropped)
  }

  function clearFile(): void {
    if (previewUrl.value) {
      URL.revokeObjectURL(previewUrl.value)
    }
    file.value = null
    previewUrl.value = null
    error.value = null
  }

  onUnmounted(() => {
    if (previewUrl.value) {
      URL.revokeObjectURL(previewUrl.value)
    }
  })

  return {
    file,
    previewUrl,
    isDragging,
    isUploading,
    error,
    acceptedFormats: ACCEPTED_FORMATS,
    handleFile,
    onFileInput,
    onDragEnter,
    onDragOver,
    onDragLeave,
    onDrop,
    clearFile,
  }
}
