import { NextResponse } from "next/server";
import { getAllProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

/**
 * Public endpoint to list products without sensitive data
 * Returns products excluding driveLink (admin-only sensitive data)
 */
export async function GET() {
  try {
    const products = await getAllProducts(true); // excludeDriveLink = true
    return NextResponse.json(products);
  } catch (error) {
    console.error("GET /api/public/products error:", error);
    return NextResponse.json(
      { error: "Failed to load products", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
