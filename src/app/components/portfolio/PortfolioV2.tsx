import PortfolioV2Data from "../../assets/jsonData/portfolio/PortfolioV2Data.json";
import SinglePortfolioV2 from "./SinglePortfolioV2";
import SplitText from "../animation/SplitText.jsx"
import Link from "next/link";

interface DataType {
    hasTitle?: boolean
    moreBtn?: boolean
    sectionClass?: string
}

const PortfolioV2 = ({ hasTitle, moreBtn, sectionClass }: DataType) => {
    return (
        <>
            <div className={`portfolio-style-two-area overflow-hidden ${sectionClass ? sectionClass : ""}`}>

                {/* Portfolio Title */}
                {hasTitle &&
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-6 offset-xl-3 col-lg-8 offset-lg-2">
                                <div className="text-center site-heading">
                                    <h4 className="sub-title">Popular Projects</h4>
                                    <h2 className="title split-text">
                                        <SplitText
                                            delay={150}
                                            animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                                            animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                                            easing={"easeOutCubic" as any}
                                            threshold={0.2}
                                            rootMargin="-50px"
                                            onLetterAnimationComplete={() => {}}
                                        >
                                            Featured Works
                                        </SplitText>
                                    </h2>
                                </div>
                            </div>
                        </div>
                    </div>
                }

                <div className="mt--100 mt-xs--50 container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="row gutter-xl">
                                {PortfolioV2Data.map(portfolio =>
                                    <div className="col-lg-6 item-center" key={portfolio.id} >
                                        <SinglePortfolioV2 portfolio={portfolio} />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Load More Btn */}
                    {moreBtn &&
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="text-center">
                                    <Link className="mt-80 btn-round-animation dark" href="/contact-us">Load More</Link>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </>
    );
};

export default PortfolioV2;