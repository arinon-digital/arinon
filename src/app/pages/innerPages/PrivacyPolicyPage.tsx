// import { Helmet } from "react-helmet-async";
import LayoutV1 from "../../components/layouts/LayoutV1";
import PrivacyPolicy from "@/app/privacy-policy/page";

const PrivacyPolicyPage = () => {
    // console.log(document.title);
    return (
        <div className="bg-dark">
            {/* <Helmet>
                <title>Arinon - Elevate Your Brand</title>
            </Helmet> */}

            <LayoutV1 >
                <PrivacyPolicy/>
            </LayoutV1>
        </div>
    );
};

export default PrivacyPolicyPage;