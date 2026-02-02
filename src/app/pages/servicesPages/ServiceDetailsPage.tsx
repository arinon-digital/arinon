import { useParams } from "react-router-dom";
import { fromUrlFriendly } from "../../utils/urlHelpers";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import DarkClass from "../../components/classes/DarkClass";
import LayoutV1 from "../../components/layouts/LayoutV1";
import ServiceDetailsContent from "../../components/services/ServiceDetailsContent";
import ServicesV1Data from "../../assets/jsonData/services/ServicesV1Data.json"

const ServiceDetailsPage = () => {
    const { title } = useParams();
    const titleParam = Array.isArray(title) ? title[0] : (title ?? '');
    const originalTitle = fromUrlFriendly(titleParam);
    const data = ServicesV1Data.find(service => service.title === originalTitle);

    return (
        <>
           

            <LayoutV1>
                <Breadcrumb title='Our Services' breadCrumb='service-details' />
                <ServiceDetailsContent serviceInfo={data} />
                <DarkClass />
            </LayoutV1>
        </>
    );
};

export default ServiceDetailsPage;