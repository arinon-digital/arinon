"use client";

import Image, { StaticImageData } from "next/image";
import thumb2 from "../../../../public/assets/img/thumb/origami_boats.jpg";

interface DataType {
  sectionClass?: string;
}

const WhyChooseV1: React.FC<DataType> = ({ sectionClass }) => {
  return (
    <div className={sectionClass ?? ""}>
      <div className="container">
        <div className="row align-items-center">
          {/* Left column (image) */}
          <div className="col-lg-5">
            <div className="thumb-style-one">
              <Image src={thumb2 as StaticImageData} alt="Origami Boats" className="img-fluid" />
            </div>
          </div>

          {/* Right column (accordion) */}
          <div className="col-lg-7">
            <div className="choose-us-style-one">
              <div className="pl-80 pl-md-0 pl-xs-0">
                <h4 className="sub-title">Why Arinon</h4>
                <h2 className="title">Elevate Beyond Expectations</h2>

                <div className="mt-30 faq-style-one accordion" id="faqAccordion">
                  {/* Accordion Item 1 */}
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      >
                        Creative Disruption
                      </button>
                    </h2>
                    <div
                      id="collapseOne"
                      className="accordion-collapse collapse show"
                      aria-labelledby="headingOne"
                      data-bs-parent="#faqAccordion"
                    >
                      <div className="accordion-body">
                        <p>
                          Reimagine how your brand connects by disrupting the status quo with bold,
                          unexpected, and compelling creative strategies.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Accordion Item 2 */}
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingTwo">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseTwo"
                        aria-expanded="false"
                        aria-controls="collapseTwo"
                      >
                        Performance Acceleration
                      </button>
                    </h2>
                    <div
                      id="collapseTwo"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingTwo"
                      data-bs-parent="#faqAccordion"
                    >
                      <div className="accordion-body">
                        <p>
                          Fuel growth with high-impact campaigns, conversion-focused design, and
                          data-driven decisions that turn attention into measurable results.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Accordion Item 3 */}
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingThree">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseThree"
                        aria-expanded="false"
                        aria-controls="collapseThree"
                      >
                        Thinking Differently
                      </button>
                    </h2>
                    <div
                      id="collapseThree"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingThree"
                      data-bs-parent="#faqAccordion"
                    >
                      <div className="accordion-body">
                        <p>
                          Challenge convention, spark innovation, and solve problems from fresh
                          angles to unlock new opportunities and long-term value.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Optional Awards Section (commented out for now) */}
              {/* 
              <div className="award-items">
                <div className="award-item">
                  <i className="fab fa-behance" />
                  <h4>Behance Awards</h4>
                </div>
                <div className="award-item">
                  <i className="fa-layer-group fas" />
                  <h4>Design Awards</h4>
                </div>
                <div className="award-item">
                  <i className="fab fa-laravel" />
                  <h4>Coding Awards</h4>
                </div>
              </div> 
              */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseV1;
