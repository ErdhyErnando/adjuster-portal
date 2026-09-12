<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { StatusBreakdownItem } from "@/types/dashboard";

interface Props {
  items: StatusBreakdownItem[];
}

defineProps<Props>();

function statusColor(status: string): string {
  switch (status.toUpperCase()) {
    case "DOA":
      return "bg-blue-500";
    case "IA":
      return "bg-indigo-500";
    case "PR":
      return "bg-violet-500";
    case "SUR":
      return "bg-amber-500";
    case "IR":
      return "bg-cyan-500";
    case "DFR":
      return "bg-orange-500";
    case "FR":
      return "bg-emerald-500";
    case "SR":
      return "bg-teal-500";
    case "CLOSED":
      return "bg-slate-500";
    default:
      return "bg-gray-400";
  }
}
</script>

<template>
  <Card class="bg-muted/40">
    <CardHeader>
      <CardTitle class="text-base font-semibold">Case Status Breakdown</CardTitle>
    </CardHeader>
    <CardContent class="space-y-4">
      <!-- Legend rows -->
      <ul class="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
        <li
          v-for="item in items"
          :key="item.status"
          class="flex items-center justify-between rounded-md border bg-card px-3 py-2"
        >
          <div class="flex items-center gap-2">
            <span class="inline-block h-2.5 w-2.5 rounded-full" :class="statusColor(item.status)" />
            <span class="text-sm font-medium">{{ item.label }}</span>
          </div>
          <span class="text-sm text-muted-foreground">{{ item.count }}</span>
        </li>
      </ul>
    </CardContent>
  </Card>
</template>
