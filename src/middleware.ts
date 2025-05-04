// middleware.js
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt"; // To check the session (JWT token)

// This will run for every request to your app
export async function middleware(req: any) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // If there's no token (i.e., user is not authenticated)
  if (!token) {
    // Redirect to the login page
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Allow the request to proceed if authenticated
  return NextResponse.next();
}

// Specify which paths should use this middleware (e.g., protect all routes except login)
export const config = {
  matcher: ["/thread", "/"],
};
