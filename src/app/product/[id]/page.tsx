import { notFound } from "next/navigation";
import Breadcrumb from "@/app/components/breadcrumb/Breadcrumb";
import LayoutV1 from "@/app/components/layouts/LayoutV1";
import RoutesScrollToTop from "@/app/components/utilities/RoutesScrollToTop";
import Dependency from "@/app/components/utilities/Dependency";
import PurchaseForm from "@/app/components/store/PurchaseForm";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await prisma.product.findUnique({
    where: { id: params.id },
    select: {
      id: true,
      title: true,
      description: true,
      price: true,
      currency: true,
      coverUrl: true,
    },
  });

  if (!product) {
    notFound();
  }

  return (
    <>
      <LayoutV1>
        <Breadcrumb title={product.title} breadCrumb="Product" />
        <section className="about-style-six-area default-padding bg-dark">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-xl-6 col-lg-6">
                <div className="thumb-style-four">
                  <img
                    src={product.coverUrl}
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
                        <span className="fw-bold">
                          {product.currency} {product.price.toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <PurchaseForm
                      productId={product.id}
                      price={product.price}
                      currency={product.currency}
                    />
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
