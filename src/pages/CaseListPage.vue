<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
</script>

<template>
  <div class="space-y-4">
    <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h1 class="text-2xl font-semibold tracking-tight">Cases</h1>
      <div class="flex gap-2">
        <Input placeholder="Search cases..." class="w-full sm:w-64" />
        <Button as-child>
          <RouterLink to="/iou/new">New IOU</RouterLink>
        </Button>
      </div>
    </div>

    <div
      class="rounded-lg border border-dashed border-border bg-muted/30 p-8 text-center"
    >
      <p class="text-muted-foreground">
        Case list will be implemented in Sprint 3.
      </p>
    </div>
  </div>
</template>
