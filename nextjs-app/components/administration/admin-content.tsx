'use client'

import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import OrganizationTableViewer from "@/components/administration/organization/organization-table-viewer";
import * as React from "react";
import {Organization} from "better-auth/plugins";

interface AdminContentProps {
    organizations: Organization[]
}

export default function AdminContent({ organizations }: AdminContentProps) {

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
                    <OrganizationTableViewer organizations={organizations} />
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
