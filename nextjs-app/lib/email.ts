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

export async function sendEmail(to: string, subject: string, text: string, html?: string) {
    const mailOptions = {
        from: "No Reply <noreplytest@geex.glass>",
        to,
        subject,
        text,
        ...(html && { html }),
    };

    await transporter.sendMail(mailOptions)
}

export async function sendPasswordResetEmail(to: string, resetUrl: string) {
    const subject = "Reset Your Password - GEEX";
    const text = `Click the link below to reset your password:\n\n${resetUrl}\n\nThis link will expire in 1 hour.\n\nIf you didn't request this, please ignore this email.`;
    
    const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">Reset Your Password</h2>
            <p>You requested to reset your password. Click the button below to create a new password:</p>
            <div style="text-align: center; margin: 30px 0;">
                <a href="${resetUrl}" 
                   style="background-color: #007cba; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
                    Reset Password
                </a>
            </div>
            <p style="color: #666; font-size: 14px;">
                This link will expire in 1 hour. If you didn't request this, please ignore this email.
            </p>
            <p style="color: #666; font-size: 14px;">
                If the button doesn't work, copy and paste this link into your browser:<br>
                <a href="${resetUrl}">${resetUrl}</a>
            </p>
        </div>
    `;
    
    await sendEmail(to, subject, text, html);
}

export async function sendInvitationEmail(to: string, inviteUrl: string, organizationName?: string) {
    const subject = `You're invited to join${organizationName ? ` ${organizationName} on` : ''} GEEX`;
    const text = `You've been invited to join${organizationName ? ` ${organizationName} on` : ''} GEEX.\n\nClick the link below to create your account:\n\n${inviteUrl}\n\nThis invitation will expire in 7 days.`;
    
    const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">You're Invited!</h2>
            <p>You've been invited to join${organizationName ? ` <strong>${organizationName}</strong> on` : ''} GEEX.</p>
            <p>Click the button below to create your account and get started:</p>
            <div style="text-align: center; margin: 30px 0;">
                <a href="${inviteUrl}" 
                   style="background-color: #28a745; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
                    Accept Invitation
                </a>
            </div>
            <p style="color: #666; font-size: 14px;">
                This invitation will expire in 7 days.
            </p>
            <p style="color: #666; font-size: 14px;">
                If the button doesn't work, copy and paste this link into your browser:<br>
                <a href="${inviteUrl}">${inviteUrl}</a>
            </p>
        </div>
    `;
    
    await sendEmail(to, subject, text, html);
}

