import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  try {
    const config = {
      database: {
        connected: false,
        productCount: 0,
        error: null as string | null,
      },
      razorpay: {
        keyIdSet: !!process.env.RAZORPAY_KEY_ID,
        keySecretSet: !!process.env.RAZORPAY_KEY_SECRET,
        keyIdValue: process.env.RAZORPAY_KEY_ID?.substring(0, 10) + "...",
      },
      email: {
        smtpSet: !!process.env.SMTP_URL,
        emailFromSet: !!process.env.EMAIL_FROM,
      },
      admin: {
        adminSecretSet: !!process.env.ADMIN_SECRET,
        adminSecretLength: process.env.ADMIN_SECRET?.length || 0,
      },
    };

    // Try to connect to database
    try {
      const productCount = await prisma.product.count();
      config.database.connected = true;
      config.database.productCount = productCount;
    } catch (error: any) {
      config.database.error = error.message;
    }

    return NextResponse.json(config, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
