import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { createRazorpayOrder, RAZORPAY_KEY_ID } from "@/lib/razorpay";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const bodySchema = z.object({
  productId: z.string().min(1),
  buyerEmail: z.string().email(),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = bodySchema.safeParse(json);
    if (!parsed.success) {
      console.error("Validation error:", parsed.error);
      return NextResponse.json({ error: "Invalid input", details: parsed.error.errors }, { status: 400 });
    }

    const { productId, buyerEmail } = parsed.data;
    console.log("Creating order for product:", productId, "email:", buyerEmail);

    const product = await prisma.product.findUnique({ where: { id: productId } });

    if (!product) {
      console.error("Product not found:", productId);
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    console.log("Product found:", product.title, "Price:", product.price);

    const razorpayOrder = await createRazorpayOrder({
      product,
      buyerEmail,
    });

    console.log("Razorpay order created:", razorpayOrder.id);

    await prisma.order.create({
      data: {
        productId: product.id,
        email: buyerEmail,
        amount: product.price,
        currency: "INR",
        razorpayOrderId: razorpayOrder.id,
        pdfDriveLink: product.driveLink,
        status: "PENDING",
      },
    });

    console.log("Order saved to database");

    return NextResponse.json({
      orderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      keyId: RAZORPAY_KEY_ID,
      email: buyerEmail,
    });
  } catch (error: any) {
    console.error("Create order error:", error.message || error);
    return NextResponse.json({ 
      error: "Unable to create order",
      details: error.message || error.toString()
    }, { status: 500 });
  }
}
