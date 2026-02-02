import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { verifyRazorpaySignature, getRazorpayPayment } from "@/lib/razorpay";
import { sendPurchaseEmail } from "@/lib/email";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const schema = z.object({
  razorpay_order_id: z.string().min(1),
  razorpay_payment_id: z.string().min(1),
  razorpay_signature: z.string().min(1),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = schema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = parsed.data;

    // Verify the signature
    const isSignatureValid = verifyRazorpaySignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    );

    if (!isSignatureValid) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    // Get payment details to verify
    const payment = await getRazorpayPayment(razorpay_payment_id);

    if (payment.status !== "captured") {
      return NextResponse.json({ error: "Payment not captured" }, { status: 400 });
    }

    let purchase = await prisma.order.findUnique({
      where: { razorpayOrderId: razorpay_order_id },
    });

    if (!purchase) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    if (purchase.status !== "PAID") {
      purchase = await prisma.order.update({
        where: { id: purchase.id },
        data: {
          status: "PAID",
          razorpayPaymentId: razorpay_payment_id,
          amount: payment.amount / 100, // Convert from paisa to actual amount
        },
      });
    }

    // Send email if not sent yet
    if (purchase.status === "PAID" && !purchase.sentAt) {
      const product = await prisma.product.findUnique({ where: { id: purchase.productId } });
      await sendPurchaseEmail(purchase as any, product || { title: "Your product", driveLink: purchase.pdfDriveLink });
      await prisma.order.update({
        where: { id: purchase.id },
        data: { sentAt: new Date() },
      });
    }

    return NextResponse.json({ status: "success", purchaseId: purchase.id });
  } catch (error) {
    console.error("Capture order error", error);
    return NextResponse.json({ error: "Unable to capture order" }, { status: 500 });
  }
}
