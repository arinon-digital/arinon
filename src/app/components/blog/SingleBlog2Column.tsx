import { Link } from "react-router-dom";
import { toBlogUrlFriendly } from "../../utils/urlHelpers";

interface DataType {
    id?: number;
    thumb?: string;
    title?: string;
    author?: string;
    date?: string;
    title2?: string;
}

const SingleBlog2Column = ({ blog }: { blog: DataType }) => {
    const { thumb, author, title, date, title2 } = blog

    return (
        <>
            <div className="home-blog-style-one">
                <div className="thumb">
                    <Link to={`/blog-single-with-sidebar/${toBlogUrlFriendly(title2 || '')}`}>
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
                            <Link to={`/blog-single-with-sidebar/${toBlogUrlFriendly(title2 || '')}`}>{title}</Link>
                        </h2>
                        <Link to={`/blog-single-with-sidebar/${toBlogUrlFriendly(title2 || '')}`} className="button-regular">
                            Continue Reading
                            <i className="fas fa-long-arrow-right" />
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SingleBlog2Column;