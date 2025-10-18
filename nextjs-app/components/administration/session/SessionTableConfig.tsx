"use client"

import { Session } from "@/lib/admin"
import { LogOut, Shield, Monitor, Smartphone, Tablet } from "lucide-react"
import { DataTableConfig } from "@/components/shared/DataTable"
import { Badge } from "@/components/ui/badge"
import { format, formatDistanceToNow } from "date-fns"
import { UAParser } from "ua-parser-js"

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
          const parser = new UAParser(session.userAgent || "")
          const result = parser.getResult()
          
          const browserName = result.browser.name || "Unknown Browser"
          const deviceType = result.device.type || "desktop"
          
          // Get appropriate icon based on device type
          const getDeviceIcon = () => {
            switch (deviceType) {
              case "mobile":
                return <Smartphone className="h-4 w-4 text-muted-foreground" />
              case "tablet":
                return <Tablet className="h-4 w-4 text-muted-foreground" />
              default:
                return <Monitor className="h-4 w-4 text-muted-foreground" />
            }
          }
          
          // Format device type for display
          const getDeviceLabel = () => {
            switch (deviceType) {
              case "mobile":
                return "Mobile"
              case "tablet":
                return "Tablet"
              default:
                return "Desktop"
            }
          }
          
          return (
            <div className="flex items-center gap-2">
              {getDeviceIcon()}
              <div>
                <div className="text-sm font-medium">{browserName}</div>
                <div className="text-xs text-muted-foreground">{getDeviceLabel()}</div>
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