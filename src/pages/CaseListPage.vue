<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { getCoreRowModel, getPaginationRowModel, useVueTable } from '@tanstack/vue-table'
import type { PaginationState } from '@tanstack/vue-table'
import { refDebounced } from '@vueuse/core'
import CaseFilterBar from '@/components/cases/CaseFilterBar.vue'
import CaseListHeader from '@/components/cases/CaseListHeader.vue'
import CasePaginationControls from '@/components/cases/CasePaginationControls.vue'
import CaseResultsSummary from '@/components/cases/CaseResultsSummary.vue'
import CasesDesktopTable from '@/components/cases/CasesDesktopTable.vue'
import CasesMobileCards from '@/components/cases/CasesMobileCards.vue'
import { ALL, DEFAULT_PAGE_SIZE, uniqueSorted } from '@/components/cases/caseListUtils'
import type { AllFilter, DateFilter } from '@/components/cases/caseListUtils'
import { caseTableColumns } from '@/components/cases/caseTableColumns'
import { casesMockData } from '@/mock/data/cases'
import type { CaseDivision, CaseLineOfBusiness, CaseListItem, CaseReportProgress } from '@/types/case'

const cases = casesMockData
const searchQuery = ref('')
const debouncedSearchQuery = refDebounced(searchQuery, 150)
const lineOfBusinessFilter = ref<AllFilter | CaseLineOfBusiness>(ALL)
const divisionFilter = ref<AllFilter | CaseDivision>(ALL)
const statusFilter = ref<AllFilter | CaseReportProgress>(ALL)
const dateFilter = ref<DateFilter>(ALL)
const pagination = ref<PaginationState>({ pageIndex: 0, pageSize: DEFAULT_PAGE_SIZE })

const lineOfBusinessOptions = computed(() => uniqueSorted(cases.map((item) => item.lineOfBusiness)))
const divisionOptions = computed(() => uniqueSorted(cases.map((item) => item.typeOfDivision)))
const statusOptions = computed(() => uniqueSorted(cases.map((item) => item.status)))

function matchesDateFilter(item: CaseListItem): boolean {
  if (dateFilter.value === ALL) return true

  const dateOfLoss = new Date(item.dateOfLoss)
  const now = new Date()
  const ageDays = Math.floor((now.getTime() - dateOfLoss.getTime()) / (1000 * 60 * 60 * 24))

  switch (dateFilter.value) {
    case 'dol-2026':
      return dateOfLoss.getFullYear() === 2026
    case 'dol-2025':
      return dateOfLoss.getFullYear() === 2025
    case 'last-90':
      return ageDays >= 0 && ageDays <= 90
    case 'older-90':
      return ageDays > 90
  }
}

const filteredCases = computed(() => {
  const query = debouncedSearchQuery.value.trim().toLowerCase()

  return cases.filter((item) => {
    const matchesSearch = !query || [
      item.atlasRef,
      item.insured,
      item.insurer,
      item.broker,
      item.lineOfBusiness,
      item.typeOfDivision,
      item.status,
      item.currentStatus,
      item.instructionNotes,
      item.adjusterNotes,
    ].join(' ').toLowerCase().includes(query)

    return matchesSearch
      && (lineOfBusinessFilter.value === ALL || item.lineOfBusiness === lineOfBusinessFilter.value)
      && (divisionFilter.value === ALL || item.typeOfDivision === divisionFilter.value)
      && (statusFilter.value === ALL || item.status === statusFilter.value)
      && matchesDateFilter(item)
  })
})

const table = useVueTable({
  get data() {
    return filteredCases.value
  },
  columns: caseTableColumns,
  state: {
    get pagination() {
      return pagination.value
    },
  },
  onPaginationChange: (updater) => {
    pagination.value = typeof updater === 'function' ? updater(pagination.value) : updater
  },
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
})

const paginatedCases = computed(() => {
  const start = pagination.value.pageIndex * pagination.value.pageSize
  return filteredCases.value.slice(start, start + pagination.value.pageSize)
})

const pageCount = computed(() => Math.max(1, table.getPageCount()))
const currentPage = computed(() => pagination.value.pageIndex + 1)
const resultStart = computed(() => filteredCases.value.length === 0 ? 0 : pagination.value.pageIndex * pagination.value.pageSize + 1)
const resultEnd = computed(() => Math.min(filteredCases.value.length, resultStart.value + pagination.value.pageSize - 1))
const hasActiveFilters = computed(() => Boolean(
  searchQuery.value
  || lineOfBusinessFilter.value !== ALL
  || divisionFilter.value !== ALL
  || statusFilter.value !== ALL
  || dateFilter.value !== ALL,
))

function resetPageIndex() {
  pagination.value = { ...pagination.value, pageIndex: 0 }
}

function setPageSize(size: number) {
  pagination.value = { pageIndex: 0, pageSize: size }
}

function clearFilters() {
  searchQuery.value = ''
  lineOfBusinessFilter.value = ALL
  divisionFilter.value = ALL
  statusFilter.value = ALL
  dateFilter.value = ALL
  resetPageIndex()
}

watch(
  [debouncedSearchQuery, lineOfBusinessFilter, divisionFilter, statusFilter, dateFilter],
  resetPageIndex,
)

watch(
  () => filteredCases.value.length,
  () => {
    if (pagination.value.pageIndex > table.getPageCount() - 1) {
      pagination.value = {
        ...pagination.value,
        pageIndex: Math.max(0, table.getPageCount() - 1),
      }
    }
  },
)
</script>

<template>
  <div class="space-y-5">
    <CaseListHeader />

    <CaseFilterBar
      v-model:search="searchQuery"
      v-model:line-of-business="lineOfBusinessFilter"
      v-model:division="divisionFilter"
      v-model:status="statusFilter"
      v-model:date="dateFilter"
      :line-of-business-options="lineOfBusinessOptions"
      :division-options="divisionOptions"
      :status-options="statusOptions"
      :has-active-filters="hasActiveFilters"
      @clear="clearFilters"
    />

    <CaseResultsSummary
      :result-start="resultStart"
      :result-end="resultEnd"
      :total="filteredCases.length"
    />

    <CasesDesktopTable
      :table="table"
      :column-count="caseTableColumns.length"
      :page-size="pagination.pageSize"
      @compact-needed="setPageSize"
    />

    <CasesMobileCards :cases="paginatedCases" />

    <CasePaginationControls
      :current-page="currentPage"
      :page-count="pageCount"
      :page-size="pagination.pageSize"
      :can-previous-page="table.getCanPreviousPage()"
      :can-next-page="table.getCanNextPage()"
      @previous="table.previousPage()"
      @next="table.nextPage()"
      @page-size-change="setPageSize"
    />
  </div>
</template>
