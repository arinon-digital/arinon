import React from "react";
import LayoutV1 from "../components/layouts/LayoutV1";

export const metadata = {
  title: "Privacy Policy - Arinon",
  description: "Our privacy policy and data protection practices",
};

export default function PrivacyPolicy() {
  return (
    <div className="bg-dark">
      <LayoutV1>
        <div className="privacy-policy-content">
          {/* Add your privacy policy content here */}
          <section className="default-padding-top default-padding-bottom">
            <div className="container">
              <div className="row">
                <div className="col-lg-8">
                  <h1>Privacy Policy</h1>
                  <p>Your privacy is important to us...</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </LayoutV1>
    </div>
  );
}
