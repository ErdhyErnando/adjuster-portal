import { ref } from 'vue'
import { getDashboard } from '@/services/dashboardService'
import type { AdjusterDashboard } from '@/types/dashboard'

export function useDashboard() {
  const data = ref<AdjusterDashboard | null>(null)
  const isLoading = ref(false)
  const error = ref<Error | null>(null)

  async function loadDashboard() {
    isLoading.value = true
    error.value = null

    try {
      data.value = await getDashboard()
    }
    catch (err) {
      error.value = err instanceof Error ? err : new Error('Failed to load dashboard')
    }
    finally {
      isLoading.value = false
    }
  }

  return {
    data,
    isLoading,
    error,
    loadDashboard,
  }
}
