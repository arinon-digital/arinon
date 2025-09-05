import AboutV6 from "../../components/about/AboutV6";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import DarkClass from "../../components/classes/DarkClass";
import FunFactV1 from "../../components/fact/FunFactV1";
import LayoutV1 from "../../components/layouts/LayoutV1";
// import PartnerV2 from "../../components/partner/PartnerV2";
import TestimonialV2 from "../../components/testimonial/TestimonialV2";
import ClientsV2 from "../../components/clients/ClientsV2";

const AboutUsPage = () => {
    return (
        <>
            <LayoutV1>
                <Breadcrumb title='About Company' breadCrumb='About' />
                <AboutV6 sectionClass='bg-gray' />
                <FunFactV1 sectionClass='default-padding-bottom default-padding-top bg-dark' />
                <ClientsV2 sectionClass="itemsCenter"/>
                {/* <PartnerV2 sectionClass="bg-dark-secondary" /> */}
                <TestimonialV2 sectionClass="bg-dark" />
                <DarkClass />
            </LayoutV1>
        </>
    );
};

export default AboutUsPage;