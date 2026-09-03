// ============================================================
// User Store — Authentication & User Data
// ============================================================

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User, BillingCycle } from '@/types/index'
import { storage } from '@utils/index'

const STORAGE_KEY = 'mimicphoto-user'

export const useUserStore = defineStore('user', () => {
  // ---------- State ----------
  const user = ref<User | null>(storage.get<User | null>(STORAGE_KEY, null))
  const token = ref<string | null>(storage.get<string | null>('mimicphoto-token', null))

  // ---------- Computed ----------
  const isAuthenticated = computed(() => !!user.value && !!token.value)
  const credits = computed(() => user.value?.credits ?? 0)
  const plan = computed(() => user.value?.plan ?? null)

  // ---------- Actions ----------

  function setUser(data: User, authToken: string): void {
    user.value = data
    token.value = authToken
    storage.set(STORAGE_KEY, data)
    storage.set('mimicphoto-token', authToken)
  }

  function updateCredits(amount: number): void {
    if (user.value) {
      user.value.credits = Math.max(0, user.value.credits + amount)
      storage.set(STORAGE_KEY, user.value)
    }
  }

  function setPlan(plan: BillingCycle): void {
    if (user.value) {
      user.value.plan = plan
      storage.set(STORAGE_KEY, user.value)
    }
  }

  function logout(): void {
    user.value = null
    token.value = null
    storage.remove(STORAGE_KEY)
    storage.remove('mimicphoto-token')
  }

  return {
    user,
    token,
    isAuthenticated,
    credits,
    plan,
    setUser,
    updateCredits,
    setPlan,
    logout,
  }
})
