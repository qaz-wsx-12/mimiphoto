// ============================================================
// Vue Router — Route Definitions & Guards
// ============================================================

import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@views/HomePage.vue'),
    meta: { title: 'MimicPhoto - AI Photo Editing | Face Expression Editor' },
  },
  {
    path: '/apps/explore',
    name: 'Explore',
    component: () => import('@views/ExplorePage.vue'),
    meta: { title: 'Explore AI Tools | MimicPhoto' },
  },
  {
    path: '/apps/pricing',
    name: 'Pricing',
    component: () => import('@views/PricingPage.vue'),
    meta: { title: 'Pricing | MimicPhoto' },
  },
  {
    path: '/apps/:toolSlug',
    name: 'Tool',
    component: () => import('@views/ToolPage.vue'),
    meta: { title: 'Tool | MimicPhoto' },
    props: true,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@views/NotFoundPage.vue'),
    meta: { title: 'Page Not Found | MimicPhoto' },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0, behavior: 'smooth' }
  },
})

// ---------- Navigation Guard: Page Title ----------
router.beforeEach((to, _from, next) => {
  const title = (to.meta.title as string) || 'MimicPhoto'
  document.title = title
  next()
})

export default router
