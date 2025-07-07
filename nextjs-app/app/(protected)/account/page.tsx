import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { AccountSettings } from "@/components/account/account-settings";

export default async function AccountPage() {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session) {
        redirect("/sign-in");
    }

    return (
        <div className="container mx-auto py-10 max-w-4xl">
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold">Account Settings</h1>
                    <p className="text-muted-foreground">
                        Manage your account information and preferences
                    </p>
                </div>
                
                <AccountSettings user={session.user} />
            </div>
        </div>
    );
}