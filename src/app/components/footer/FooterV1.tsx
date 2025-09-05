import Link from "next/link";
import Image from "next/image";
import NewsletterV2 from "../newsletter/NewsletterV2";
import FooterSocial from "../social/FooterSocial";

interface DataType {
  sectionClass?: string;
  lightMode?: boolean;
}

const FooterV1 = ({ sectionClass, lightMode }: DataType) => {
  return (
    <>
      <footer className={`${sectionClass ? sectionClass : ""}`}>
        <div className="container">
          <div className="f-items">
            <div className="row">
              <div className="pr-120 pr-md-15 pr-md-15 pr-xs-15 pr-xs-15 col-lg-6 footer-item about">
                <div className="top">
                  <Image src={lightMode ? "/assets/img/logo.png" : "/assets/img/logo-light.png"} alt="Image Not Found" width={160} height={40} />
                </div>
                <ul className="address-list">
                  <li>
                    <h4>India</h4>
                    <p>Dwarka, Sector-19,New Delhi</p>
                  </li>
                </ul>
                <NewsletterV2 />
              </div>
              <div className="col-lg-5 offset-lg-1 footer-item">
                <h4 className="widget-title">Useful Link</h4>
                <ul className="useful-link">
                  <li>
                    <Link href="/about-us">About Us</Link>
                  </li>
                  <li>
                    <Link href="/contact-us">Contact</Link>
                  </li>
                  <li>
                    <Link href="/project">Projects</Link>
                  </li>
                  <li>
                    <Link href="/services">Services</Link>
                  </li>
                  <li>
                    <Link href="/privacy-policy">Privacy Policy</Link>
                  </li>
                  {/* <li><Link to="/about-2">Careers</Link></li> */}
                  <li>
                    <Link href="/project-details/Musings-of-Aakanksha">Case Study</Link>
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
                  Copyright &copy; {new Date().getFullYear()} Arinon Digital (a
                  unit of Manisi) . All Rights Reserved
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default FooterV1;
