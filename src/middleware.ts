import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {

  // Get the token from the request
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Define paths that need to be protected
  const profilePaths = ["/profile", "/shopping-cart"];
  const adminPaths = ["/dashboard"];

  const path = req.nextUrl.pathname;

  // Redirect to login if user is not logged in and tries to access profile or shopping-cart
  if (profilePaths.includes(path)) {
    if (!token?.sub) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
  }

  // Redirect to login if non-admin user tries to access admin routes
  if (adminPaths.includes(path)) {
    if (!token?.sub || token.role !== "admin") {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
  }

  // Allow request to proceed if it passes the above checks
  return NextResponse.next();
}

// Apply middleware only to specific routes
export const config = {
  matcher: ["/profile", "/shopping-cart", "/dashboard/:path*"],
};
