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
        <span v-if="tool.creditCost" class="tool-page__cost-badge">
          Cost: {{ tool.creditCost }}
        </span>
      </div>

      <!-- Not Found -->
      <div v-else class="tool-page__not-found animate-fade-in">
        <h2>Tool not found</h2>
        <p>This tool doesn't exist or has been removed.</p>
        <router-link to="/apps/explore" class="btn btn--primary"> Explore all tools </router-link>
      </div>

      <!-- ========== EDITOR: Sliders (default) ========== -->
      <div v-if="tool && tool.editorType === 'sliders'" class="tool-page__workspace">
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

        <div v-else class="tool-page__editor">
          <div class="tool-page__preview">
            <div class="tool-page__preview-label">Original</div>
            <img
              :src="editorStore.previewUrl!"
              alt="Uploaded photo"
              class="tool-page__preview-img"
            />
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

          <div class="tool-page__controls">
            <div v-if="editorStore.presets.length" class="tool-page__section">
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

            <div v-if="editorStore.sliders.length" class="tool-page__section">
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

            <button
              class="btn btn--primary btn--lg tool-page__process-btn"
              :disabled="editorStore.isProcessing"
              @click="handleProcess"
            >
              <span v-if="editorStore.isProcessing" class="tool-page__spinner"></span>
              <span v-else>✨ Generate</span>
            </button>
          </div>
        </div>
      </div>

      <!-- ========== EDITOR: Time Slider ========== -->
      <div v-if="tool && tool.editorType === 'time-slider'" class="tool-page__workspace">
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
            <span class="tool-page__upload-icon">⏳</span>
            <h3 class="tool-page__upload-title">
              Upload a photo to start your time travel journey
            </h3>
            <p class="tool-page__upload-hint">PNG, JPG, WEBP (max 15MB)</p>
          </div>
        </div>

        <div v-else class="tool-page__editor">
          <div class="tool-page__preview">
            <div class="tool-page__preview-label">Original Photo</div>
            <img
              :src="editorStore.previewUrl!"
              alt="Uploaded photo"
              class="tool-page__preview-img"
            />
            <div v-if="editorStore.resultUrl" class="tool-page__result">
              <div class="tool-page__preview-label">Time Travel Result</div>
              <img :src="editorStore.resultUrl" alt="Result" class="tool-page__preview-img" />
            </div>
            <button class="btn btn--ghost btn--sm tool-page__change-btn" @click="handleClear">
              Change photo
            </button>
          </div>

          <div class="tool-page__controls">
            <div class="tool-page__section">
              <h4 class="tool-page__section-title">Time Period</h4>
              <div class="tool-page__time-slider">
                <div class="tool-page__time-labels">
                  <span>Ancient</span>
                  <span>Victorian</span>
                  <span>Future</span>
                </div>
                <div
                  v-for="slider in editorStore.sliders"
                  :key="slider.id"
                  class="tool-page__slider"
                >
                  <input
                    type="range"
                    :min="slider.min"
                    :max="slider.max"
                    :step="slider.step"
                    :value="slider.value"
                    class="tool-page__range tool-page__range--large"
                    @input="(e) => onSliderChange(slider.id, e)"
                  />
                  <div class="tool-page__slider-value-center">
                    {{ getTimePeriodLabel(slider.value) }}
                  </div>
                </div>
              </div>
            </div>

            <button
              class="btn btn--primary btn--lg tool-page__process-btn"
              :disabled="editorStore.isProcessing"
              @click="handleProcess"
            >
              <span v-if="editorStore.isProcessing" class="tool-page__spinner"></span>
              <span v-else>⏳ Time Travel</span>
            </button>
            <p class="tool-page__credits">Cost: 15 credits per transformation</p>
          </div>
        </div>
      </div>

      <!-- ========== EDITOR: Prompt (text-to-image/video) ========== -->
      <div v-if="tool && tool.editorType === 'prompt'" class="tool-page__workspace">
        <div class="tool-page__prompt-editor">
          <div class="tool-page__prompt-section">
            <label class="tool-page__section-title">Prompt</label>
            <textarea
              v-model="promptText"
              class="tool-page__textarea"
              :placeholder="tool.controls?.promptPlaceholder || 'Enter your prompt...'"
              rows="4"
            ></textarea>
          </div>

          <div v-if="tool.controls?.settings" class="tool-page__settings-grid">
            <div
              v-for="setting in tool.controls.settings"
              :key="setting.label"
              class="tool-page__setting"
            >
              <label class="tool-page__setting-label">{{ setting.label }}</label>
              <select
                v-if="setting.type === 'select'"
                v-model="settings[setting.label]"
                class="tool-page__select"
              >
                <option v-for="opt in setting.options" :key="opt" :value="opt">{{ opt }}</option>
              </select>
              <label v-else-if="setting.type === 'toggle'" class="tool-page__toggle">
                <input v-model="settings[setting.label]" type="checkbox" />
                <span class="tool-page__toggle-slider"></span>
              </label>
            </div>
          </div>

          <div v-if="editorStore.resultUrl" class="tool-page__prompt-result">
            <div class="tool-page__preview-label">Generated Result</div>
            <img :src="editorStore.resultUrl" alt="Generated" class="tool-page__preview-img" />
          </div>

          <button
            class="btn btn--primary btn--lg tool-page__process-btn"
            :disabled="editorStore.isProcessing || !promptText.trim()"
            @click="handlePromptProcess"
          >
            <span v-if="editorStore.isProcessing" class="tool-page__spinner"></span>
            <span v-else>✨ Generate</span>
          </button>
          <p class="tool-page__credits">Cost: {{ tool.creditCost }}</p>
        </div>
      </div>

      <!-- ========== EDITOR: Multi Upload ========== -->
      <div v-if="tool && tool.editorType === 'multi-upload'" class="tool-page__workspace">
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
            :multiple="(tool.controls?.maxFiles ?? 1) > 1"
            class="tool-page__file-input"
            @change="onFileInput"
          />
          <div class="tool-page__upload-content">
            <span class="tool-page__upload-icon">📁</span>
            <h3 class="tool-page__upload-title">
              Drop images here or click to upload
              <span v-if="tool.controls?.maxFiles"> (up to {{ tool.controls.maxFiles }})</span>
            </h3>
            <p class="tool-page__upload-hint">JPG, PNG, WEBP · max 10MB</p>
          </div>
        </div>

        <div v-else class="tool-page__editor">
          <div class="tool-page__preview">
            <div class="tool-page__preview-label">Uploaded</div>
            <img :src="editorStore.previewUrl!" alt="Uploaded" class="tool-page__preview-img" />
            <div v-if="editorStore.resultUrl" class="tool-page__result">
              <div class="tool-page__preview-label">Result</div>
              <img :src="editorStore.resultUrl" alt="Result" class="tool-page__preview-img" />
            </div>
            <button class="btn btn--ghost btn--sm tool-page__change-btn" @click="handleClear">
              Change photo
            </button>
          </div>

          <div class="tool-page__controls">
            <div v-if="tool.controls?.promptPlaceholder" class="tool-page__section">
              <label class="tool-page__section-title">Prompt</label>
              <textarea
                v-model="promptText"
                class="tool-page__textarea"
                :placeholder="tool.controls.promptPlaceholder"
                rows="3"
              ></textarea>
            </div>

            <div v-if="tool.controls?.settings" class="tool-page__section">
              <div class="tool-page__settings-grid">
                <div
                  v-for="setting in tool.controls.settings"
                  :key="setting.label"
                  class="tool-page__setting"
                >
                  <label class="tool-page__setting-label">{{ setting.label }}</label>
                  <select
                    v-if="setting.type === 'select'"
                    v-model="settings[setting.label]"
                    class="tool-page__select"
                  >
                    <option v-for="opt in setting.options" :key="opt" :value="opt">
                      {{ opt }}
                    </option>
                  </select>
                  <label v-else-if="setting.type === 'toggle'" class="tool-page__toggle">
                    <input v-model="settings[setting.label]" type="checkbox" />
                    <span class="tool-page__toggle-slider"></span>
                  </label>
                </div>
              </div>
            </div>

            <button
              class="btn btn--primary btn--lg tool-page__process-btn"
              :disabled="editorStore.isProcessing"
              @click="handleProcess"
            >
              <span v-if="editorStore.isProcessing" class="tool-page__spinner"></span>
              <span v-else>✨ Generate</span>
            </button>
            <p class="tool-page__credits">Cost: {{ tool.creditCost }}</p>
          </div>
        </div>
      </div>

      <!-- ========== EDITOR: Dual Upload (face swap, etc.) ========== -->
      <div v-if="tool && tool.editorType === 'dual-upload'" class="tool-page__workspace">
        <div v-if="!editorStore.previewUrl" class="tool-page__dual-upload">
          <div
            class="tool-page__upload tool-page__upload--half"
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
              <span class="tool-page__upload-icon">🖼️</span>
              <h3 class="tool-page__upload-title">Target Image</h3>
              <p class="tool-page__upload-hint">Drop or click to upload</p>
            </div>
          </div>
          <div class="tool-page__dual-arrow">→</div>
          <div class="tool-page__upload tool-page__upload--half">
            <div class="tool-page__upload-content">
              <span class="tool-page__upload-icon">🎭</span>
              <h3 class="tool-page__upload-title">Source Face</h3>
              <p class="tool-page__upload-hint">Drop or click to upload</p>
            </div>
          </div>
        </div>

        <div v-else class="tool-page__editor">
          <div class="tool-page__preview">
            <div class="tool-page__preview-label">Target</div>
            <img :src="editorStore.previewUrl!" alt="Target" class="tool-page__preview-img" />
            <div v-if="editorStore.resultUrl" class="tool-page__result">
              <div class="tool-page__preview-label">Result</div>
              <img :src="editorStore.resultUrl" alt="Result" class="tool-page__preview-img" />
            </div>
            <button class="btn btn--ghost btn--sm tool-page__change-btn" @click="handleClear">
              Change photo
            </button>
          </div>

          <div class="tool-page__controls">
            <div v-if="tool.controls?.settings" class="tool-page__section">
              <div class="tool-page__settings-grid">
                <div
                  v-for="setting in tool.controls.settings"
                  :key="setting.label"
                  class="tool-page__setting"
                >
                  <label class="tool-page__setting-label">{{ setting.label }}</label>
                  <select
                    v-if="setting.type === 'select'"
                    v-model="settings[setting.label]"
                    class="tool-page__select"
                  >
                    <option v-for="opt in setting.options" :key="opt" :value="opt">
                      {{ opt }}
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <button
              class="btn btn--primary btn--lg tool-page__process-btn"
              :disabled="editorStore.isProcessing"
              @click="handleProcess"
            >
              <span v-if="editorStore.isProcessing" class="tool-page__spinner"></span>
              <span v-else>✨ Process</span>
            </button>
            <p class="tool-page__credits">Cost: {{ tool.creditCost }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getToolBySlug, processImage } from '@/api/tools'
