import Breadcrumb from "@/app/components/breadcrumb/Breadcrumb";
import LayoutV1 from "@/app/components/layouts/LayoutV1";
import Dependency from "@/app/components/utilities/Dependency";
import RoutesScrollToTop from "@/app/components/utilities/RoutesScrollToTop";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: { orderId?: string; token?: string };
}) {
  const orderId = searchParams.orderId || searchParams.token;

  if (!orderId) {
    return (
      <LayoutV1>
        <Breadcrumb title="Thank you" breadCrumb="Order" />
        <section className="about-style-six-area default-padding bg-dark">
          <div className="container text-center text-white">
            <p>No order ID provided.</p>
          </div>
        </section>
      </LayoutV1>
    );
  }

  let purchase = null;
  if (orderId) {
    purchase = await prisma.order.findUnique({ where: { razorpayPaymentId: orderId } });
    if (!purchase) {
      purchase = await prisma.order.findUnique({ where: { razorpayOrderId: orderId } });
    }
  }
  const product = purchase ? await prisma.product.findUnique({ where: { id: purchase.productId } }) : null;

  const isPaid = purchase?.status === "PAID";

  return (
    <>
      <LayoutV1>
        <Breadcrumb title="Thank you" breadCrumb="Order" />
        <section className="about-style-six-area default-padding bg-dark">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-8 col-lg-9">
                <div className="card bg-dark text-white border-secondary p-4">
                  {isPaid ? (
                    <>
                      <h2 className="mb-3">Purchase confirmed</h2>
                      <p className="mb-2">PayPal Order ID: <strong>{orderId}</strong></p>
                      <p className="mb-2">Product: <strong>{product?.title}</strong></p>
                      <p className="mb-4">Thank you for your purchase. You can download your PDF below.</p>
                      <a
                        href={product?.driveLink || purchase?.pdfDriveLink}
                        className="btn btn-primary"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Download PDF
                      </a>
                    </>
                  ) : (
                    <>
                      <h2 className="mb-3">Payment pending</h2>
                      <p className="text-secondary">We have not confirmed this order yet. If you just completed payment, please wait a moment or refresh this page once the confirmation arrives.</p>
                      <p className="mt-3">Order ID: {orderId}</p>
                    </>
                  )}
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
