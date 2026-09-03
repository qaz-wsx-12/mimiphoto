<template>
  <div class="home">
    <!-- ===== Hero Section ===== -->
    <section class="hero">
      <div class="hero__bg"></div>
      <div class="container hero__content">
        <h1 class="hero__title animate-fade-in-up">
          30+ AI tools for
          <span class="hero__title-highlight">image and video</span>
          creation
        </h1>
        <p class="hero__subtitle animate-fade-in-up delay-2">
          Edit photos, create videos, restyle portraits, remove objects, try outfits, and generate
          new visual ideas from one focused AI workspace.
        </p>

        <div class="hero__actions animate-fade-in-up delay-3">
          <router-link to="/apps/create-image" class="btn btn--primary btn--lg">
            🎨 Text to image
          </router-link>
          <router-link to="/apps/ai-photo-editor" class="btn btn--primary btn--lg">
            🖌️ AI photo editor
          </router-link>
          <router-link to="/apps/video-generator" class="btn btn--primary btn--lg">
            🎬 Video generator
          </router-link>
          <router-link to="/apps/virtual-try-on" class="btn btn--primary btn--lg">
            👔 Virtual try-on
          </router-link>
        </div>

        <div class="hero__badges animate-fade-in-up delay-4">
          <span class="hero__badge">✓ No credit card required</span>
          <span class="hero__badge">✓ Fast browser workflow</span>
          <span class="hero__badge">✓ Photos, video, effects, and editing</span>
        </div>
      </div>
    </section>

    <!-- ===== Tool Selection Section ===== -->
    <section class="section tool-selection">
      <div class="container">
        <SectionHeader
          title="Choose the job"
          subtitle="Pick the right AI tool in seconds — each tool is tuned for a specific creation workflow, from text-to-image and editing to animation and cleanup."
        />

        <div class="tool-selection__grid">
          <!-- Image Workflows -->
          <div class="tool-selection__category">
            <h3 class="tool-selection__cat-title">🖼️ Image workflows</h3>
            <div class="tool-selection__list">
              <router-link
                v-for="tool in imageTools"
                :key="tool.id"
                :to="tool.href"
                class="tool-selection__item"
              >
                <span class="tool-selection__icon">{{ tool.icon }}</span>
                <span class="tool-selection__name">{{ tool.name }}</span>
                <span v-if="tool.badge" class="badge" :class="`badge--${tool.badge}`">
                  {{ tool.badge }}
                </span>
              </router-link>
            </div>
            <router-link to="/apps/explore" class="tool-selection__see-all">
              See all →
            </router-link>
          </div>

          <!-- Video Workflows -->
          <div class="tool-selection__category">
            <h3 class="tool-selection__cat-title">🎬 Video workflows</h3>
            <div class="tool-selection__list">
              <router-link
                v-for="tool in videoTools"
                :key="tool.id"
                :to="tool.href"
                class="tool-selection__item"
              >
                <span class="tool-selection__icon">{{ tool.icon }}</span>
                <span class="tool-selection__name">{{ tool.name }}</span>
                <span v-if="tool.badge" class="badge" :class="`badge--${tool.badge}`">
                  {{ tool.badge }}
                </span>
              </router-link>
            </div>
            <router-link to="/apps/explore" class="tool-selection__see-all">
              See all →
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== Top Choice Section ===== -->
    <section class="section top-choice">
      <div class="container">
        <SectionHeader
          title="Creator-recommended tools"
          subtitle="Start with the workflows people come back to most."
        />

        <ToolCarousel :tools="topChoiceTools" />
      </div>
    </section>

    <!-- ===== Features Section ===== -->
    <section class="section features">
      <div class="container">
        <SectionHeader
          title="Why creators choose MimicPhoto"
          subtitle="Trusted by photographers, marketers, and content creators worldwide"
        />

        <div class="features__grid">
          <div
            v-for="(feature, index) in features"
            :key="feature.title"
            class="features__card card animate-fade-in-up"
            :class="`delay-${index + 1}`"
          >
            <span class="features__icon">{{ feature.icon }}</span>
            <h4 class="features__title">{{ feature.title }}</h4>
            <p class="features__desc">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== FAQ Section ===== -->
    <section class="section faq">
      <div class="container">
        <SectionHeader title="Frequently Asked Questions" />

        <div class="faq__list">
          <FaqItem v-for="item in faqItems" :key="item.id" :item="item" />
        </div>
      </div>
    </section>

    <!-- ===== CTA Section ===== -->
    <section class="section cta">
      <div class="container cta__content">
        <h2 class="cta__title">Start with the tool that matches your next image.</h2>
        <p class="cta__subtitle">
          Explore the full toolbox, pick a workflow, and create your first result without a credit
          card.
        </p>
        <router-link to="/apps/explore" class="btn btn--primary btn--lg">
          Explore all tools →
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { getToolsByCategory, getTopChoiceTools, features, faqItems } from '@api/tools'
import SectionHeader from '@components/ui/SectionHeader.vue'
import FaqItem from '@components/ui/FaqItem.vue'
import ToolCarousel from '@components/tools/ToolCarousel.vue'

