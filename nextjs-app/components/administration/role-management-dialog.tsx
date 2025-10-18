'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { updateUserRole } from "@/lib/admin";
import { toast } from "sonner";
import { Shield } from "lucide-react";

interface RoleManagementDialogProps {
    userId: string;
    currentRole?: string;
    userName: string;
    onRoleUpdate: () => void;
}

const AVAILABLE_ROLES = [
    { value: "user", label: "User", description: "Standard user with basic permissions" },
    { value: "admin", label: "Administrator", description: "Full administrative access" },
    { value: "moderator", label: "Moderator", description: "Can moderate content and users" },
    { value: "editor", label: "Editor", description: "Can edit and manage content" },
];

export default function RoleManagementDialog({ 
    userId, 
    currentRole, 
    userName, 
    onRoleUpdate 
}: RoleManagementDialogProps) {
    const [selectedRole, setSelectedRole] = useState(currentRole || "user");
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const handleUpdateRole = async () => {
        if (selectedRole === currentRole) {
            setIsOpen(false);
            return;
        }

        setIsLoading(true);

        try {
            const result = await updateUserRole(userId, selectedRole);
            
            if (result.success) {
                toast.success(`Role updated to ${selectedRole} for ${userName}`);
                onRoleUpdate();
                setIsOpen(false);
            } else {
                toast.error(result.error || "Failed to update role");
            }
        } catch (error: any) {
            toast.error(error.message || "Failed to update role");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                    <Shield className="mr-2 h-4 w-4" />
                    Manage Role
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Manage User Role</DialogTitle>
                    <DialogDescription>
                        Change the role and permissions for {userName}
                    </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="role">Select Role</Label>
                        <Select value={selectedRole} onValueChange={setSelectedRole}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                            <SelectContent>
                                {AVAILABLE_ROLES.map((role) => (
                                    <SelectItem key={role.value} value={role.value}>
                                        <div className="flex flex-col">
                                            <span className="font-medium">{role.label}</span>
                                            <span className="text-sm text-muted-foreground">
                                                {role.description}
                                            </span>
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {selectedRole !== currentRole && (
                        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                            <p className="text-sm text-yellow-800">
                                <strong>Warning:</strong> Changing user roles will immediately affect their permissions and access level.
                            </p>
                        </div>
                    )}
                </div>

                <div className="flex justify-end space-x-2">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsOpen(false)}
                        disabled={isLoading}
                    >
                        Cancel
                    </Button>
                    <Button 
                        onClick={handleUpdateRole} 
                        disabled={isLoading || selectedRole === currentRole}
                    >
                        {isLoading ? "Updating..." : "Update Role"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}