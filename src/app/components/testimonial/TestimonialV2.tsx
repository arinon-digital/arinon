"use client";

import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';
import { Controller } from 'swiper/modules';
import 'swiper/css';
import Image from 'next/image';
import SplitText from "../animation/SplitText.jsx";
import TestimonialV2Data from "../../assets/jsonData/testimonial/TestimonialV2Data.json";
import SingleTestimonialV2 from './SingleTestimonialV2';

interface DataType {
    sectionClass?: string;
}

const TestimonialV2 = ({ sectionClass }: DataType) => {
    const [mainSwiper, setMainSwiper] = useState<SwiperType | null>(null);
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

    useEffect(() => {
        if (
            mainSwiper &&
            thumbsSwiper &&
            mainSwiper.controller &&
            thumbsSwiper.controller
        ) {
            mainSwiper.controller.control = thumbsSwiper;
            thumbsSwiper.controller.control = mainSwiper;
        }
    }, [mainSwiper, thumbsSwiper]);

    return (
        <div className={`testimonial-style-two-area text-center default-padding ${sectionClass || ""}`}>
            <div className="container">
                <div className="row">
                    <div className="text-center col-xl-6 offset-xl-3 col-lg-8 offset-lg-2">
                        <div className="site-heading">
                            <h4 className="sub-title">Testimonials</h4>
                            <h2 className="title split-text">
                                <SplitText
                                    delay={120}
                                    animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                                    animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                                    easing={"easeOutCubic" as any}
                                    threshold={0.2}
                                    rootMargin="-50px"
                                    onLetterAnimationComplete={() => {}}
                                >
                                    What People Say
                                </SplitText>
                            </h2>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-8 offset-lg-2">
                        <div className="text-center testimonials-quote">
                            <div className="icon">
                                <Image src="/assets/img/shape/3.png" alt="Image Not Found" width={80} height={80} />
                            </div>
                        </div>

                        {/* Main Testimonial Swiper */}
                        <Swiper
                            className="testimonial-style-two-carousel"
                            modules={[Controller]}
                            spaceBetween={10}
                            slidesPerView={1}
                            onSwiper={setMainSwiper}
                            controller={{ control: thumbsSwiper }}
                            loop={false}
                        >
                            {TestimonialV2Data.quoteData.map(testimonial => (
                                <SwiperSlide key={testimonial.id}>
                                    <SingleTestimonialV2 testimonial={testimonial} />
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        {/* Thumbnail Navigation Swiper */}
                        <Swiper
                            className="mt-4 testimonial-bullet"
                            spaceBetween={10}
                            slidesPerView={'auto'}
                            slideToClickedSlide={true}
                            centeredSlides={true}
                            allowTouchMove={false}
                            onSwiper={setThumbsSwiper}
                            controller={{ control: mainSwiper }}
                            loop={false}
                            modules={[Controller]}
                        >
                            {TestimonialV2Data.navigationData.map(data => (
                                <SwiperSlide key={data.id}>
                                    <div className="swiper-bullet-item">
                                        <Image
                                            src={`/assets/img/team/${data.thumb}`}
                                            alt="Image Not Found"
                                            width={100}
                                            height={100}
                                            style={{ cursor: 'pointer' }}
                                        />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestimonialV2;
