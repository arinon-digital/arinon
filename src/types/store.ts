export interface ProductPublic {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  coverUrl: string;
  createdAt: Date | string;
}

export interface PurchaseSummary {
  id: string;
  productId: string;
  buyerEmail: string;
  amount: number;
  currency: string;
  razorpayOrderId: string;
  razorpayPaymentId?: string;
  status: "PENDING" | "PAID" | "FAILED" | "REFUNDED";
  sentAt: Date | string | null;
  createdAt: Date | string;
}
