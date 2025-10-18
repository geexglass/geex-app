'use client'

import { useState, useEffect } from "react";
import { User } from "better-auth/types";
import { Organization } from "better-auth/plugins";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { Building2, Users, Settings, Plus, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toOrganizationSlug } from "@/lib/organization-utils";

interface OrganizationSettingsProps {
  user: User;
}

export function OrganizationSettings({ user }: OrganizationSettingsProps) {
  const { data: organizations, isPending: isLoadingOrgs } = authClient.useListOrganizations();
  const { data: activeOrganization, isPending: isLoadingActive } = authClient.useActiveOrganization();
  const [isSwitching, setIsSwitching] = useState(false);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [createName, setCreateName] = useState("");
  const [createHandle, setCreateHandle] = useState("");

  const isLoading = isLoadingOrgs || isLoadingActive;

  const handleOrganizationSwitch = async (organization: Organization) => {
    if (activeOrganization?.id === organization.id) return;
    
    setIsSwitching(true);
    try {
      const { error } = await authClient.organization.setActive({
        organizationId: organization.id
      });
      
      if (error) {
        toast.error(error.message || "Failed to switch organization");
        return;
      }
      
      toast.success(`Switched to ${organization.name}`);
    } catch (error) {
      toast.error("Something went wrong while switching organizations");
      console.error("Error switching organization:", error);
    } finally {
      setIsSwitching(false);
    }
  };

  const handleClearActiveOrganization = async () => {
    setIsSwitching(true);
    try {
      const { error } = await authClient.organization.setActive({
        organizationId: null
      });
      
      if (error) {
        toast.error(error.message || "Failed to clear active organization");
        return;
      }
      
      toast.success("Cleared active organization");
    } catch (error) {
      toast.error("Something went wrong");
      console.error("Error clearing active organization:", error);
    } finally {
      setIsSwitching(false);
    }
  };

  const handleCreateOrganization = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!createName.trim()) return;
    
    setIsCreating(true);
    try {
      const { data: newOrganization, error } = await authClient.organization.create({
        name: createName,
        slug: createHandle,
      });

      if (error) {
        toast.error(error.message || "Failed to create organization");
        return;
      }

      toast.success("Organization created successfully");
      setCreateName("");
      setCreateHandle("");
      setShowCreateDialog(false);
      // The useListOrganizations hook will automatically update
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error("Error creating organization:", error);
    } finally {
      setIsCreating(false);
    }
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newName = event.target.value;
    setCreateName(newName);
    setCreateHandle(toOrganizationSlug(newName));
  };

  const handleHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCreateHandle(event.target.value);
  };

  const canCreateOrganization = organizations && organizations.length < 3;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 p-4 border rounded-lg bg-muted/50">
          <div className="flex items-center gap-3">
            <div className="h-5 w-5 bg-muted animate-pulse rounded"></div>
            <div className="h-4 w-32 bg-muted animate-pulse rounded"></div>
          </div>
          <div className="h-4 w-48 bg-muted animate-pulse rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Current Active Organization Display */}
      <div className="grid gap-4 p-4 border rounded-lg bg-muted/50">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Building2 className="h-5 w-5 text-muted-foreground" />
            <div>
              <h4 className="font-medium">Active Organization</h4>
              {activeOrganization ? (
                <div className="mt-1">
                  <p className="text-sm font-medium">{activeOrganization.name}</p>
                  <p className="text-xs text-muted-foreground">@{activeOrganization.slug}</p>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground mt-1">No organization selected</p>
              )}
            </div>
          </div>
          
          {activeOrganization && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleClearActiveOrganization}
              disabled={isSwitching}
            >
              Clear
            </Button>
          )}
        </div>
      </div>

      {/* Organization Management */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">Your Organizations</h4>
            <p className="text-sm text-muted-foreground">
              {organizations?.length || 0} of 3 organizations
            </p>
          </div>
          
          {canCreateOrganization && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowCreateDialog(true)}
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              Create Organization
            </Button>
          )}
        </div>

        {/* Organizations List */}
        {!organizations?.length ? (
          <div className="p-8 text-center border rounded-lg border-dashed">
            <Building2 className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
            <h4 className="font-medium mb-1">No organizations yet</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Create your first organization to get started
            </p>
            {canCreateOrganization && (
              <Button onClick={() => setShowCreateDialog(true)} className="gap-2">
                <Plus className="h-4 w-4" />
                Create Organization
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {organizations.map((organization) => (
              <div
                key={organization.id}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h5 className="font-medium">{organization.name}</h5>
                      {activeOrganization?.id === organization.id && (
                        <Badge variant="secondary" className="text-xs">
                          Active
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">@{organization.slug}</p>
                    <p className="text-xs text-muted-foreground">
                      Created {new Date(organization.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {activeOrganization?.id !== organization.id ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleOrganizationSwitch(organization)}
                      disabled={isSwitching}
                    >
                      {isSwitching ? "Switching..." : "Switch"}
                    </Button>
                  ) : (
                    <Button variant="ghost" size="sm" disabled>
                      Current
                    </Button>
                  )}
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem disabled>
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem disabled>
                        Leave Organization
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        )}

        {!canCreateOrganization && (
          <div className="p-3 border rounded-lg bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              You&apos;ve reached the maximum of 3 organizations. To create a new one, you&apos;ll need to leave an existing organization first.
            </p>
          </div>
        )}
      </div>

      {/* Organization Info Section */}
      <div className="p-4 border rounded-lg bg-blue-50 dark:bg-blue-950/20">
        <div className="flex items-start gap-3">
          <Building2 className="h-5 w-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-900 dark:text-blue-100">
              Organization Management
            </h4>
            <div className="text-sm text-blue-700 dark:text-blue-200 mt-1 space-y-1">
              <p>• Switch between organizations you&apos;re a member of</p>
              <p>• Create up to 3 organizations per account</p>
              <p>• Manage organization settings and membership</p>
            </div>
          </div>
        </div>
      </div>

      {/* Create Organization Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleCreateOrganization}>
            <DialogHeader>
              <DialogTitle>Create Organization</DialogTitle>
              <DialogDescription>
                Create a new organization. The handle will be used in URLs.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="create-name" className="text-right">
                  Name
                </Label>
                <Input 
                  id="create-name" 
                  value={createName} 
                  onChange={handleNameChange} 
                  className="col-span-3" 
                  placeholder="My Organization"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="create-handle" className="text-right">
                  Handle
                </Label>
                <Input 
                  id="create-handle" 
                  value={createHandle} 
                  onChange={handleHandleChange} 
                  className="col-span-3" 
                  placeholder="my-organization"
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isCreating}>
                {isCreating ? "Creating..." : "Create Organization"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}