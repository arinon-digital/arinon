export const runtime = "nodejs";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminAuth } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  // Admin-only: Verify authentication before accessing order data
  const authError = requireAdminAuth(request);
  if (authError) {
    return authError;
  }

  try {
    // Check for DATABASE_URL
    if (!process.env.DATABASE_URL) {
      console.error("DATABASE_URL environment variable is not set");
      return NextResponse.json(
        {
          error: "Database configuration error",
          details:
            "DATABASE_URL environment variable is missing. Please check your .env file.",
        },
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const purchases = await prisma.order.findMany({
      orderBy: { createdAt: "desc" },
    });

    // hydrate product data manually
    const productIds: string[] = Array.from(
      new Set(purchases.map((p) => p.productId))
    );
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
    });
    const productMap = new Map(products.map((p) => [p.id, p]));

    const enriched = purchases.map((p) => ({
      ...p,
      product: productMap.get(p.productId) || null,
    }));

    return NextResponse.json(enriched);
  } catch (error: any) {
    console.error("GET /api/admin/purchases error:", error);
    console.error("Error stack:", error?.stack);

    const errorMessage = error?.message || String(error);
    const errorDetails = error?.cause ? String(error.cause) : undefined;

    return NextResponse.json(
      {
        error: "Failed to load purchases",
        details: errorDetails ? `${errorMessage}: ${errorDetails}` : errorMessage,
      },
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
