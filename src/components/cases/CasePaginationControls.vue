<script setup lang="ts">
import { Button } from "@/components/ui/button";

interface Props {
  currentPage: number;
  pageCount: number;
  pageSize: number;
  canPreviousPage: boolean;
  canNextPage: boolean;
  pageSizes?: number[];
}

withDefaults(defineProps<Props>(), {
  pageSizes: () => [10, 15, 25],
});

const emit = defineEmits<{
  previous: [];
  next: [];
  pageSizeChange: [value: number];
}>();

function emitPageSizeChange(event: Event) {
  const value = Number((event.target as HTMLSelectElement).value);
  emit("pageSizeChange", value);
}
</script>

<template>
  <div
    class="flex flex-col gap-3 rounded-lg border bg-card px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
  >
    <div class="flex items-center gap-2 text-sm text-muted-foreground">
      <span>Page {{ currentPage }} of {{ pageCount }}</span>
      <span class="hidden sm:inline">·</span>
      <label class="flex items-center gap-2">
        <span class="hidden sm:inline">Rows</span>
        <select
          :value="pageSize"
          class="h-8 rounded-md border border-input bg-background px-2 text-sm text-foreground"
          aria-label="Rows per page"
          @change="emitPageSizeChange"
        >
          <option v-for="size in pageSizes" :key="size" :value="size">
            {{ size }}
          </option>
        </select>
      </label>
    </div>

    <div class="grid grid-cols-2 gap-2 sm:flex">
      <Button
        variant="outline"
        class="min-h-10 sm:min-h-8"
        :disabled="!canPreviousPage"
        @click="emit('previous')"
      >
        Previous
      </Button>
      <Button
        variant="outline"
        class="min-h-10 sm:min-h-8"
        :disabled="!canNextPage"
        @click="emit('next')"
      >
        Next
      </Button>
    </div>
  </div>
</template>
