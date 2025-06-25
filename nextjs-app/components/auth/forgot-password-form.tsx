import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      if (!showOTP) {
        // Step 1: Send OTP for password reset
        const { data, error } = await authClient.emailOtp.sendVerificationOtp({
          email,
          type: "forget-password"
        });

        if (error) {
          setError(error.message || "Failed to send verification code");
        } else if (data) {
          setShowOTP(true);
          toast.success("Verification code sent to your email");
        }
      } else {
        // Step 2: Reset password with OTP
        if (newPassword !== confirmPassword) {
          setError("Passwords do not match");
          setIsLoading(false);
          return;
        }

        const { error } = await authClient.emailOtp.resetPassword({
          email,
          otp,
          password: newPassword
        });

        if (error) {
          setError(error.message || "Failed to reset password");
        } else {
          setIsSubmitted(true);
          toast.success("Password reset successfully! You can now sign in with your new password.");
        }
      }
    } catch (error: any) {
      setError(error.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToEmail = () => {
    setShowOTP(false);
    setOtp("");
    setNewPassword("");
    setConfirmPassword("");
    setError("");
  };

  return (
    <form 
      className={cn("flex flex-col gap-6", className)} 
      {...props}
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">
          {isSubmitted 
            ? "Password reset successfully!" 
            : showOTP 
              ? "Enter verification code" 
              : "Forgot your password?"
          }
        </h1>
        <p className="text-balance text-sm text-muted-foreground">
          {isSubmitted
            ? "Your password has been reset. You can now sign in with your new password."
            : showOTP
              ? `We've sent a 6-digit code to ${email}`
              : "Enter your email below to receive a verification code"
          }
        </p>
      </div>
      {error && (
        <div className="text-sm text-red-500 text-center">
          {error}
        </div>
      )}

      {!isSubmitted ? (
        <div className="grid gap-6">
          {!showOTP ? (
            // Step 1: Email input
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="m@example.com" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
          ) : (
            // Step 2: OTP and new password inputs
            <>
              <div className="grid gap-2">
                <Label htmlFor="otp">Verification Code</Label>
                <Input 
                  id="otp" 
                  type="text" 
                  placeholder="Enter 6-digit code" 
                  required 
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  disabled={isLoading}
                  maxLength={6}
                  autoComplete="one-time-code"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input 
                  id="newPassword" 
                  type="password" 
                  required 
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input 
                  id="confirmPassword" 
                  type="password" 
                  required 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <Button 
                type="button" 
                variant="ghost" 
                size="sm" 
                onClick={handleBackToEmail}
                disabled={isLoading}
              >
                Back to email
              </Button>
            </>
          )}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading 
              ? (showOTP ? "Resetting..." : "Sending...") 
              : (showOTP ? "Reset Password" : "Send Verification Code")
            }
          </Button>
        </div>
      ) : (
        <div className="grid gap-6">
          <div className="text-center text-sm">
            <Link href="/sign-in" className="underline underline-offset-4">
              Sign in with your new password
            </Link>
          </div>
        </div>
      )}
    </form>
  );
}
