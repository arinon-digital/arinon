"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";

const AdminLoginForm = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Invalid admin password");
      }

      toast.success("Admin login successful");
      // Give the toast a moment, then refresh to show the admin panel
      setTimeout(() => {
        router.refresh();
      }, 800);
    } catch (error: any) {
      toast.error(error.message || "Unable to log in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-xl-6 col-lg-7">
        <div className="card bg-dark text-white border-secondary p-4">
          <h3 className="mb-4">Admin Login</h3>
          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-12">
              <label className="form-label">Admin Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter admin password"
              />
            </div>
            <div className="col-12 d-flex gap-3">
              <button className="btn btn-primary" type="submit" disabled={loading}>
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer position="bottom-center" theme="dark" autoClose={3000} />
    </div>
  );
};

export default AdminLoginForm;


