<template>
  <div class="tool-page">
    <div class="container">
      <!-- Tool Header -->
      <div v-if="tool" class="tool-page__header animate-fade-in-up">
        <h1 class="tool-page__title">
          <span class="tool-page__icon">{{ tool.icon }}</span>
          {{ tool.name }}
        </h1>
        <p class="tool-page__desc">{{ tool.description }}</p>
      </div>

      <!-- Not Found -->
      <div v-else class="tool-page__not-found animate-fade-in">
        <h2>Tool not found</h2>
        <p>This tool doesn't exist or has been removed.</p>
        <router-link to="/apps/explore" class="btn btn--primary"> Explore all tools </router-link>
      </div>

      <!-- Editor Workspace -->
      <div v-if="tool" class="tool-page__workspace">
        <!-- Upload Area -->
        <div
          v-if="!editorStore.previewUrl"
          class="tool-page__upload"
          :class="{ 'tool-page__upload--dragging': isDragging }"
          @dragenter="onDragEnter"
          @dragover="onDragOver"
          @dragleave="onDragLeave"
          @drop="onDrop"
          @click="triggerFileInput"
        >
          <input
            ref="fileInputRef"
            type="file"
            :accept="acceptedFormats"
            class="tool-page__file-input"
            @change="onFileInput"
          />
          <div class="tool-page__upload-content">
            <span class="tool-page__upload-icon">📁</span>
            <h3 class="tool-page__upload-title">Drop your photo here or click to select</h3>
            <p class="tool-page__upload-hint">PNG, JPG, WEBP (max 15MB)</p>
          </div>
        </div>

        <!-- Editor Panel -->
        <div v-else class="tool-page__editor">
          <!-- Image Preview -->
          <div class="tool-page__preview">
            <div class="tool-page__preview-label">Original</div>
            <img
              :src="editorStore.previewUrl!"
              alt="Uploaded photo"
              class="tool-page__preview-img"
            />

            <!-- Result Preview -->
            <div v-if="editorStore.resultUrl" class="tool-page__result">
              <div class="tool-page__preview-label">Result</div>
              <img
                :src="editorStore.resultUrl"
                alt="Processed result"
                class="tool-page__preview-img"
              />
            </div>

            <button class="btn btn--ghost btn--sm tool-page__change-btn" @click="handleClear">
              Change photo
            </button>
          </div>

          <!-- Controls Panel -->
          <div class="tool-page__controls">
            <!-- Quick Presets -->
            <div class="tool-page__section">
              <h4 class="tool-page__section-title">Quick Presets</h4>
              <div class="tool-page__presets">
                <button
                  v-for="preset in editorStore.presets"
                  :key="preset.id"
                  class="tool-page__preset-btn"
                  :class="{
                    'tool-page__preset-btn--active': editorStore.activePresetId === preset.id,
                  }"
                  @click="editorStore.applyPreset(preset.id)"
                >
                  {{ preset.label }}
                </button>
              </div>
            </div>

            <!-- Sliders -->
            <div class="tool-page__section">
              <h4 class="tool-page__section-title">Adjustments</h4>
              <div class="tool-page__sliders">
                <div
                  v-for="slider in editorStore.sliders"
                  :key="slider.id"
                  class="tool-page__slider"
                >
                  <div class="tool-page__slider-header">
                    <label class="tool-page__slider-label">{{ slider.label }}</label>
                    <span class="tool-page__slider-value">{{ slider.value.toFixed(2) }}</span>
                  </div>
                  <input
                    type="range"
                    :min="slider.min"
                    :max="slider.max"
                    :step="slider.step"
                    :value="slider.value"
                    class="tool-page__range"
                    @input="(e) => onSliderChange(slider.id, e)"
                  />
                </div>
              </div>
            </div>

            <!-- Process Button -->
            <button
              class="btn btn--primary btn--lg tool-page__process-btn"
              :disabled="editorStore.isProcessing"
              @click="handleProcess"
            >
              <span v-if="editorStore.isProcessing" class="tool-page__spinner"></span>
              <span v-else>✨ Enhance</span>
            </button>

            <!-- Credits Info -->
            <p v-if="tool" class="tool-page__credits">Cost: {{ tool.creditCost }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getToolBySlug, processImage } from '@api/tools'
