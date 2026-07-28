<script setup lang="ts">
import { StickyNotePlus } from '@lucide/vue'
import { Button } from '@/components/ui/button'
</script>

<template>
  <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
    <h1 class="text-2xl font-semibold tracking-tight">Cases</h1>
    <Button as-child class="w-full sm:w-auto">
      <RouterLink to="/iou/new">
        <StickyNotePlus />
        New IOU
      </RouterLink>
    </Button>
  </div>
</template>
