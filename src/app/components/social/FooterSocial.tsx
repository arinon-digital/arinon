import { Link } from "react-router-dom";

const FooterSocial = () => {
    return (
        <>
            <li>
                <Link to="https://www.facebook.com/arinondigital" target='_blank'><i className="fab fa-facebook-f" /></Link>
            </li>
            <li>
                <Link to="https://www.instagram.com/arinondigital" target='_blank'><i className="fab fa-instagram" /></Link>
            </li>
            <li>
                <Link to="https://www.linkedin.com/company/arinon" target='_blank'><i className="fab fa-linkedin-in" /></Link>
            </li>
        </>
    );
};

export default FooterSocial;