import { useEditorStore } from '@stores/index'
import { useFileUpload } from '@hooks/index'

const route = useRoute()
const editorStore = useEditorStore()
const fileInputRef = ref<HTMLInputElement | null>(null)

const {
  isDragging,
  acceptedFormats,
  onFileInput,
  onDragEnter,
  onDragOver,
  onDragLeave,
  onDrop,
  clearFile,
} = useFileUpload()

// Get tool from route slug
const toolSlug = ref(route.params.toolSlug as string)
const tool = ref(getToolBySlug(toolSlug.value))

// Initialize editor when tool changes
function initEditor(): void {
  if (!tool.value) return

  // Initialize based on tool type
  if (tool.value.id === 'face-expression-editor') {
    editorStore.initSliders([
      { label: 'Head Tilt', min: -1, max: 1, step: 0.01, value: 0 },
      { label: 'Eye Openness', min: 0, max: 1, step: 0.01, value: 0.5 },
      { label: 'Smile', min: 0, max: 1, step: 0.01, value: 0.5 },
      { label: 'Mouth Opening', min: 0, max: 1, step: 0.01, value: 0.5 },
    ])
    editorStore.initPresets([
      {
        label: 'Tilt Up',
        value: { 'Head Tilt': 0.5, 'Eye Openness': 0.5, Smile: 0.5, 'Mouth Opening': 0.5 },
      },
      {
        label: 'Turn Left',
        value: { 'Head Tilt': -0.5, 'Eye Openness': 0.5, Smile: 0.5, 'Mouth Opening': 0.5 },
      },
      {
        label: 'Turn Right',
        value: { 'Head Tilt': 0.5, 'Eye Openness': 0.5, Smile: 0.5, 'Mouth Opening': 0.5 },
      },
      {
        label: 'Tilt Down',
        value: { 'Head Tilt': -0.3, 'Eye Openness': 0.3, Smile: 0.5, 'Mouth Opening': 0.5 },
      },
    ])
  } else {
    editorStore.initSliders([
      { label: 'Intensity', min: 0, max: 1, step: 0.01, value: 0.5 },
      { label: 'Smoothness', min: 0, max: 1, step: 0.01, value: 0.5 },
    ])
    editorStore.initPresets([])
  }
}

function triggerFileInput(): void {
  fileInputRef.value?.click()
}

function onSliderChange(sliderId: string, event: Event): void {
  const value = parseFloat((event.target as HTMLInputElement).value)
  editorStore.updateSlider(sliderId, value)
}

async function handleProcess(): Promise<void> {
  if (!editorStore.canProcess || !editorStore.previewUrl) return

  editorStore.setProcessing(true)

  const params: Record<string, number> = {}
  for (const s of editorStore.sliders) {
    params[s.label] = s.value
  }

  const result = await processImage(tool.value!.id, editorStore.previewUrl, params)

  if (result.success && result.data) {
    editorStore.setResult(result.data.resultUrl, result.data.creditsUsed)
  } else {
    editorStore.setError(result.error ?? 'Processing failed')
  }
}

function handleClear(): void {
  clearFile()
  editorStore.reset()
}

// Watch for route changes
watch(
  () => route.params.toolSlug,
  (slug) => {
    if (typeof slug === 'string') {
      toolSlug.value = slug
      tool.value = getToolBySlug(slug)
      editorStore.reset()
      initEditor()
    }
  },
)

onMounted(() => {
  initEditor()
})
</script>

