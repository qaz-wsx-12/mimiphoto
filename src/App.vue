<template>
  <div id="mimicphoto-app">
    <AppHeader />
    <main class="main-content">
      <RouterView v-slot="{ Component }">
        <Transition name="page" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>
    <AppFooter />

    <!-- Toast Notifications -->
    <Teleport to="body">
      <div class="toast-container">
        <TransitionGroup name="toast">
          <div
            v-for="toast in appStore.toasts"
            :key="toast.id"
            class="toast"
            :class="`toast--${toast.type}`"
          >
            <span class="toast__icon">
              {{ toast.type === 'success' ? '✓' : toast.type === 'error' ? '✕' : 'ℹ' }}
            </span>
            <span class="toast__message">{{ toast.message }}</span>
            <button class="toast__close" @click="appStore.removeToast(toast.id)">✕</button>
          </div>
        </TransitionGroup>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from '@components/layout/AppHeader.vue'
import AppFooter from '@components/layout/AppFooter.vue'
import { useAppStore } from '@stores/index'

const appStore = useAppStore()
</script>

<style lang="scss">
// Page transitions
.page-enter-active,
.page-leave-active {
  transition: opacity 0.25s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}

// Toast container
.toast-container {
  position: fixed;
  top: $space-4;
  right: $space-4;
  z-index: $z-toast;
  @include flex-column;
  gap: $space-3;
  max-width: 400px;
  width: calc(100% - #{$space-8});

  @include md {
    top: calc(#{$header-height} + #{$space-4});
  }
}

.toast {
  display: flex;
  align-items: center;
  gap: $space-3;
  padding: $space-4 $space-5;
  border-radius: $radius-lg;
  @include glass;
  @include transition(transform, opacity);

  &--success {
    border-left: 3px solid $color-success;
  }

  &--error {
    border-left: 3px solid $color-error;
  }

  &--info {
    border-left: 3px solid $color-primary;
  }

  &__icon {
    font-size: $font-size-lg;
    flex-shrink: 0;
  }

  &__message {
    font-size: $font-size-sm;
    color: $color-text;
    flex: 1;
  }

  &__close {
    color: $color-text-muted;
    font-size: $font-size-sm;
    flex-shrink: 0;

    &:hover {
      color: $color-text;
    }
  }
}

// Toast transition
.toast-enter-active {
  transition: all 0.3s ease;
}

.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>

<style lang="scss" scoped>
#mimicphoto-app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  .main-content {
    flex: 1;
    padding-top: $header-height;
  }
}
</style>
