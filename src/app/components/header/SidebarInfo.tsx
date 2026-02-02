// import SocialShareV3 from '../social/SocialShareV3';
import Link from "next/link";
import Image from "next/image";
import FooterSocial from '../social/FooterSocial';

interface SidebarInfoProps {
    openInfoBar?: () => void;
    isInfoOpen?: boolean;
    closeInfoBar?: () => void;
}

const SidebarInfo = ({ openInfoBar, isInfoOpen, closeInfoBar }: SidebarInfoProps) => {
    return (
        <>
            <div className="attr-right">
                <div className="flex attr-nav">
                    <ul>
                        <li className="side-menu">
                            <Link href="#" onClick={openInfoBar}>
                                <span className="bar-1" />
                                <span className="bar-2" />
                                <span className="bar-3" />
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className={`side ${isInfoOpen ? "on" : ""}`}>
                    <Link href="#" className="close-side" onClick={closeInfoBar}><i className="fa fa-times"></i></Link>
                    <div className="top">
                        <div className="widget">
                            <div className="logo">
                                <Image src="/assets/img/logo-light.png" alt="Logo" width={160} height={40} style={{ height: "auto" }} />
                            </div>
                        </div>
                        <div className="widget address">
                            <div>
                                <ul>
                                    <li>
                                        <div className="content">
                                            <p>Address</p>
                                            <strong>Dwarka, Sector-19, New Delhi
                                            </strong>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="conten">
                                            <p>Email</p>
                                            <a href="mailto:info@arinon.com">info@arinon.com</a>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="content">
                                            <p>Contact</p>
                                            <strong>+91 92204 40702</strong>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="bottom">
                        {/* <div className="widget newsletter">
                            <h4 className="title">Get Subscribed!</h4>
                            <HeaderNewsLetter />
                        </div> */}
                        <div className="widget social">
                            <ul className="link">
                                <FooterSocial />
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SidebarInfo;