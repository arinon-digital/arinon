'use client';

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Breadcrumb from "@/app/components/breadcrumb/Breadcrumb";
import LayoutV1 from "@/app/components/layouts/LayoutV1";
import RoutesScrollToTop from "@/app/components/utilities/RoutesScrollToTop";
import Dependency from "@/app/components/utilities/Dependency";
import { ToastContainer, toast } from "react-toastify";

export const dynamic = "force-dynamic";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Logged in successfully");
    } catch (error: any) {
      toast.error(error?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <LayoutV1>
        <Breadcrumb title="Login" breadCrumb="Login" />
        <section className="about-style-six-area default-padding bg-dark">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-6 col-lg-7">
                <div className="card bg-dark text-white border-secondary p-4">
                  <h3 className="mb-4">Sign in</h3>
                  <form onSubmit={handleSubmit} className="row g-3">
                    <div className="col-12">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="you@example.com"
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="••••••••"
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
            </div>
          </div>
        </section>
      </LayoutV1>
      <RoutesScrollToTop />
      <Dependency />
      <ToastContainer position="bottom-center" theme="dark" autoClose={3000} />
    </>
  );
}


