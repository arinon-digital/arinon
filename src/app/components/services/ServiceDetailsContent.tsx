import { useParams } from "react-router-dom";
import ServicesV1Data from "../../assets/jsonData/services/ServicesV1Data.json";
import { fromUrlFriendly } from "../../utils/urlHelpers";

interface FeatureType {
  heading: string;
  text: string;
  headImg?: string;
  points: string[];
}

interface ServiceType {
  id: number;
  title: string;
  subheading?: string;
  description: string;
  banner: string;
  headImg?: string;
  features: FeatureType[];
  process: { heading: string; text: string }[];
  gallery?: string[];
  additionalInfo?: { heading: string; items: string[]; headImg?: string }[];
  icon?: string;
  iconLight?: string;
  text?: string;
}

interface ServiceDetailsContentProps {
  serviceInfo?: ServiceType;
}

const ServiceDetailsContent = ({ serviceInfo }: ServiceDetailsContentProps) => {
  const { title } = useParams();
  const originalTitle = fromUrlFriendly(Array.isArray(title) ? title[0] : (title || ''));
  const service = serviceInfo || ServicesV1Data.find(
    (item) => item.title === originalTitle
  );

  if (!service) return <p>Service not found.</p>;

  return (
    <div className="services-details-area">
      <div className="container">
        <div className="services-details-items">
          <div className="row">
            <div className="col-xl-12">
              <div className="service-single-thumb">
                <img
                  src={`/assets/img/banner/${service.banner}`}
                  alt="Thumb"
                />
              </div>
            </div>
          </div>

          <div className="py-5 text-center">
            <h2>{service.title}</h2>
            <p>{service.subheading}</p>
            <p>{service.description}</p>
          </div>

          <div className="m-5 mt-50 mt-xs-20 pb-5">
            <div className="process-style-two">
              {service.process.map((step, i) => (
                <div className="process-style-two-item" key={i}>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <h4>{step.heading}</h4>
                  <p>{step.text}</p>
                </div>
              ))}
            </div>
          </div>

          {service.gallery && service.gallery.some(img => img) && (
            <div className="mt-80 mt-xs-50 row gallery-two-columns">
              {service.gallery.map((img, i) => (
                img && (
                  <div className="col-md-6" key={i}>
                    <img
                      src={`/assets/img/portfolio/${img}`}
                      alt={`Gallery ${i + 1}`}
                      className="img-fluid"
                    />
                  </div>
                )
              ))}
            </div>
          )}

          {service.features.map((feature, i) => {
            if (i % 2 === 0) {
              const secondFeature = service.features[i + 1];
              return (
                <div className="justify-content-center my-5 row" key={i}>
                  <div className="ps-2 ps-md-3 col-lg-5">
                    {(feature as any).headImg && (
                      <div className="mb-4">
                        <img
                          src={`/assets/img/portfolio/${(feature as any).headImg}`}
                          alt={feature.heading}
                          className="rounded img-fluid"
                        />
                      </div>
                    )}
                    <h1>{feature.heading}</h1>
                    <p>{feature.text}</p>
                    <ul className="feature-list-item">
                      {feature.points.map((point, idx) => (
                        <li key={idx}>{point}</li>
                      ))}
                    </ul>
                  </div>

                  {secondFeature && (
                    <>
                      <div className="d-flex justify-content-center col-lg-1">
                        <div
                          style={{
                            borderLeft: "1px solid #3b4955",
                            height: "100%",
                          }}
                        ></div>
                      </div>
                      <div className="ps-2 ps-md-3 col-lg-5">
                        {(secondFeature as any).headImg && (
                          <div className="mb-4">
                            <img
                              src={`/assets/img/portfolio/${(secondFeature as any).headImg}`}
                              alt={secondFeature.heading}
                              className="rounded img-fluid"
                            />
                          </div>
                        )}
                        <h1>{secondFeature.heading}</h1>
                        <p>{secondFeature.text}</p>
                        <ul className="feature-list-item">
                          {secondFeature.points.map((point, idx) => (
                            <li key={idx}>{point}</li>
                          ))}
                        </ul>
                      </div>
                    </>
                  )}
                </div>
              );
            }
            return null;
          })}

          {service.additionalInfo && service.additionalInfo.length > 0 && (
            <div className="align-items-stretch justify-content-center mt-50 pb-5 row">
              {service.additionalInfo[0] && (
                <div className="col-lg-5 item">
                  {service.additionalInfo[0].headImg && (
                    <div className="mb-4">
                      <img
                        src={`/assets/img/portfolio/${service.additionalInfo[0].headImg}`}
                        alt={service.additionalInfo[0].heading}
                        className="rounded img-fluid"
                      />
                    </div>
                  )}
                  <h2>{service.additionalInfo[0].heading}</h2>
                  <ul
                    className="ms-3 feature-list-item list-unstyled"
                    style={{ listStyleType: "disc" }}
                  >
                    {service.additionalInfo[0].items?.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="d-flex justify-content-center col-lg-1">
                <div
                  style={{
                    borderLeft: "1px solid #3b4955",
                    height: "100%",
                    minHeight: "100%",
                  }}
                ></div>
              </div>

              {service.additionalInfo[1] && (
                <div className="col-lg-5 item">
                  {service.additionalInfo[1].headImg && (
                    <div className="mb-4">
                      <img
                        src={`/assets/img/portfolio/${service.additionalInfo[1].headImg}`}
                        alt={service.additionalInfo[1].heading}
                        className="rounded img-fluid"
                      />
                    </div>
                  )}
                  <h2>{service.additionalInfo[1].heading}</h2>
                  <ul className="feature-list-item">
                    {service.additionalInfo[1].items?.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="text-center project-single-tags" >
        <a target="_blank" href="https://wa.me/+919220440702?text=Hi%20there!%20I%20want%20to%20connect.">Book a Discovery Call →</a>
      </div>
    </div>
  );
};

export default ServiceDetailsContent;