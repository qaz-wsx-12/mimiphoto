<template>
  <div class="pricing">
    <div class="container">
      <!-- Header -->
      <div class="pricing__header animate-fade-in-up">
        <h1 class="pricing__title">Simple, transparent pricing</h1>
        <p class="pricing__subtitle">Unlock the full power of AI</p>
        <p class="pricing__tagline">One subscription. Every tool. Unlimited creativity.</p>
      </div>

      <!-- Billing Toggle -->
      <div class="pricing__toggle animate-fade-in-up delay-2">
        <button
          class="pricing__toggle-btn"
          :class="{ 'pricing__toggle-btn--active': billingCycle === 'monthly' }"
          @click="billingCycle = 'monthly'"
        >
          Monthly
        </button>
        <button
          class="pricing__toggle-btn"
          :class="{ 'pricing__toggle-btn--active': billingCycle === 'yearly' }"
          @click="billingCycle = 'yearly'"
        >
          Yearly
          <span class="badge badge--free">Save 49%</span>
        </button>
      </div>

      <!-- Plans -->
      <div class="pricing__plans">
        <div
          v-for="plan in activePlans"
          :key="plan.id"
          class="pricing__plan card"
          :class="{ 'pricing__plan--highlight': plan.highlight }"
        >
          <div v-if="plan.badge" class="pricing__plan-badge">{{ plan.badge }}</div>

          <h3 class="pricing__plan-name">{{ plan.name }}</h3>

          <div class="pricing__plan-price">
            <span class="pricing__plan-amount">${{ plan.price }}</span>
            <span class="pricing__plan-period">{{ plan.period }}</span>
          </div>

          <p v-if="plan.billingNote" class="pricing__plan-billing">{{ plan.billingNote }}</p>
          <p class="pricing__plan-desc">{{ plan.description }}</p>

          <ul class="pricing__plan-features">
            <li v-for="feature in plan.features" :key="feature" class="pricing__plan-feature">
              <span class="pricing__plan-check">✓</span>
              {{ feature }}
            </li>
          </ul>

          <button
            class="btn btn--lg"
            :class="plan.highlight ? 'btn--primary' : 'btn--secondary'"
            @click="handleSubscribe(plan)"
          >
            Get started
          </button>
        </div>
      </div>

      <!-- Trust -->
      <p class="pricing__trust animate-fade-in-up delay-4">Trusted by 10,000+ creators</p>

      <!-- Credit Cost Reference -->
      <section class="pricing__credits">
        <h2 class="pricing__credits-title">Credit Cost Reference</h2>
        <p class="pricing__credits-subtitle">1 credit = $0.008 · Top up 1,000 credits for $10</p>

        <div class="pricing__credits-grid">
          <div
            v-for="category in creditCategories"
            :key="category.name"
            class="pricing__credits-table"
          >
            <h3 class="pricing__credits-cat-title">
              {{ category.name === 'image' ? '🖼️ Image Tools' : '🎬 Video Tools' }}
            </h3>
            <div v-for="item in category.items" :key="item.name" class="pricing__credits-row">
              <span class="pricing__credits-name">{{ item.name }}</span>
              <span class="pricing__credits-value">{{ item.credits }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- FAQ -->
      <section class="pricing__faq">
        <h2 class="pricing__faq-title">Frequently Asked Questions</h2>
        <div class="pricing__faq-list">
          <FaqItem v-for="item in pricingFAQ" :key="item.id" :item="item" />
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { pricingPlans, creditCosts, pricingFAQ } from '@api/tools'
import type { PricingPlan } from '@/types/index'
import FaqItem from '@components/ui/FaqItem.vue'
import { useUserStore, useAppStore } from '@stores/index'

const userStore = useUserStore()
const appStore = useAppStore()
const billingCycle = ref<'monthly' | 'yearly'>('yearly')

const activePlans = computed(() => pricingPlans.filter((p) => p.id === billingCycle.value))

const creditCategories = computed(() => {
  const imageItems = creditCosts.filter((c) => c.category === 'image')
  const videoItems = creditCosts.filter((c) => c.category === 'video')
  return [
    { name: 'image', items: imageItems },
    { name: 'video', items: videoItems },
  ]
})

function handleSubscribe(plan: PricingPlan): void {
  if (!userStore.isAuthenticated) {
    appStore.addToast('Please sign up first to subscribe', 'info')
    return
  }
  userStore.setPlan(plan.id)
  appStore.addToast(`Subscribed to ${plan.name} plan!`, 'success')
}
</script>

<style lang="scss" scoped>
.pricing {
  padding: $space-16 0 $space-24;

  // Header
  &__header {
    text-align: center;
    margin-bottom: $space-10;
  }

  &__title {
    font-size: $font-size-4xl;
    font-weight: $font-weight-bold;
    margin-bottom: $space-4;
    @include gradient-text;

    @include md {
      font-size: $font-size-5xl;
    }
  }

  &__subtitle {
    font-size: $font-size-xl;
    color: $color-text-secondary;
    margin-bottom: $space-2;
  }

  &__tagline {
    font-size: $font-size-lg;
    color: $color-text-muted;
  }

  // Toggle
  &__toggle {
    display: flex;
    justify-content: center;
    gap: $space-2;
    margin-bottom: $space-10;
  }

  &__toggle-btn {
    display: flex;
    align-items: center;
    gap: $space-2;
    padding: $space-3 $space-6;
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

  // Plans
  &__plans {
    display: grid;
    grid-template-columns: 1fr;
    gap: $space-6;
    max-width: 800px;
    margin: 0 auto $space-12;

    @include md {
      grid-template-columns: 1fr 1fr;
    }
  }

  &__plan {
    position: relative;
    padding: $space-8;
    @include flex-column;
    @include transition(transform, box-shadow);

    &:hover {
      transform: translateY(-4px);
    }

    &--highlight {
      border-color: $color-primary;
      box-shadow: $shadow-glow;

      &::before {
        content: '';
        position: absolute;
        inset: -1px;
        border-radius: $radius-xl;
        background: $gradient-primary;
        z-index: -1;
        opacity: 0.15;
      }
    }
  }

  &__plan-badge {
    position: absolute;
    top: -$space-3;
    left: 50%;
    transform: translateX(-50%);
    @include badge($color-success);
    background: $color-success;
    color: white;
  }

  &__plan-name {
    font-size: $font-size-xl;
    font-weight: $font-weight-semibold;
    margin-bottom: $space-4;
  }

  &__plan-price {
    display: flex;
    align-items: baseline;
    gap: $space-2;
    margin-bottom: $space-2;
  }

  &__plan-amount {
    font-size: $font-size-4xl;
    font-weight: $font-weight-bold;
    color: $color-text;
  }

  &__plan-period {
    font-size: $font-size-sm;
    color: $color-text-muted;
  }

  &__plan-billing {
    font-size: $font-size-sm;
    color: $color-text-muted;
    margin-bottom: $space-2;
  }

  &__plan-desc {
    font-size: $font-size-sm;
    color: $color-text-secondary;
    margin-bottom: $space-6;
  }

  &__plan-features {
    @include flex-column;
    gap: $space-3;
    margin-bottom: $space-8;
    flex: 1;
  }

  &__plan-feature {
    display: flex;
    align-items: center;
    gap: $space-3;
    font-size: $font-size-sm;
    color: $color-text-secondary;
  }

  &__plan-check {
    color: $color-success;
    font-weight: $font-weight-bold;
  }

  // Trust
  &__trust {
    text-align: center;
    font-size: $font-size-sm;
    color: $color-text-muted;
    margin-bottom: $space-16;
  }

  // Credit Costs
  &__credits {
    margin-bottom: $space-16;
  }

  &__credits-title {
    font-size: $font-size-3xl;
    font-weight: $font-weight-bold;
    text-align: center;
    margin-bottom: $space-3;
    @include gradient-text;
  }

  &__credits-subtitle {
    text-align: center;
    font-size: $font-size-sm;
    color: $color-text-muted;
    margin-bottom: $space-10;
  }

  &__credits-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: $space-8;
    max-width: 800px;
    margin: 0 auto;

    @include md {
      grid-template-columns: 1fr 1fr;
    }
  }

  &__credits-table {
    @include flex-column;
  }

  &__credits-cat-title {
    font-size: $font-size-lg;
    font-weight: $font-weight-semibold;
    margin-bottom: $space-4;
  }

  &__credits-row {
    @include flex-between;
    padding: $space-3 0;
    border-bottom: 1px solid $color-border;
  }

  &__credits-name {
    font-size: $font-size-sm;
    color: $color-text-secondary;
  }

  &__credits-value {
    font-size: $font-size-sm;
    font-weight: $font-weight-semibold;
    color: $color-secondary;
    font-family: $font-family-mono;
  }

  // FAQ
  &__faq {
    max-width: 700px;
    margin: 0 auto;
  }

  &__faq-title {
    font-size: $font-size-2xl;
    font-weight: $font-weight-bold;
    text-align: center;
    margin-bottom: $space-8;
  }

  &__faq-list {
    @include flex-column;
    gap: $space-4;
  }
}
</style>
