<script setup lang="ts">
interface Props {
  resultStart: number;
  resultEnd: number;
  total: number;
}

defineProps<Props>();
</script>

<template>
  <div
    class="flex flex-col gap-2 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between"
  >
    <span> Showing {{ resultStart }}–{{ resultEnd }} of {{ total }} cases </span>
    <span>Default page size is 15; compact view falls back to 10 rows when needed.</span>
  </div>
</template>
