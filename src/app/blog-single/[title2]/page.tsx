'use client';

import React from "react";
import BlogSinglePage from "../../pages/blogPages/BlogSinglePage";
import RoutesScrollToTop from "../../components/utilities/RoutesScrollToTop";
import Dependency from "../../components/utilities/Dependency";

export default function BlogSingle({ params }: { params: { title2: string } }) {
  return (
    <>
      <BlogSinglePage />
      <RoutesScrollToTop />
      <Dependency />
    </>
  );
}
