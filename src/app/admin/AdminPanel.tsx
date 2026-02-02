"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import { PurchaseSummary } from "@/types/store";

interface AdminProduct {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  coverUrl: string;
  driveLink: string;
  createdAt: string;
}

const emptyForm = {
  title: "",
  description: "",
  price: "",
  currency: "USD",
  coverUrl: "",
  driveLink: "",
};

const AdminPanel = () => {
  const router = useRouter();
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [purchases, setPurchases] = useState<(PurchaseSummary & { product: AdminProduct })[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ ...emptyForm });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const [prodRes, purchaseRes] = await Promise.all([
        fetch("/api/admin/products"),
        fetch("/api/admin/purchases"),
      ]);
      
      if (!prodRes.ok) {
        const errorData = await prodRes.json().catch(() => ({ error: "Failed to load products" }));
        throw new Error(errorData.error || "Failed to load products");
      }
      
      if (!purchaseRes.ok) {
        const errorData = await purchaseRes.json().catch(() => ({ error: "Failed to load purchases" }));
        throw new Error(errorData.error || "Failed to load purchases");
      }

      setProducts(await prodRes.json());
      setPurchases(await purchaseRes.json());
    } catch (error: any) {
      toast.error(error.message || "Unable to load admin data");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      const res = await fetch("/api/admin/logout", { method: "POST" });
      if (!res.ok) throw new Error("Logout failed");
      toast.success("Logged out successfully");
      setTimeout(() => {
        router.refresh();
      }, 500);
    } catch (error: any) {
      toast.error(error.message || "Unable to logout");
      setIsLoggingOut(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form before sending
    if (!form.title.trim() || !form.description.trim() || !form.price || !form.coverUrl.trim() || !form.driveLink.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    const payload = { 
      ...form, 
      price: Number(form.price),
      title: form.title.trim(),
      description: form.description.trim(),
      coverUrl: form.coverUrl.trim(),
      driveLink: form.driveLink.trim(),
    };
    
    console.log("Submitting payload:", payload);
    
    const url = editingId ? `/api/admin/products/${editingId}` : "/api/admin/products";
    const method = editingId ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      
      // Check content type before parsing
      const contentType = res.headers.get("content-type");
      let responseData;
      
      if (contentType && contentType.includes("application/json")) {
        try {
          responseData = await res.json();
        } catch (jsonError) {
          console.error("JSON parse error:", jsonError);
          throw new Error(`Server error (${res.status}): Failed to parse JSON response`);
        }
      } else {
        // Response is not JSON, get text instead
        const text = await res.text();
        console.error("Non-JSON response:", text.substring(0, 200));
        throw new Error(`Server error (${res.status}): ${res.statusText}`);
      }
      
      if (!res.ok) {
        const errorMessage = responseData.details 
          ? `${responseData.error || "Request failed"}: ${responseData.details}`
          : responseData.error || "Request failed";
        console.error("API error:", responseData);
        throw new Error(errorMessage);
      }

      console.log("Product saved successfully:", responseData);
      toast.success(editingId ? "Product updated" : "Product created");
      setEditingId(null);
      setForm({ ...emptyForm });
      loadData();
    } catch (error: any) {
      console.error("Submit error:", error);
      toast.error(error.message || "Unable to save product");
    }
  };

  const handleEdit = (p: AdminProduct) => {
    setEditingId(p.id);
    setForm({
      title: p.title,
      description: p.description,
      price: p.price.toString(),
      currency: p.currency,
      coverUrl: p.coverUrl,
      driveLink: p.driveLink,
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ error: "Delete failed" }));
        throw new Error(errorData.error || "Delete failed");
      }
      toast.success("Product deleted");
      loadData();
    } catch (error: any) {
      toast.error(error.message || "Unable to delete");
    }
  };

  const handleResend = async (id: string) => {
    try {
      const res = await fetch("/api/admin/resend-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ error: "Resend failed" }));
        throw new Error(errorData.error || "Resend failed");
      }
      toast.success("Email resent");
      loadData();
    } catch (error: any) {
      toast.error(error.message || "Unable to resend email");
    }
  };

  return (
    <div className="container py-5">
      <ToastContainer position="bottom-center" theme="dark" autoClose={3000} />
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-white mb-0">Admin Panel</h2>
        <button 
          className="btn btn-outline-danger text-white" 
          onClick={handleLogout}
          disabled={isLoggingOut}
        >
          {isLoggingOut ? "Logging out..." : "Logout"}
        </button>
      </div>

      {loading && <div className="text-secondary">Loading...</div>}

      <div className="row g-4">
        <div className="col-lg-6">
          <div className="card bg-dark text-white border-secondary h-100">
            <div className="card-body">
              <h5 className="card-title">{editingId ? "Update Product" : "Create Product"}</h5>

              <form onSubmit={handleSubmit} className="row g-3">
                <div className="col-12">
                  <input className="form-control" placeholder="Title" value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })} required />
                </div>

                <div className="col-12">
                  <textarea className="form-control" placeholder="Description" value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })} required />
                </div>

                <div className="col-6">
                  <input type="number" className="form-control" placeholder="Price" step="0.01" min="0"
                    value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
                </div>

                <div className="col-6">
                  <input className="form-control" placeholder="Currency" maxLength={3} value={form.currency}
                    onChange={(e) => setForm({ ...form, currency: e.target.value.toUpperCase() })} required />
                </div>

                <div className="col-12">
                  <input className="form-control" placeholder="Cover URL" value={form.coverUrl}
                    onChange={(e) => setForm({ ...form, coverUrl: e.target.value })} required />
                </div>

                <div className="col-12">
                  <input className="form-control" placeholder="Drive Link" value={form.driveLink}
                    onChange={(e) => setForm({ ...form, driveLink: e.target.value })} required />
                </div>

                <div className="col-12 d-flex gap-3">
                  <button className="btn btn-primary text-black" type="submit">
                    {editingId ? "Update" : "Create"}
                  </button>

                  {editingId && (
                    <button className="btn btn-outline-light text-black " type="button"
                      onClick={() => { setEditingId(null); setForm({ ...emptyForm }); }}>
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="card bg-dark text-white border-secondary h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="card-title mb-0">Products</h5>
                <button className="btn btn-sm btn-outline-light text-black" onClick={loadData}>Refresh</button>
              </div>

              {products.length === 0 ? (
                <p className="text-secondary">No products yet.</p>
              ) : (
                <ul className="list-group list-group-flush">
                  {products.map((p) => (
                    <li key={p.id} className="list-group-item bg-dark text-white d-flex justify-content-between align-items-center">
                      <span>{p.title} · {p.price} {p.currency}</span>
                      <div className="d-flex gap-2">
                        <button className="btn btn-sm btn-warning text-black" onClick={() => handleEdit(p)}>Edit</button>
                        <button className="btn btn-sm btn-danger text-black" onClick={() => handleDelete(p.id)}>Delete</button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
