<script setup lang="ts">
import { Button } from '@/components/ui/button'
</script>

<template>
  <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
    <div>
      <h1 class="text-2xl font-semibold tracking-tight">Cases</h1>
      <p class="text-sm text-muted-foreground">
        Search and filter active claim assignments by LOB, division, report progress, and date of loss.
      </p>
    </div>
    <Button as-child class="w-full sm:w-auto">
      <RouterLink to="/iou/new">New IOU</RouterLink>
    </Button>
  </div>
</template>
