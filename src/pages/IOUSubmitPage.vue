<script setup lang="ts">
import { Button } from '@/components/ui/button'
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center gap-2">
      <Button variant="outline" as-child>
        <RouterLink to="/iou">Back</RouterLink>
      </Button>
    </div>
    <h1 class="text-2xl font-semibold tracking-tight md:hidden">New IOU Request</h1>

    <div
      class="rounded-lg border border-dashed border-border bg-muted/30 p-8 text-center"
    >
      <p class="text-muted-foreground">
        IOU submission form will be implemented in Sprint 5.
      </p>
    </div>
  </div>
</template>
