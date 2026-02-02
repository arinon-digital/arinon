import { notFound } from "next/navigation";
import Breadcrumb from "@/app/components/breadcrumb/Breadcrumb";
import LayoutV1 from "@/app/components/layouts/LayoutV1";
import RoutesScrollToTop from "@/app/components/utilities/RoutesScrollToTop";
import Dependency from "@/app/components/utilities/Dependency";
import CheckoutForm from "@/app/components/store/CheckoutForm";
import { getProductById } from "@/lib/products";

export const dynamic = "force-dynamic";

export default async function CheckoutPage({ params }: { params: { productId: string } }) {
  const product = await getProductById(params.productId);

  if (!product) {
    notFound();
  }

  return (
    <>
      <LayoutV1>
        <Breadcrumb title="Checkout" breadCrumb="Checkout" />
        <section className="about-style-six-area default-padding bg-dark">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-xl-6 col-lg-6">
                <div className="thumb-style-four">
                  <img
                    src={product.coverImage}
                    alt={product.title}
                    className="img-fluid rounded"
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
              </div>
              <div className="col-xl-6 col-lg-6">
                <div className="about-style-six-info text-white">
                  <div className="info">
                    <h2 className="title mb-3">{product.title}</h2>
                    <p className="text-secondary mb-4">{product.description}</p>
                    <div className="card p-4 bg-dark-secondary border-secondary mb-4">
                      <div className="d-flex align-items-center justify-content-between">
                        <span className="fw-bold">Price</span>
                        <span className="fw-bold">${product.price.toFixed(2)}</span>
                      </div>
                    </div>
                    <CheckoutForm product={product} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </LayoutV1>
      <RoutesScrollToTop />
      <Dependency />
    </>
  );
}

