import * as React from "react"
import {auth} from "@/lib/auth";
import {headers} from "next/headers";
import AdminContent from "@/components/administration/admin-content";

export default async function AdminPage() {

    const organizations = await auth.api.listOrganizations({
        headers: await headers(),
    })

    return (
        <AdminContent organizations={organizations} />
    )
}
