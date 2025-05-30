import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: Add actual email validation and password reset logic
    // For now, we'll just simulate a successful submission
    setIsSubmitted(true);
  };

  return (
    <form 
      className={cn("flex flex-col gap-6", className)} 
      {...props}
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">
          {!isSubmitted ? "Forgot your password?" : "Password reset link sent!"}
        </h1>
        <p className="text-balance text-sm text-muted-foreground">
          {!isSubmitted 
            ? "Enter your email below to receive a password reset link"
            : "Check your email or spam inbox to find a reset link"
          }
        </p>
      </div>

      {!isSubmitted ? (
        <div className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="m@example.com" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full">
            Send Reset Link
          </Button>
        </div>
      ) : (
        <div className="grid gap-6">
          <div className="text-center text-sm">
            Remember your password?{" "}
            <Link href="/sign-in" className="underline underline-offset-4">
              Sign in
            </Link>
          </div>
        </div>
      )}
    </form>
  );
}
