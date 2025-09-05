import { Link } from "react-router-dom";
import { toBlogUrlFriendly } from "../../utils/urlHelpers";

interface DataType {
    id?: number;
    thumb?: string;
    author?: string;
    comment?: number;
    date?: string;
    month?: string;
    title?: string;
    title2?: string;
}

const SingleBlogV2 = ({ blog }: { blog: DataType }) => {
    const {  thumb, author, comment, title, date, month, title2 } = blog

    return (
        <>
            <div className="home-blog-two">
                <div className="thumb">
                    <Link to={`/blog-single-with-sidebar/${toBlogUrlFriendly(title2 || '')}`}>
                        <img src={`/assets/img/blog/${thumb}`} alt="Image Not Found" width={800} height={600} />
                    </Link>
                    <div className="date">{date} <strong>{month}</strong></div>
                </div>
                <div className="info">
                    <div className="content">
                        <div className="meta">
                            <ul>
                                <li>
                                    <Link to="#">{author}</Link>
                                </li>
                                <li>
                                    <Link to="#">{comment} Comments</Link>
                                </li>
                            </ul>
                        </div>
                        <h3 className="post-title">
                            <Link to={`/blog-single-with-sidebar/${toBlogUrlFriendly(title2 || '')}`}>{title}</Link>
                        </h3>
                        <Link to={`/blog-single-with-sidebar/${toBlogUrlFriendly(title2 || '')}`} className="button-regular">
                            Continue Reading <i className="fas fa-arrow-right" />
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SingleBlogV2;