'use client';

import React from "react";
import PrivacyPolicyPage from "../pages/innerPages/PrivacyPolicyPage";
import RoutesScrollToTop from "../components/utilities/RoutesScrollToTop";
import Dependency from "../components/utilities/Dependency";

export default function PrivacyPolicy() {
  return (
    <>
      <PrivacyPolicyPage />
      <RoutesScrollToTop />
      <Dependency />
    </>
  );
}
