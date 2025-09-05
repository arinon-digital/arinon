'use client';

import React from "react";
import NotFoundPage from "./pages/innerPages/NotFoundPage";
import RoutesScrollToTop from "./components/utilities/RoutesScrollToTop";
import Dependency from "./components/utilities/Dependency";

export default function NotFound() {
  return (
    <>
      <NotFoundPage />
      <RoutesScrollToTop />
      <Dependency />
    </>
  );
}
