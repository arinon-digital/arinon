"use client";

import Image from 'next/image';
import Link from "next/link";
import CountUp from 'react-countup';
import SplitText from "../animation/SplitText.jsx"
import akanksha from "../../Arinon Clients logos/brandsLogos/Musings-of-Aakanksha.png";
import theBridgeHotel from "../../Arinon Clients logos/brandsLogos/The-Bridge-Hotel.png";
import ipra from "../../Arinon Clients logos/brandsLogos/IPRA.png";
import jmd from "../../Arinon Clients logos/brandsLogos/JMD.png";
import peterCat from "../../Arinon Clients logos/brandsLogos/Peter-Cat.png";
import spacify from "../../Arinon Clients logos/brandsLogos/Spacify.png";
import dpf from "../../Arinon Clients logos/brandsLogos/DPF.png";

interface DataType {
    sectionClass?: string
}

const ClientsV1 = ({ sectionClass }: DataType) => {
    return (
        <>
            <div className={`clients-area default-padding ${sectionClass ? sectionClass : ""}`}>
                <div className="container">
                    <div className="row">
                        <div className="mb-md-50 col-xl-4 col-lg-5">
                            <div className="brand-info">
                                <h4 className="align-items-center sub-title">Clients</h4>

                                <h2 className="title split-text">
                                    <SplitText
                                        delay={100}
                                        animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                                        animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                                        easing={"easeOutCubic" as any}
                                        threshold={0.2}
                                        rootMargin="-50px"
                                        onLetterAnimationComplete={() => {}}
                                    >
                                        Trusted by Leading Brands
                                    </SplitText>
                                </h2>

                                <p className="split-text">
                                    <SplitText
                                        delay={5}
                                        animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                                        animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                                        easing={"easeOutCubic" as any}
                                        threshold={0.2}
                                        rootMargin="-50px"
                                        onLetterAnimationComplete={() => {}}
                                    >
                                        We’ve partnered with a diverse range of clients to bring ideas to life and drive impactful results.
                                    </SplitText>
                                </p>


                            </div>
                        </div>
                        <div className="col-xl-7 offset-xl-1 col-lg-7">
                            <div className="client-style-one-items">
                                <div className="client-style-one-item">
                                    <div className="fun-fact">
                                        <div className="pt-4 counter">
                                            <div className="count-num"><CountUp end={30} enableScrollSpy /></div>
                                            <div className="operator">+</div>
                                        </div>
                                        <span className="medium">Active Clients</span>
                                    </div>
                                </div>
                                {[akanksha, dpf, theBridgeHotel, ipra, jmd, peterCat, spacify].map((logo, index) => (
                                    <div className="client-style-one-item" key={index}>
                                        <Image src={logo} alt="Image Not Found" width={160} height={80} />
                                    </div>
                                ))}
                               
                                <div className="client-style-one-item">
                                    <Link href="/about-us">View All</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ClientsV1;