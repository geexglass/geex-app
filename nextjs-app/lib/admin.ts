"use server"

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export interface User {
    id: string;
    name: string;
    email: string;
    role?: string;
    emailVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
    bannedUntil?: Date | null;
    banned?: boolean;
}

export interface Session {
    id: string;
    userId: string;
    userAgent?: string;
    ipAddress?: string;
    createdAt: Date;
    updatedAt: Date;
    expiresAt: Date;
    user?: {
        name: string;
        email: string;
    };
}

export async function getAllUsers(): Promise<User[]> {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });

        if (!session || session.user.role !== 'admin') {
            throw new Error("Unauthorized");
        }

        const users = await auth.api.listUsers({
            query: {},
            headers: await headers()
        });

        return users.users.map(user => ({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            emailVerified: user.emailVerified,
            createdAt: new Date(user.createdAt),
            updatedAt: new Date(user.updatedAt),
            bannedUntil: null,
            banned: user.banned || false
        }));
    } catch (error) {
        console.error("Failed to fetch users:", error);
        throw error;
    }
}

export async function getAllSessions(): Promise<Session[]> {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });

        if (!session || session.user.role !== 'admin') {
            throw new Error("Unauthorized");
        }

        const sessions = await auth.api.listSessions({
            headers: await headers()
        });

        // Get all users to map user information to sessions
        const users = await auth.api.listUsers({
            query: {},
            headers: await headers()
        });

        const userMap = new Map(users.users.map(user => [user.id, user]));

        return sessions.map(session => ({
            id: session.id,
            userId: session.userId,
            userAgent: session.userAgent || undefined,
            ipAddress: session.ipAddress || undefined,
            createdAt: new Date(session.createdAt),
            updatedAt: new Date(session.updatedAt),
            expiresAt: new Date(session.expiresAt),
            user: userMap.get(session.userId) ? {
                name: userMap.get(session.userId)!.name,
                email: userMap.get(session.userId)!.email
            } : undefined
        }));
    } catch (error) {
        console.error("Failed to fetch sessions:", error);
        throw error;
    }
}

export async function updateUserRole(userId: string, role: string) {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });

        if (!session || session.user.role !== 'admin') {
            throw new Error("Unauthorized");
        }

        await auth.api.setRole({
            body: {
                userId,
                role: role as "admin" | "user"
            },
            headers: await headers()
        });

        return { success: true };
    } catch (error: any) {
        console.error("Failed to update user role:", error);
        return { success: false, error: error.message };
    }
}

export async function banUser(userId: string, banUntil?: Date) {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });

        if (!session || session.user.role !== 'admin') {
            throw new Error("Unauthorized");
        }

        await auth.api.banUser({
            body: {
                userId,
                banExpiresIn: banUntil ? Math.floor((banUntil.getTime() - Date.now()) / 1000) : undefined
            },
            headers: await headers()
        });

        return { success: true };
    } catch (error: any) {
        console.error("Failed to ban user:", error);
        return { success: false, error: error.message };
    }
}

export async function unbanUser(userId: string) {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });

        if (!session || session.user.role !== 'admin') {
            throw new Error("Unauthorized");
        }

        await auth.api.unbanUser({
            body: {
                userId
            },
            headers: await headers()
        });

        return { success: true };
    } catch (error: any) {
        console.error("Failed to unban user:", error);
        return { success: false, error: error.message };
    }
}

export async function deleteUser(userId: string) {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });

        if (!session || session.user.role !== 'admin') {
            throw new Error("Unauthorized");
        }

        // Better Auth doesn't have a direct deleteUser method on server-side
        // We'll ban the user permanently as an alternative
        await auth.api.banUser({
            body: {
                userId
            },
            headers: await headers()
        });

        return { success: true };
    } catch (error: any) {
        console.error("Failed to delete user:", error);
        return { success: false, error: error.message };
    }
}

export async function revokeSession(sessionId: string) {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });

        if (!session || session.user.role !== 'admin') {
            throw new Error("Unauthorized");
        }

        await auth.api.revokeSession({
            body: {
                token: sessionId
            },
            headers: await headers()
        });

        return { success: true };
    } catch (error: any) {
        console.error("Failed to revoke session:", error);
        return { success: false, error: error.message };
    }
}

export async function revokeUserSessions(userId: string) {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });

        if (!session || session.user.role !== 'admin') {
            throw new Error("Unauthorized");
        }

        await auth.api.revokeUserSessions({
            body: {
                userId
            },
            headers: await headers()
        });

        return { success: true };
    } catch (error: any) {
        console.error("Failed to revoke user sessions:", error);
        return { success: false, error: error.message };
    }
}