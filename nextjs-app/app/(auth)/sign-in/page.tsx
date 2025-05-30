'use client';

import {LoginForm} from "@/components/auth/login-form";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

export default function SignInPage() {


  const { data: session } = authClient.useSession()
    if (session) {
        // Redirect to the home page if the user is already logged in
        redirect(`/account/${session.user.id}`);
    }
    return (
            <div className="flex flex-col gap-4">
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xs">
                        <LoginForm />
                    </div>
                </div>
            </div>
    );
}
