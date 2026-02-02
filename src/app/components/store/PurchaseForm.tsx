"use client";

import { FormEvent, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

interface Props {
  productId: string;
  price: number;
  currency: string;
}

const PurchaseForm = ({ productId, price, currency }: Props) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, buyerEmail: email }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Unable to start checkout");
      }

      window.location.href = data.approvalUrl;
    } catch (err: any) {
      toast.error(err.message || "Checkout failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="card p-4 bg-dark border-secondary text-white">
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
          <span className="fw-bold">
            Total: {currency} {price.toFixed(2)}
          </span>
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Processing..." : "Buy with PayPal"}
        </button>
      </form>
      <ToastContainer position="bottom-center" theme="dark" autoClose={3000} />
    </>
  );
};

export default PurchaseForm;
