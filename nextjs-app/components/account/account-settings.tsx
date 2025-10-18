'use client'

import { User } from "better-auth/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ProfileSettings } from "./profile-settings";
import { PasswordSettings } from "./password-settings";
import { EmailSettings } from "./email-settings";
import { SessionSettings } from "./session-settings";
import { OrganizationSettings } from "./organization-settings";
import { DangerZone } from "./danger-zone";

interface AccountSettingsProps {
    user: User;
}

export function AccountSettings({ user }: AccountSettingsProps) {
    return (
        <div className="space-y-8">
            {/* Profile Information Section */}
            <Card>
                <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>
                        Update your personal information and display name
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ProfileSettings user={user} />
                </CardContent>
            </Card>

            {/* Password & Security Section */}
            <Card>
                <CardHeader>
                    <CardTitle>Password & Security</CardTitle>
                    <CardDescription>
                        Manage your password and security settings
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <PasswordSettings />
                </CardContent>
            </Card>

            {/* Email Settings Section */}
            <Card>
                <CardHeader>
                    <CardTitle>Email Settings</CardTitle>
                    <CardDescription>
                        Update your email address and verification status
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <EmailSettings user={user} />
                </CardContent>
            </Card>

            {/* Active Sessions Section */}
            <Card>
                <CardHeader>
                    <CardTitle>Active Sessions</CardTitle>
                    <CardDescription>
                        Manage your active login sessions across devices
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <SessionSettings userId={user.id} />
                </CardContent>
            </Card>

            {/* Organization Settings Section */}
            <Card>
                <CardHeader>
                    <CardTitle>Organization Settings</CardTitle>
                    <CardDescription>
                        Manage your organization memberships and create new organizations
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <OrganizationSettings user={user} />
                </CardContent>
            </Card>

            {/* Danger Zone Section */}
            <Card className="border-destructive">
                <CardHeader>
                    <CardTitle className="text-destructive">Danger Zone</CardTitle>
                    <CardDescription>
                        Irreversible and destructive actions
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <DangerZone user={user} />
                </CardContent>
            </Card>
        </div>
    );
}