<style lang="scss" scoped>
.tool-page {
  padding: $space-8 0 $space-24;
  min-height: calc(100vh - $header-height);

  &__header {
    text-align: center;
    margin-bottom: $space-10;
  }

  &__title {
    font-size: $font-size-3xl;
    font-weight: $font-weight-bold;
    margin-bottom: $space-3;
    @include gradient-text;

    @include md {
      font-size: $font-size-4xl;
    }
  }

  &__icon {
    font-size: $font-size-4xl;
    margin-right: $space-3;
  }

  &__desc {
    font-size: $font-size-lg;
    color: $color-text-secondary;
    max-width: 600px;
    margin: 0 auto;
  }

  &__not-found {
    text-align: center;
    padding: $space-20 0;

    h2 {
      margin-bottom: $space-4;
    }

    p {
      margin-bottom: $space-8;
    }
  }

  // Upload
  &__upload {
    max-width: 600px;
    margin: 0 auto;
    padding: $space-16 $space-8;
    border: 2px dashed $color-border;
    border-radius: $radius-xl;
    text-align: center;
    cursor: pointer;
    @include transition(border-color, background-color);

    &:hover,
    &--dragging {
      border-color: $color-primary;
      background: rgba($color-primary, 0.05);
    }
  }

  &__file-input {
    display: none;
  }

  &__upload-icon {
    font-size: $font-size-5xl;
    display: block;
    margin-bottom: $space-4;
  }

  &__upload-title {
    font-size: $font-size-lg;
    font-weight: $font-weight-semibold;
    margin-bottom: $space-2;
    color: $color-text;
  }

  &__upload-hint {
    font-size: $font-size-sm;
    color: $color-text-muted;
  }

  // Editor
  &__editor {
    display: grid;
    grid-template-columns: 1fr;
    gap: $space-8;

    @include lg {
      grid-template-columns: 1fr 380px;
    }
  }

  &__preview {
    @include flex-column;
    gap: $space-4;
  }

  &__preview-label {
    font-size: $font-size-sm;
    font-weight: $font-weight-semibold;
    color: $color-text-secondary;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  &__preview-img {
    width: 100%;
    border-radius: $radius-lg;
    border: 1px solid $color-border;
    background: $color-bg-card;
  }

  &__change-btn {
    align-self: flex-start;
  }

  &__result {
    @include flex-column;
    gap: $space-4;
    margin-top: $space-4;
    padding-top: $space-4;
    border-top: 1px solid $color-border;
  }

  // Controls
  &__controls {
    @include flex-column;
    gap: $space-6;
    padding: $space-6;
    background: $color-bg-card;
    border: 1px solid $color-border;
    border-radius: $radius-xl;
    height: fit-content;
  }

  &__section {
    @include flex-column;
    gap: $space-3;
  }

  &__section-title {
    font-size: $font-size-sm;
    font-weight: $font-weight-semibold;
    color: $color-text;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  &__presets {
    display: flex;
    flex-wrap: wrap;
    gap: $space-2;
  }

  &__preset-btn {
    padding: $space-2 $space-4;
    border: 1px solid $color-border;
    border-radius: $radius-full;
    font-size: $font-size-sm;
    font-weight: $font-weight-medium;
    color: $color-text-secondary;
    @include transition(all);

    &:hover {
      border-color: $color-primary;
      color: $color-text;
    }

    &--active {
      background: $color-primary;
      border-color: $color-primary;
      color: $color-text-on-primary;
    }
  }

  &__sliders {
    @include flex-column;
    gap: $space-4;
  }

  &__slider {
    @include flex-column;
    gap: $space-2;
  }

  &__slider-header {
    @include flex-between;
  }

  &__slider-label {
    font-size: $font-size-sm;
    color: $color-text-secondary;
  }

  &__slider-value {
    font-size: $font-size-sm;
    font-weight: $font-weight-medium;
    color: $color-primary-light;
    font-family: $font-family-mono;
  }

  &__range {
    width: 100%;
    height: 4px;
    -webkit-appearance: none;
    background: $color-border;
    border-radius: $radius-full;
    outline: none;

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: $color-primary;
      cursor: pointer;
      @include transition(box-shadow);

      &:hover {
        box-shadow: 0 0 0 4px rgba($color-primary, 0.2);
      }
    }
  }

  &__process-btn {
    width: 100%;
    min-height: 48px;
  }

  &__spinner {
    display: inline-block;
    width: 18px;
    height: 18px;
    border: 2px solid rgba($color-text-on-primary, 0.3);
    border-top-color: $color-text-on-primary;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  &__credits {
    font-size: $font-size-sm;
    color: $color-text-muted;
    text-align: center;
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
