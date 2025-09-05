'use client';

import React from "react";
import BlogSingleWithSidebarPage from "../../../pages/blogPages/BlogSingleWithSidebarPage";
import RoutesScrollToTop from "../../../components/utilities/RoutesScrollToTop";
import Dependency from "../../../components/utilities/Dependency";

export default function BlogSingleWithSidebar({ params }: { params: { title2: string } }) {
  return (
    <>
      <BlogSingleWithSidebarPage title2={params.title2} />
      <RoutesScrollToTop />
      <Dependency />
    </>
  );
}
