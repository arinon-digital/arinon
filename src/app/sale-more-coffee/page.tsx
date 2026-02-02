"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import DarkClass from "../components/classes/DarkClass";
import LayoutV1 from "../components/layouts/LayoutV1";
import TestimonialV2 from "../components/testimonial/TestimonialV2";
import ClientsV2 from "../components/clients/ClientsV2";
import FunFactV1 from "../components/fact/FunFactV1";
import RoutesScrollToTop from "../components/utilities/RoutesScrollToTop";
import Dependency from "../components/utilities/Dependency";

const SaleMoreCoffeePage = () => {
  return (
    <>
      <LayoutV1>
        <Breadcrumb title="Sale More Coffee" breadCrumb="Sale More Coffee" />

        {/* Hero Section */}
        <section
          className="banner-style-eight-area bg-cover"
          style={{ backgroundImage: "url('/assets/img/shape/3.jpg')" }}
        >
          <div className="container">
            <div className="row align-items-center">
              <div className="col-xl-6 col-lg-6">
                <div className="banner-style-eight-heading">
                  <div className="banner-title">
                    <h1 className="display-4 fw-bold mb-4">
                      Turn More Tables. Sell More Coffee. Without Spending on
                      Ads.
                    </h1>
                    <p className="fs-5 text-secondary mb-4">
                      We're building 10 free order pages for café and restaurant
                      founders who want faster service, happier customers, and
                      more revenue — without complex tech or marketing fluff.
                    </p>
                    <div className="d-flex gap-3 flex-wrap">
                      <Link
                        href="/contact-us"
                        className="btn text-black btn-outline-light btn-lg px-4 py-3"
                      >
                        Learn More
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6">
                <div style={{ bottom: "100px" }} className="thumb text-center">
                  <Image
                    src="/assets/img/illustration/1.png"
                    alt="Coffee Ordering System"
                    width={500}
                    height={400}
                    className="img-fluid"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Problem Section */}
        <section className="about-style-six-area default-padding bg-dark-secondary">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-xl-6 col-lg-6">
                <div className="thumb-style-four">
                  <Image
                    src="/assets/img/thumb/2.jpg"
                    alt="Café Problems"
                    width={600}
                    height={400}
                    className="img-fluid rounded"
                  />
                </div>
              </div>
              <div className="col-xl-6 col-lg-6">
                <div className="about-style-six-info">
                  <div className="info">
                    <h2 className="title mb-4">The Problem Most Cafés Face</h2>
                    <p className="text mb-4">
                      Most cafés waste time taking manual orders, slowing down
                      service and losing sales. Customers wait longer, staff
                      gets overwhelmed, tables turn slower, and profit slips
                      through the cracks.
                    </p>
                    <ul className="list-unstyled">
                      <li className="mb-3">
                        <i className="fa-check-circle text-primary me-3" />
                        Long wait times frustrate customers
                      </li>
                      <li className="mb-3">
                        <i className="fa-check-circle text-primary me-3" />
                        Staff overwhelmed with manual processes
                      </li>
                      <li className="mb-3">
                        <i className="fa-check-circle text-primary me-3" />
                        Slower table turnover means less revenue
                      </li>
                      <li className="mb-3">
                        <i className="fa-check-circle text-primary me-3" />
                        Lost sales due to order complexity
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Solution Features */}
        <section
          className="services-style-one-area default-padding bg-dark"
          id="features"
        >
          <div className="service-style-one-heading">
            <div className="container">
              <div className="row">
                <div className="text-center col-xl-6 offset-xl-3 col-lg-8 offset-lg-2">
                  <div className="site-heading">
                    <h4 className="sub-title">Our Solution</h4>
                    <h2 className="title">How We Help You Sell More Coffee</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="services-style-one-items">
              <div className="row">
                {[
                  {
                    icon: "coffee.png",
                    title: "Fast Ordering",
                    text: "Customers order in seconds with our intuitive interface, reducing wait times and improving satisfaction.",
                    color: "#f63b3b",
                  },
                  {
                    icon: "clock.png",
                    title: "Faster Service",
                    text: "Streamlined processes speed up service and table turnover, allowing you to serve more customers.",
                    color: "#28a745",
                  },
                  {
                    icon: "money.png",
                    title: "Higher Sales",
                    text: "Smart upselling features and easy online ordering effortlessly increase average order value and sales per visit.",
                    color: "#ffc107",
                  },
                  {
                    icon: "gift.png",
                    title: "Free Builds",
                    text: "First 10 order pages cost you nothing. We build, you truly benefit. No hidden fees or subscriptions.",
                    color: "#17a2b8",
                  },
                ].map((feature, index) => (
                  <div
                    className="col-xl-3 col-lg-6 col-md-6 single-item"
                    key={index}
                  >
                    <div className="services-style-one-item">
                      <div className="icon">
                        <i
                          className="fa-coffee fas"
                          style={{ fontSize: "3rem", color: feature.color }}
                        />
                      </div>
                      <h3>{feature.title}</h3>
                      <p>{feature.text}</p>
                      <Link className="btn-full" href="#claim">
                        Get Started <i className="fa-arrow-right fas" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="about-style-six-area default-padding bg-dark">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-xl-6 col-lg-6">
                <div className="about-style-six-info">
                  <div className="info">
                    <h2 className="title mb-4">Why Choose Us?</h2>
                    <p className="text mb-4">
                      We're not here to sell you overpriced "apps" or
                      complicated tools. We specialize in helping cafés like
                      yours boost service speed and revenue with smart,
                      conversion-focused digital systems.
                    </p>
                    <div className="card-style-one">
                      <div className="bottom">
                        <div className="fun-fact">
                          <div className="counter">
                            <div className="timer">10</div>
                            <div className="operator">/</div>
                            <div className="timer">10</div>
                          </div>
                          <span className="medium">Free Pages Remaining</span>
                        </div>
                        <Link href="#claim">
                          <i className="fa-long-arrow-right fas" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6">
                <div className="thumb-style-four">
                  <Image
                    src="/assets/img/thumb/12.jpg"
                    alt="Why Choose Us"
                    width={600}
                    height={400}
                    className="img-fluid rounded"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <TestimonialV2 sectionClass="bg-dark" />

        {/* Clients */}
        <ClientsV2 sectionClass="bg-dark-secondary" />

        {/* Fun Facts */}
        <FunFactV1 sectionClass="default-padding-bottom default-padding-top bg-dark" />

        {/* Call to Action */}
        <section
          className="banner-style-eight-area bg-cover "
          // style={{ backgroundImage: "url('/assets/img/shape/4.jpg')" }}
          id="claim"
        >
          <div className="container">
            <div className="row">
              <div className="col-xl-8 offset-xl-2 text-center">
                <div className="banner-style-eight-heading">
                  <h2 className="display-5  fw-bold mb-4">
                    Claim Your Free Order Page
                  </h2>
                  <p className="fs-5 text-secondary mb-5">
                    "This isn't theory. This is what top cafés are already using
                    to grow revenue without increasing ad spend."
                  </p>
                  <div className="d-flex gap-3 justify-content-center flex-wrap">
                    <Link href="#" className="btn text-black btn-primary btn-lg px-5 py-3">
                      <i className="fa-rocket fas  me-2" />
                      Get Started Now
                    </Link>
                    <Link
                      href="/contact-us"
                      className="btn btn-outline-light text-black btn-lg px-5 py-3"
                    >
                      <i className="fa-phone fas me-2" />
                      Contact Us
                    </Link>
                  </div>
                  <p className="mt-4  text-white ">
                    <i className="fa-clock fas me-2" />
                    Limited time offer - Only 10 free pages available
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <DarkClass />
      </LayoutV1>
      <RoutesScrollToTop />
      <Dependency />
    </>
  );
};

export default SaleMoreCoffeePage;
