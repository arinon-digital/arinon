export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { requireAdminAuth } from "@/lib/auth";
import {prisma} from "@/lib/prisma";
import { z } from "zod";

export const dynamic = "force-dynamic";

const updateSchema = z.object({
  title: z.string().min(1, "Title is required").optional(),
  description: z.string().min(1, "Description is required").optional(),
  price: z.number().positive("Price must be positive").optional(),
  currency: z.string().min(1, "Currency is required").optional(),
  coverUrl: z.string().min(1, "Cover URL is required").optional(),
  coverImage: z.string().optional(),
  driveLink: z.string().min(1, "Drive link is required").optional(),
});

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  // Admin-only: Verify authentication before executing any Prisma queries
  const authError = requireAdminAuth(request);
  if (authError) {
    return authError;
  }

  try {
    const data = await request.json();
    console.log("Received update data for product:", params.id, data);
    
    const parsed = updateSchema.safeParse(data);
    if (!parsed.success) {
      console.error("Validation errors:", parsed.error.errors);
      return NextResponse.json(
        { 
          error: "Invalid input", 
          details: parsed.error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ')
        }, 
        { status: 400 }
      );
    }

    // Ensure coverImage is set if coverUrl is being updated
    const updateData = { ...parsed.data };
    if (updateData.coverUrl && !updateData.coverImage) {
      updateData.coverImage = updateData.coverUrl;
    }
    
    const product = await prisma.product.update({
      where: { id: params.id },
      data: updateData,
    });

    console.log("Product updated successfully:", product.id);
    return NextResponse.json(product);
  } catch (error) {
    console.error("Update product error", error);
    return NextResponse.json(
      { error: "Unable to update product", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  // Admin-only: Verify authentication before executing any Prisma queries
  const authError = requireAdminAuth(request);
  if (authError) {
    return authError;
  }

  try {
    await prisma.order.deleteMany({ where: { productId: params.id } });
    await prisma.product.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete product error", error);
    return NextResponse.json({ error: "Unable to delete product" }, { status: 500 });
  }
}