import { useEditorStore } from '@/stores/index'
import { useFileUpload } from '@/hooks/index'

const route = useRoute()
const editorStore = useEditorStore()
const fileInputRef = ref<HTMLInputElement | null>(null)
const promptText = ref('')
const settings = reactive<Record<string, string | number | boolean>>({})

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

const toolSlug = ref(route.params.toolSlug as string)
const tool = ref(getToolBySlug(toolSlug.value))

const timePeriods = [
  'Prehistoric',
  'Ancient Egypt',
  'Roman Empire',
  'Medieval',
  'Renaissance',
  'Victorian (1850 CE)',
  '1920s',
  '1980s',
  'Modern',
  'Future',
]

function getTimePeriodLabel(value: number): string {
  const index = Math.round((value / 100) * (timePeriods.length - 1))
  return timePeriods[Math.min(index, timePeriods.length - 1)]
}

function initSettings(): void {
  if (!tool.value?.controls?.settings) return
  for (const s of tool.value.controls.settings) {
    settings[s.label] = s.defaultValue
  }
}

function initEditor(): void {
  if (!tool.value) return
  promptText.value = ''
  Object.keys(settings).forEach((k) => delete settings[k])
  initSettings()

  const controls = tool.value.controls
  if (controls?.sliders) {
    editorStore.initSliders(
      controls.sliders.map((s) => ({
        label: s.label,
        min: s.min,
        max: s.max,
        step: s.step,
        value: s.defaultValue,
      })),
    )
  } else if (tool.value.editorType === 'sliders' || tool.value.editorType === 'time-slider') {
    editorStore.initSliders([{ label: 'Intensity', min: 0, max: 1, step: 0.01, value: 0.5 }])
  } else {
    editorStore.initSliders([])
  }
  editorStore.initPresets([])
}

