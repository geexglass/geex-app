import { ColumnDef } from "@tanstack/react-table"
import { LucideIcon } from "lucide-react"

export interface TableAction<T = any> {
  id: string
  label: string
  icon?: LucideIcon
  onClick: (item: T) => void | Promise<void>
  variant?: 'default' | 'destructive'
  separator?: boolean
}

export interface TableColumn<T = any> {
  id: string
  accessorKey?: keyof T | string
  header: string
  cell?: (item: T) => React.ReactNode
  sortable?: boolean
  filterable?: boolean
  width?: number
  align?: 'left' | 'center' | 'right'
}

export interface DataTableConfig<T = any> {
  data: T[]
  columns: TableColumn<T>[]
  actions?: TableAction<T>[]
  searchable?: boolean
  searchPlaceholder?: string
  searchKey?: keyof T | string
  selectable?: boolean
  paginated?: boolean
  pageSize?: number
  emptyMessage?: string
  onSelectionChange?: (selectedItems: T[]) => void
}

export interface DataTableState {
  sorting: any[]
  columnFilters: any[]
  columnVisibility: Record<string, boolean>
  rowSelection: Record<string, boolean>
  pagination: {
    pageIndex: number
    pageSize: number
  }
}