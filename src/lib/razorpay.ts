import crypto from "crypto";

const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID;
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;

console.log("Razorpay Config Check:");
console.log("KEY_ID set:", !!RAZORPAY_KEY_ID, RAZORPAY_KEY_ID?.substring(0, 10) + "...");
console.log("KEY_SECRET set:", !!RAZORPAY_KEY_SECRET, RAZORPAY_KEY_SECRET?.substring(0, 10) + "...");

if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
  console.warn("Razorpay credentials are not fully configured.");
}

interface Product {
  id: string;
  title: string;
  price: number;
}

interface CreateOrderOptions {
  product: Product;
  buyerEmail: string;
  buyerPhone?: string;
}

export interface RazorpayOrder {
  id: string;
  entity: string;
  amount: number;
  amount_paid: number;
  amount_due: number;
  currency: string;
  receipt: string;
  status: string;
  attempts: number;
  notes: Record<string, any>;
  created_at: number;
}

interface RazorpayPayment {
  id: string;
  entity: string;
  amount: number;
  currency: string;
  status: string;
  method: string;
  order_id: string;
  description: string;
  email: string;
  contact: string;
  notes: Record<string, any>;
  created_at: number;
}

/**
 * Create a Razorpay order
 */
export async function createRazorpayOrder(options: CreateOrderOptions): Promise<RazorpayOrder> {
  if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
    throw new Error("Razorpay credentials are not configured");
  }

  const amountInPaisa = Math.round(options.product.price * 100); // Convert to smallest currency unit
  // Receipt must be max 40 characters - use product ID first 8 chars + timestamp
  const receipt = `rcpt_${options.product.id.substring(0, 8)}_${Date.now().toString().slice(-7)}`;

  const auth = Buffer.from(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`).toString("base64");

  const res = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: amountInPaisa,
      currency: "INR",
      receipt,
      notes: {
        productId: options.product.id,
        productTitle: options.product.title,
        buyerEmail: options.buyerEmail,
      },
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to create Razorpay order: ${res.status} ${text}`);
  }

  return (await res.json()) as RazorpayOrder;
}

/**
 * Fetch a Razorpay order
 */
export async function getRazorpayOrder(orderId: string): Promise<RazorpayOrder> {
  if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
    throw new Error("Razorpay credentials are not configured");
  }

  const auth = Buffer.from(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`).toString("base64");

  const res = await fetch(`https://api.razorpay.com/v1/orders/${orderId}`, {
    headers: {
      Authorization: `Basic ${auth}`,
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to fetch Razorpay order ${orderId}: ${res.status} ${text}`);
  }

  return (await res.json()) as RazorpayOrder;
}

/**
 * Fetch a Razorpay payment
 */
export async function getRazorpayPayment(paymentId: string): Promise<RazorpayPayment> {
  if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
    throw new Error("Razorpay credentials are not configured");
  }

  const auth = Buffer.from(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`).toString("base64");

  const res = await fetch(`https://api.razorpay.com/v1/payments/${paymentId}`, {
    headers: {
      Authorization: `Basic ${auth}`,
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to fetch Razorpay payment ${paymentId}: ${res.status} ${text}`);
  }

  return (await res.json()) as RazorpayPayment;
}

/**
 * Verify Razorpay payment signature
 * This is crucial for security - always verify the signature on the server
 */
export function verifyRazorpaySignature(
  orderId: string,
  paymentId: string,
  signature: string
): boolean {
  if (!RAZORPAY_KEY_SECRET) {
    throw new Error("Razorpay key secret is not configured");
  }

  const message = `${orderId}|${paymentId}`;
  const generatedSignature = crypto
    .createHmac("sha256", RAZORPAY_KEY_SECRET)
    .update(message)
    .digest("hex");

  return generatedSignature === signature;
}

/**
 * Verify Razorpay webhook signature
 */
export function verifyRazorpayWebhookSignature(body: string, signature: string): boolean {
  if (!RAZORPAY_KEY_SECRET) {
    throw new Error("Razorpay key secret is not configured");
  }

  const generatedSignature = crypto
    .createHmac("sha256", RAZORPAY_KEY_SECRET)
    .update(body)
    .digest("hex");

  return generatedSignature === signature;
}

export { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET };
