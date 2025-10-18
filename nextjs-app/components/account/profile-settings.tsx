'use client'

import { useState } from "react";
import { User } from "better-auth/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

interface ProfileSettingsProps {
    user: User;
}

export function ProfileSettings({ user }: ProfileSettingsProps) {
    const [name, setName] = useState(user.name);
    const [isLoading, setIsLoading] = useState(false);

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const { error } = await authClient.updateUser({
                name
            });

            if (error) {
                toast.error(error.message || "Failed to update profile");
            } else {
                toast.success("Profile updated successfully");
                // Optionally refresh the page or update state
                window.location.reload();
            }
        } catch (error: any) {
            toast.error("An error occurred while updating profile");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Current Profile Info */}
            <div className="grid gap-4 p-4 border rounded-lg bg-muted/50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label className="text-sm text-muted-foreground">Current Name</Label>
                        <p className="font-medium">{user.name}</p>
                    </div>
                    <div>
                        <Label className="text-sm text-muted-foreground">Email</Label>
                        <div className="flex items-center gap-2">
                            <p className="font-medium">{user.email}</p>
                            <Badge variant={user.emailVerified ? "default" : "secondary"}>
                                {user.emailVerified ? "Verified" : "Unverified"}
                            </Badge>
                        </div>
                    </div>
                    <div>
                        <Label className="text-sm text-muted-foreground">Member Since</Label>
                        <p className="font-medium">{format(new Date(user.createdAt), "MMMM dd, yyyy")}</p>
                    </div>
                    <div>
                        <Label className="text-sm text-muted-foreground">User ID</Label>
                        <p className="font-mono text-sm text-muted-foreground">{user.id}</p>
                    </div>
                </div>
            </div>

            {/* Update Form */}
            <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div className="grid gap-2">
                    <Label htmlFor="name">Display Name</Label>
                    <Input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={isLoading}
                        placeholder="Enter your display name"
                    />
                </div>

                <Button 
                    type="submit" 
                    disabled={isLoading || name === user.name}
                    className="w-full sm:w-auto"
                >
                    {isLoading ? "Updating..." : "Update Profile"}
                </Button>
            </form>
        </div>
    );
}