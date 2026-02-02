import Link from "next/link";
import Image from "next/image";
import NewsletterV2 from '../newsletter/NewsletterV2';
import FooterSocial from '../social/FooterSocial';

interface DataType {
    lightMode?: boolean;
    sectionClass?: string;
}

const FooterV2 = ({ lightMode, sectionClass }: DataType) => {
    return (
        <>
            <footer className={`style-two ${sectionClass ? sectionClass : ""}`}>
                <div className="container">
                    <div className="f-items">
                        <div className="row">
                            <div className="pr-120 pr-md-15 pr-xs-15 col-lg-6 footer-item about">
                                <div className="top">
                                    <Image src={lightMode ? "/assets/img/logo.png" : "/assets/img/logo-light.png"} alt="Image Not Found" width={160} height={40} style={{ height: "auto" }} />
                                </div>
                                <ul className="address-list">
                                    <li>
                                        <h4>India</h4>
                                        <p>
                                            Dwarka, New Delhi, India
                                        </p>
                                    </li>
                                </ul>
                                <div className="footer-contact">
                                    <ul>
                                        <li>
                                            <a href="mailto:info@arinon.com">info@arinon.com</a>
                                        </li>
                                        <li>
                                            <a href="tel:+91 2204 40702">+91 92204 40702</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-5 offset-lg-1 footer-item">
                                <h4 className="widget-title">Useful Link</h4>
                                <ul className="useful-link">
                                    <li><Link href="/about-us">About Us</Link></li>
                                    <li><Link href="/contact-us">Contact</Link></li>
                                    <li><Link href="/faq">FAQS</Link></li>
                                    <li><Link href="/services">Services</Link></li>
                                    <li><Link href="/about-2">Term & Conditions</Link></li>
                                    <li><Link href="/about-us">Privacy Policy</Link></li>
                                    <li><Link href="/about-2">Careers</Link></li>
                                    <li><Link href="/contact-us">Help Desk</Link></li>
                                </ul>
                                <NewsletterV2 />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6">
                                <ul className="footer-social">
                                    <FooterSocial />
                                </ul>
                            </div>
                            <div className="text-end col-lg-6">
                                <p>
                                    Copyright &copy; {(new Date().getFullYear())} Arinon Digital (a unit of Manisi) . All Rights Reserved
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default FooterV2;