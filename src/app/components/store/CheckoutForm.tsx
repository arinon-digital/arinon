"use client";

import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  coverImage: string;
  driveLink: string;
  pdfDriveLink?: string;
}

interface Props {
  product: Product;
}

declare global {
  interface Window {
    Razorpay: new (options: any) => {
      open: () => void;
    };
  }
}

const CheckoutForm = ({ product }: Props) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => {
      setRazorpayLoaded(true);
    };
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const handlePayment = async () => {
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    if (!razorpayLoaded || !window.Razorpay) {
      toast.error("Payment gateway not loaded");
      return;
    }

    setLoading(true);

    try {
      // Create order on the backend
      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product.id,
          buyerEmail: email,
        }),
      });

      const orderData = await res.json();
      if (!res.ok) {
        throw new Error(orderData.error || "Failed to create order");
      }

      const razorpay = new window.Razorpay({
        key: orderData.keyId,
        order_id: orderData.orderId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Arinon Store",
        description: product.title,
        customer_notification: 1,
        prefill: {
          email: email,
          name: "",
        },
        handler: async (response: any) => {
          try {
            // Verify payment on backend
            const verifyRes = await fetch("/api/capture-order", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyRes.json();
            if (!verifyRes.ok) {
              throw new Error(verifyData.error || "Payment verification failed");
            }

            toast.success("Payment successful! Check your email for the download link.");
            setTimeout(() => {
              window.location.href = "/thank-you";
            }, 2000);
          } catch (error: any) {
            toast.error(error.message || "Payment verification failed");
          }
        },
        modal: {
          ondismiss: () => {
            setLoading(false);
          },
        },
      });

      razorpay.open();
    } catch (error: any) {
      toast.error(error.message || "Failed to initiate payment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form className="card p-4 bg-dark border-secondary text-white">
        <div className="mb-3">
          <label className="form-label">Email for delivery</label>
          <input
            type="email"
            className="form-control"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </div>
        <div className="d-flex align-items-center justify-content-between mb-3">
          <span className="fw-bold">Total: ₹{product.price.toFixed(2)}</span>
        </div>
        <button
          type="button"
          onClick={handlePayment}
          disabled={loading}
          className="btn btn-primary w-100"
        >
          {loading ? "Processing..." : "Pay with Razorpay"}
        </button>
      </form>
      <ToastContainer position="bottom-center" theme="dark" autoClose={3000} />
    </>
  );
};

export default CheckoutForm;

