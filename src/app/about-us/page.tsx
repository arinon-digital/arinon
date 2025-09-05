'use client';

import React from "react";
import AboutUsPage from "../pages/innerPages/AboutUsPage";
import RoutesScrollToTop from "../components/utilities/RoutesScrollToTop";
import Dependency from "../components/utilities/Dependency";

export default function AboutUs() {
  return (
    <>
      <AboutUsPage />
      <RoutesScrollToTop />
      <Dependency />
    </>
  );
}