const imageTools = getToolsByCategory('image').slice(0, 12)
const videoTools = getToolsByCategory('video')
const topChoiceTools = getTopChoiceTools()
</script>

<style lang="scss" scoped>
// ---------- Hero ----------
.hero {
  position: relative;
  min-height: 85vh;
  @include flex-center;
  overflow: hidden;
  padding: $space-20 0 $space-16;

  &__bg {
    position: absolute;
    inset: 0;
    background: $gradient-hero;

    &::before {
      content: '';
      position: absolute;
      top: -20%;
      left: 50%;
      transform: translateX(-50%);
      width: 800px;
      height: 800px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba($color-primary, 0.15) 0%, transparent 70%);
    }
  }

  &__content {
    position: relative;
    z-index: 1;
    text-align: center;
    max-width: 900px;
  }

  &__title {
    font-size: $font-size-4xl;
    font-weight: $font-weight-bold;
    color: $color-text;
    margin-bottom: $space-6;
    line-height: $line-height-tight;

    @include md {
      font-size: $font-size-6xl;
    }
  }

  &__title-highlight {
    @include gradient-text;
  }

  &__subtitle {
    font-size: $font-size-lg;
    color: $color-text-secondary;
    max-width: 650px;
    margin: 0 auto $space-8;
    line-height: $line-height-relaxed;

    @include md {
      font-size: $font-size-xl;
    }
  }

  &__actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: $space-3;
    margin-bottom: $space-8;
  }

  &__badges {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: $space-6;
  }

  &__badge {
    font-size: $font-size-sm;
    color: $color-text-muted;
  }
}

// ---------- Tool Selection ----------
.tool-selection {
  &__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: $space-10;

    @include md {
      grid-template-columns: 1fr 1fr;
    }
  }

  &__category {
    @include flex-column;
  }

  &__cat-title {
    font-size: $font-size-xl;
    font-weight: $font-weight-semibold;
    margin-bottom: $space-6;
  }

  &__list {
    @include flex-column;
    gap: $space-2;
  }

  &__item {
    display: flex;
    align-items: center;
    gap: $space-3;
    padding: $space-3 $space-4;
    border-radius: $radius-md;
    @include transition(background-color);
    text-decoration: none;

    &:hover {
      background: $color-bg-hover;
    }
  }

  &__icon {
    font-size: $font-size-lg;
    flex-shrink: 0;
  }

  &__name {
    font-size: $font-size-sm;
    font-weight: $font-weight-medium;
    color: $color-text;
    flex: 1;
  }

  &__see-all {
    margin-top: $space-4;
    font-size: $font-size-sm;
    font-weight: $font-weight-semibold;
    color: $color-primary-light;

    &:hover {
      color: $color-primary;
    }
  }
}

// ---------- Top Choice ----------
.top-choice {
  background: rgba($color-primary, 0.03);
}

// ---------- Features ----------
.features {
  &__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: $space-6;

    @include md {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  &__card {
    padding: $space-8;
    text-align: center;
    @include flex-column-center;
  }

  &__icon {
    font-size: $font-size-4xl;
    margin-bottom: $space-4;
  }

  &__title {
    font-size: $font-size-xl;
    font-weight: $font-weight-semibold;
    margin-bottom: $space-3;
    color: $color-text;
  }

  &__desc {
    font-size: $font-size-sm;
    color: $color-text-secondary;
    line-height: $line-height-relaxed;
  }
}

// ---------- FAQ ----------
.faq {
  &__list {
    max-width: 800px;
    margin: 0 auto;
    @include flex-column;
    gap: $space-4;
  }
}

// ---------- CTA ----------
.cta {
  background: rgba($color-primary, 0.05);
  border-top: 1px solid $color-border;
  border-bottom: 1px solid $color-border;

  &__content {
    text-align: center;
    max-width: 650px;
    margin: 0 auto;
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
    margin-bottom: $space-8;
  }
}
</style>
