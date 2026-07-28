<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { Search } from '@lucide/vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { formatCompanyAcronym, formatDateId } from '@/lib/formatters'
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
const searchQuery = ref('')

const filteredCases = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  if (!query) return props.cases

  return props.cases.filter(
    (c) =>
      c.atlasRef.toLowerCase().includes(query) ||
      c.insured.toLowerCase().includes(query) ||
      c.insurer.toLowerCase().includes(query) ||
      c.broker.toLowerCase().includes(query) ||
      c.statusInitial.toLowerCase().includes(query) ||
      c.currentStatus.toLowerCase().includes(query) ||
      c.division.toLowerCase().includes(query),
  )
})

const totalPages = computed(() => Math.ceil(filteredCases.value.length / ITEMS_PER_PAGE))

const paginatedCases = computed(() => {
  const start = (currentPage.value - 1) * ITEMS_PER_PAGE
  return filteredCases.value.slice(start, start + ITEMS_PER_PAGE)
})

watch(
  () => filteredCases.value.length,
  (length) => {
    const maxPage = Math.max(1, Math.ceil(length / ITEMS_PER_PAGE))
    if (currentPage.value > maxPage) {
      currentPage.value = maxPage
    }
  },
)

// Reset page when search query changes
watch(searchQuery, () => {
  currentPage.value = 1
})

function statusTooltip(statusInitial: string, statusDate: string): string {
  return `${statusInitial} issued on ${formatDateId(statusDate)}`
}
</script>

<template>
  <Card class="bg-muted/40">
    <CardHeader>
      <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <CardTitle class="text-base font-semibold">Recent Cases</CardTitle>
        <div class="relative w-full sm:w-56">
          <Search
            class="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            v-model="searchQuery"
            placeholder="Search cases..."
            class="h-8 pl-8 text-sm"
          />
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <div
        v-if="!isLoading && filteredCases.length > 0"
        class="overflow-hidden rounded-lg border bg-card"
      >
        <!-- Table header -->
        <div
          class="hidden border-b bg-muted/50 px-4 py-2 text-xs font-medium text-muted-foreground sm:grid sm:grid-cols-12"
        >
          <div class="sm:col-span-3">Atlas Ref</div>
          <div class="sm:col-span-2">Insured</div>
          <div class="sm:col-span-2">Insurer</div>
          <div class="sm:col-span-2">Broker</div>
          <div class="sm:col-span-1">Status</div>
          <div class="text-right sm:col-span-2">Aging</div>
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
                  {{ formatCompanyAcronym(item.insured) }} • {{ item.division }}
                </p>
              </div>
              <!-- Insured (acronym + tooltip) -->
              <div class="hidden text-sm text-muted-foreground sm:col-span-2 sm:block">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger as-child>
                      <span class="cursor-help underline decoration-dotted">
                        {{ formatCompanyAcronym(item.insured) }}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{{ item.insured }}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <!-- Insurer (acronym + tooltip) -->
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
              <!-- Broker (acronym + tooltip) -->
              <div class="hidden text-sm text-muted-foreground sm:col-span-2 sm:block">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger as-child>
                      <span class="cursor-help underline decoration-dotted">
                        {{ formatCompanyAcronym(item.broker) }}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{{ item.broker }}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <!-- Current Status (short initial + tooltip) -->
              <div class="hidden text-sm font-medium text-foreground sm:col-span-1 sm:block">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger as-child>
                      <span class="cursor-help underline decoration-dotted">
                        {{ item.statusInitial }}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{{ statusTooltip(item.statusInitial, item.statusDate) }}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <!-- Aging -->
              <div class="hidden text-right text-sm text-muted-foreground sm:col-span-2 sm:block">
                {{ item.agingDays }}d
              </div>
              <!-- Mobile row -->
              <div class="mt-1.5 flex items-center justify-between text-xs text-muted-foreground sm:hidden">
                <span>{{ item.statusInitial }} • {{ item.agingDays }}d</span>
                <span>{{ formatCompanyAcronym(item.broker) }}</span>
              </div>
            </RouterLink>
          </li>
        </ul>

        <!-- Pagination -->
        <Pagination
          v-if="totalPages > 1"
          v-slot="{ page }"
          v-model:page="currentPage"
          :items-per-page="ITEMS_PER_PAGE"
          :total="filteredCases.length"
          class="justify-between border-t px-4 py-2"
        >
          <span class="text-xs text-muted-foreground">
            Page {{ page }} of {{ totalPages }}
          </span>
          <PaginationContent v-slot="{ items }">
            <PaginationPrevious />
            <template v-for="(item, index) in items" :key="index">
              <PaginationItem
                v-if="item.type === 'page'"
                :value="item.value"
                :is-active="item.value === page"
              >
                {{ item.value }}
              </PaginationItem>
              <PaginationEllipsis v-else :index="index" />
            </template>
            <PaginationNext />
          </PaginationContent>
        </Pagination>
      </div>

      <div v-else-if="isLoading" class="space-y-3">
        <Skeleton v-for="i in 5" :key="i" class="h-12 w-full" />
      </div>

      <div v-else class="rounded-lg border bg-card py-8 text-center text-sm text-muted-foreground">
        {{ searchQuery ? 'No cases match your search.' : 'No recent cases.' }}
      </div>
    </CardContent>
  </Card>
</template>
