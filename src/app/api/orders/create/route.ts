import { NextResponse } from "next/server";
import { z } from "zod";
import { getProductById } from "@/lib/products";
import { createPaypalOrder } from "@/lib/paypal";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const bodySchema = z.object({
  productId: z.string().min(1),
  email: z.string().email(),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = bodySchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const { productId, email } = parsed.data;
    const product = await getProductById(productId);

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const origin = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const order = await createPaypalOrder({
      product,
      buyerEmail: email,
      returnUrl: `${origin}/products`,
      cancelUrl: `${origin}/checkout/${product.id}`,
    });

    return NextResponse.json({ orderId: order.id });
  } catch (error: any) {
    console.error("Create order error", error);
    return NextResponse.json({ error: error.message || "Unable to create order" }, { status: 500 });
  }
}

