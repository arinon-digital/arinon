'use client';

import React from "react";
import ServicesPage from "../pages/servicesPages/ServicesPage";
import RoutesScrollToTop from "../components/utilities/RoutesScrollToTop";
import Dependency from "../components/utilities/Dependency";

export default function Services() {
  return (
    <>
      <ServicesPage />
      <RoutesScrollToTop />
      <Dependency />
    </>
  );
}
