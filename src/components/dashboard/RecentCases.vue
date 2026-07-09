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
  <Card class="bg-muted/40">
    <CardHeader>
      <CardTitle class="text-base font-semibold">Recent Cases</CardTitle>
    </CardHeader>
    <CardContent>
      <div
        v-if="!isLoading && cases.length > 0"
        class="overflow-hidden rounded-lg border bg-card"
      >
        <!-- Table header -->
        <div
          class="hidden border-b bg-muted/50 px-4 py-2 text-xs font-medium text-muted-foreground sm:grid sm:grid-cols-12"
        >
          <div class="sm:col-span-5">Atlas Ref</div>
          <div class="sm:col-span-3">Insured</div>
          <div class="sm:col-span-2">Status</div>
          <div class="text-right sm:col-span-2">Fee Est.</div>
        </div>

        <!-- Table rows -->
        <ul>
          <li
            v-for="(item, index) in cases"
            :key="item.id"
            :class="[
              'border-b transition-colors hover:bg-muted/50',
              index === cases.length - 1 ? 'border-b-0' : '',
            ]"
          >
            <RouterLink
              :to="`/cases/${item.id}`"
              class="group block px-4 py-3 sm:grid sm:grid-cols-12 sm:items-center"
            >
              <div class="min-w-0 sm:col-span-5">
                <p
                  class="truncate text-sm font-medium text-foreground group-hover:text-primary"
                >
                  {{ item.atlasRef }}
                </p>
                <p class="text-xs text-muted-foreground sm:hidden">
                  {{ item.insured }} • {{ item.division }}
                </p>
              </div>
              <div class="hidden truncate text-sm text-muted-foreground sm:col-span-3 sm:block">
                {{ item.insured }}
              </div>
              <div class="hidden text-sm text-muted-foreground sm:col-span-2 sm:block">
                {{ item.currentStatus }}
              </div>
              <div class="mt-1.5 flex items-center justify-between text-xs text-muted-foreground sm:col-span-2 sm:mt-0 sm:justify-end sm:text-sm">
                <span class="sm:hidden">{{ formatDateId(item.statusDate) }}</span>
                <span>{{ formatCurrencyIdr(item.feeEstimate) }}</span>
              </div>
            </RouterLink>
          </li>
        </ul>
      </div>

      <div v-else-if="isLoading" class="space-y-3">
        <Skeleton v-for="i in 5" :key="i" class="h-12 w-full" />
      </div>

      <div v-else class="rounded-lg border bg-card py-8 text-center text-sm text-muted-foreground">
        No recent cases.
      </div>
    </CardContent>
  </Card>
</template>
