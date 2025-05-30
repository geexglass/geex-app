'use client'

import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";

export default function ForgotPasswordPage() {
    return (
        <div className="flex flex-col gap-4 p-6 md:p-10">
            <div className="flex flex-1 items-center justify-center">
                <div className="w-full max-w-xs">
                    <ForgotPasswordForm />
                </div>
            </div>
        </div>
    );
}