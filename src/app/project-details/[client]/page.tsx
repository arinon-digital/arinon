'use client';

import React from "react";
import ProjectDetailsPage from "../../pages/innerPages/ProjectDetailsPage";
import RoutesScrollToTop from "../../components/utilities/RoutesScrollToTop";
import Dependency from "../../components/utilities/Dependency";

export default function ProjectDetails() {
  return (
    <>
      <ProjectDetailsPage />
      <RoutesScrollToTop />
      <Dependency />
    </>
  );
}
