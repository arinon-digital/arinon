import { NextRequest, NextResponse } from "next/server";
import { requireAdminAuth } from "@/lib/auth";
import { getAllProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  // Admin-only: Check authentication before executing any Prisma queries
  const authError = requireAdminAuth(request);
  if (authError) {
    return authError;
  }

  try {
    const products = await getAllProducts(false); // Return full product data for admin
    return NextResponse.json(products);
  } catch (error) {
    console.error("GET /api/products error:", error);
    return NextResponse.json(
      { error: "Failed to load products", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
