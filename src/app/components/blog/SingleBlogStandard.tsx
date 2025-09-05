import { Link } from "react-router-dom";
import { toBlogUrlFriendly } from "../../utils/urlHelpers";

interface DataType {
    id?: number;
    thumb?: string;
    date?: string;
    title?: string;
    text?: string;
    author?: string;
    title2?: string;
}

const SingleBlogStandard = ({ blog }: { blog: DataType }) => {
    const { thumb, date, title, text, author, title2 } = blog

    return (
        <>
            <div className="blog-style-one item">
                <div className="thumb">
                    <Link to={`/blog-single-with-sidebar/${toBlogUrlFriendly(title2 || '')}`}>
                        <img src={`/assets/img/blog/${thumb}`} alt="Image Not Found" width={1500} height={750} />
                    </Link>
                </div>
                <div className="info">
                    <div className="meta">
                        <ul>
                            <li>
                                <Link to="#">{author}</Link>
                            </li>
                            <li>
                                {date}
                            </li>
                        </ul>
                    </div>
                    <h2>
                        <Link to={`/blog-single-with-sidebar/${toBlogUrlFriendly(title2 || '')}`}>{title}</Link>
                    </h2>
                    <p>{text}</p>
                    <Link className="button-regular" to={`/blog-single-with-sidebar/${toBlogUrlFriendly(title2 || '')}`}>
                        Continue Reading <i className="fas fa-arrow-right"></i>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default SingleBlogStandard;