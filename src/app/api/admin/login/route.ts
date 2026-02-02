import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, ADMIN_COOKIE_EXPIRY_HOURS } from "@/lib/auth";

// Simple in-memory rate limiting (should use Redis in production)
const loginAttempts = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(clientId: string): boolean {
  const now = Date.now();
  const attempt = loginAttempts.get(clientId);

  if (!attempt || attempt.resetTime < now) {
    // Reset after 15 minutes
    loginAttempts.set(clientId, { count: 0, resetTime: now + 15 * 60 * 1000 });
    return true;
  }

  if (attempt.count >= 5) {
    return false; // Too many attempts
  }

  attempt.count++;
  return true;
}

export async function POST(request: NextRequest) {
  const secret = process.env.ADMIN_SECRET;

  if (!secret) {
    return NextResponse.json(
      { error: "Admin secret not configured on the server." },
      { status: 500 }
    );
  }

  // Get client IP for rate limiting
  const clientIp = request.headers.get("x-forwarded-for") || 
                   request.headers.get("x-real-ip") || 
                   "unknown";

  // Check rate limit
  if (!checkRateLimit(clientIp)) {
    return NextResponse.json(
      { error: "Too many login attempts. Please try again later." },
      { status: 429 }
    );
  }

  let body: { password?: string } = {};
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request format." },
      { status: 400 }
    );
  }

  const { password } = body;

  // Constant-time comparison to prevent timing attacks
  const isPasswordValid = constantTimeCompare(password || "", secret);

  if (!isPasswordValid) {
    // Generic error message to prevent username/password enumeration
    return NextResponse.json(
      { error: "Invalid credentials." },
      { status: 401 }
    );
  }

  const response = NextResponse.json({ success: true });

  // Set secure session cookie with expiration
  const expiresIn = ADMIN_COOKIE_EXPIRY_HOURS * 60 * 60 * 1000;
  response.cookies.set(ADMIN_COOKIE_NAME, "1", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: expiresIn / 1000, // maxAge in seconds
  });

  return response;
}

/**
 * Constant-time string comparison to prevent timing attacks
 */
function constantTimeCompare(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false;
  }

  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }

  return result === 0;
}


