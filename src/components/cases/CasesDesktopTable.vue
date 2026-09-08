<script setup lang="ts">
import { useTemplateRef, watch } from "vue";
import { FlexRender } from "@tanstack/vue-table";
import type { Table as TanStackTable } from "@tanstack/vue-table";
import { useElementSize, useWindowSize } from "@vueuse/core";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableEmpty,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { formatCompanyAcronym } from "@/lib/formatters";
import type { CaseListItem } from "@/types/case";
import {
  agingClass,
  COMPACT_PAGE_SIZE,
  DEFAULT_PAGE_SIZE,
  progressBarClass,
  statusBadgeClass,
} from "./caseListUtils";

interface Props {
  table: TanStackTable<CaseListItem>;
  columnCount: number;
  pageSize: number;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  compactNeeded: [pageSize: number];
}>();

const tableShellRef = useTemplateRef<HTMLElement>("tableShellRef");
const { height: viewportHeight } = useWindowSize();
const { height: tableShellHeight } = useElementSize(tableShellRef);

function emitCompactPageSizeIfOverflowing() {
  if (
    props.pageSize === DEFAULT_PAGE_SIZE &&
    viewportHeight.value > 0 &&
    tableShellHeight.value > viewportHeight.value - 180
  ) {
    emit("compactNeeded", COMPACT_PAGE_SIZE);
  }
}

watch([viewportHeight, tableShellHeight, () => props.pageSize], emitCompactPageSizeIfOverflowing, {
  flush: "post",
});
</script>

<template>
  <div ref="tableShellRef" class="hidden rounded-lg border bg-card md:block">
    <Table>
      <TableHeader class="bg-muted/50">
        <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
          <TableHead
            v-for="header in headerGroup.headers"
            :key="header.id"
            :class="header.column.id === 'progressActions' ? 'text-right' : ''"
          >
            <FlexRender
              v-if="!header.isPlaceholder"
              :render="header.column.columnDef.header"
              :props="header.getContext()"
            />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <template v-if="table.getRowModel().rows.length">
          <TableRow v-for="row in table.getRowModel().rows" :key="row.id">
            <TableCell
              v-for="cell in row.getVisibleCells()"
              :key="cell.id"
              :class="[
                cell.column.id === 'broker' ? 'max-w-24' : '',
                cell.column.id === 'insurer' || cell.column.id === 'insured'
                  ? 'max-w-60 truncate'
                  : '',
                cell.column.id === 'progressActions' ? 'text-right' : '',
              ]"
            >
              <RouterLink
                v-if="cell.column.id === 'atlasRef'"
                :to="`/cases/${cell.row.original.id}`"
                class="font-medium text-foreground underline-offset-4 hover:text-primary hover:underline"
              >
                {{ cell.row.original.atlasRef }}
              </RouterLink>

              <TooltipProvider v-else-if="cell.column.id === 'broker'">
                <Tooltip>
                  <TooltipTrigger as-child>
                    <span class="cursor-help underline decoration-dotted">
                      {{ formatCompanyAcronym(cell.row.original.broker) }}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{{ cell.row.original.broker }}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <Badge
                v-else-if="cell.column.id === 'status'"
                :class="statusBadgeClass(cell.row.original.status)"
              >
                {{ cell.row.original.status }}
              </Badge>

              <span
                v-else-if="cell.column.id === 'agingDays'"
                class="font-medium"
                :class="agingClass(cell.row.original.agingDays)"
              >
                {{ cell.row.original.agingDays }}d
              </span>

              <div
                v-else-if="cell.column.id === 'progressActions'"
                class="flex items-center justify-end gap-3"
              >
                <div class="hidden min-w-28 flex-col gap-1 text-left xl:flex">
                  <div class="h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      class="h-full rounded-full transition-all"
                      :class="progressBarClass(cell.row.original.status)"
                      :style="{ width: `${cell.row.original.caseStatus}%` }"
                    />
                  </div>
                  <span class="text-xs text-muted-foreground">
                    {{ cell.row.original.caseStatus }}% · {{ cell.row.original.currentStatus }}
                  </span>
                </div>
                <Button variant="outline" size="sm" as-child>
                  <RouterLink :to="`/cases/${cell.row.original.id}`">View</RouterLink>
                </Button>
              </div>

              <FlexRender v-else :render="cell.column.columnDef.cell" :props="cell.getContext()" />
            </TableCell>
          </TableRow>
        </template>
        <TableEmpty v-else :colspan="columnCount"> No cases match the current filters. </TableEmpty>
      </TableBody>
    </Table>
  </div>
</template>
