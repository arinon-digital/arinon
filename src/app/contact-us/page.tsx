'use client';

import React from "react";
import ContactUsPage from "../pages/innerPages/ContactUsPage";
import RoutesScrollToTop from "../components/utilities/RoutesScrollToTop";
import Dependency from "../components/utilities/Dependency";

export const dynamic = "force-dynamic";

export default function ContactUs() {
  return (
    <>
      <ContactUsPage />
      <RoutesScrollToTop />
      <Dependency />
    </>
  );
}
