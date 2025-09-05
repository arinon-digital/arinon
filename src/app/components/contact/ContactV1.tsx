import ContactForm from "../form/ContactForm";
import FooterSocial from "../social/FooterSocial";
// import SocialShareV1 from "../social/SocialShareV1";
// import SocialShareV2 from "../social/SocialShareV2";
// import SocialShareV3 from "../social/SocialShareV3";

interface DataType {
  sectionClass?: string;
}

const ContactV1 = ({ sectionClass }: DataType) => {
  return (
    <>
      <div
        className={`contact-area overflow-hidden relative ${
          sectionClass ? sectionClass : ""
        }`}
      >
        <div className="container">
          <div className="contact-style-one-items">
            <div className="row">
              <div className="col-tact-stye-one col-lg-4">
                <div className="contact-style-one-info">
                  <ul className="contact-address">
                    <li>
                      <a style={{ fontSize: "32px" }} href="tel:+919220440702">
                        <i className="fas fa-user-headset" /> +91 92204 40702
                      </a>
                    </li>
                    <li>
                      <div className="info">
                        <h4>Location</h4>
                        <p>Dwarka, Sector-19, New Delhi </p>
                      </div>
                    </li>
                    <li>
                      <div className="info">
                        <h4>Official Email</h4>
                        <a href="mailto:info@arinon.com">info@arinon.com</a>
                      </div>
                    </li>
                    <li>
                      <div className="info">
                        <ul className="social-link">
                          <FooterSocial />
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-tact-stye-one col-lg-7 offset-lg-1">
                <div className="contact-form-style-one">
                  <h4 className="sub-title">Have Questions?</h4>
                  <h2 className="title">Send us a Massage</h2>
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactV1;
