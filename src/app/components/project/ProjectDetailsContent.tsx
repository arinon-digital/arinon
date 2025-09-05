import { Link } from "react-router-dom";
import PortfolioV4Data from "../../assets/jsonData/portfolio/PortfolioV4Data.json";
import { toUrlFriendly } from "../../utils/urlHelpers";
// import ServicesV1Data from "../../assets/jsonData/services/ServicesV1Data.json"

interface Feature {
  title: string;
  description?: string;
  points?: string[];
}

interface Section2 {
  images: string[];
  features: Feature[];
}

interface Section3Item {
  title: string;
  content: string[];
  image?: string;
  list?: string[];
}

interface DataType {
  id: number;
  title: string;
  tag: string;
  thumbFull: string;
  client: string;
  disciplines: string[];
  projectDetails: string;
  testimonial?: string;
  section2: Section2;
  section3: Section3Item[];
}

interface ProjectDetailsProps {
  projectInfo?: DataType;
  sectionClass?: string;
  totalProjects?: number;
}

const ProjectDetailsContent = ({ projectInfo, sectionClass, totalProjects }: ProjectDetailsProps) => {
  if (!projectInfo) return null;

  const {
  
    title,
    tag,
    thumbFull,
    client,
    disciplines,
    testimonial,
    // projectDetails,
    // section2,
    section3,
  } = projectInfo;

  const currentIndex = PortfolioV4Data.findIndex((p) => p.client === client);
  const previousIndex = currentIndex === 0 ? (totalProjects || 1) - 1 : currentIndex - 1;
  const nextIndex = currentIndex === (totalProjects || 1) - 1 ? 0 : currentIndex + 1;

  const previousProject = PortfolioV4Data[previousIndex];
  const nextProject = PortfolioV4Data[nextIndex];

  const getFirstTwoWords = (text?: string) =>
    text?.split(" ").slice(0, 3).join(" ") || "No Title";

  return (
    <>
      {/* Section 1 */}
      <div className={`project-details-items pb-5 ${sectionClass || ""}`}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="project-details-thumb">
                <img src={`/assets/img/portfolio/${thumbFull}`} alt="Image Not Found" />
              </div>
            </div>
            <div className="col-lg-10 offset-lg-1">
              <div className="project-details-main-info">
                <div className="project-single-tags">
                  <Link to="#">{tag}</Link>
                </div>
                <h2 className="title">{title}</h2>
                <div className="mt-35 project-author-details">
                  <ul>
                    <li>
                      <div className="left-info"><h3>Client</h3></div>
                      <div className="right-info"><h3>{client}</h3></div>
                    </li>
                    <li>
                      <div className="left-info"><h3>Disciplines Used</h3></div>
                      <div className="right-info">
                        <p className="project-inner-tag">
                          {disciplines.map((d, i) => (
                            <span key={i}>{d}<br /></span>
                          ))}
                        </p>
                      </div>
                    </li>
                    {/* <li>
                      <div className="left-info"><h3>Project Details</h3></div>
                      <div className="right-info"><p>{projectDetails}</p></div>
                    </li> */}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2 */}
      {/* <div className="bg-gray project-details-items default-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-7">
              <div className="thumb-grid">
                {section2.images.map((img, i) => (
                  <img key={i} src={`/assets/img/portfolio/${img}`} alt="Thumb" />
                ))}
              </div>
            </div>
            <div className="pl-50 pl-md-15 pl-xs-15 col-lg-5">
              <div className="check-list">
                {section2.features.map((f, i) => (
                  <div key={i} className="single-list">
                    <h4>{f.title}</h4>
                    {f.description && <p>{f.description}</p>}
                    {f.points && (
                      <ul className="list-disc">
                        {f.points.map((point, idx) => (
                          <li key={idx}>{point}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* Section 3 */}
      <div className="project-details-items">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="item-grid-container">
                {section3.map((s, i) => (
                  <div key={i} className="single-grid">
                    <div className="item-grid-colum">
                      <div className="left-info">
                        <h3><strong>{`0${i + 1}`}</strong> {s.title}</h3>
                      </div>
                      <div className="right-info">
                        {s.content.map((p, j) => <p key={j}>{p}</p>)}
                        {s.image && <img src={`/assets/img/portfolio/${s.image}`} alt="Image Not Found" />}
                      </div>
                    </div>
                  </div>
                ))}
                <blockquote  className=" fs-3 bg-dark-secondary p-4 rounded-3">{testimonial}</blockquote>
                <div className="text-center project-single-tags">
                  <a href="https://wa.me/+919220440702?text=Hi%20there!%20I%20want%20to%20connect.">Book a Discovery Call →</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="container">
      <div className="default-padding-bottom mt-100 mt-xs-30 services-more">
        <h2 className="mb-20">Most popular services</h2>
        <div className="row">
          {ServicesV1Data.slice(0, 3).map(service =>
            <div className="col-lg-4 col-md-6" key={service.id}>
              <div className="item">
                <img className="regular-img" src={`/assets/img/icon/${service.icon}`} alt="Image Not Found" width={75} height={60} />
                <img className="light-img" src={`/assets/img/icon/${service.iconLight}`} alt="Image Not Found" width={75} height={60} />
                <h4><Link to={`/service-details/${service.id}`}>{service.title}</Link></h4>
                <p>{service.text}</p>
              </div>
            </div>
          )}
        </div>
      </div>
</div> */}


      {/* Section 4 (Navigation) */}
      <div className="default-padding-bottom project-pagination">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="project-paginvation-items">
                <div className="project-previous">
                  <Link to={`/project-details/${toUrlFriendly(previousProject?.client || '')}`}>
                    <div className="icon"><i className="fa-angle-double-left fas" /></div>
                    <div className="nav-title">Previous Post
                      <h5>{getFirstTwoWords(previousProject?.title)}</h5>
                    </div>
                  </Link>
                </div>
                <div className="project-all">
                  <Link to="#"><i className="fas fa-th-large" /></Link>
                </div>
                <div className="project-next">
                  <Link to={`/project-details/${toUrlFriendly(nextProject?.client || '')}`}>
                    <div className="nav-title">Next Post
                      <h5>{getFirstTwoWords(nextProject?.title)}</h5>
                    </div>
                    <div className="icon"><i className="fa-angle-double-right fas" /></div>
                  </Link>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default ProjectDetailsContent;
