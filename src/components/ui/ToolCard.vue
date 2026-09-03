<template>
  <router-link :to="tool.href" class="tool-card card" :class="{ 'tool-card--compact': compact }">
    <div class="tool-card__header">
      <span class="tool-card__icon">{{ tool.icon }}</span>
      <span v-if="tool.badge" class="badge" :class="`badge--${tool.badge}`">
        {{ tool.badge }}
      </span>
    </div>

    <h3 class="tool-card__name">{{ tool.name }}</h3>
    <p class="tool-card__desc">{{ tool.description }}</p>

    <div class="tool-card__footer">
      <span class="tool-card__cost">{{ tool.creditCost }}</span>
      <span class="tool-card__arrow">→</span>
    </div>
  </router-link>
</template>

<script setup lang="ts">
import type { Tool } from '@/types/index'

defineProps<{
  tool: Tool
  compact?: boolean
}>()
</script>

<style lang="scss" scoped>
.tool-card {
  display: flex;
  flex-direction: column;
  padding: $space-6;
  text-decoration: none;
  @include transition(transform, box-shadow, border-color);

  &:hover {
    transform: translateY(-4px);
    border-color: $color-primary;

    .tool-card__arrow {
      transform: translateX(4px);
      color: $color-primary;
    }
  }

  &__header {
    @include flex-between;
    margin-bottom: $space-4;
  }

  &__icon {
    font-size: $font-size-3xl;
  }

  &__name {
    font-size: $font-size-base;
    font-weight: $font-weight-semibold;
    color: $color-text;
    margin-bottom: $space-2;
  }

  &__desc {
    font-size: $font-size-sm;
    color: $color-text-muted;
    line-height: $line-height-normal;
    flex: 1;
    @include text-clamp(2);
  }

  &__footer {
    @include flex-between;
    margin-top: $space-4;
    padding-top: $space-4;
    border-top: 1px solid $color-border;
  }

  &__cost {
    font-size: $font-size-sm;
    font-weight: $font-weight-semibold;
    color: $color-secondary;
  }

  &__arrow {
    color: $color-text-muted;
    @include transition(transform, color);
    font-size: $font-size-lg;
  }

  &--compact {
    padding: $space-4;

    .tool-card__icon {
      font-size: $font-size-2xl;
    }

    .tool-card__name {
      font-size: $font-size-sm;
    }
  }
}
</style>
