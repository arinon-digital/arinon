import { Link } from "react-router-dom";
import { toBlogUrlFriendly } from "../../utils/urlHelpers";

interface DataType {
    id?: number;
    thumb?: string;
    title2?: string;
    date?: string;
    author?: string;
}

const SingleBlog3Column = ({ blog }: { blog: DataType }) => {
    const { thumb, title2, date, author } = blog

    return (
        <>
            <div className="home-blog-style-one">
                <div className="thumb">
                    <Link to={`/blog-single/${toBlogUrlFriendly(title2 || '')}`}>
                        <img src={`/assets/img/blog/${thumb}`} width={800} height={600} alt="Thumb" />
                    </Link>
                    <div className="info">
                        <div className="meta">
                            <ul>
                                <li>
                                    <Link to="#">{author}</Link>
                                </li>
                                <li>{date}</li>
                            </ul>
                        </div>
                        <h2 className="post-title">
                            <Link to={`/blog-single/${toBlogUrlFriendly(title2 || '')}`}>{title2}</Link>
                        </h2>
                        <Link to={`/blog-single/${toBlogUrlFriendly(title2 || '')}`} className="button-regular">
                            Continue Reading
                            <i className="fa-long-arrow-right fas" />
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SingleBlog3Column;