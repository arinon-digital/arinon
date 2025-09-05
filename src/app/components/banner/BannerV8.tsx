"use client";

import Image from "next/image";
import Link from "next/link";
import CountUp from 'react-countup';
import SplitText from "../animation/SplitText.jsx"

interface DataType {
    lightMode?: boolean;
}

const BannerV8 = ({ lightMode }: DataType) => {
    return (
        <>
            <div className="bg-cover banner-style-eight-area"
                style={{ backgroundImage: `url(${lightMode ? "/assets/img/shape/4.jpg" : "/assets/img/shape/3.jpg"})` }}>
                <div className="container">
                    <div className="row">
                        <div className="col-xl-8">
                            <div className="banner-style-eight-heading">
                                <div className="banner-title">

                                     <h2>
                                        <SplitText
                                            className="title-left split-text"
                                            delay={150}
                                            animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                                            animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                                            easing={"easeOutCubic" as any}
                                            threshold={0.2}
                                            rootMargin="-50px"
                                            onLetterAnimationComplete={() => {}}
                                        >
                                            Designing
                                        </SplitText>
                                    </h2>

                                    <h2 className="title-right split-text">
                                        <SplitText
                                            delay={150}
                                            animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                                            animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                                            easing={"easeOutCubic" as any}
                                            threshold={0.2}
                                            rootMargin="-50px"
                                            onLetterAnimationComplete={() => {}}
                                        >
                                            Creative
                                        </SplitText>
                                    </h2>

                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4">
                            <div className="thumb">
                                <Image src="/assets/img/illustration/1.png" alt="Image Not Found" width={512} height={512} />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-7">
                            <div className="d-grid">
                                <h4>Arinon Digital</h4>
                                <div className="right">
                                    <p>
                                        Delivering innovative solutions in branding, marketing, design, and advertising, we work closely with clients to craft impactful campaigns, compelling visual identities, and effective digital strategies that resonate with target audiences. Our comprehensive services include graphic/video design, content creation, social media management, web designing, and app development.                                   </p>
                                    <Link className="mt-10 btn-animation" href="/about-us"><i className="fa-arrow-right fas" /> <span>Know More</span></Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 offset-xl-1">
                            <div className="card-style-one">
                                <div className="bottom">
                                    <div className="fun-fact">
                                        <div className="counter">
                                            <div className="timer"><CountUp end={40} enableScrollSpy /></div>
                                            <div className="operator">+</div>
                                        </div>
                                        <span className="medium">Completed Projects</span>
                                    </div>
                                    <Link href="/project"><i className="fa-long-arrow-right fas" /></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BannerV8;