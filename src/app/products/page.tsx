import Breadcrumb from "@/app/components/breadcrumb/Breadcrumb";
import LayoutV1 from "@/app/components/layouts/LayoutV1";
import Dependency from "@/app/components/utilities/Dependency";
import RoutesScrollToTop from "@/app/components/utilities/RoutesScrollToTop";
import ProductGrid from "@/app/components/store/ProductGrid";

export const dynamic = "force-dynamic";

export default function ProductsPage() {
  return (
    <>
      <LayoutV1>
        <Breadcrumb title="Products" breadCrumb="Products" LightMode={false} />
        <ProductGrid />
      </LayoutV1>
      <RoutesScrollToTop />
      <Dependency />
    </>
  );
}