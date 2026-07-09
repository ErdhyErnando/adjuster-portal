<script setup lang="ts">
import { onMounted } from 'vue'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import RecentCases from '@/components/dashboard/RecentCases.vue'
import StatsCard from '@/components/dashboard/StatsCard.vue'
import StatusBreakdown from '@/components/dashboard/StatusBreakdown.vue'
import { formatCurrencyIdr } from '@/lib/formatters'
import { useDashboard } from '@/composables/useDashboard'

const { data, isLoading, error, loadDashboard } = useDashboard()

onMounted(() => {
  loadDashboard()
})
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div class="flex items-center gap-3">
        <div
          class="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-semibold text-white"
        >
          {{ data?.adjuster.initial ?? 'A' }}
        </div>
        <div>
          <h1 class="text-xl font-semibold tracking-tight sm:text-2xl">
            Hello, {{ data?.adjuster.name ?? 'Adjuster' }}
          </h1>
          <p class="text-sm text-muted-foreground">
            {{ data?.adjuster.division ?? '' }}
          </p>
        </div>
      </div>

      <Button as-child class="w-full sm:w-auto">
        <RouterLink to="/iou/new">New IOU Request</RouterLink>
      </Button>
    </div>

    <!-- Loading state -->
    <div v-if="isLoading" class="space-y-6">
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Skeleton v-for="i in 4" :key="i" class="h-28 w-full" />
      </div>
      <Skeleton class="h-48 w-full" />
      <Skeleton class="h-80 w-full" />
    </div>

    <!-- Error state -->
    <div
      v-else-if="error"
      class="rounded-lg border border-destructive/50 bg-destructive/10 p-6 text-center"
    >
      <p class="text-sm font-medium text-destructive">
        Failed to load dashboard.
      </p>
      <p class="mt-1 text-xs text-muted-foreground">
        {{ error.message }}
      </p>
      <Button variant="outline" class="mt-4" @click="loadDashboard">
        Retry
      </Button>
    </div>

    <!-- Dashboard content -->
    <template v-else-if="data">
      <!-- Stats cards -->
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          label="Active Cases"
          :value="data.stats.totalActiveCases"
          helper-text="Currently assigned"
        />
        <StatsCard
          label="Closed This Year"
          :value="data.stats.closedThisYear"
          helper-text="Completed cases"
        />
        <StatsCard
          label="Pending IOU"
          :value="data.stats.pendingIOU"
          helper-text="Awaiting approval"
        />
        <StatsCard
          label="Est. Fees"
          :value="formatCurrencyIdr(data.stats.totalEstimatedFees)"
          helper-text="Total estimated fees"
        />
      </div>

      <!-- Status breakdown -->
      <StatusBreakdown :items="data.statusBreakdown" />

      <!-- Recent cases -->
      <RecentCases :cases="data.recentCases" />
    </template>
  </div>
</template>
