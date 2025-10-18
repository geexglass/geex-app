"use server"

import { sendInvitationEmail } from "@/lib/email";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function inviteUser(email: string, organizationId?: string) {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });

        if (!session) {
            throw new Error("Unauthorized");
        }

        // Check if user is admin
        if (!session.user.role || session.user.role !== 'admin') {
            throw new Error("Insufficient permissions");
        }

        // Generate invite URL - in a real app, you'd create a signed invite token
        const inviteToken = Buffer.from(`${email}:${Date.now()}:${organizationId || ''}`).toString('base64');
        const inviteUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/sign-up?invite=${inviteToken}`;

        // Get organization name if provided
        let organizationName;
        if (organizationId) {
            // In a real app, you'd fetch the organization name from the database
            organizationName = "Your Organization";
        }

        await sendInvitationEmail(email, inviteUrl, organizationName);

        return { success: true, message: "Invitation sent successfully" };
    } catch (error: any) {
        console.error("Failed to send invitation:", error);
        return { success: false, message: error.message || "Failed to send invitation" };
    }
}