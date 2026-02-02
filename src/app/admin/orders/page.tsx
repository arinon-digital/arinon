import { cookies } from "next/headers";
import Breadcrumb from "@/app/components/breadcrumb/Breadcrumb";
import LayoutV1 from "@/app/components/layouts/LayoutV1";
import Dependency from "@/app/components/utilities/Dependency";
import RoutesScrollToTop from "@/app/components/utilities/RoutesScrollToTop";
import { getAllOrders } from "@/lib/orders";
import { prisma } from "@/lib/prisma";
type OrderType = Awaited<ReturnType<typeof getAllOrders>>[number];
type ProductType = Awaited<ReturnType<typeof prisma.product.findMany>>[number];

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  const cookieStore = await cookies();
  const authorized = cookieStore.get("admin_auth")?.value === "1";
  const orders: OrderType[] = authorized ? await getAllOrders() : [];

  const productIds: string[] = authorized ? Array.from(new Set(orders.map((o) => o.productId))) : [];
  const products: ProductType[] = authorized ? await prisma.product.findMany({ where: { id: { in: productIds } } }) : [];
  const productMap = new Map(products.map((p) => [p.id, p]));

  return (
    <>
      <LayoutV1>
        <Breadcrumb title="Admin Orders" breadCrumb="Admin Orders" />
        {!authorized ? (
          <section className="about-style-six-area default-padding bg-dark">
            <div className="container text-white text-center">
              <h2>Unauthorized</h2>
              <p className="text-secondary">Provide a valid admin key via URL parameter: <code>?key=YOUR_ADMIN_SECRET</code></p>
            </div>
          </section>
        ) : (
          <section className="about-style-six-area default-padding bg-dark">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="card bg-dark text-white border-secondary">
                    <div className="card-body">
                      <h5 className="card-title mb-4">Orders</h5>
                      {orders.length === 0 ? (
                        <p className="text-secondary">No orders yet.</p>
                      ) : (
                        <div className="table-responsive">
                          <table className="table table-dark table-striped">
                            <thead>
                              <tr>
                                <th>Order ID</th>
                                <th>Product</th>
                                <th>Customer Email</th>
                                <th>Amount</th>
                                <th>Created At</th>
                              </tr>
                            </thead>
                            <tbody>
                              {orders.map((order: OrderType) => {
                                const product = productMap.get(order.productId);
                                return (
                                <tr key={order.id}>
                                  <td>{order.id}</td>
                                  <td>{product?.title || "Unknown"}</td>
                                  <td>{order.email}</td>
                                  <td>${order.amount.toFixed(2)}</td>
                                  <td>{new Date(order.createdAt).toLocaleString()}</td>
                                </tr>
                              );})}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </LayoutV1>
      <RoutesScrollToTop />
      <Dependency />
    </>
  );
}

