import ServicesV1Data from "../../assets/jsonData/services/ServicesV1Data.json"
// import SplitText from "../animation/SplitText.jsx"
import { Link } from "react-router-dom";
import { useState } from "react";
import { toUrlFriendly } from "@/app/utils/urlHelpers";

interface DataType {
    hasTitle?: boolean;
    sectionClass?: string;
    // lightMode?: boolean
}
//  lightMode 
const ServicesV1 = ({ hasTitle, sectionClass}: DataType) => {

    const [activeServiceId, setActiveServiceId] = useState(ServicesV1Data[0]?.id || null);

    const handleMouseEnter = (id: number) => {
        setActiveServiceId(id);
    };

    const handleMouseLeave = () => {
        // Do nothing on mouse leave to keep the active item
    };

    return (
        <>
            <div className={`services-style-one-area ${sectionClass ? sectionClass : ""}`}>

                {/* Service Title */}
                {hasTitle &&
                    <div className="service-style-one-heading">
                        <div className="container">
                            <div className="row">
                                <div className="text-center col-xl-6 offset-xl-3 col-lg-8 offset-lg-2">
                                    <div className="site-heading">
                                        <h4 className="sub-title">Services we offer</h4>
                                        <h2 className="title split-text">
                                            {/* <SplitText
                                                delay={40}
                                                animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                                                animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                                                easing="easeOutCubic"
                                                threshold={0.2}
                                                rootMargin="-50px"
                                            > */}
                                            Services
                                            {/* </SplitText> */}
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }

                <div className="container">
                    <div className="services-style-one-items">
                        <div className="row">
                            {ServicesV1Data.slice(0, 4).map((service) => (
                                <div
                                    className="col-xl-3 col-lg-6 col-md-6 single-item"
                                    key={service.id}
                                    onMouseEnter={() => handleMouseEnter(service.id)}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <div className={`services-style-one-item ${activeServiceId === service.id ? 'active' : ''}`}>
                                        <div className="icon">
                                            {/* {lightMode ?
                                                <img src={`/assets/img/icon/${service.iconLight}`} alt="Image Not Found" width={75} height={60} /> :
                                            } */}
                                            <img src={`/assets/img/icon/${service.icon}`} alt="Image Not Found" width={75} height={60} />

                                        </div>
                                        <h3>
                                            <Link to={`/service-details/${toUrlFriendly(service.title)}`}>{service.title}</Link>
                                        </h3>
                                        <p>{service.text}</p>
                                        <Link className="btn-full" to={`/service-details/${service.id}`}>
                                            Read More <i className="fa-arrow-right fas" />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ServicesV1;