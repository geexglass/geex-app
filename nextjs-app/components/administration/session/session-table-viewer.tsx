'use client'

import { useState, useEffect } from "react";
import { SessionTable } from "./session-table";
import { Session, getAllSessions, revokeSession, revokeUserSessions } from "@/lib/admin";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

export default function SessionTableViewer() {
    const [sessions, setSessions] = useState<Session[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const fetchSessions = async () => {
        try {
            const sessionData = await getAllSessions();
            setSessions(sessionData);
        } catch (error: any) {
            toast.error("Failed to fetch sessions: " + error.message);
        } finally {
            setIsLoading(false);
            setIsRefreshing(false);
        }
    };

    useEffect(() => {
        fetchSessions();
    }, []);

    const handleRefresh = async () => {
        setIsRefreshing(true);
        await fetchSessions();
    };

    const handleRevokeSession = async (sessionId: string) => {
        if (!confirm("Are you sure you want to revoke this session? The user will be logged out.")) {
            return;
        }

        try {
            const result = await revokeSession(sessionId);
            if (result.success) {
                toast.success("Session revoked successfully");
                await fetchSessions();
            } else {
                toast.error(result.error || "Failed to revoke session");
            }
        } catch (error: any) {
            toast.error("Failed to revoke session: " + error.message);
        }
    };

    const handleRevokeUserSessions = async (userId: string) => {
        if (!confirm("Are you sure you want to revoke ALL sessions for this user? They will be logged out from all devices.")) {
            return;
        }

        try {
            const result = await revokeUserSessions(userId);
            if (result.success) {
                toast.success("All user sessions revoked successfully");
                await fetchSessions();
            } else {
                toast.error(result.error || "Failed to revoke user sessions");
            }
        } catch (error: any) {
            toast.error("Failed to revoke user sessions: " + error.message);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-muted-foreground">Loading sessions...</div>
            </div>
        );
    }

    const activeSessions = sessions.filter(session => session.expiresAt > new Date());
    const expiredSessions = sessions.length - activeSessions.length;

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-medium">
                        Sessions ({sessions.length})
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        Manage active user sessions and security
                    </p>
                    <div className="flex gap-4 mt-2">
                        <span className="text-sm">
                            <span className="font-medium text-green-600">{activeSessions.length}</span> active
                        </span>
                        <span className="text-sm">
                            <span className="font-medium text-red-600">{expiredSessions}</span> expired
                        </span>
                    </div>
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={handleRefresh}
                    disabled={isRefreshing}
                >
                    <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
                    Refresh
                </Button>
            </div>
            
            <SessionTable
                data={sessions}
                onRevokeSession={handleRevokeSession}
                onRevokeUserSessions={handleRevokeUserSessions}
            />
        </div>
    );
}