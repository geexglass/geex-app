import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";

export function ResetPasswordForm({
                                      className,
                                      ...props
                                  }: React.ComponentPropsWithoutRef<"form">) {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!token) {
            toast.error("Invalid or missing reset token");
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        if (newPassword.length < 6) {
            toast.error("Password must be at least 6 characters long");
            return;
        }

        setIsLoading(true);

        try {
            await authClient.resetPassword({
                token,
                password: newPassword,
            });
            
            setIsSubmitted(true);
            toast.success("Password reset successfully!");
            
            // Redirect to sign in after 2 seconds
            setTimeout(() => {
                router.push('/sign-in');
            }, 2000);
        } catch (error: any) {
            toast.error(error.message || "Failed to reset password");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form
            className={cn("flex flex-col gap-6", className)}
            {...props}
            onSubmit={handleSubmit}
        >
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">
                    {!isSubmitted ? "Reset your password" : "Password reset successful!"}
                </h1>
                <p className="text-sm text-muted-foreground">
                    {!isSubmitted
                        ? "Enter a new password below to finish resetting your account."
                        : "You can now sign in with your new password."}
                </p>
            </div>

            {!isSubmitted ? (
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input
                            id="new-password"
                            type="password"
                            placeholder="" // TODO what should this be?
                            required
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="confirm-password">Confirm Password</Label>
                        <Input
                            id="confirm-password"
                            type="password"
                            placeholder=""
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? "Resetting..." : "Reset Password"}
                    </Button>
                </div>
            ) : (
                <div className="grid gap-6">
                    <div className="text-center text-sm">
                        <Link href="/sign-in" className="underline underline-offset-4">
                            Sign in
                        </Link>
                    </div>
                </div>
            )}
        </form>
    );
}
