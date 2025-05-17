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
import {OrganizationCreationDialog} from "@/components/administration/organization/organization-creation-dialog";
import {OrganizationTable} from "@/components/administration/organization/organization-table";
import {Organization} from "better-auth/plugins";
import {TableProperties} from "lucide-react";
import { useEffect, useState } from "react";

interface OrganizationTableViewerProps {
    organizations: Organization[]
}

export default function OrganizationTableViewer({ organizations }: OrganizationTableViewerProps) {
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({
        logo: true,
        name: true,
        slug: true,
        createdAt: true,
        actions: true
    })
    const [organizationsState, setOrganizationsState] = useState<Organization[]>(organizations)

    // Update state when props change
    useEffect(() => {
        setOrganizationsState(organizations)
    }, [organizations])

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
                            <Button
                                variant="outline"
                                className="w-9 h-9 inline-flex items-center justify-center"
                            >
                                <TableProperties/>
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
                    <OrganizationCreationDialog
                        onOrganizationCreated={(newOrganization) => {
                            setOrganizationsState(prevOrganizations => [...prevOrganizations, newOrganization]);
                        }}
                    />
                </div>
            </div>

            <OrganizationTable
                data={organizationsState}
                columnFilters={columnFilters}
                setColumnFilters={setColumnFilters}
                columnVisibility={columnVisibility}
                setColumnVisibility={setColumnVisibility}
                onOrganizationDeleted={(deletedOrganization) => {
                    setOrganizationsState(prevOrganizations => 
                        prevOrganizations.filter(org => org.id !== deletedOrganization.id)
                    );
                }}
            />
        </>
    )
}
