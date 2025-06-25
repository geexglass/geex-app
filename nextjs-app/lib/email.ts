"use server"

import nodemailer from 'nodemailer';


if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error('⚠️ EMAIL_USER or EMAIL_PASS is not defined in .env.local')
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // Your email password or app password
    }
})

export async function sendEmail(to: string, subject: string, text: string) {
    const mailOptions = {
        from: "No Reply <noreplytest@geex.glass>",
        to,
        subject,
        text,
    };

    await transporter.sendMail(mailOptions)
}

