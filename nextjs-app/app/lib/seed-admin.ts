import {auth} from "@/app/lib/auth";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const ADMIN_NAME = process.env.ADMIN_NAME;

let seededAdmin = false

export async function seedAdmin() {
    if (seededAdmin) return;

    if (!ADMIN_EMAIL || !ADMIN_PASSWORD || !ADMIN_NAME) {
        throw new Error("Missing admin environment variables");
    }

    try {
        await auth.api.createUser({
            body: {
                email: ADMIN_EMAIL,
                password: ADMIN_PASSWORD,
                name: ADMIN_NAME,
                role: ["admin"],
            }
        })
    } catch (error: unknown) {
        console.log("Failed to create new admin user, does it already exist?");
    }

    seededAdmin = true;
}

