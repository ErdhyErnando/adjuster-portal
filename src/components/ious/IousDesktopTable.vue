<script setup lang="ts">
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableEmpty,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { formatCurrencyIdr, formatDateId } from '@/lib/formatters'
import type { IouItem } from '@/types/iou'
import { statusBadgeClass, statusLabel } from './iouListUtils'

interface Props {
  ious: IouItem[]
}

defineProps<Props>()
</script>

<template>
  <section class="hidden overflow-hidden rounded-lg border bg-card md:block" aria-label="Cash advance list">
    <Table>
      <TableHeader class="bg-muted/50">
        <TableRow>
          <TableHead>IOU Ref</TableHead>
          <TableHead>Adjuster</TableHead>
          <TableHead>Client / Insurer</TableHead>
          <TableHead>Division</TableHead>
          <TableHead class="text-right">Amount (Rp)</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Date Submitted</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <template v-if="ious.length">
          <TableRow v-for="iou in ious" :key="iou.id">
            <TableCell>
              <p class="font-medium text-foreground">{{ iou.iouRef }}</p>
              <p class="text-muted-foreground text-xs">{{ iou.caseNo }}</p>
            </TableCell>
            <TableCell class="text-muted-foreground">{{ iou.adjusterName }}</TableCell>
            <TableCell class="text-muted-foreground max-w-56 truncate">{{ iou.insurer }}</TableCell>
            <TableCell class="text-muted-foreground">{{ iou.division }}</TableCell>
            <TableCell class="text-right font-medium tabular-nums">
              {{ formatCurrencyIdr(iou.amount) }}
            </TableCell>
            <TableCell>
              <Badge :class="statusBadgeClass(iou.status)">
                {{ statusLabel(iou.status) }}
              </Badge>
            </TableCell>
            <TableCell class="text-muted-foreground whitespace-nowrap">
              {{ formatDateId(iou.submittedAt) }}
            </TableCell>
          </TableRow>
        </template>
        <TableEmpty v-else :colspan="7">
          No cash advances match the current filters.
        </TableEmpty>
      </TableBody>
    </Table>
  </section>
</template>