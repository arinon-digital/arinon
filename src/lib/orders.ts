import prisma from "./db";

export async function createOrder(data: {
  productId: string;
  email: string;
  amount: number;
  razorpayOrderId: string;
  pdfDriveLink: string;
  currency: string;
  status?: string;
}) {
  return await prisma.order.create({
    data,
  });
}

export async function getAllOrders() {
  return await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getOrderById(id: string) {
  return await prisma.order.findUnique({
    where: { id },
  });
}

export async function getOrderByRazorpayOrderId(razorpayOrderId: string) {
  return await prisma.order.findUnique({
    where: { razorpayOrderId },
  });
}

