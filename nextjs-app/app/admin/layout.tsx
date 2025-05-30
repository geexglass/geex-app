import {auth} from "@/lib/auth";
import {headers} from "next/headers";
import {ReactNode} from "react";
import {forbidden, unauthorized} from "next/navigation";

export default async function AdminLayout({ children }: { children: ReactNode }) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) unauthorized() // Middleware should handle this, but just in case
    if (session.user.role !== "admin") forbidden();

    return <>{children}</>;
}