"use client"

import { OrganizationTable } from "@/components/administration/organization-table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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

export default function AdminPage() {
    return (
        <div className="container mx-auto py-10">
            <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

            <Tabs defaultValue="organizations" className="w-full">
                <TabsList className="mb-6">
                    <TabsTrigger value="organizations">Organizations</TabsTrigger>
                    <TabsTrigger value="users">Users</TabsTrigger>
                    <TabsTrigger value="sessions">Sessions</TabsTrigger>
                </TabsList>

                <TabsContent value="organizations">
                    <h2 className="text-xl font-semibold mb-4">Organizations</h2>
                    <OrganizationTable data={organizations} />
                </TabsContent>

                <TabsContent value="users" className="space-y-4">
                    <h2 className="text-xl font-semibold">Users</h2>
                    <p className="text-muted-foreground">User management will be implemented here.</p>
                </TabsContent>

                <TabsContent value="sessions" className="space-y-4">
                    <h2 className="text-xl font-semibold">Sessions</h2>
                    <p className="text-muted-foreground">Session management will be implemented here.</p>
                </TabsContent>
            </Tabs>
        </div>
    )
}
