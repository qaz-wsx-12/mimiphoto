<template>
  <div class="not-found">
    <div class="container not-found__content">
      <span class="not-found__icon">🔍</span>
      <h1 class="not-found__title">404</h1>
      <p class="not-found__subtitle">Page not found</p>
      <p class="not-found__desc">The page you're looking for doesn't exist or has been moved.</p>
      <router-link to="/" class="btn btn--primary btn--lg"> Back to Home </router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.not-found {
  min-height: calc(100vh - $header-height - 200px);
  @include flex-center;

  &__content {
    text-align: center;
  }

  &__icon {
    font-size: 80px;
    display: block;
    margin-bottom: $space-6;
  }

  &__title {
    font-size: $font-size-6xl;
    font-weight: $font-weight-bold;
    @include gradient-text;
    margin-bottom: $space-4;
  }

  &__subtitle {
    font-size: $font-size-2xl;
    color: $color-text;
    font-weight: $font-weight-semibold;
    margin-bottom: $space-3;
  }

  &__desc {
    font-size: $font-size-lg;
    color: $color-text-muted;
    margin-bottom: $space-8;
  }
}
</style>
