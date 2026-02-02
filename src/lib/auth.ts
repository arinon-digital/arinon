import { NextRequest, NextResponse } from "next/server";

// Constants for auth
export const ADMIN_COOKIE_NAME = "admin_session_token";
export const ADMIN_COOKIE_EXPIRY_HOURS = 24;

/**
 * Validates admin authentication from request headers or cookies
 * Returns { isValid: true } or an error response
 */
export function validateAdminAuth(request: NextRequest) {
  const secret = process.env.ADMIN_SECRET;

  if (!secret) {
    return {
      isValid: false,
      response: new NextResponse(
        JSON.stringify({
          error: "Admin authentication not configured",
          code: "AUTH_NOT_CONFIGURED",
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      ),
    };
  }

  // Check header or cookie for admin authentication
  const headerSecret = request.headers.get("x-admin-secret");
  const sessionToken = request.cookies.get(ADMIN_COOKIE_NAME)?.value;

  // Header secret is for API access (development/tooling)
  // Session token is for browser-based admin panel
  const isAuthorized = headerSecret === secret || sessionToken === "1";

  if (!isAuthorized) {
    return {
      isValid: false,
      response: new NextResponse(
        JSON.stringify({
          error: "Unauthorized",
          code: "UNAUTHORIZED",
          message: "Admin authentication required",
        }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      ),
    };
  }

  return { isValid: true };
}

/**
 * Checks if a request has valid admin authorization
 * If not authorized, returns error response directly
 * Can be used with early return pattern in API routes
 */
export function requireAdminAuth(request: NextRequest) {
  const validation = validateAdminAuth(request);
  if (!validation.isValid) {
    return validation.response;
  }
  return null;
}
