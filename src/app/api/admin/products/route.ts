export const runtime = "nodejs";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminAuth } from "@/lib/auth";
import { z } from "zod";

export const dynamic = "force-dynamic";

const productSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().positive("Price must be positive"),
  currency: z.string().min(1, "Currency is required"),
  coverUrl: z.string().min(1, "Cover URL is required"),
  coverImage: z.string().optional(),
  driveLink: z.string().min(1, "Drive link is required"),
});

export async function GET(request: NextRequest) {
  // Admin-only: Verify authentication before executing any Prisma queries
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

    // Verify Prisma is available
    if (!prisma) {
      throw new Error("Prisma Client is not initialized");
    }

    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(products);
  } catch (error: any) {
    console.error("GET /api/admin/products error:", error);
    console.error("Error name:", error?.name);
    console.error("Error message:", error?.message);
    console.error("Error stack:", error?.stack);

    const errorMessage = error?.message || String(error);
    const errorDetails = error?.cause ? String(error.cause) : undefined;

    return NextResponse.json(
      {
        error: "Failed to load products",
        details: errorDetails
          ? `${errorMessage}: ${errorDetails}`
          : errorMessage,
      },
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export async function POST(request: NextRequest) {
  // Admin-only: Verify authentication before executing any Prisma queries
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

    // Verify Prisma is available
    if (!prisma) {
      throw new Error("Prisma Client is not initialized");
    }

    let data;
    try {
      data = await request.json();
    } catch (jsonError) {
      console.error("JSON parse error:", jsonError);
      return NextResponse.json(
        { error: "Invalid JSON in request body" },
        { status: 400 }
      );
    }

    console.log("Received product data:", data);

    const parsed = productSchema.safeParse(data);
    if (!parsed.success) {
      console.error("Validation errors:", parsed.error.errors);
      const validationErrors = parsed.error.errors
        .map((e) => `${e.path.join(".")}: ${e.message}`)
        .join(", ");
      return NextResponse.json(
        {
          error: "Invalid input",
          details: validationErrors,
        },
        { status: 400 }
      );
    }

    // Ensure coverImage is set (use coverUrl as fallback)
    const productData = {
      ...parsed.data,
      coverImage: parsed.data.coverImage || parsed.data.coverUrl,
    };

    const product = await prisma.product.create({ data: productData });
    console.log("Product created successfully:", product.id);
    return NextResponse.json(product, { status: 201 });
  } catch (error: any) {
    console.error("Create product error:", error);
    console.error("Error name:", error?.name);
    console.error("Error message:", error?.message);
    console.error("Error stack:", error?.stack);

    // Ensure we always return JSON, never HTML
    const errorMessage = error?.message || String(error);
    const errorDetails = error?.cause ? String(error.cause) : undefined;

    return NextResponse.json(
      {
        error: "Unable to create product",
        details: errorDetails
          ? `${errorMessage}: ${errorDetails}`
          : errorMessage,
      },
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
