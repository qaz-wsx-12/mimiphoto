<template>
  <div class="explore">
    <div class="container">
      <!-- Header -->
      <div class="explore__header animate-fade-in-up">
        <h1 class="explore__title">
          <span class="explore__count">{{ totalTools }}</span>
          <br />
          AI tools and counting
        </h1>
        <p class="explore__subtitle">
          Every photo & video tool MimicPhoto offers — search, filter, and jump straight in.
        </p>
      </div>

      <!-- Search -->
      <div class="explore__search animate-fade-in-up delay-2">
        <div class="explore__search-wrapper">
          <span class="explore__search-icon">🔍</span>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search tools..."
            class="explore__search-input"
          />
          <button v-if="searchQuery" class="explore__search-clear" @click="searchQuery = ''">
            ✕
          </button>
        </div>
      </div>

      <!-- Tool Grid -->
      <ToolGrid :groups="filteredGroups" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { getToolCategoryGroups, searchTools } from '@api/tools'
import type { ToolCategoryGroup } from '@/types/index'
import ToolGrid from '@components/tools/ToolGrid.vue'

const searchQuery = ref('')
const allGroups = getToolCategoryGroups()

const filteredGroups = computed<ToolCategoryGroup[]>(() => {
  if (!searchQuery.value.trim()) return allGroups

  const q = searchQuery.value.toLowerCase()
  return allGroups
    .map((group) => ({
      ...group,
      tools: searchTools(q).filter((t) => t.category === group.category),
    }))
    .filter((group) => group.tools.length > 0)
})

const totalTools = computed(() => filteredGroups.value.reduce((sum, g) => sum + g.tools.length, 0))
</script>

<style lang="scss" scoped>
.explore {
  padding: $space-16 0 $space-24;

  &__header {
    text-align: center;
    margin-bottom: $space-10;
  }

  &__title {
    font-size: $font-size-4xl;
    font-weight: $font-weight-bold;
    color: $color-text;
    margin-bottom: $space-4;

    @include md {
      font-size: $font-size-5xl;
    }
  }

  &__count {
    @include gradient-text;
  }

  &__subtitle {
    font-size: $font-size-lg;
    color: $color-text-secondary;
    max-width: 500px;
    margin: 0 auto;
  }

  // Search
  &__search {
    max-width: 480px;
    margin: 0 auto $space-12;
  }

  &__search-wrapper {
    position: relative;
    display: flex;
    align-items: center;
  }

  &__search-icon {
    position: absolute;
    left: $space-4;
    font-size: $font-size-lg;
    color: $color-text-muted;
    pointer-events: none;
  }

  &__search-input {
    width: 100%;
    padding: $space-4 $space-12 $space-4 $space-12;
    background: $color-bg-card;
    border: 1px solid $color-border;
    border-radius: $radius-full;
    color: $color-text;
    font-size: $font-size-base;

    &:focus {
      border-color: $color-primary;
      box-shadow: $shadow-glow;
    }
  }

  &__search-clear {
    position: absolute;
    right: $space-4;
    color: $color-text-muted;
    font-size: $font-size-sm;
    padding: $space-2;

    &:hover {
      color: $color-text;
    }
  }
}
</style>
