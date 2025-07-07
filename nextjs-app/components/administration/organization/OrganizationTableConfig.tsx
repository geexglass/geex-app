"use client"

import { Organization } from "better-auth/plugins"
import { EllipsisVertical, Trash2, Eye } from "lucide-react"
import { DataTableConfig } from "@/components/shared/DataTable"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { authClient } from "@/lib/auth-client"

interface OrganizationTableConfigProps {
  onOrganizationDeleted?: (organization: Organization) => void
}

export function createOrganizationTableConfig(
  data: Organization[],
  { onOrganizationDeleted }: OrganizationTableConfigProps = {}
): DataTableConfig<Organization> {
  return {
    data,
    selectable: true,
    searchable: true,
    searchPlaceholder: "Search organizations...",
    searchKey: "name",
    emptyMessage: "No organizations found.",
    columns: [
      {
        id: "logo",
        header: "Logo",
        cell: (organization) => {
          const fallback = organization.name.charAt(0).toUpperCase()
          return (
            <Avatar>
              {organization.logo && <AvatarImage src={organization.logo} alt="Logo" />}
              <AvatarFallback>{fallback}</AvatarFallback>
            </Avatar>
          )
        },
        align: "center",
      },
      {
        id: "name",
        accessorKey: "name",
        header: "Name",
        sortable: true,
        cell: (organization) => (
          <div className="font-medium">{organization.name}</div>
        ),
      },
      {
        id: "slug",
        accessorKey: "slug",
        header: "Slug",
        sortable: true,
      },
      {
        id: "createdAt",
        accessorKey: "createdAt",
        header: "Created At",
        sortable: true,
        cell: (organization) => (
          <div>{new Date(organization.createdAt).toLocaleDateString()}</div>
        ),
      },
    ],
    actions: [
      {
        id: "copy-id",
        label: "Copy ID",
        onClick: (organization) => {
          navigator.clipboard.writeText(organization.id)
        },
      },
      {
        id: "view-details",
        label: "View Details",
        icon: Eye,
        onClick: (organization) => {
          window.location.href = `/admin/organization/${organization.slug}`
        },
      },
      {
        id: "delete",
        label: "Delete",
        icon: Trash2,
        variant: "destructive",
        separator: true,
        onClick: async (organization) => {
          await authClient.organization.delete({
            organizationId: organization.id,
          })
          if (onOrganizationDeleted) {
            onOrganizationDeleted(organization)
          }
        },
      },
    ],
  }
}