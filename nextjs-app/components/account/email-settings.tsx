'use client'

import { useState } from "react";
import { User } from "better-auth/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { CheckCircle, Mail, AlertCircle } from "lucide-react";

interface EmailSettingsProps {
    user: User;
}

export function EmailSettings({ user }: EmailSettingsProps) {
    const [newEmail, setNewEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isResendingVerification, setIsResendingVerification] = useState(false);

    const handleUpdateEmail = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (newEmail === user.email) {
            toast.error("New email must be different from current email");
            return;
        }

        setIsLoading(true);

        try {
            // Check if changeEmail method exists, otherwise use updateUser with name only
            if (typeof authClient.changeEmail === 'function') {
                const { error } = await authClient.changeEmail({
                    newEmail: newEmail
                });

                if (error) {
                    toast.error(error.message || "Failed to update email");
                } else {
                    toast.success("Email update initiated. Please check your email for verification.");
                    setNewEmail("");
                }
            } else {
                // Fallback: Email updates may need to be handled server-side
                toast.info("Email updates must be requested through your admin. Please contact support.");
            }
        } catch (error: any) {
            toast.error("An error occurred while updating email");
        } finally {
            setIsLoading(false);
        }
    };

    const handleResendVerification = async () => {
        setIsResendingVerification(true);

        try {
            const { error } = await authClient.sendVerificationEmail({
                email: user.email
            });

            if (error) {
                toast.error(error.message || "Failed to send verification email");
            } else {
                toast.success("Verification email sent. Please check your inbox.");
            }
        } catch (error: any) {
            toast.error("An error occurred while sending verification email");
        } finally {
            setIsResendingVerification(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Current Email Status */}
            <div className="grid gap-4 p-4 border rounded-lg bg-muted/50">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{user.email}</span>
                    </div>
                    <Badge 
                        variant={user.emailVerified ? "default" : "secondary"}
                        className="flex items-center gap-1"
                    >
                        {user.emailVerified ? (
                            <>
                                <CheckCircle className="h-3 w-3" />
                                Verified
                            </>
                        ) : (
                            <>
                                <AlertCircle className="h-3 w-3" />
                                Unverified
                            </>
                        )}
                    </Badge>
                </div>

                {!user.emailVerified && (
                    <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-md">
                        <div className="flex items-start gap-2">
                            <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5" />
                            <div>
                                <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                                    Email not verified
                                </p>
                                <p className="text-xs text-yellow-700 dark:text-yellow-300">
                                    Please verify your email address to secure your account
                                </p>
                            </div>
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleResendVerification}
                            disabled={isResendingVerification}
                        >
                            {isResendingVerification ? "Sending..." : "Resend"}
                        </Button>
                    </div>
                )}
            </div>

            {/* Update Email Form */}
            <form onSubmit={handleUpdateEmail} className="space-y-4">
                <div className="grid gap-2">
                    <Label htmlFor="newEmail">New Email Address</Label>
                    <Input
                        id="newEmail"
                        type="email"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        disabled={isLoading}
                        placeholder="Enter your new email address"
                    />
                    <p className="text-xs text-muted-foreground">
                        You&apos;ll need to verify your new email address before it becomes active
                    </p>
                </div>

                <Button 
                    type="submit" 
                    disabled={isLoading || !newEmail || newEmail === user.email}
                    className="w-full sm:w-auto"
                >
                    {isLoading ? "Updating Email..." : "Update Email"}
                </Button>
            </form>

            {/* Email Security Info */}
            <div className="p-4 border rounded-lg bg-blue-50 dark:bg-blue-950/20">
                <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                        <h4 className="font-medium text-blue-900 dark:text-blue-100">
                            Email Security
                        </h4>
                        <div className="text-sm text-blue-700 dark:text-blue-200 mt-1 space-y-1">
                            <p>• Your email is used for account recovery and important notifications</p>
                            <p>• Always verify your email address to secure your account</p>
                            <p>• We&apos;ll send a verification link to any new email address</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}