import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function middleware(request: NextRequest) {
    const sessionCookie = getSessionCookie(request);

    if (!sessionCookie) {
        return NextResponse.redirect(new URL("/sign-in", request.url)); // Force login
    }

    return NextResponse.next(); // Continue to the requested page
}

export const config = {
    matcher: [
        "/admin/:path*", // Guard admin routes
    ],
};
