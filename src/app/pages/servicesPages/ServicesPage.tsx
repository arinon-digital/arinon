import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import DarkClass from "../../components/classes/DarkClass";
import ClientsV2 from "../../components/clients/ClientsV2";
import FunFactV1 from "../../components/fact/FunFactV1";
import LayoutV1 from "../../components/layouts/LayoutV1";
// import PriceV1 from "../../components/price/PriceV1";
import ServicesV1 from "../../components/services/ServicesV1";
import TestimonialV2 from "../../components/testimonial/TestimonialV2";

const ServicesPage = () => {
    return (
        <>
            <LayoutV1>
                <Breadcrumb title='Our Services' breadCrumb='services' />
                <ServicesV1 sectionClass='default-padding-bottom default-padding-top bg-dark-secondary' />
                <FunFactV1 sectionClass='default-padding-bottom default-padding-top' />
                <ClientsV2 sectionClass='bg-gray' />
                <TestimonialV2 />
                {/* <PriceV1 sectionClass='bg-gray' /> */}
                <DarkClass />
            </LayoutV1>
        </>
    );
};

export default ServicesPage;