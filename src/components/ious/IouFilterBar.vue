<script setup lang="ts">
import { Search } from "@lucide/vue";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { IouStatus } from "@/types/iou";
import { ALL, statusLabel } from "./iouListUtils";
import type { AllFilter } from "./iouListUtils";

interface Props {
  search: string;
  division: AllFilter | string;
  status: AllFilter | IouStatus;
  divisionOptions: string[];
  statusOptions: IouStatus[];
  hasActiveFilters: boolean;
}

defineProps<Props>();

const emit = defineEmits<{
  "update:search": [value: string];
  "update:division": [value: AllFilter | string];
  "update:status": [value: AllFilter | IouStatus];
  clear: [];
}>();

const filterSelectClass =
  "iou-filter-select h-9 w-full rounded-md border border-input bg-background px-3 pr-9 text-sm text-foreground shadow-xs outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring/20 disabled:cursor-not-allowed disabled:opacity-50";

function selectValue(event: Event): string {
  return (event.target as HTMLSelectElement).value;
}
</script>

<template>
  <Card class="hidden bg-muted/30 md:block">
    <CardContent class="p-3">
      <div
        class="grid gap-2 lg:grid-cols-[minmax(16rem,1.35fr)_repeat(2,minmax(10rem,1fr))_auto] lg:items-center"
      >
        <div class="relative">
          <Search
            class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            :model-value="search"
            placeholder="Search by ref, case, adjuster, client..."
            class="h-9 pl-9"
            @update:model-value="emit('update:search', String($event))"
          />
        </div>

        <select
          :value="division"
          :class="filterSelectClass"
          aria-label="Filter by division"
          @change="emit('update:division', selectValue($event) as AllFilter | string)"
        >
          <option :value="ALL">All divisions</option>
          <option v-for="option in divisionOptions" :key="option" :value="option">
            {{ option }}
          </option>
        </select>

        <select
          :value="status"
          :class="filterSelectClass"
          aria-label="Filter by approval status"
          @change="emit('update:status', selectValue($event) as AllFilter | IouStatus)"
        >
          <option :value="ALL">All statuses</option>
          <option v-for="option in statusOptions" :key="option" :value="option">
            {{ statusLabel(option) }}
          </option>
        </select>

        <Button
          variant="outline"
          class="w-full lg:w-auto"
          :disabled="!hasActiveFilters"
          @click="emit('clear')"
        >
          Clear
        </Button>
      </div>
    </CardContent>
  </Card>
</template>

<style scoped>
.iou-filter-select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='none' stroke='%236b7280' stroke-width='1.5'%3e%3cpath d='m6 8 4 4 4-4' stroke-linecap='round' stroke-linejoin='round'/%3e%3c/svg%3e");
  background-position: right 0.75rem center;
  background-repeat: no-repeat;
  background-size: 1rem;
}
</style>
