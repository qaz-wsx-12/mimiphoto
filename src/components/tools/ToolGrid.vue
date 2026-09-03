<template>
  <div class="tool-grid">
    <div class="tool-grid__filters">
      <button
        v-for="tab in tabs"
        :key="tab.value"
        class="tool-grid__tab"
        :class="{ 'tool-grid__tab--active': activeTab === tab.value }"
        @click="activeTab = tab.value"
      >
        <span class="tool-grid__tab-count">{{ tab.count }}</span>
        <span class="tool-grid__tab-label">{{ tab.label }}</span>
      </button>
    </div>

    <div v-for="group in filteredGroups" :key="group.category" class="tool-grid__category">
      <h3 class="tool-grid__category-title">
        {{ group.category === 'image' ? '🖼️ Image Tools' : '🎬 Video Tools' }}
        <span class="tool-grid__category-count">{{ group.tools.length }}</span>
      </h3>

      <div class="tool-grid__list">
        <ToolCard v-for="tool in group.tools" :key="tool.id" :tool="tool" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { ToolCategoryGroup } from '@/types/index'
import ToolCard from '@components/ui/ToolCard.vue'

const props = defineProps<{
  groups: ToolCategoryGroup[]
}>()

const activeTab = ref<'all' | 'image' | 'video'>('all')

const tabs = computed(() => {
  const imageCount = props.groups.find((g) => g.category === 'image')?.count ?? 0
  const videoCount = props.groups.find((g) => g.category === 'video')?.count ?? 0
  return [
    { value: 'all' as const, label: 'All Tools', count: imageCount + videoCount },
    { value: 'image' as const, label: 'Image Tools', count: imageCount },
    { value: 'video' as const, label: 'Video Tools', count: videoCount },
  ]
})

const filteredGroups = computed(() => {
  if (activeTab.value === 'all') return props.groups
  return props.groups.filter((g) => g.category === activeTab.value)
})
</script>

<style lang="scss" scoped>
.tool-grid {
  &__filters {
    display: flex;
    gap: $space-3;
    margin-bottom: $space-8;
    flex-wrap: wrap;
  }

  &__tab {
    display: flex;
    align-items: center;
    gap: $space-2;
    padding: $space-3 $space-5;
    border: 1px solid $color-border;
    border-radius: $radius-full;
    font-size: $font-size-sm;
    font-weight: $font-weight-medium;
    color: $color-text-secondary;
    @include transition(all);

    &:hover {
      border-color: $color-border-light;
      color: $color-text;
    }

    &--active {
      background: $color-primary;
      border-color: $color-primary;
      color: $color-text-on-primary;
    }
  }

  &__tab-count {
    font-size: $font-size-xs;
    font-weight: $font-weight-bold;
    opacity: 0.7;
  }

  &__category {
    margin-bottom: $space-12;
  }

  &__category-title {
    font-size: $font-size-xl;
    font-weight: $font-weight-semibold;
    color: $color-text;
    margin-bottom: $space-6;
    display: flex;
    align-items: center;
    gap: $space-3;
  }

  &__category-count {
    @include badge($color-text-secondary);
  }

  &__list {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: $space-4;

    @include sm {
      grid-template-columns: repeat(2, 1fr);
    }

    @include lg {
      grid-template-columns: repeat(3, 1fr);
    }
  }
}
</style>
