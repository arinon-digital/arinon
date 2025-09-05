"use client";

import useHorizontalScroll from "../../hooks/useHorizontalScroll";
import ExpertiseV1 from "../expertise/ExpertiseV1";
import ProjectIdeaV1 from "../project/ProjectIdeaV1";
import WhyChooseV1 from "../whyChoose/WhyChooseV1";

const MultiSection = () => {
  useHorizontalScroll();

  return (
    <>
      <div className="overflow-hidden multi-section">
        <div className="thecontainer">
          <div className="bg-dark d-flex justify-content-center align-items-center overflow-hidden panel">
            <WhyChooseV1 />
          </div>
          <div className="bg-dark-secondary  d-flex justify-content-center align-items-center panel">
            <ExpertiseV1 />
          </div>
          <div className="bg-dark  panel d-flex justify-content-center align-items-center contact-panel">
            <ProjectIdeaV1 />
          </div>
    
        </div>
      </div>
    </>
  );
};

export default MultiSection;
