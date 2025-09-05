'use client';

import React from "react";
import ProjectPage from "../pages/innerPages/ProjectPage";
import RoutesScrollToTop from "../components/utilities/RoutesScrollToTop";
import Dependency from "../components/utilities/Dependency";

export default function Project() {
  return (
    <>
      <ProjectPage />
      <RoutesScrollToTop />
      <Dependency />
    </>
  );
}
