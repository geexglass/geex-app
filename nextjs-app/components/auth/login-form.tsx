'use client'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
export function LoginForm({
                              className,
                              ...props
                          }: React.ComponentPropsWithoutRef<"form">) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [useOTP, setUseOTP] = useState(false);
    const [showOTP, setShowOTP] = useState(false);
    const [otp, setOtp] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        if (useOTP) {
            if (!showOTP) {
                // First step: Send OTP for sign-in
                const { data, error } = await authClient.emailOtp.sendVerificationOtp({
                    email,
                    type: "sign-in"
                });

                if (error) {
                    setError(error.message ? error.message : "Failed to send verification code");
                    setIsLoading(false);
                    return;
                }

                if (data) {
                    setShowOTP(true);
                }
            } else {
                // Second step: Sign in with OTP
                const { error: signInError } = await authClient.signIn.emailOtp({
                    email,
                    otp
                });

                if (signInError) {
                    setError(signInError.message ? signInError.message : "Invalid verification code");
                }
            }
        } else {
            // Traditional email/password sign-in
            const { error: signInError } = await authClient.signIn.email({
                email,
                password
            });

            if (signInError) {
                setError(signInError.message ? signInError.message : "Invalid email or password");
            }
        }

        setIsLoading(false);
    };

    const handleBackToLogin = () => {
        setShowOTP(false);
        setOtp("");
        setError("");
    };

    const toggleAuthMethod = () => {
        setUseOTP(!useOTP);
        setShowOTP(false);
        setOtp("");
        setPassword("");
        setError("");
    };

    return (
        <form className={cn("flex flex-col gap-6", className)} {...props} onSubmit={handleSubmit}>
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">
                    {showOTP ? "Enter Verification Code" : "Login to your account"}
                </h1>
                <p className="text-balance text-sm text-muted-foreground">
                    {showOTP 
                        ? `We've sent a 6-digit code to ${email}` 
                        : useOTP 
                            ? "Enter your email to receive a verification code"
                            : "Enter your email and password to sign in"
                    }
                </p>
            </div>
            {error && (
                <div className="text-sm text-red-500 text-center">
                    {error}
                </div>
            )}
            <div className="grid gap-6">
                {!showOTP ? (
                    <>
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
                        {!useOTP && (
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    <Link
                                        href="/forgot-password"
                                        className="ml-auto text-sm underline-offset-4 hover:underline"
                                    >
                                        Forgot your password?
                                    </Link>
                                </div>
                                <Input 
                                    id="password" 
                                    type="password" 
                                    required 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    disabled={isLoading}
                                />
                            </div>
                        )}
                    </>
                ) : (
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
                        <Button 
                            type="button" 
                            variant="ghost" 
                            size="sm" 
                            onClick={handleBackToLogin}
                            disabled={isLoading}
                        >
                            Back to login
                        </Button>
                    </div>
                )}
                <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading 
                        ? (showOTP ? "Verifying..." : useOTP ? "Sending code..." : "Signing in...") 
                        : (showOTP ? "Verify & Login" : useOTP ? "Send Verification Code" : "Sign In")
                    }
                </Button>
                {!showOTP && (
                    <>
                        <div className="text-center">
                            <Button 
                                type="button" 
                                variant="ghost" 
                                size="sm" 
                                onClick={toggleAuthMethod}
                                disabled={isLoading}
                                className="text-muted-foreground hover:text-foreground"
                            >
                                {useOTP ? "Use password instead" : "Use verification code instead"}
                            </Button>
                        </div>
                        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                            <span className="relative z-10 bg-background px-2 text-muted-foreground">
                                Or continue with
                            </span>
                        </div>
                        <Button variant="outline" className="w-full" type="button" disabled={isLoading}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path
                                    d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                                    fill="currentColor"
                                />
                            </svg>
                            Login with GitHub
                        </Button>
                    </>
                )}
            </div>
            <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/sign-up" className="underline underline-offset-4">
                    Sign up
                </Link>
            </div>
        </form>
    )
}
