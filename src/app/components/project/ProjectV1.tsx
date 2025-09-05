import SplitText from "../animation/SplitText.jsx"
import PortfolioV1 from "../portfolio/PortfolioV1";

const ProjectV1 = () => {
    return (
        <div className="bg-dark-secondary">
            <div className="blurry-shape-left overflow-hidden project-style-one-area default-padding">
                <div className="container">
                    <div className="row align-center">
                        <div className="pr-50 pr-md-15 pr-xs-15 col-lg-4">
                            <div className="portfolio-style-one-left-info">
                                <h4 className="sub-title">Let’s bring your imagination into motion!</h4>
                                <p className="split-text">
                                    <SplitText
                                        delay={5}
                                        animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                                        animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                                        easing="easeOutCubic"
                                        threshold={0.2}
                                        rootMargin="-50px"
                                    >
                                        We create captivating 3D motion content that makes your brand stand out. Whether you need character animations, product demonstrations, or dynamic visual stories, we’ve got you covered.
                                    </SplitText>
                                </p>
                                <div className="portfolio-info-card">
                                    <h5>We Bring Your Ideas to Life with 3D Motion Graphics!</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <PortfolioV1 />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectV1;