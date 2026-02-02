import { cookies } from "next/headers";
import Breadcrumb from "@/app/components/breadcrumb/Breadcrumb";
import LayoutV1 from "@/app/components/layouts/LayoutV1";
import Dependency from "@/app/components/utilities/Dependency";
import RoutesScrollToTop from "@/app/components/utilities/RoutesScrollToTop";
import { ADMIN_COOKIE_NAME } from "@/lib/auth";
import AdminPanel from "./AdminPanel";
import AdminLoginForm from "./AdminLoginForm";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const authorized = cookieStore.get(ADMIN_COOKIE_NAME)?.value === "1";

  return (
    <>
      <LayoutV1>
        <Breadcrumb title="Admin"  breadCrumb="Admin" />
        <section className="about-style-six-area default-padding bg-dark">
          <div className="container text-white">
            {authorized ? <AdminPanel /> : <AdminLoginForm />}
          </div>
        </section>
      </LayoutV1>
      <RoutesScrollToTop />
      <Dependency />
    </>
  );
}
