"use client";

import AboutV6 from "../../components/about/AboutV6";
import BannerV8 from "../../components/banner/BannerV8";
// import BlogV2 from "../../components/blog/BlogV2";
import DarkClass from "../../components/classes/DarkClass";
import ClientsV1 from "../../components/clients/ClientsV1";
import FooterV4 from "../../components/footer/FooterV4";
import HeaderV1 from "../../components/header/HeaderV1";
import MultiSection from "../../components/multi/MultiSection";
import ProjectV1 from "../../components/project/ProjectV1";
import ServicesV1 from "../../components/services/ServicesV1";
import TestimonialV2 from "../../components/testimonial/TestimonialV2";

const Home1 = () => {
    return (
        <>
            <div className="smooth-scroll-container">
                <HeaderV1 />
                <BannerV8 />
                <AboutV6 sectionClass="bg-dark-secondary" />
                <ServicesV1 sectionClass='bg-dark default-padding' hasTitle={true} />
                <ProjectV1 />
                {/* <TeamV1 sectionClass='bg-gray' hasTitle={true} /> */}
                <TestimonialV2 sectionClass="bg-dark" />
                <ClientsV1 sectionClass="bg-dark-secondary" />
                <MultiSection />
                {/* <BlogV2 sectionClass='bg-dark-secondary' /> */}
                <FooterV4 />
                <DarkClass />
            </div>
        </>
    );
};

export default Home1;