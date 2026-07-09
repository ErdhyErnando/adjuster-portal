<script setup lang="ts">
import { Button } from '@/components/ui/button'
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-semibold tracking-tight">Cash Advance (IOU)</h1>
      <Button as-child>
        <RouterLink to="/iou/new">New Request</RouterLink>
      </Button>
    </div>

    <div
      class="rounded-lg border border-dashed border-border bg-muted/30 p-8 text-center"
    >
      <p class="text-muted-foreground">
        IOU list will be implemented in Sprint 5.
      </p>
    </div>
  </div>
</template>
