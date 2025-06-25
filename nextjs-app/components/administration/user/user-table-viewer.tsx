'use client'

import { useState, useEffect } from "react";
import { UserTable } from "./user-table";
import { User, getAllUsers, banUser, unbanUser, deleteUser, updateUserRole } from "@/lib/admin";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

export default function UserTableViewer() {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const fetchUsers = async () => {
        try {
            const userData = await getAllUsers();
            setUsers(userData);
        } catch (error: any) {
            toast.error("Failed to fetch users: " + error.message);
        } finally {
            setIsLoading(false);
            setIsRefreshing(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleRefresh = async () => {
        setIsRefreshing(true);
        await fetchUsers();
    };

    const handleBanUser = async (userId: string, banUntil?: Date) => {
        try {
            const result = await banUser(userId, banUntil);
            if (result.success) {
                toast.success("User banned successfully");
                await fetchUsers();
            } else {
                toast.error(result.error || "Failed to ban user");
            }
        } catch (error: any) {
            toast.error("Failed to ban user: " + error.message);
        }
    };

    const handleUnbanUser = async (userId: string) => {
        try {
            const result = await unbanUser(userId);
            if (result.success) {
                toast.success("User unbanned successfully");
                await fetchUsers();
            } else {
                toast.error(result.error || "Failed to unban user");
            }
        } catch (error: any) {
            toast.error("Failed to unban user: " + error.message);
        }
    };

    const handleDeleteUser = async (userId: string) => {
        if (!confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
            return;
        }

        try {
            const result = await deleteUser(userId);
            if (result.success) {
                toast.success("User deleted successfully");
                await fetchUsers();
            } else {
                toast.error(result.error || "Failed to delete user");
            }
        } catch (error: any) {
            toast.error("Failed to delete user: " + error.message);
        }
    };

    const handleUpdateRole = async (userId: string, role: string) => {
        try {
            const result = await updateUserRole(userId, role);
            if (result.success) {
                toast.success(`User role updated to ${role}`);
                await fetchUsers();
            } else {
                toast.error(result.error || "Failed to update user role");
            }
        } catch (error: any) {
            toast.error("Failed to update user role: " + error.message);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-muted-foreground">Loading users...</div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-medium">Users ({users.length})</h3>
                    <p className="text-sm text-muted-foreground">
                        Manage user accounts, roles, and permissions
                    </p>
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
            
            <UserTable
                data={users}
                onBanUser={handleBanUser}
                onUnbanUser={handleUnbanUser}
                onDeleteUser={handleDeleteUser}
                onUpdateRole={handleUpdateRole}
            />
        </div>
    );
}