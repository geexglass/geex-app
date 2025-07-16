import { betterAuth } from "better-auth";
import { Pool } from "pg";
import {admin, haveIBeenPwned, organization, emailOTP} from "better-auth/plugins";
import {nextCookies} from "better-auth/next-js";
import { sendEmail } from "./email";

const POSTGRES_USER = process.env.POSTGRES_USER;
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;
const POSTGRES_HOST = process.env.POSTGRES_HOST;
const POSTGRES_DB = process.env.POSTGRES_DB;

if (!POSTGRES_USER || !POSTGRES_PASSWORD || !POSTGRES_HOST || !POSTGRES_DB) {
    throw new Error("Missing PostgreSQL environment variables");
}

const postgresUrl = `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}/${POSTGRES_DB}`;

export const auth = betterAuth({
    emailAndPassword: {
        enabled: true,
        autoSignInAfterEmailVerification: true,
        forgotPassword: {
            enabled: true,
            sendResetEmail: async (email: string, resetToken: string) => {
                const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`;
                await sendEmail(
                    email,
                    "Reset Your Password - GEEX",
                    `Click the link below to reset your password:\n\n${resetUrl}\n\nThis link will expire in 1 hour.\n\nIf you didn't request this, please ignore this email.`
                );
            }
        }
    },
    emailVerification: {
        sendOnSignUp: true,
        autoSignInAfterVerification: true,
        sendVerificationEmail: async ({ user, url }) => {
            await sendEmail(
                user.email,
                "Verify Your Email - GEEX",
                `Welcome to GEEX! Please verify your email address by clicking the link below:\n\n${url}\n\nThis link will expire in 24 hours.\n\nIf you didn't create this account, please ignore this email.`
            );
        }
    },
    database: new Pool({
        connectionString: postgresUrl
    }),
    session: {
        cookieCache: {
            enabled: true,
            maxAge: 60 * 60, // 1 hour
        },
    },
    plugins: [
        nextCookies(),
        admin(),
        organization({
            allowUserToCreateOrganization: true,
            organizationLimit: 3,
            creatorRole: "owner",
        }),
        haveIBeenPwned({
            customPasswordCompromisedMessage: "Please choose a more secure password."
        }),
        emailOTP({
            async sendVerificationOTP({ email, otp, type }) {
                let subject = "";
                let message = "";

                switch (type) {
                    case "sign-in":
                        subject = "Sign In Verification Code - GEEX";
                        message = `Your verification code is: ${otp}\n\nThis code will expire in 10 minutes.\n\nIf you didn't request this, please ignore this email.`;
                        break;
                    case "email-verification":
                        subject = "Verify Your Email - GEEX";
                        message = `Your email verification code is: ${otp}\n\nThis code will expire in 10 minutes.\n\nPlease enter this code to verify your email address.`;
                        break;
                    case "forget-password":
                        subject = "Password Reset Verification - GEEX";
                        message = `Your password reset verification code is: ${otp}\n\nThis code will expire in 10 minutes.\n\nIf you didn't request this, please ignore this email.`;
                        break;
                }

                await sendEmail(email, subject, message);
            },
            expiresIn: 60 * 10, // 10 minutes
            otpLength: 6 // 6-digit code
        })
    ]
})