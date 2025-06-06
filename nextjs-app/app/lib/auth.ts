import { betterAuth } from "better-auth";
import { Pool } from "pg";

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
        enabled: true
    },
    database: new Pool({
        connectionString: postgresUrl
    }),
})