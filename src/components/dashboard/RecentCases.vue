<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { formatCurrencyIdr, formatDateId } from '@/lib/formatters'
import type { CaseListItem } from '@/types/case'

interface Props {
  cases: CaseListItem[]
  isLoading?: boolean
}

withDefaults(defineProps<Props>(), {
  isLoading: false,
})
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle class="text-base font-semibold">Recent Cases</CardTitle>
    </CardHeader>
    <CardContent>
      <ul v-if="!isLoading && cases.length > 0" class="divide-y">
        <li
          v-for="item in cases"
          :key="item.id"
        >
          <RouterLink
            :to="`/cases/${item.id}`"
            class="group block py-3 transition-colors hover:bg-muted/50"
          >
            <div class="flex items-start justify-between gap-2">
              <div class="min-w-0 flex-1">
                <p class="truncate text-sm font-medium text-foreground group-hover:text-primary">
                  {{ item.atlasRef }}
                </p>
                <p class="mt-0.5 text-xs text-muted-foreground">
                  {{ item.insured }} • {{ item.division }}
                </p>
              </div>
              <span class="shrink-0 text-xs text-muted-foreground">
                {{ item.agingDays }}d
              </span>
            </div>
            <div class="mt-1.5 flex items-center justify-between text-xs text-muted-foreground">
              <span>{{ formatDateId(item.statusDate) }}</span>
              <span>{{ formatCurrencyIdr(item.feeEstimate) }}</span>
            </div>
          </RouterLink>
        </li>
      </ul>

      <div v-else-if="isLoading" class="space-y-3">
        <Skeleton v-for="i in 5" :key="i" class="h-12 w-full" />
      </div>

      <div v-else class="py-8 text-center text-sm text-muted-foreground">
        No recent cases.
      </div>
    </CardContent>
  </Card>
</template>
