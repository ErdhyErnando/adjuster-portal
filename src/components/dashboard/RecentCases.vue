<script setup lang="ts">
import { ChevronLeft, ChevronRight } from '@lucide/vue'
import { computed, ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { formatCompanyAcronym, formatCurrencyIdr } from '@/lib/formatters'
import type { CaseListItem } from '@/types/case'

interface Props {
  cases: CaseListItem[]
  isLoading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isLoading: false,
})

const ITEMS_PER_PAGE = 5
const currentPage = ref(1)

const totalPages = computed(() => Math.ceil(props.cases.length / ITEMS_PER_PAGE))

const paginatedCases = computed(() => {
  const start = (currentPage.value - 1) * ITEMS_PER_PAGE
  return props.cases.slice(start, start + ITEMS_PER_PAGE)
})

function goToPage(page: number) {
  if (page < 1 || page > totalPages.value)
    return
  currentPage.value = page
}
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
          <div class="sm:col-span-3">Atlas Ref</div>
          <div class="sm:col-span-3">Insured</div>
          <div class="sm:col-span-2">Insurer</div>
          <div class="sm:col-span-1">Status</div>
          <div class="text-right sm:col-span-1">Aging</div>
          <div class="text-right sm:col-span-2">Fee Est.</div>
        </div>

        <!-- Table rows -->
        <ul>
          <li
            v-for="(item, index) in paginatedCases"
            :key="item.id"
            :class="[
              'border-b transition-colors hover:bg-muted/50',
              index === paginatedCases.length - 1 ? 'border-b-0' : '',
            ]"
          >
            <RouterLink
              :to="`/cases/${item.id}`"
              class="group block px-4 py-3 sm:grid sm:grid-cols-12 sm:items-center"
            >
              <div class="min-w-0 sm:col-span-3">
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
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger as-child>
                      <span class="cursor-help underline decoration-dotted">
                        {{ formatCompanyAcronym(item.insurer) }}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{{ item.insurer }}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div class="hidden text-sm font-medium text-foreground sm:col-span-1 sm:block">
                {{ item.statusInitial }}
              </div>
              <div class="hidden text-right text-sm text-muted-foreground sm:col-span-1 sm:block">
                {{ item.agingDays }}d
              </div>
              <div class="mt-1.5 flex items-center justify-between text-xs text-muted-foreground sm:col-span-2 sm:mt-0 sm:justify-end sm:text-sm">
                <span class="sm:hidden">{{ item.statusInitial }} • {{ item.agingDays }}d</span>
                <span>{{ formatCurrencyIdr(item.feeEstimate) }}</span>
              </div>
            </RouterLink>
          </li>
        </ul>

        <!-- Pagination -->
        <div
          v-if="totalPages > 1"
          class="flex items-center justify-between border-t px-4 py-2"
        >
          <span class="text-xs text-muted-foreground">
            Page {{ currentPage }} of {{ totalPages }}
          </span>
          <div class="flex gap-1">
            <Button
              variant="outline"
              size="icon"
              class="h-7 w-7"
              :disabled="currentPage === 1"
              @click.prevent="goToPage(currentPage - 1)"
            >
              <ChevronLeft class="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              class="h-7 w-7"
              :disabled="currentPage === totalPages"
              @click.prevent="goToPage(currentPage + 1)"
            >
              <ChevronRight class="h-4 w-4" />
            </Button>
          </div>
        </div>
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
