"use client"

import { User } from "@/lib/admin"
import { Ban, Trash2, UserCheck, Shield } from "lucide-react"
import { DataTableConfig } from "@/components/shared/DataTable"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"

interface UserTableConfigProps {
  onBanUser: (userId: string, banUntil?: Date) => void
  onUnbanUser: (userId: string) => void
  onDeleteUser: (userId: string) => void
  onUpdateRole: (userId: string, role: string) => void
}

export function createUserTableConfig(
  data: User[],
  { onBanUser, onUnbanUser, onDeleteUser, onUpdateRole }: UserTableConfigProps
): DataTableConfig<User> {
  return {
    data,
    selectable: true,
    searchable: true,
    searchPlaceholder: "Filter emails...",
    searchKey: "email",
    emptyMessage: "No users found.",
    columns: [
      {
        id: "name",
        accessorKey: "name",
        header: "Name",
        sortable: true,
        cell: (user) => <div className="font-medium">{user.name}</div>,
      },
      {
        id: "email",
        accessorKey: "email",
        header: "Email",
        sortable: true,
        cell: (user) => <div className="lowercase">{user.email}</div>,
      },
      {
        id: "role",
        accessorKey: "role",
        header: "Role",
        cell: (user) => (
          <Badge variant={user.role === "admin" ? "destructive" : "secondary"}>
            {user.role || "user"}
          </Badge>
        ),
      },
      {
        id: "emailVerified",
        accessorKey: "emailVerified",
        header: "Verified",
        cell: (user) => (
          <Badge variant={user.emailVerified ? "default" : "outline"}>
            {user.emailVerified ? "Yes" : "No"}
          </Badge>
        ),
      },
      {
        id: "status",
        header: "Status",
        cell: (user) => {
          if (user.banned) {
            return (
              <Badge variant="destructive">
                {user.bannedUntil 
                  ? `Banned until ${format(user.bannedUntil, "MMM dd, yyyy")}` 
                  : "Banned"}
              </Badge>
            )
          }
          return <Badge variant="default">Active</Badge>
        },
      },
      {
        id: "createdAt",
        accessorKey: "createdAt",
        header: "Created",
        sortable: true,
        cell: (user) => (
          <div>{format(user.createdAt, "MMM dd, yyyy")}</div>
        ),
      },
    ],
    actions: [
      {
        id: "copy-id",
        label: "Copy user ID",
        onClick: (user) => {
          navigator.clipboard.writeText(user.id)
        },
      },
      {
        id: "toggle-role",
        label: "Toggle admin role",
        icon: Shield,
        separator: true,
        onClick: (user) => {
          onUpdateRole(user.id, user.role === "admin" ? "user" : "admin")
        },
      },
      {
        id: "toggle-ban",
        label: "Toggle ban status",
        icon: Ban,
        onClick: (user) => {
          if (user.banned) {
            onUnbanUser(user.id)
          } else {
            onBanUser(user.id)
          }
        },
      },
      {
        id: "delete",
        label: "Delete user",
        icon: Trash2,
        variant: "destructive",
        separator: true,
        onClick: (user) => {
          onDeleteUser(user.id)
        },
      },
    ],
  }
}