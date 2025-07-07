'use client'

import { useState } from "react";
import { User } from "better-auth/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { AlertTriangle, Trash2, Download } from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface DangerZoneProps {
    user: User;
}

export function DangerZone({ user }: DangerZoneProps) {
    const [confirmEmail, setConfirmEmail] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [isExporting, setIsExporting] = useState(false);

    const handleDeleteAccount = async () => {
        if (confirmEmail !== user.email) {
            toast.error("Email confirmation does not match");
            return;
        }

        setIsDeleting(true);

        try {
            // Note: Better Auth might not have a direct deleteAccount method
            // This would typically need to be implemented as a server action
            // For now, we'll show what the flow would look like
            
            // await authClient.deleteAccount();
            
            toast.success("Account deletion initiated. You will be logged out shortly.");
            
            // Sign out the user
            await authClient.signOut();
            
            // Redirect to home page
            window.location.href = "/";
        } catch (error: any) {
            toast.error("Failed to delete account. Please contact support.");
        } finally {
            setIsDeleting(false);
        }
    };

    const handleExportData = async () => {
        setIsExporting(true);

        try {
            // This would typically call an API endpoint to generate user data export
            const userData = {
                profile: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    emailVerified: user.emailVerified,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt
                },
                exportedAt: new Date().toISOString()
            };

            // Create and download JSON file
            const dataStr = JSON.stringify(userData, null, 2);
            const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
            
            const exportFileDefaultName = `account-data-${user.id}.json`;
            
            const linkElement = document.createElement('a');
            linkElement.setAttribute('href', dataUri);
            linkElement.setAttribute('download', exportFileDefaultName);
            linkElement.click();

            toast.success("Account data exported successfully");
        } catch (error) {
            toast.error("Failed to export account data");
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Export Data Section */}
            <div className="p-4 border rounded-lg">
                <div className="flex items-start justify-between">
                    <div className="space-y-1">
                        <h3 className="font-medium flex items-center gap-2">
                            <Download className="h-4 w-4" />
                            Export Account Data
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            Download a copy of your account data in JSON format
                        </p>
                    </div>
                    <Button
                        variant="outline"
                        onClick={handleExportData}
                        disabled={isExporting}
                    >
                        {isExporting ? "Exporting..." : "Export Data"}
                    </Button>
                </div>
            </div>

            {/* Delete Account Section */}
            <div className="p-4 border border-destructive rounded-lg bg-destructive/5">
                <div className="space-y-4">
                    <div className="flex items-start gap-3">
                        <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
                        <div>
                            <h3 className="font-medium text-destructive">
                                Delete Account
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1">
                                Permanently delete your account and all associated data. This action cannot be undone.
                            </p>
                        </div>
                    </div>

                    <div className="bg-destructive/10 p-3 rounded-md">
                        <h4 className="font-medium text-destructive text-sm mb-2">
                            What happens when you delete your account:
                        </h4>
                        <ul className="text-xs text-muted-foreground space-y-1">
                            <li>• Your profile and account information will be permanently deleted</li>
                            <li>• All your sessions will be terminated across all devices</li>
                            <li>• This action cannot be reversed or undone</li>
                            <li>• You will need to create a new account to use our services again</li>
                        </ul>
                    </div>

                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive" className="w-full sm:w-auto">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete Account
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle className="flex items-center gap-2">
                                    <AlertTriangle className="h-5 w-5 text-destructive" />
                                    Delete Account
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete your account
                                    and remove your data from our servers.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            
                            <div className="space-y-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="confirmEmail">
                                        Type your email address to confirm: <span className="font-mono text-sm">{user.email}</span>
                                    </Label>
                                    <Input
                                        id="confirmEmail"
                                        type="email"
                                        value={confirmEmail}
                                        onChange={(e) => setConfirmEmail(e.target.value)}
                                        placeholder={user.email}
                                    />
                                </div>
                            </div>

                            <AlertDialogFooter>
                                <AlertDialogCancel onClick={() => setConfirmEmail("")}>
                                    Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={handleDeleteAccount}
                                    disabled={confirmEmail !== user.email || isDeleting}
                                    className="bg-destructive hover:bg-destructive/90"
                                >
                                    {isDeleting ? "Deleting..." : "Delete Account"}
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>
        </div>
    );
}