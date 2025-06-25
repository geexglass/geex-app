import { betterAuth } from "better-auth";
import { Pool } from "pg";
import {admin, haveIBeenPwned, organization} from "better-auth/plugins";
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
        organization({}),
        haveIBeenPwned({
            customPasswordCompromisedMessage: "Please choose a more secure password."
        })
    ]
})