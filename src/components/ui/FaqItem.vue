<template>
  <div class="faq-item" :class="{ 'faq-item--open': isOpen }">
    <button class="faq-item__question" :aria-expanded="isOpen" @click="toggle">
      <span>{{ item.question }}</span>
      <span class="faq-item__icon" :class="{ 'is-open': isOpen }"> ▼ </span>
    </button>

    <Transition name="expand">
      <div v-if="isOpen" class="faq-item__answer">
        <p>{{ item.answer }}</p>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { FAQItem } from '@/types/index'

defineProps<{
  item: FAQItem
}>()

const isOpen = ref(false)

function toggle(): void {
  isOpen.value = !isOpen.value
}
</script>

<style lang="scss" scoped>
.faq-item {
  border: 1px solid $color-border;
  border-radius: $radius-lg;
  overflow: hidden;
  @include transition(border-color);

  &:hover,
  &--open {
    border-color: $color-border-light;
  }

  &__question {
    width: 100%;
    @include flex-between;
    gap: $space-4;
    padding: $space-5 $space-6;
    font-size: $font-size-base;
    font-weight: $font-weight-medium;
    color: $color-text;
    text-align: left;

    &:hover {
      color: $color-primary-light;
    }
  }

  &__icon {
    font-size: $font-size-sm;
    color: $color-text-muted;
    @include transition(transform);

    &.is-open {
      transform: rotate(180deg);
    }
  }

  &__answer {
    padding: 0 $space-6 $space-6;

    p {
      font-size: $font-size-sm;
      color: $color-text-secondary;
      line-height: $line-height-relaxed;
    }
  }
}

.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  opacity: 0;
  max-height: 0;
  padding-top: 0;
  padding-bottom: 0;
}

.expand-enter-to,
.expand-leave-from {
  opacity: 1;
  max-height: 200px;
}
</style>
