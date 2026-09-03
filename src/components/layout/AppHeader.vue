<template>
  <header class="app-header" :class="{ 'app-header--scrolled': isScrolled }">
    <div class="container app-header__inner">
      <!-- Logo -->
      <router-link to="/" class="app-header__logo" @click="appStore.closeMobileMenu">
        <span class="app-header__logo-icon">⚡</span>
        <span class="app-header__logo-text">MimicPhoto</span>
      </router-link>

      <!-- Desktop Navigation -->
      <nav class="app-header__nav" aria-label="Main navigation">
        <router-link to="/" class="app-header__nav-link">Home</router-link>
        <router-link to="/apps/explore" class="app-header__nav-link">Tools</router-link>
        <router-link to="/apps/pricing" class="app-header__nav-link">Pricing</router-link>
      </nav>

      <!-- Actions -->
      <div class="app-header__actions">
        <router-link to="/apps/face-expression-editor" class="btn btn--primary btn--sm">
          Try Free
        </router-link>

        <!-- Mobile Menu Toggle -->
        <button
          class="app-header__menu-btn"
          :aria-expanded="appStore.isMobileMenuOpen"
          aria-label="Toggle menu"
          @click="appStore.toggleMobileMenu"
        >
          <span class="app-header__menu-icon" :class="{ 'is-open': appStore.isMobileMenuOpen }">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <Transition name="slide-down">
      <div v-if="appStore.isMobileMenuOpen" class="app-header__mobile">
        <nav class="app-header__mobile-nav">
          <router-link to="/" class="app-header__mobile-link" @click="appStore.closeMobileMenu">
            Home
          </router-link>
          <router-link
            to="/apps/explore"
            class="app-header__mobile-link"
            @click="appStore.closeMobileMenu"
          >
            Tools
          </router-link>
          <router-link
            to="/apps/pricing"
            class="app-header__mobile-link"
            @click="appStore.closeMobileMenu"
          >
            Pricing
          </router-link>
          <router-link
            to="/apps/face-expression-editor"
            class="btn btn--primary btn--lg app-header__mobile-cta"
            @click="appStore.closeMobileMenu"
          >
            Try Free Now
          </router-link>
        </nav>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { useAppStore } from '@stores/index'
import { useScrollPosition } from '@hooks/index'

const appStore = useAppStore()
const { isScrolled } = useScrollPosition(20)
</script>

<style lang="scss" scoped>
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: $z-fixed;
  height: $header-height;
  @include transition(background-color, box-shadow, border-color);

  &--scrolled {
    @include glass;
    box-shadow: $shadow-md;
  }

  &__inner {
    @include flex-between;
    height: 100%;
  }

  &__logo {
    display: flex;
    align-items: center;
    gap: $space-2;
    font-size: $font-size-xl;
    font-weight: $font-weight-bold;
    color: $color-text;

    &:hover {
      color: $color-primary-light;
    }
  }

  &__logo-icon {
    font-size: $font-size-2xl;
  }

  &__nav {
    display: none;

    @include lg {
      display: flex;
      align-items: center;
      gap: $space-8;
    }
  }

  &__nav-link {
    font-size: $font-size-sm;
    font-weight: $font-weight-medium;
    color: $color-text-secondary;
    @include transition(color);
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      width: 0;
      height: 2px;
      background: $gradient-primary;
      @include transition(width);
    }

    &:hover,
    &.router-link-exact-active {
      color: $color-text;

      &::after {
        width: 100%;
      }
    }
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: $space-4;
  }

  &__menu-btn {
    display: flex;

    @include lg {
      display: none;
    }
  }

  &__menu-icon {
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 24px;

    span {
      display: block;
      height: 2px;
      background: $color-text;
      border-radius: 2px;
      @include transition(transform, opacity);
    }

    &.is-open {
      span:nth-child(1) {
        transform: translateY(7px) rotate(45deg);
      }
      span:nth-child(2) {
        opacity: 0;
      }
      span:nth-child(3) {
        transform: translateY(-7px) rotate(-45deg);
      }
    }
  }

  &__mobile {
    position: fixed;
    top: $header-height;
    left: 0;
    right: 0;
    bottom: 0;
    background: $color-bg;
    z-index: $z-modal-backdrop;
    padding: $space-8 $space-6;
  }

  &__mobile-nav {
    @include flex-column;
    gap: $space-4;
  }

  &__mobile-link {
    font-size: $font-size-xl;
    font-weight: $font-weight-medium;
    color: $color-text-secondary;
    padding: $space-4 0;
    border-bottom: 1px solid $color-border;

    &:hover,
    &.router-link-exact-active {
      color: $color-primary-light;
    }
  }

  &__mobile-cta {
    margin-top: $space-8;
    text-align: center;
    text-decoration: none;
  }
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
