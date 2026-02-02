import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdminAuth } from "@/lib/auth";
import { sendPurchaseEmail } from "@/lib/email";

export const dynamic = "force-dynamic";

const schema = z.object({ id: z.string().min(1) });

export async function POST(req: NextRequest) {
  // Admin-only: Verify authentication before sending emails
  const authError = requireAdminAuth(req);
  if (authError) {
    return authError;
  }

  try {
    const json = await req.json();
    const parsed = schema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input" },
        { status: 400 }
      );
    }

    const purchase = await prisma.order.findUnique({
      where: { id: parsed.data.id },
    });

    if (!purchase) {
      return NextResponse.json(
        { error: "Purchase not found" },
        { status: 404 }
      );
    }

    const product = await prisma.product.findUnique({
      where: { id: purchase.productId },
    });

    await sendPurchaseEmail(purchase as any, product || {
      title: "Your product",
      driveLink: purchase.pdfDriveLink,
    });

    await prisma.order.update({
      where: { id: purchase.id },
      data: { sentAt: new Date() },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Resend email error", error);
    return NextResponse.json(
      { error: "Unable to resend email" },
      { status: 500 }
    );
  }
}
