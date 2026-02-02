import { NextResponse } from "next/server";
import { z } from "zod";
import { verifyRazorpayWebhookSignature, getRazorpayPayment } from "@/lib/razorpay";
import { prisma } from "@/lib/prisma";
import { sendPurchaseEmail } from "@/lib/email";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = req.headers.get("x-razorpay-signature");

    if (!signature) {
      return NextResponse.json({ error: "Missing signature" }, { status: 400 });
    }

    // Verify webhook signature
    const isValid = verifyRazorpayWebhookSignature(body, signature);
    if (!isValid) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const event = JSON.parse(body);

    if (event.event === "payment.authorized") {
      const { razorpay_order_id, razorpay_payment_id } = event.payload.payment.entity;

      // Find the order
      const order = await prisma.order.findUnique({
        where: { razorpayOrderId: razorpay_order_id },
      });

      if (!order) {
        return NextResponse.json({ error: "Order not found" }, { status: 404 });
      }

      // Update order status
      const updatedOrder = await prisma.order.update({
        where: { id: order.id },
        data: {
          status: "PAID",
          razorpayPaymentId: razorpay_payment_id,
        },
      });

      // Send email if not sent yet
      if (!updatedOrder.sentAt) {
        const product = await prisma.product.findUnique({
          where: { id: updatedOrder.productId },
        });
        await sendPurchaseEmail(updatedOrder as any, product || { title: "Your product", driveLink: updatedOrder.pdfDriveLink });
        await prisma.order.update({
          where: { id: updatedOrder.id },
          data: { sentAt: new Date() },
        });
      }
    }

    return NextResponse.json({ status: "ok" });
  } catch (error: any) {
    console.error("Webhook error", error);
    return NextResponse.json({ error: error.message || "Webhook processing failed" }, { status: 500 });
  }
}

