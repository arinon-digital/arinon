import { Link } from "react-router-dom";
import { toUrlFriendly } from "../../utils/urlHelpers";

interface DataType {
    id?: number;
    client?: string;
    thumb?: string;
    text?: string;
    textBold?: string;
}

const SinglePortfolioV1 = ({ portfolio }: { portfolio: DataType }) => {
    const {  client, thumb, text, textBold } = portfolio

    return (
        <>
            <div className="portfolio-style-one-item">
                <img src={`/assets/img/portfolio/${thumb}`} alt="Image Not Found" width={710} height={800} />
                <div className="info">
                    <h2><Link to={`/project-details/${toUrlFriendly(client || '')}`}>{text} <strong>{textBold}</strong></Link></h2>
                    {/* <Link className="mt-30 btn-animation" to={`/project-details/${toUrlFriendly(client || '')}`}><i className="fa-arrow-right fas" /> <span>See Details</span></Link> */}
                </div>
            </div>
        </>
    );
};

export default SinglePortfolioV1;