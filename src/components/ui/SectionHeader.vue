<template>
  <div class="section-header" :class="{ 'section-header--center': centered }">
    <h2 v-if="title" class="section-header__title">
      <slot name="title">{{ title }}</slot>
    </h2>
    <p v-if="subtitle" class="section-header__subtitle">
      <slot name="subtitle">{{ subtitle }}</slot>
    </p>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string
    subtitle?: string
    centered?: boolean
  }>(),
  {
    title: '',
    subtitle: '',
    centered: true,
  },
)
</script>

<style lang="scss" scoped>
.section-header {
  margin-bottom: $space-12;

  &--center {
    text-align: center;

    .section-header__subtitle {
      margin: 0 auto;
    }
  }

  &__title {
    font-size: $font-size-3xl;
    font-weight: $font-weight-bold;
    margin-bottom: $space-4;
    @include gradient-text;

    @include md {
      font-size: $font-size-4xl;
    }
  }

  &__subtitle {
    font-size: $font-size-lg;
    color: $color-text-secondary;
    max-width: 600px;
    line-height: $line-height-relaxed;
  }
}
</style>
