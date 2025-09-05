'use client';

import React from "react";
import ServiceDetailsPage from "../../pages/servicesPages/ServiceDetailsPage";
import RoutesScrollToTop from "../../components/utilities/RoutesScrollToTop";
import Dependency from "../../components/utilities/Dependency";

export default function ServiceDetails({ params }: { params: { title: string } }) {
  return (
    <>
      <ServiceDetailsPage  />
      <RoutesScrollToTop />
      <Dependency />
    </>
  );
}
