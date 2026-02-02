"use client";

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  coverImage: string;
  pdfDriveLink: string;
  createdAt: string;
}

const ProductGrid = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/public/products");
        if (!res.ok) {
          // Log the response details but avoid throwing so the UI
          // can show a friendly error without triggering a React error
          // in the console.
          const message = await res.text().catch(() => "");
          console.error(
            "Failed to load products:",
            res.status,
            res.statusText,
            message,
          );
          setError("Unable to load products right now.");
          return;
        }
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load products right now.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <div className="services-style-one-area bg-dark default-padding">
      <div className="service-style-one-heading">
        <div className="container">
          <div className="row">
            <div className="text-center col-xl-6 offset-xl-3 col-lg-8 offset-lg-2">
              <div className="site-heading">
                <h4 className="sub-title">Ebooks</h4>
                <h2 className="title">Shop our PDF titles</h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        {loading ? (
          <div className="text-center text-white py-5">Loading products...</div>
        ) : error ? (
          <div className="text-center text-danger py-4">{error}</div>
        ) : products.length === 0 ? (
          <div className="text-center text-secondary py-4">No products available yet.</div>
        ) : (
          <div className="services-style-one-items">
            <div className="row">
              {products.map((product) => (
                <div className="col-xl-3 col-lg-6 col-md-6 single-item" key={product.id}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductGrid;
