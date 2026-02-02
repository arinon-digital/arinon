import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_COOKIE_NAME, validateAdminAuth } from "./src/lib/auth";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Allow public routes and public API endpoints
  if (pathname.startsWith("/api/public")) {
    return NextResponse.next();
  }

  // Check if this is an admin API or admin page route
  const isAdminApi = pathname.startsWith("/api/admin");
  const isAdminPage = pathname.startsWith("/admin");

  // Allow the login endpoint (bypass auth for form submission)
  if (pathname === "/api/admin/login") {
    return NextResponse.next();
  }

  // If not admin-related, allow through
  if (!isAdminApi && !isAdminPage) {
    return NextResponse.next();
  }

  // Validate admin authentication for protected routes
  const validation = validateAdminAuth(request);
  if (!validation.isValid) {
    return validation.response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};


