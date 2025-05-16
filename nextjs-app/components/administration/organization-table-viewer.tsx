'use client'

import * as React from "react";
import {ColumnFiltersState, VisibilityState} from "@tanstack/react-table";
import {Input} from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {CreateOrganizationDialog} from "@/components/administration/create-organization-dialog";
import {OrganizationTable} from "@/components/administration/organization-table";
import {Organization} from "better-auth/plugins";

interface OrganizationTableViewerProps {
    organizations: Organization[]
}

export default function OrganizationTableViewer({ organizations }: OrganizationTableViewerProps) {
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})

    return (
        <>
            <h2 className="text-xl font-semibold mb-4">Organizations</h2>

            <div className="flex items-center py-4">
                <Input
                    placeholder="Filter organizations..."
                    value={(columnFilters.find(filter => filter.id === "name")?.value as string) ?? ""}
                    onChange={(event) => {
                        setColumnFilters(
                            event.target.value === ""
                                ? columnFilters.filter(filter => filter.id !== "name")
                                : [
                                    ...columnFilters.filter(filter => filter.id !== "name"),
                                    { id: "name", value: event.target.value }
                                ]
                        )
                    }}
                    className="max-w-sm"
                />
                <div className="ml-auto flex items-center space-x-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">
                                Columns
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {["logo", "name", "slug", "createdAt", "actions"].map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column}
                                        className="capitalize"
                                        checked={columnVisibility[column]}
                                        onCheckedChange={(value) =>
                                            setColumnVisibility({
                                                ...columnVisibility,
                                                [column]: value
                                            })
                                        }
                                    >
                                        {column}
                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <CreateOrganizationDialog />
                </div>
            </div>

            <OrganizationTable
                data={organizations}
                columnFilters={columnFilters}
                setColumnFilters={setColumnFilters}
                columnVisibility={columnVisibility}
                setColumnVisibility={setColumnVisibility}
            />
        </>
    )
}