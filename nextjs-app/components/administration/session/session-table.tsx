"use client"

import * as React from "react"
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, LogOut, Shield, Monitor } from "lucide-react"

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
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Session } from "@/lib/admin"
import { Badge } from "@/components/ui/badge"
import { format, formatDistanceToNow } from "date-fns"

interface SessionTableProps {
    data: Session[]
    onRevokeSession: (sessionId: string) => void
    onRevokeUserSessions: (userId: string) => void
}

export function SessionTable({ data, onRevokeSession, onRevokeUserSessions }: SessionTableProps) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    const columns: ColumnDef<Session>[] = [
        {
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "user.name",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        User
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                const user = row.original.user
                return (
                    <div>
                        <div className="font-medium">{user?.name || "Unknown"}</div>
                        <div className="text-sm text-muted-foreground">{user?.email}</div>
                    </div>
                )
            },
        },
        {
            accessorKey: "userAgent",
            header: "Device",
            cell: ({ row }) => {
                const userAgent = row.getValue("userAgent") as string
                
                // Parse user agent to extract browser/device info
                const getBrowserInfo = (ua: string) => {
                    if (!ua) return { browser: "Unknown", device: "Unknown" }
                    
                    let browser = "Unknown"
                    let device = "Desktop"
                    
                    if (ua.includes("Chrome")) browser = "Chrome"
                    else if (ua.includes("Firefox")) browser = "Firefox"
                    else if (ua.includes("Safari")) browser = "Safari"
                    else if (ua.includes("Edge")) browser = "Edge"
                    
                    if (ua.includes("Mobile") || ua.includes("Android") || ua.includes("iPhone")) {
                        device = "Mobile"
                    } else if (ua.includes("Tablet") || ua.includes("iPad")) {
                        device = "Tablet"
                    }
                    
                    return { browser, device }
                }
                
                const { browser, device } = getBrowserInfo(userAgent)
                
                return (
                    <div className="flex items-center gap-2">
                        <Monitor className="h-4 w-4 text-muted-foreground" />
                        <div>
                            <div className="text-sm font-medium">{browser}</div>
                            <div className="text-xs text-muted-foreground">{device}</div>
                        </div>
                    </div>
                )
            },
        },
        {
            accessorKey: "ipAddress",
            header: "IP Address",
            cell: ({ row }) => {
                const ip = row.getValue("ipAddress") as string
                return <code className="text-sm bg-muted px-1 rounded">{ip || "Unknown"}</code>
            },
        },
        {
            accessorKey: "createdAt",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Created
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                const date = row.getValue("createdAt") as Date
                return (
                    <div>
                        <div className="text-sm">{format(date, "MMM dd, yyyy")}</div>
                        <div className="text-xs text-muted-foreground">
                            {formatDistanceToNow(date, { addSuffix: true })}
                        </div>
                    </div>
                )
            },
        },
        {
            accessorKey: "expiresAt",
            header: "Expires",
            cell: ({ row }) => {
                const date = row.getValue("expiresAt") as Date
                const isExpired = date < new Date()
                
                return (
                    <div>
                        <Badge variant={isExpired ? "destructive" : "default"}>
                            {isExpired ? "Expired" : "Active"}
                        </Badge>
                        <div className="text-xs text-muted-foreground mt-1">
                            {format(date, "MMM dd, yyyy HH:mm")}
                        </div>
                    </div>
                )
            },
        },
        {
            accessorKey: "updatedAt",
            header: "Last Activity",
            cell: ({ row }) => {
                const date = row.getValue("updatedAt") as Date
                return (
                    <div className="text-sm">
                        {formatDistanceToNow(date, { addSuffix: true })}
                    </div>
                )
            },
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {
                const session = row.original

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                                onClick={() => navigator.clipboard.writeText(session.id)}
                            >
                                Copy session ID
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => navigator.clipboard.writeText(session.userId)}
                            >
                                Copy user ID
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={() => onRevokeSession(session.id)}
                                className="text-red-600"
                            >
                                <LogOut className="mr-2 h-4 w-4" />
                                Revoke session
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => onRevokeUserSessions(session.userId)}
                                className="text-red-600"
                            >
                                <Shield className="mr-2 h-4 w-4" />
                                Revoke all user sessions
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ]

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    return (
        <div className="w-full">
            <div className="flex items-center py-4">
                <Input
                    placeholder="Filter by user email..."
                    value={(table.getColumn("user.email")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("user.email")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    )
}