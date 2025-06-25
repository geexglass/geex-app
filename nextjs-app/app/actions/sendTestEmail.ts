"use server"
import { sendEmail } from "@/lib/email";

export async function sendTestEmail() {
    await sendEmail(
        'test@twango.dev',
        'Test Email',
        'This is a test email from the admin dashboard.'
    )
}