import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getPaypalOrder, verifyPaypalWebhook } from "@/lib/paypal";
import { sendPurchaseEmail } from "@/lib/email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function getOrderIdFromEvent(event: any) {
  const related = event?.resource?.supplementary_data?.related_ids?.order_id;
  return related || event?.resource?.id;
}

export async function POST(req: NextRequest) {
  const webhookId = process.env.PAYPAL_WEBHOOK_ID;
  if (!webhookId) {
    return NextResponse.json({ error: "Webhook not configured" }, { status: 500 });
  }

  const rawBody = await req.text();
  const headers = req.headers;

  const isValid = await verifyPaypalWebhook({
    authAlgo: headers.get("paypal-auth-algo"),
    certUrl: headers.get("paypal-cert-url"),
    transmissionId: headers.get("paypal-transmission-id"),
    transmissionSig: headers.get("paypal-transmission-sig"),
    transmissionTime: headers.get("paypal-transmission-time"),
    webhookId,
    webhookEvent: rawBody,
  }).catch((error) => {
    console.error("Webhook verification failed", error);
    return false;
  });

  if (!isValid) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const event = JSON.parse(rawBody);
  const orderId = getOrderIdFromEvent(event);

  if (!orderId) {
    return NextResponse.json({ error: "Missing order id" }, { status: 400 });
  }

  try {
    const order = await getPaypalOrder(orderId);
    const purchaseUnit = order?.purchase_units?.[0];
    const amountValue = Number(purchaseUnit?.amount?.value || 0);
    const currency = purchaseUnit?.amount?.currency_code || "USD";
    const productId = purchaseUnit?.custom_id as string | undefined;
    const payerEmail = order?.payer?.email_address || event?.resource?.payer?.email_address || "";

    if (order?.status !== "COMPLETED") {
      return NextResponse.json({ status: order?.status || "PENDING" }, { status: 202 });
    }

    // Note: PayPal transaction ID not stored in DB schema (Razorpay only)
    // Check by email + product for now or implement separate PayPal storage
    // TODO: Add paypalTransactionId field to Prisma schema if PayPal support is needed
    
    let purchase = null;
    // Search by email and product ID as temporary workaround
    if (productId) {
      const purchases = await prisma.order.findMany({
        where: {
          email: payerEmail,
          productId: productId,
          status: "PAID",
        },
        take: 1,
        orderBy: { createdAt: "desc" },
      });
      purchase = purchases[0] || null;
    }

      if (!purchase) {
        if (!productId) {
          throw new Error("Product ID missing from PayPal order");
        }
      const product = await prisma.product.findUnique({ where: { id: productId } });
        if (!product) {
        throw new Error("Product not found for webhook");
        }
      purchase = await prisma.order.create({
          data: {
            productId: product.id,
          email: payerEmail,
            amount: amountValue,
            currency,
          razorpayOrderId: orderId,
            status: "PAID",
          pdfDriveLink: product.driveLink,
          },
        });
      } else if (purchase.status !== "PAID") {
      purchase = await prisma.order.update({
          where: { id: purchase.id },
          data: { status: "PAID", amount: amountValue, currency },
        });
      }

    if (!purchase.sentAt) {
      const product = await prisma.product.findUnique({ where: { id: purchase.productId } });
      await sendPurchaseEmail(purchase as any, product || { title: "Your product", driveLink: purchase.pdfDriveLink });
      await prisma.order.update({
        where: { id: purchase.id },
        data: { sentAt: new Date() },
      });
    }

    return NextResponse.json({ status: "processed", sent: true });
  } catch (error) {
    console.error("Webhook processing error", error);
    return NextResponse.json({ error: "Processing error" }, { status: 500 });
  }
}
