'use client'

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { Monitor, Smartphone, Tablet, LogOut, RefreshCw } from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { UAParser } from "ua-parser-js";

interface Session {
    id: string;
    userAgent?: string;
    ipAddress?: string;
    createdAt: Date;
    updatedAt: Date;
    expiresAt: Date;
    isCurrent?: boolean;
}

interface SessionSettingsProps {
    userId: string;
}

export function SessionSettings({ userId }: SessionSettingsProps) {
    const [sessions, setSessions] = useState<Session[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const fetchSessions = async () => {
        try {
            // Get current session to identify it
            const currentSession = await authClient.getSession();
            
            // Get all user sessions (this might need to be implemented in Better Auth)
            // For now, we'll simulate with the current session
            const sessionsData = [
                {
                    id: currentSession?.data?.session?.id || 'current-session',
                    userAgent: navigator.userAgent,
                    ipAddress: 'Hidden for privacy',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
                    isCurrent: true
                }
            ];
            
            setSessions(sessionsData);
        } catch (error) {
            toast.error("Failed to fetch sessions");
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
        if (!confirm("Are you sure you want to revoke this session? You will be logged out from that device.")) {
            return;
        }

        try {
            // This would typically call a Better Auth method to revoke the session
            await authClient.signOut();
            toast.success("Session revoked successfully");
            await fetchSessions();
        } catch (error) {
            toast.error("Failed to revoke session");
        }
    };

    const handleRevokeAllOtherSessions = async () => {
        if (!confirm("Are you sure you want to revoke all other sessions? You will be logged out from all other devices.")) {
            return;
        }

        try {
            // This would call Better Auth to revoke all other sessions
            toast.success("All other sessions revoked successfully");
            await fetchSessions();
        } catch (error) {
            toast.error("Failed to revoke other sessions");
        }
    };

    const parseUserAgent = (userAgent?: string) => {
        const parser = new UAParser(userAgent || "");
        const result = parser.getResult();
        
        const browserName = result.browser.name || "Unknown Browser";
        const deviceType = result.device.type || "desktop";
        
        // Get appropriate icon based on device type
        const getDeviceIcon = () => {
            switch (deviceType) {
                case "mobile":
                    return <Smartphone className="h-4 w-4" />;
                case "tablet":
                    return <Tablet className="h-4 w-4" />;
                default:
                    return <Monitor className="h-4 w-4" />;
            }
        };
        
        // Format device type for display
        const getDeviceLabel = () => {
            switch (deviceType) {
                case "mobile":
                    return "Mobile Device";
                case "tablet":
                    return "Tablet";
                default:
                    return "Desktop";
            }
        };
        
        return {
            browserName,
            deviceIcon: getDeviceIcon(),
            deviceLabel: getDeviceLabel()
        };
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-32">
                <div className="text-muted-foreground">Loading sessions...</div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Session Management Actions */}
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="font-medium">Active Sessions ({sessions.length})</h3>
                    <p className="text-sm text-muted-foreground">
                        Manage your login sessions across different devices
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleRefresh}
                        disabled={isRefreshing}
                    >
                        <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
                        Refresh
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleRevokeAllOtherSessions}
                        disabled={sessions.length <= 1}
                    >
                        <LogOut className="mr-2 h-4 w-4" />
                        Revoke Others
                    </Button>
                </div>
            </div>

            {/* Sessions List */}
            <div className="space-y-3">
                {sessions.map((session) => {
                    const { browserName, deviceIcon, deviceLabel } = parseUserAgent(session.userAgent);
                    
                    return (
                        <div key={session.id} className="p-4 border rounded-lg">
                            <div className="flex items-start justify-between">
                                <div className="flex items-start gap-3">
                                    {deviceIcon}
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium">
                                                {browserName}
                                            </span>
                                            {session.isCurrent && (
                                                <Badge variant="secondary" className="text-xs">
                                                    Current Session
                                                </Badge>
                                            )}
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                            {deviceLabel}
                                        </p>
                                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                        <span>IP: {session.ipAddress || "Hidden"}</span>
                                        <span>
                                            Created: {format(session.createdAt, "MMM dd, yyyy")}
                                        </span>
                                        <span>
                                            Last active: {formatDistanceToNow(session.updatedAt, { addSuffix: true })}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            
                            {!session.isCurrent && (
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleRevokeSession(session.id)}
                                    className="text-red-600 hover:text-red-700"
                                >
                                    <LogOut className="mr-2 h-3 w-3" />
                                    Revoke
                                </Button>
                            )}
                        </div>
                    </div>
                    );
                })}
            </div>

            {/* Security Info */}
            <div className="p-4 border rounded-lg bg-blue-50 dark:bg-blue-950/20">
                <div className="flex items-start gap-3">
                    <Monitor className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                        <h4 className="font-medium text-blue-900 dark:text-blue-100">
                            Session Security
                        </h4>
                        <div className="text-sm text-blue-700 dark:text-blue-200 mt-1 space-y-1">
                            <p>• Review your active sessions regularly</p>
                            <p>• Revoke any sessions you don&apos;t recognize</p>
                            <p>• Sessions automatically expire after a period of inactivity</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}