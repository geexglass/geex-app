import { RegisterForm } from "@/components/auth/register-form";

export default function SignUpPage() {
    return (
        <div className="flex flex-col gap-4 p-6 md:p-10">
            <div className="flex flex-1 items-center justify-center">
                <div className="w-full max-w-xs">
                    <RegisterForm />
                </div>
            </div>
        </div>
    );
}