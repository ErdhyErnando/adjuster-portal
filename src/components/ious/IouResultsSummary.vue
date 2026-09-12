<script setup lang="ts">
interface Props {
  resultStart: number;
  resultEnd: number;
  total: number;
}

defineProps<Props>();
</script>

<template>
  <div class="text-muted-foreground text-sm">
    Showing {{ resultStart }}–{{ resultEnd }} of {{ total }} cash advances
  </div>
</template>
