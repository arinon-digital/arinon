import React, { Suspense } from "react";
import Blog3ColumnPage from "../pages/blogPages/Blog3ColumnPage";
import RoutesScrollToTop from "../components/utilities/RoutesScrollToTop";
import Dependency from "../components/utilities/Dependency";

function BlogFallback() {
  return <div style={{ minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>;
}

export default function Blog() {
  return (
    <>
      <Suspense fallback={<BlogFallback />}>
        <Blog3ColumnPage />
      </Suspense>
      <RoutesScrollToTop />
      <Dependency />
    </>
  );
}
