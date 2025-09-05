import { Link } from "react-router-dom";
import { toBlogUrlFriendly } from "../../utils/urlHelpers";

interface Blog {
    id: number;
    thumb: string;
    title: string;
    title2?: string;
    date: string;
}

interface SingleRecentPostProps {
    blog: Blog;
}

const SingleRecentPost: React.FC<SingleRecentPostProps> = ({ blog }) => {
    const { thumb, title, title2, date } = blog;

    const truncateString = (str: string): string => {
        if (str.length <= 47) {
            return str;
        }
        return `${str.slice(0, 47)} ...`;
    };

    const truncatedTitle = truncateString(title);

    return (
        <li>
            <div className="thumb">
                <Link to={`/blog-single-with-sidebar/${toBlogUrlFriendly(title2 || title || '')}`}>
                    <img src={`/assets/img/blog/${thumb}`} width={500} height={500} alt="Thumb" />
                </Link>
            </div>
            <div className="info">
                <div className="meta-title">
                    <span className="post-date">{date}</span>
                </div>
                <Link to={`/blog-single-with-sidebar/${toBlogUrlFriendly(title2 || title || '')}`}>{truncatedTitle}</Link>
            </div>
        </li>
    );
};

export default SingleRecentPost;