import type { ColumnDef } from '@tanstack/vue-table'
import type { CaseListItem } from '@/types/case'

export const caseTableColumns: ColumnDef<CaseListItem>[] = [
  {
    accessorKey: 'atlasRef',
    header: 'Atlas Ref',
    cell: ({ row }) => row.original.atlasRef,
  },
  {
    accessorKey: 'insured',
    header: 'Insured',
    cell: ({ row }) => row.original.insured,
  },
  {
    accessorKey: 'insurer',
    header: 'Insurer',
    cell: ({ row }) => row.original.insurer,
  },
  {
    accessorKey: 'broker',
    header: 'Broker',
    cell: ({ row }) => row.original.broker,
  },
  {
    accessorKey: 'typeOfDivision',
    header: 'Division',
    cell: ({ row }) => row.original.typeOfDivision,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => row.original.status,
  },
  {
    accessorKey: 'agingDays',
    header: 'Aging',
    cell: ({ row }) => `${row.original.agingDays}d`,
  },
  {
    id: 'progressActions',
    header: 'Case Progress / Actions',
    cell: ({ row }) => row.original.caseStatus,
  },
]
