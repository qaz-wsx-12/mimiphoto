<template>
  <div class="tool-carousel">
    <div ref="trackRef" class="tool-carousel__track">
      <ToolCard v-for="tool in tools" :key="tool.id" :tool="tool" compact />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Tool } from '@/types/index'
import ToolCard from '@components/ui/ToolCard.vue'

defineProps<{
  tools: Tool[]
}>()
</script>

<style lang="scss" scoped>
.tool-carousel {
  width: 100%;
  overflow-x: auto;
  @include custom-scrollbar(4px);
  margin: 0 calc(-1 * $space-6);
  padding: 0 $space-6;

  &__track {
    display: flex;
    gap: $space-4;
    padding-bottom: $space-4;
    min-width: min-content;

    @include md {
      flex-wrap: wrap;
      min-width: unset;
    }
  }
}
</style>
