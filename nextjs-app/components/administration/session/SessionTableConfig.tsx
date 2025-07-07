"use client"

import { Session } from "@/lib/admin"
import { LogOut, Shield, Monitor } from "lucide-react"
import { DataTableConfig } from "@/components/shared/DataTable"
import { Badge } from "@/components/ui/badge"
import { format, formatDistanceToNow } from "date-fns"

interface SessionTableConfigProps {
  onRevokeSession: (sessionId: string) => void
  onRevokeUserSessions: (userId: string) => void
}

export function createSessionTableConfig(
  data: Session[],
  { onRevokeSession, onRevokeUserSessions }: SessionTableConfigProps
): DataTableConfig<Session> {
  return {
    data,
    selectable: true,
    searchable: true,
    searchPlaceholder: "Filter by user email...",
    searchKey: "user.email",
    emptyMessage: "No sessions found.",
    columns: [
      {
        id: "user",
        header: "User",
        sortable: true,
        cell: (session) => (
          <div>
            <div className="font-medium">{session.user?.name || "Unknown"}</div>
            <div className="text-sm text-muted-foreground">{session.user?.email}</div>
          </div>
        ),
      },
      {
        id: "device",
        header: "Device",
        cell: (session) => {
          const getBrowserInfo = (ua: string) => {
            if (!ua) return { browser: "Unknown", device: "Unknown" }
            
            let browser = "Unknown"
            let device = "Desktop"
            
            if (ua.includes("Chrome")) browser = "Chrome"
            else if (ua.includes("Firefox")) browser = "Firefox"
            else if (ua.includes("Safari")) browser = "Safari"
            else if (ua.includes("Edge")) browser = "Edge"
            
            if (ua.includes("Mobile") || ua.includes("Android") || ua.includes("iPhone")) {
              device = "Mobile"
            } else if (ua.includes("Tablet") || ua.includes("iPad")) {
              device = "Tablet"
            }
            
            return { browser, device }
          }
          
          const { browser, device } = getBrowserInfo(session.userAgent || "")
          
          return (
            <div className="flex items-center gap-2">
              <Monitor className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-sm font-medium">{browser}</div>
                <div className="text-xs text-muted-foreground">{device}</div>
              </div>
            </div>
          )
        },
      },
      {
        id: "ipAddress",
        header: "IP Address",
        cell: (session) => (
          <code className="text-sm bg-muted px-1 rounded">
            {session.ipAddress || "Unknown"}
          </code>
        ),
      },
      {
        id: "createdAt",
        accessorKey: "createdAt",
        header: "Created",
        sortable: true,
        cell: (session) => (
          <div>
            <div className="text-sm">{format(session.createdAt, "MMM dd, yyyy")}</div>
            <div className="text-xs text-muted-foreground">
              {formatDistanceToNow(session.createdAt, { addSuffix: true })}
            </div>
          </div>
        ),
      },
      {
        id: "expiresAt",
        header: "Expires",
        cell: (session) => {
          const isExpired = session.expiresAt < new Date()
          
          return (
            <div>
              <Badge variant={isExpired ? "destructive" : "default"}>
                {isExpired ? "Expired" : "Active"}
              </Badge>
              <div className="text-xs text-muted-foreground mt-1">
                {format(session.expiresAt, "MMM dd, yyyy HH:mm")}
              </div>
            </div>
          )
        },
      },
      {
        id: "lastActivity",
        header: "Last Activity",
        cell: (session) => (
          <div className="text-sm">
            {formatDistanceToNow(session.updatedAt, { addSuffix: true })}
          </div>
        ),
      },
    ],
    actions: [
      {
        id: "copy-session-id",
        label: "Copy session ID",
        onClick: (session) => {
          navigator.clipboard.writeText(session.id)
        },
      },
      {
        id: "copy-user-id",
        label: "Copy user ID",
        onClick: (session) => {
          navigator.clipboard.writeText(session.userId)
        },
      },
      {
        id: "revoke-session",
        label: "Revoke session",
        icon: LogOut,
        variant: "destructive",
        separator: true,
        onClick: (session) => {
          onRevokeSession(session.id)
        },
      },
      {
        id: "revoke-user-sessions",
        label: "Revoke all user sessions",
        icon: Shield,
        variant: "destructive",
        onClick: (session) => {
          onRevokeUserSessions(session.userId)
        },
      },
    ],
  }
}