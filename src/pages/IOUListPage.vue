<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { refDebounced } from "@vueuse/core";
import { Plus } from "@lucide/vue";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import IouFilterBar from "@/components/ious/IouFilterBar.vue";
import IouMobileFilterAccordion from "@/components/ious/IouMobileFilterAccordion.vue";
import IouPaginationControls from "@/components/ious/IouPaginationControls.vue";
import IouResultsSummary from "@/components/ious/IouResultsSummary.vue";
import IousDesktopTable from "@/components/ious/IousDesktopTable.vue";
import IousMobileCards from "@/components/ious/IousMobileCards.vue";
import { ALL, DEFAULT_PAGE_SIZE } from "@/components/ious/iouListUtils";
import type { AllFilter } from "@/components/ious/iouListUtils";
import { useIous } from "@/composables/useIous";
import type { IouStatus } from "@/types/iou";

const { data, isLoading, error, loadIous } = useIous();

const searchQuery = ref("");
const debouncedSearchQuery = refDebounced(searchQuery, 150);
const divisionFilter = ref<AllFilter | string>(ALL);
const statusFilter = ref<AllFilter | IouStatus>(ALL);
const pagination = ref({ pageIndex: 0, pageSize: DEFAULT_PAGE_SIZE });

const divisionOptions = computed(() =>
  [...new Set(data.value.map((iou) => iou.division))].sort((a, b) => a.localeCompare(b)),
);
const statusOptions = computed<IouStatus[]>(() =>
  [...new Set(data.value.map((iou) => iou.status))].sort((a, b) => a.localeCompare(b)),
);

const filteredIous = computed(() => {
  const query = debouncedSearchQuery.value.trim().toLowerCase();

  return data.value.filter((iou) => {
    const matchesSearch =
      !query ||
      [iou.iouRef, iou.caseNo, iou.adjusterName, iou.insurer, iou.division]
        .join(" ")
        .toLowerCase()
        .includes(query);

    return (
      matchesSearch &&
      (divisionFilter.value === ALL || iou.division === divisionFilter.value) &&
      (statusFilter.value === ALL || iou.status === statusFilter.value)
    );
  });
});

const pageCount = computed(() =>
  Math.max(1, Math.ceil(filteredIous.value.length / pagination.value.pageSize)),
);
const currentPage = computed(() => pagination.value.pageIndex + 1);
const paginatedIous = computed(() => {
  const start = pagination.value.pageIndex * pagination.value.pageSize;
  return filteredIous.value.slice(start, start + pagination.value.pageSize);
});
const resultStart = computed(() =>
  filteredIous.value.length === 0 ? 0 : pagination.value.pageIndex * pagination.value.pageSize + 1,
);
const resultEnd = computed(() =>
  Math.min(filteredIous.value.length, resultStart.value + pagination.value.pageSize - 1),
);
const hasActiveFilters = computed(() =>
  Boolean(searchQuery.value || divisionFilter.value !== ALL || statusFilter.value !== ALL),
);

function resetPageIndex() {
  pagination.value = { ...pagination.value, pageIndex: 0 };
}

function setPageSize(size: number) {
  pagination.value = { pageIndex: 0, pageSize: size };
}

function clearFilters() {
  searchQuery.value = "";
  divisionFilter.value = ALL;
  statusFilter.value = ALL;
  resetPageIndex();
}

watch([debouncedSearchQuery, divisionFilter, statusFilter], resetPageIndex);

watch(
  () => filteredIous.value.length,
  () => {
    if (pagination.value.pageIndex > pageCount.value - 1) {
      pagination.value = { ...pagination.value, pageIndex: Math.max(0, pageCount.value - 1) };
    }
  },
);

onMounted(() => {
  loadIous();
});
</script>

<template>
  <div class="space-y-5 pb-24 md:pb-0">
    <!-- Header -->
    <div class="flex items-center justify-between md:justify-end">
      <h1 class="text-2xl font-semibold tracking-tight md:hidden">Cash Advance (IOU)</h1>
      <Button as-child>
        <RouterLink to="/iou/new">
          <Plus />
          New Request
        </RouterLink>
      </Button>
    </div>

    <!-- Loading state -->
    <div v-if="isLoading" class="space-y-4">
      <Skeleton class="h-12 w-full" />
      <Skeleton class="h-72 w-full" />
      <Skeleton class="h-14 w-full" />
    </div>

    <!-- Error state -->
    <div
      v-else-if="error"
      class="rounded-lg border border-destructive/50 bg-destructive/10 p-6 text-center"
    >
      <p class="text-destructive text-sm font-medium">Failed to load cash advances.</p>
      <p class="text-muted-foreground mt-1 text-xs">
        {{ error.message }}
      </p>
      <Button variant="outline" class="mt-4" @click="loadIous"> Retry </Button>
    </div>

    <!-- List content -->
    <template v-else>
      <IouFilterBar
        v-model:search="searchQuery"
        v-model:division="divisionFilter"
        v-model:status="statusFilter"
        :division-options="divisionOptions"
        :status-options="statusOptions"
        :has-active-filters="hasActiveFilters"
        @clear="clearFilters"
      />

      <IouMobileFilterAccordion
        v-model:search="searchQuery"
        v-model:division="divisionFilter"
        v-model:status="statusFilter"
        :division-options="divisionOptions"
        :status-options="statusOptions"
        :has-active-filters="hasActiveFilters"
        @clear="clearFilters"
      />

      <IouResultsSummary
        :result-start="resultStart"
        :result-end="resultEnd"
        :total="filteredIous.length"
      />

      <IousDesktopTable :ious="paginatedIous" />
      <IousMobileCards :ious="paginatedIous" />

      <IouPaginationControls
        :current-page="currentPage"
        :page-count="pageCount"
        :page-size="pagination.pageSize"
        :can-previous-page="pagination.pageIndex > 0"
        :can-next-page="pagination.pageIndex < pageCount - 1"
        @previous="pagination.pageIndex--"
        @next="pagination.pageIndex++"
        @page-size-change="setPageSize"
      />
    </template>
  </div>
</template>