function triggerFileInput(): void {
  fileInputRef.value?.click()
}

function onSliderChange(sliderId: string, event: Event): void {
  const value = parseFloat((event.target as HTMLInputElement).value)
  editorStore.updateSlider(sliderId, value)
}

async function handleProcess(): Promise<void> {
  if (!editorStore.canProcess || !editorStore.previewUrl || !tool.value) return
  editorStore.setProcessing(true)

  const params: Record<string, number> = {}
  for (const s of editorStore.sliders) {
    params[s.label] = s.value
  }

  const result = await processImage(tool.value.id, editorStore.previewUrl, params)
  if (result.success && result.data) {
    editorStore.setResult(result.data.resultUrl, result.data.creditsUsed)
  } else {
    editorStore.setError(result.error ?? 'Processing failed')
  }
}

async function handlePromptProcess(): Promise<void> {
  if (!tool.value || !promptText.value.trim()) return
  editorStore.setProcessing(true)
  await new Promise((r) => setTimeout(r, 3000))
  editorStore.setResult('/placeholder-result.png', 2)
}

function handleClear(): void {
  clearFile()
  editorStore.reset()
}

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
  min-height: calc(100vh - #{$header-height});

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
    margin: 0 auto $space-4;
  }

  &__cost-badge {
    @include badge($color-secondary);
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

  // Editor layout
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
    &--large {
      height: 6px;
      &::-webkit-slider-thumb {
        width: 20px;
        height: 20px;
      }
    }
  }

  // Time slider
  &__time-slider {
    @include flex-column;
    gap: $space-3;
  }

  &__time-labels {
    @include flex-between;
    font-size: $font-size-xs;
    color: $color-text-muted;
  }

  &__slider-value-center {
    text-align: center;
    font-size: $font-size-sm;
    font-weight: $font-weight-semibold;
    color: $color-primary-light;
    font-family: $font-family-mono;
    margin-top: $space-1;
  }

  // Prompt editor
  &__prompt-editor {
    max-width: 800px;
    margin: 0 auto;
    @include flex-column;
    gap: $space-6;
  }

  &__prompt-section {
    @include flex-column;
    gap: $space-2;
  }

  &__textarea {
    width: 100%;
    padding: $space-4;
    background: $color-bg-card;
    border: 1px solid $color-border;
    border-radius: $radius-lg;
    color: $color-text;
    font-family: $font-family;
    font-size: $font-size-base;
    resize: vertical;
    min-height: 100px;
    @include transition(border-color);
    &:focus {
      border-color: $color-primary;
    }
    &::placeholder {
      color: $color-text-muted;
    }
  }

  &__settings-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: $space-4;
  }

  &__setting {
    @include flex-column;
    gap: $space-2;
  }

  &__setting-label {
    font-size: $font-size-xs;
    font-weight: $font-weight-semibold;
    color: $color-text-secondary;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  &__select {
    width: 100%;
    padding: $space-2 $space-3;
    background: $color-bg-elevated;
    border: 1px solid $color-border;
    border-radius: $radius-md;
    color: $color-text;
    font-size: $font-size-sm;
    @include transition(border-color);
    &:focus {
      border-color: $color-primary;
    }
  }

  &__toggle {
    position: relative;
    display: inline-block;
    width: 44px;
    height: 24px;
    input {
      opacity: 0;
      width: 0;
      height: 0;
      &:checked + .tool-page__toggle-slider {
        background: $color-primary;
        &::before {
          transform: translateX(20px);
        }
      }
    }
  }

  &__toggle-slider {
    position: absolute;
    inset: 0;
    background: $color-border;
    border-radius: $radius-full;
    cursor: pointer;
    @include transition(background-color);
    &::before {
      content: '';
      position: absolute;
      left: 2px;
      bottom: 2px;
      width: 20px;
      height: 20px;
      background: white;
      border-radius: 50%;
      @include transition(transform);
    }
  }

  &__prompt-result {
    @include flex-column;
    gap: $space-3;
  }

  // Dual upload
  &__dual-upload {
    display: flex;
    align-items: center;
    gap: $space-6;
    max-width: 900px;
    margin: 0 auto;
    flex-wrap: wrap;
    justify-content: center;
  }

  &__upload--half {
    flex: 1;
    min-width: 280px;
    max-width: 400px;
  }

  &__dual-arrow {
    font-size: $font-size-3xl;
    color: $color-text-muted;
    flex-shrink: 0;
  }

  // Common
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
