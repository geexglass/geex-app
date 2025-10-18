import React, { useState, useMemo } from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { DataTableConfig, TableColumn, TableAction } from "./types"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function useDataTable<T extends Record<string, any>>(config: DataTableConfig<T>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: config.pageSize || 10,
  })

  const columns = useMemo<ColumnDef<T>[]>(() => {
    const cols: ColumnDef<T>[] = []

    // Add selection column if selectable
    if (config.selectable) {
      cols.push({
        id: "select",
        header: ({ table }) => (
          <div className="flex justify-center">
            <Checkbox
              checked={table.getIsAllPageRowsSelected()}
              onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
              aria-label="Select all"
            />
          </div>
        ),
        cell: ({ row }) => (
          <div className="flex justify-center">
            <Checkbox
              checked={row.getIsSelected()}
              onCheckedChange={(value) => row.toggleSelected(!!value)}
              aria-label="Select row"
            />
          </div>
        ),
        enableSorting: false,
        enableHiding: false,
      })
    }

    // Add data columns
    config.columns.forEach((column) => {
      cols.push({
        id: column.id,
        accessorKey: column.accessorKey as string,
        header: column.sortable ? ({ column: col }) => (
          <Button
            variant="ghost"
            onClick={() => col.toggleSorting(col.getIsSorted() === "asc")}
            className={column.align === 'center' ? 'justify-center' : column.align === 'right' ? 'justify-end' : ''}
          >
            {column.header}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ) : column.header,
        cell: ({ row }) => {
          const content = column.cell 
            ? column.cell(row.original)
            : row.getValue(column.accessorKey as string)
          
          return (
            <div className={
              column.align === 'center' ? 'text-center' : 
              column.align === 'right' ? 'text-right' : ''
            }>
              {content as React.ReactNode}
            </div>
          )
        },
        size: column.width,
      })
    })

    // Add actions column if actions exist
    if (config.actions && config.actions.length > 0) {
      cols.push({
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
          const item = row.original
          return (
            <div className="flex justify-end">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  {config.actions?.map((action, index) => (
                    <div key={action.id}>
                      {action.separator && index > 0 && <DropdownMenuSeparator />}
                      <DropdownMenuItem
                        onClick={() => action.onClick(item)}
                        className={action.variant === 'destructive' ? 'text-red-600' : ''}
                      >
                        {action.icon && <action.icon className="mr-2 h-4 w-4" />}
                        {action.label}
                      </DropdownMenuItem>
                    </div>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )
        },
      })
    }

    return cols
  }, [config.columns, config.actions, config.selectable])

  const table = useReactTable({
    data: config.data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
    enableRowSelection: config.selectable,
  })

  // Handle selection change callback
  const selectedItems = table.getFilteredSelectedRowModel().rows.map(row => row.original)
  if (config.onSelectionChange && selectedItems.length !== Object.keys(rowSelection).length) {
    config.onSelectionChange(selectedItems)
  }

  return {
    table,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
    actions: {
      setSorting,
      setColumnFilters,
      setColumnVisibility,
      setRowSelection,
      setPagination,
    },
  }
}