<script setup lang="ts">
import { Badge } from "@/components/ui/badge";
import { formatCurrencyIdr, formatDateId } from "@/lib/formatters";
import type { IouItem } from "@/types/iou";
import { statusBadgeClass, statusLabel } from "./iouListUtils";

interface Props {
  ious: IouItem[];
}

defineProps<Props>();
</script>

<template>
  <div class="space-y-3 md:hidden">
    <article v-for="iou in ious" :key="iou.id" class="rounded-lg border bg-card p-4 shadow-xs">
      <div class="mb-3 flex items-start justify-between gap-3">
        <div class="min-w-0">
          <p class="text-foreground text-sm font-semibold">{{ iou.iouRef }}</p>
          <p class="text-muted-foreground mt-0.5 break-all text-xs">{{ iou.caseNo }}</p>
        </div>
        <Badge :class="statusBadgeClass(iou.status)" class="shrink-0">
          {{ statusLabel(iou.status) }}
        </Badge>
      </div>

      <dl class="grid grid-cols-[5.5rem_1fr] gap-x-3 gap-y-2 text-sm">
        <dt class="text-muted-foreground">Adjuster</dt>
        <dd class="text-foreground font-medium">{{ iou.adjusterName }}</dd>
        <dt class="text-muted-foreground">Client</dt>
        <dd>{{ iou.insurer }}</dd>
        <dt class="text-muted-foreground">Division</dt>
        <dd>{{ iou.division }}</dd>
        <dt class="text-muted-foreground">Submitted</dt>
        <dd>{{ formatDateId(iou.submittedAt) }}</dd>
      </dl>

      <div class="mt-4 flex items-center justify-between border-t pt-3">
        <span class="text-muted-foreground text-xs">Amount requested</span>
        <span class="text-foreground text-base font-semibold tabular-nums">
          {{ formatCurrencyIdr(iou.amount) }}
        </span>
      </div>
    </article>

    <div
      v-if="!ious.length"
      class="rounded-lg border bg-card py-10 text-center text-sm text-muted-foreground"
    >
      No cash advances match the current filters.
    </div>
  </div>
</template>
