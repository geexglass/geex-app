"use client"

import { useState } from "react"
import { Organization } from "better-auth/plugins"
import { DataTable } from "@/components/shared/DataTable"
import { createOrganizationTableConfig } from "./OrganizationTableConfig"
import { OrganizationCreationDialog } from "@/components/administration/organization/organization-creation-dialog"

interface OrganizationTableViewerProps {
  organizations: Organization[]
}

export default function OrganizationTableViewer({ organizations }: OrganizationTableViewerProps) {
  const [orgList, setOrgList] = useState(organizations)

  const handleOrganizationCreated = (newOrganization: Organization) => {
    setOrgList(prev => [...prev, newOrganization])
  }

  const handleOrganizationDeleted = (deletedOrganization: Organization) => {
    setOrgList(prev => prev.filter(org => org.id !== deletedOrganization.id))
  }

  const tableConfig = createOrganizationTableConfig(orgList, {
    onOrganizationDeleted: handleOrganizationDeleted,
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Organizations</h2>
        <OrganizationCreationDialog onOrganizationCreated={handleOrganizationCreated} />
      </div>

      <DataTable config={tableConfig} />
    </div>
  )
}