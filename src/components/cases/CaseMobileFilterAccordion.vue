<script setup lang="ts">
import { computed, ref } from 'vue'
import { ChevronDown, Search, SlidersHorizontal } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import type { CaseDivision, CaseLineOfBusiness, CaseReportProgress } from '@/types/case'
import { ALL, statusLabel } from './caseListUtils'
import type { AllFilter, DateFilter } from './caseListUtils'

interface Props {
  search: string
  lineOfBusiness: AllFilter | CaseLineOfBusiness
  division: AllFilter | CaseDivision
  status: AllFilter | CaseReportProgress
  date: DateFilter
  lineOfBusinessOptions: CaseLineOfBusiness[]
  divisionOptions: CaseDivision[]
  statusOptions: CaseReportProgress[]
  hasActiveFilters: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:search': [value: string]
  'update:lineOfBusiness': [value: AllFilter | CaseLineOfBusiness]
  'update:division': [value: AllFilter | CaseDivision]
  'update:status': [value: AllFilter | CaseReportProgress]
  'update:date': [value: DateFilter]
  clear: []
}>()

const isOpen = ref(false)
const filterButtonLabel = computed(() => props.hasActiveFilters ? 'Filters active' : 'Filters')
const filterSelectClass = 'case-mobile-filter-select h-10 w-full rounded-md border border-input bg-background px-3 pr-9 text-sm text-foreground shadow-xs outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring/20 disabled:cursor-not-allowed disabled:opacity-50'

function selectValue(event: Event): string {
  return (event.target as HTMLSelectElement).value
}
</script>

<template>
  <div class="fixed bottom-[calc(5rem+env(safe-area-inset-bottom))] left-4 right-4 z-40 md:hidden">
    <Card id="mobile-case-filters" v-if="isOpen" class="mb-2 border bg-background/95 shadow-xl backdrop-blur">
      <CardContent class="space-y-2 p-3">
        <div class="flex items-center justify-between gap-2">
          <span class="text-sm font-medium">Filters</span>
          <Button
            variant="ghost"
            size="sm"
            :disabled="!hasActiveFilters"
            @click="emit('clear')"
          >
            Clear
          </Button>
        </div>

        <div class="relative">
          <Search
            class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            :model-value="search"
            placeholder="Search..."
            class="h-10 pl-9"
            @update:model-value="emit('update:search', String($event))"
          />
        </div>

        <select
          :value="lineOfBusiness"
          :class="filterSelectClass"
          aria-label="Filter by line of business"
          @change="emit('update:lineOfBusiness', selectValue($event) as AllFilter | CaseLineOfBusiness)"
        >
          <option :value="ALL">All LOB</option>
          <option v-for="option in lineOfBusinessOptions" :key="option" :value="option">
            {{ option }}
          </option>
        </select>

        <select
          :value="division"
          :class="filterSelectClass"
          aria-label="Filter by division"
          @change="emit('update:division', selectValue($event) as AllFilter | CaseDivision)"
        >
          <option :value="ALL">All divisions</option>
          <option v-for="option in divisionOptions" :key="option" :value="option">
            {{ option }}
          </option>
        </select>

        <select
          :value="status"
          :class="filterSelectClass"
          aria-label="Filter by report progress status"
          @change="emit('update:status', selectValue($event) as AllFilter | CaseReportProgress)"
        >
          <option :value="ALL">All progress</option>
          <option v-for="option in statusOptions" :key="option" :value="option">
            {{ option }} — {{ statusLabel(option) }}
          </option>
        </select>

        <select
          :value="date"
          :class="filterSelectClass"
          aria-label="Filter by date of loss"
          @change="emit('update:date', selectValue($event) as DateFilter)"
        >
          <option :value="ALL">All DOL</option>
          <option value="dol-2026">DOL in 2026</option>
          <option value="dol-2025">DOL in 2025</option>
          <option value="last-90">Last 90 days</option>
          <option value="older-90">Older than 90 days</option>
        </select>
      </CardContent>
    </Card>

    <div class="flex justify-end">
      <Button
        class="h-11 rounded-full px-4 shadow-lg"
        :variant="hasActiveFilters ? 'default' : 'outline'"
        aria-controls="mobile-case-filters"
        :aria-expanded="isOpen"
        @click="isOpen = !isOpen"
      >
        <SlidersHorizontal />
        {{ filterButtonLabel }}
        <span v-if="hasActiveFilters" class="ml-0.5 h-2 w-2 rounded-full bg-current" />
        <ChevronDown
          class="transition-transform"
          :class="isOpen ? 'rotate-180' : ''"
        />
      </Button>
    </div>
  </div>
</template>

<style scoped>
.case-mobile-filter-select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='none' stroke='%236b7280' stroke-width='1.5'%3e%3cpath d='m6 8 4 4 4-4' stroke-linecap='round' stroke-linejoin='round'/%3e%3c/svg%3e");
  background-position: right 0.75rem center;
  background-repeat: no-repeat;
  background-size: 1rem;
}
</style>
