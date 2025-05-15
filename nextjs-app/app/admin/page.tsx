"use client"

import { OrganizationTable } from "@/components/organization-table"

// Sample data for demonstration
const organizations = [
    {
        id: "org-1",
        name: "Acme Corporation",
        slug: "acme-corp",
        logo: "https://ui-avatars.com/api/?name=Acme+Corporation&background=0D8ABC&color=fff",
        createdAt: new Date("2023-01-15"),
    },
    {
        id: "org-2",
        name: "Globex Industries",
        slug: "globex",
        logo: "https://ui-avatars.com/api/?name=Globex+Industries&background=FF5733&color=fff",
        createdAt: new Date("2023-02-20"),
    },
    {
        id: "org-3",
        name: "Initech LLC",
        slug: "initech",
        logo: "https://ui-avatars.com/api/?name=Initech+LLC&background=27AE60&color=fff",
        createdAt: new Date("2023-03-10"),
    },
    {
        id: "org-4",
        name: "Umbrella Corporation",
        slug: "umbrella-corp",
        logo: "https://ui-avatars.com/api/?name=Umbrella+Corporation&background=8E44AD&color=fff",
        createdAt: new Date("2023-04-05"),
    },
    {
        id: "org-5",
        name: "Stark Industries",
        slug: "stark",
        logo: "https://ui-avatars.com/api/?name=Stark+Industries&background=E74C3C&color=fff",
        createdAt: new Date("2023-05-12"),
    },
]

export default function OrganizationsPage() {
    return (
        <div className="container mx-auto py-10">
            <h1 className="text-2xl font-bold mb-6">Organizations</h1>
            <OrganizationTable data={organizations} />
        </div>
    )
}