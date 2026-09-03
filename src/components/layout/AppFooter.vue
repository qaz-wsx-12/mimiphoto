<template>
  <footer class="app-footer">
    <div class="container">
      <div class="app-footer__grid">
        <!-- Brand -->
        <div class="app-footer__brand">
          <router-link to="/" class="app-footer__logo">
            <span class="app-footer__logo-icon">⚡</span>
            <span class="app-footer__logo-text">MimicPhoto</span>
          </router-link>
          <p class="app-footer__tagline">
            Transform your photos with AI-powered tools. Edit facial expressions, create videos, and
            bring your creative vision to life.
          </p>
        </div>

        <!-- Product Links -->
        <div class="app-footer__links">
          <h4 class="app-footer__heading">Product</h4>
          <router-link to="/apps/explore" class="app-footer__link">All Tools</router-link>
          <router-link to="/apps/face-expression-editor" class="app-footer__link"
            >Face Expression Editor</router-link
          >
          <router-link to="/apps/ai-photo-editor" class="app-footer__link"
            >AI Photo Editor</router-link
          >
          <router-link to="/apps/create-image" class="app-footer__link">Create Image</router-link>
          <router-link to="/apps/video-generator" class="app-footer__link"
            >Create Video</router-link
          >
        </div>

        <!-- Resources -->
        <div class="app-footer__links">
          <h4 class="app-footer__heading">Resources</h4>
          <router-link to="/apps/pricing" class="app-footer__link">Pricing</router-link>
          <router-link to="/apps/explore" class="app-footer__link">Explore Tools</router-link>
          <a href="#" class="app-footer__link">Documentation</a>
          <a href="#" class="app-footer__link">Blog</a>
          <a href="#" class="app-footer__link">Help Center</a>
        </div>

        <!-- Company -->
        <div class="app-footer__links">
          <h4 class="app-footer__heading">Company</h4>
          <a href="#" class="app-footer__link">About</a>
          <a href="#" class="app-footer__link">Contact</a>
          <a href="#" class="app-footer__link">Privacy Policy</a>
          <a href="#" class="app-footer__link">Terms of Service</a>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="app-footer__bottom">
        <p class="app-footer__copyright">© {{ currentYear }} MimicPhoto. All rights reserved.</p>
        <div class="app-footer__social">
          <a href="#" class="app-footer__social-link" aria-label="Twitter"> 🐦 </a>
          <a href="#" class="app-footer__social-link" aria-label="GitHub"> 💻 </a>
          <a href="#" class="app-footer__social-link" aria-label="Discord"> 💬 </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<style lang="scss" scoped>
.app-footer {
  background: $color-bg-card;
  border-top: 1px solid $color-border;
  padding: $space-16 0 $space-8;

  &__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: $space-10;

    @include md {
      grid-template-columns: 2fr 1fr 1fr 1fr;
    }
  }

  &__brand {
    @include flex-column;
  }

  &__logo {
    display: inline-flex;
    align-items: center;
    gap: $space-2;
    font-size: $font-size-xl;
    font-weight: $font-weight-bold;
    color: $color-text;
    margin-bottom: $space-4;

    &:hover {
      color: $color-primary-light;
    }
  }

  &__logo-icon {
    font-size: $font-size-2xl;
  }

  &__tagline {
    font-size: $font-size-sm;
    color: $color-text-muted;
    max-width: 320px;
    line-height: $line-height-relaxed;
  }

  &__links {
    @include flex-column;
    gap: $space-3;
  }

  &__heading {
    font-size: $font-size-sm;
    font-weight: $font-weight-semibold;
    color: $color-text;
    margin-bottom: $space-2;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  &__link {
    font-size: $font-size-sm;
    color: $color-text-muted;
    @include transition(color);

    &:hover {
      color: $color-primary-light;
    }
  }

  &__bottom {
    @include flex-between;
    flex-wrap: wrap;
    gap: $space-4;
    margin-top: $space-12;
    padding-top: $space-8;
    border-top: 1px solid $color-border;
  }

  &__copyright {
    font-size: $font-size-sm;
    color: $color-text-muted;
  }

  &__social {
    display: flex;
    gap: $space-4;
  }

  &__social-link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: $radius-md;
    font-size: $font-size-lg;
    color: $color-text-muted;
    @include transition(color, background-color);

    &:hover {
      color: $color-primary-light;
      background: rgba($color-primary, 0.1);
    }
  }
}
</style>
