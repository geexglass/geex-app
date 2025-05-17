"use client"

import * as React from "react"
import { PlusIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {authClient} from "@/lib/auth-client";
import {Organization} from "better-auth/plugins";

// Function to convert a string to kebab case
function toKebabCase(str: string): string {
  return str
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

interface CreateOrganizationDialogProps {
  onOrganizationCreated?: (organization: Organization) => void;
}

export function CreateOrganizationDialog({ onOrganizationCreated }: CreateOrganizationDialogProps) {
  const [name, setName] = React.useState("");
  const [handle, setHandle] = React.useState("");
  const [open, setOpen] = React.useState(false);

  // Update handle when name changes
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newName = event.target.value;
    setName(newName);
    setHandle(toKebabCase(newName));
  };

  // Handle handle change
  const handleHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHandle(event.target.value);
  };

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const { data : newOrganization  } = await authClient.organization.create({
          name,
          slug: handle,
      });

      if (newOrganization && onOrganizationCreated) {
        onOrganizationCreated(newOrganization);
      }

      setName("");
      setHandle("");
      setOpen(false);
    } catch (error) {
      console.error("Error creating organization:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="ml-2">
          <PlusIcon className="h-4 w-4 mr-2" />
          New Organization
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create Organization</DialogTitle>
            <DialogDescription>
              Create a new organization. The handle will be used in URLs.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input 
                id="name" 
                value={name} 
                onChange={handleNameChange} 
                className="col-span-3" 
                placeholder="My Organization"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="handle" className="text-right">
                Handle
              </Label>
              <Input 
                id="handle" 
                value={handle} 
                onChange={handleHandleChange} 
                className="col-span-3" 
                placeholder="my-organization"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Create Organization</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
