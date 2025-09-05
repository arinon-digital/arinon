"use client";

import Image, { StaticImageData } from "next/image";
import SplitText from "../animation/SplitText"; // make sure SplitText is also a client component

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

// Logos
import brand10 from "../../Arinon Clients logos/brandsLogos/3L-Cafe.png";
import brand2 from "../../Arinon Clients logos/brandsLogos/Aeikyam.png";
import brand9 from "../../Arinon Clients logos/brandsLogos/The-Bridge-Hotel.png";
import brand3 from "../../Arinon Clients logos/brandsLogos/IPRA.png";
import brand4 from "../../Arinon Clients logos/brandsLogos/dagadiya.png";
import brand8 from "../../Arinon Clients logos/brandsLogos/Dees.png";
import brand6 from "../../Arinon Clients logos/brandsLogos/DPF.png";
import brand7 from "../../Arinon Clients logos/brandsLogos/Musings-of-Aakanksha.png";
import brand11 from "../../Arinon Clients logos/brandsLogos/JMD.png";
import brand12 from "../../Arinon Clients logos/brandsLogos/Peter-Cat.png";
import brand14 from "../../Arinon Clients logos/brandsLogos/Spacify.png";
import brand15 from "../../Arinon Clients logos/brandsLogos/Manchh.png";
import brand16 from "../../Arinon Clients logos/brandsLogos/AppKart.png";

interface DataType {
  sectionClass?: string;
}

const ClientsV2: React.FC<DataType> = ({ sectionClass }) => {
  const brandLogos: StaticImageData[] = [
    brand7,
    brand6,
    brand9,
    brand3,
    brand11,
    brand12,
    brand14,
    brand10,
    brand2,
    brand4,
    brand8,
    brand15,
    brand16,
  ];

  return (
    <div className="bg-dark-secondary">
      <div className={`clients-area default-padding ${sectionClass ?? ""}`}>
        <div className="container">
          <div className="col">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-xl-8 col-lg-10 text-center">
                  <div className="brand-info1">
                    <h4 className="sub-title">Clients</h4>

                    <h2 className="title split-text">
                      <SplitText
                        delay={100}
                        animationFrom={{
                          opacity: 0,
                          transform: "translate3d(0,50px,0)",
                        }}
                        animationTo={{
                          opacity: 1,
                          transform: "translate3d(0,0,0)",
                        }}
                        easing="easeOutCubic"
                        threshold={0.2}
                        rootMargin="-50px"
                      >
                        Trusted by Leading Brands
                      </SplitText>
                    </h2>

                    <p className="split-text">
                      <SplitText
                        delay={5}
                        animationFrom={{
                          opacity: 0,
                          transform: "translate3d(0,50px,0)",
                        }}
                        animationTo={{
                          opacity: 1,
                          transform: "translate3d(0,0,0)",
                        }}
                        easing="easeOutCubic"
                        threshold={0.2}
                        rootMargin="-50px"
                      >
                        We’ve partnered with a diverse range of clients to bring
                        ideas to life and drive impactful results.
                      </SplitText>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Swiper Carousel */}
            <div className="w-100 py-4">
              <Swiper
                slidesPerView={4}
                spaceBetween={30}
                loop={true}
                autoplay={{ delay: 2000 }}
                modules={[Autoplay]}
                breakpoints={{
                  320: { slidesPerView: 2 },
                  640: { slidesPerView: 3 },
                  1024: { slidesPerView: 4 },
                }}
              >
                {brandLogos.map((logo, index) => (
                  <SwiperSlide key={index}>
                    <div
                      className="d-flex align-items-center justify-content-center p-3"
                      style={{ height: "100px" }}
                    >
                      <Image
                        src={logo}
                        alt={`Client Logo ${index + 1}`}
                        className="img-fluid"
                        style={{ objectFit: "contain", maxHeight: "80px" }}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientsV2;
