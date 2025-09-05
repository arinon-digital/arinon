"use client";

import Image from "next/image";
import Link from "next/link";
// import arrowIcon from "../../../../public/assets/img/icon/arrow.png";
// import arrowTheme from "../../../../public/assets/img/icon/arrow-theme.png";
import ServiceListData from "../../assets/jsonData/services/ServiceListData.json";
import ServiceList from "../services/ServiceList";
import useScrollAnimation from "../../hooks/useScrollAnimation";
import { useState } from "react";

interface DataType {
    lightMode?: boolean;
    sectionClass?: string;
}

const AboutV6 = ({ lightMode, sectionClass }: DataType) => {
    const containerRef = useScrollAnimation();

    const [activeServiceId, setActiveServiceId] = useState(ServiceListData[0]?.id || null);

    const handleMouseEnter = (id: number) => {
        setActiveServiceId(id);
    };

    const handleMouseLeave = () => {
        // Do nothing on mouse leave to keep the active item
    };

    return (
        <>
            <div className={`about-style-six-area default-padding ${sectionClass ? sectionClass : ""}`}>
                <div className="container">
                    <div className="row">
                        <div className="col-xl-5 col-lg-5">
                            <div className="thumb-style-four">
                                <Image src={lightMode ? "/assets/img/thumb/12.jpg" : "/assets/img/thumb/2.jpg"} alt="Image Not Found" width={600} height={700} />
                            </div>
                        </div>
                        <div className="col-xl-6 offset-xl-1 col-lg-7">
                            <div className="text-scroll-animation about-style-six-info" ref={containerRef}>
                                <div className="info">
                                    <div className="d-flex">
                                        {/* <Link to="/about-us"><img src={lightMode ? arrowTheme : arrowIcon} alt="Image Not Found" /></Link> */}
                                        <h1 className="title text">Your Brand. Sharper. Louder. Smarter.</h1>
                                    </div>
                                    <p className="text">
                                        We craft experiences that make your brand impossible to ignore. From screens to boardrooms, we help you grow, engage, and impress with precision. Whether you're scaling your presence or pitching your next big idea—we make sure you stand out.
                                    </p>
                                </div>
                                <ul className="service-list">
                                    {ServiceListData.map(service =>
                                        <li
                                            key={service.id}
                                            onMouseEnter={() => handleMouseEnter(service.id)}
                                            onMouseLeave={handleMouseLeave}
                                        >
                                            <Link href="/services" className={`${activeServiceId === service.id ? 'active' : ''}`}>
                                                <ServiceList service={service} />
                                            </Link>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AboutV6;