'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { inviteUser } from "@/app/actions/inviteUser";
import { toast } from "sonner";
import { UserPlus } from "lucide-react";

interface UserInvitationDialogProps {
    organizationId?: string;
}

export default function UserInvitationDialog({ organizationId }: UserInvitationDialogProps) {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const handleInvite = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!email.trim()) {
            toast.error("Please enter an email address");
            return;
        }

        setIsLoading(true);

        try {
            const result = await inviteUser(email, organizationId);
            
            if (result.success) {
                toast.success("Invitation sent successfully!");
                setEmail("");
                setIsOpen(false);
            } else {
                toast.error(result.message);
            }
        } catch (error: any) {
            toast.error(error.message || "Failed to send invitation");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Invite User
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Invite User</DialogTitle>
                    <DialogDescription>
                        Send an invitation email to a new user. They&apos;ll receive a link to create their account.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleInvite} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="user@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
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
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? "Sending..." : "Send Invitation"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}