<script setup lang="ts">
import { Badge } from '@/components/ui/badge'
import { formatDateId } from '@/lib/formatters'
import type { CaseListItem } from '@/types/case'
import { agingClass, progressBarClass, statusBadgeClass } from './caseListUtils'

interface Props {
  cases: CaseListItem[]
}

defineProps<Props>()
</script>

<template>
  <div class="space-y-3 md:hidden">
    <RouterLink
      v-for="item in cases"
      :key="item.id"
      :to="`/cases/${item.id}`"
      class="block rounded-lg border bg-card p-4 shadow-xs transition-colors active:bg-muted/70"
    >
      <div class="mb-3 flex items-start justify-between gap-3">
        <div class="min-w-0">
          <p class="break-all text-sm font-semibold text-foreground">{{ item.atlasRef }}</p>
          <p class="mt-1 text-xs text-muted-foreground">
            {{ item.typeOfDivision }} · DOL {{ formatDateId(item.dateOfLoss) }}
          </p>
        </div>
        <Badge :class="statusBadgeClass(item.status)" class="shrink-0">
          {{ item.status }}
        </Badge>
      </div>

      <dl class="grid grid-cols-[5.5rem_1fr] gap-x-3 gap-y-2 text-sm">
        <dt class="text-muted-foreground">Insured</dt>
        <dd class="font-medium text-foreground">{{ item.insured }}</dd>
        <dt class="text-muted-foreground">Insurer</dt>
        <dd>{{ item.insurer }}</dd>
        <dt class="text-muted-foreground">Broker</dt>
        <dd>{{ item.broker }}</dd>
        <dt class="text-muted-foreground">Status</dt>
        <dd>{{ item.currentStatus }}</dd>
        <dt class="text-muted-foreground">Aging</dt>
        <dd :class="agingClass(item.agingDays)" class="font-medium">{{ item.agingDays }}d</dd>
        <dt class="text-muted-foreground">Notes</dt>
        <dd class="line-clamp-2">{{ item.adjusterNotes }}</dd>
      </dl>

      <div class="mt-4 flex items-center gap-3">
        <div class="h-2 flex-1 overflow-hidden rounded-full bg-muted">
          <div
            class="h-full rounded-full"
            :class="progressBarClass(item.status)"
            :style="{ width: `${item.caseStatus}%` }"
          />
        </div>
        <span class="min-w-10 text-right text-xs text-muted-foreground">{{ item.caseStatus }}%</span>
      </div>
    </RouterLink>

    <div v-if="!cases.length" class="rounded-lg border bg-card py-10 text-center text-sm text-muted-foreground">
      No cases match the current filters.
    </div>
  </div>
</template>
