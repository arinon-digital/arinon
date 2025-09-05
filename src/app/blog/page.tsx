'use client';

import React from "react";
import Blog3ColumnPage from "../pages/blogPages/Blog3ColumnPage";
import RoutesScrollToTop from "../components/utilities/RoutesScrollToTop";
import Dependency from "../components/utilities/Dependency";

export default function Blog() {
  return (
    <>
      <Blog3ColumnPage />
      <RoutesScrollToTop />
      <Dependency />
    </>
  );
}
