import { Link } from "react-router-dom";
import handleSmoothScroll from "../utilities/handleSmoothScroll";
import SocialShareV3 from "../social/SocialShareV3";
import BlogV3Data from "../../assets/jsonData/blog/BlogV3Data.json";
import { toBlogUrlFriendly } from "../../utils/urlHelpers";
import Animate from "../animation/Animate";

interface BlogSingleProps {
  blogInfo: any;
  totalBlogs: number;
  sectionClass?: string;
}

const BlogSingleContent = ({
  blogInfo,
  totalBlogs,
  sectionClass,
}: BlogSingleProps) => {
  const {
    id,
    title,
    date,
    dateIcon,
    thumbFull,
    author,
    paragraphs,
    blockquote,
    subHeading,
    listPoints,
    solutions,
    finalInsights,
    results,
    ctaTips,
    closing,
    authorThumb,
    authorDesc,
    caseStudyHeading,
    caseStudyParagraphs,
    subHeading2,
    strategyDifferently,
    subHeading3,
    hashtags,
  } = blogInfo || {};

  const currentIndex = BlogV3Data.findIndex((blog) => blog.id === id);
  const previousIndex = currentIndex === 0 ? totalBlogs - 1 : currentIndex - 1;
  const nextIndex = currentIndex === totalBlogs - 1 ? 0 : currentIndex + 1;

  const previousBlog = BlogV3Data[previousIndex];
  const nextBlog = BlogV3Data[nextIndex];

  const getFirstTwoWords = (text: string | undefined) =>
    text?.split(" ").slice(0, 2).join(" ") || "No Title";

  return (
    <div className={`blog-area single full-blog ${sectionClass || ""}`}>
      <div className="container">
        <div className="blog-items">
          <div className="row">
            <Animate className="animate__animated animate__fadeInUp">
              <div className="blog-content col-lg-10 offset-lg-1 col-md-12">
                <div className="blog-style-one item">
                  <div className="blog-item-box">
                    <div className="thumb">
                      <img src={`/assets/img/blog/${thumbFull}`} alt="Thumb" />
                    </div>
                    <div>
                      <h1>{title}</h1>
                    </div>
                    <div className="info">
                      <div className="meta">
                        <ul>
                          <li>
                            <Link to="#">
                              <i className="fas fa-user-circle" /> {author}
                            </Link>
                          </li>
                          <li>
                            <Link to="#">
                              <i className={dateIcon}></i> {date}
                            </Link>
                          </li>
                        </ul>
                      </div>

                      {Array.isArray(paragraphs) &&
                        paragraphs.map((para, i) => <p key={i}>{para}</p>)}

                      {blockquote && <blockquote>{blockquote}</blockquote>}

                      {subHeading && <h3>{subHeading}</h3>}
                      {Array.isArray(listPoints) &&
                        listPoints.map((point, i) => <li key={i}>{point}</li>)}

                      {caseStudyHeading && <h3>{caseStudyHeading}</h3>}
                      {Array.isArray(caseStudyParagraphs) &&
                        caseStudyParagraphs.map((para, i) => <p key={i}>{para}</p>)}

                      {Array.isArray(solutions) && solutions.length > 0 && (
                        <>
                          <h3 className="pt-4">Our Solutions</h3>
                          <ul>
                            {solutions.map((sol, i) => (
                              <li key={i}>{sol}</li>
                            ))}
                          </ul>
                        </>
                      )}

                      {Array.isArray(finalInsights) &&
                        finalInsights.length > 0 && (
                          <>
                            <h3>What Made This Work?</h3>
                            <ul>
                              {finalInsights.map((ins, i) => (
                                <li key={i}>{ins}</li>
                              ))}
                            </ul>
                          </>
                        )}

                      {subHeading2 && <h3>{subHeading2}</h3>}
                      {Array.isArray(strategyDifferently) &&
                        strategyDifferently.length > 0 && (
                          <ul>
                            {strategyDifferently.map((tip, i) => (
                              <li key={i}>{tip}</li>
                            ))}
                          </ul>
                        )}

                      {results && (
                        <p>
                          <strong>{results}</strong>
                        </p>
                      )}

                      {subHeading3 && <h3>{subHeading3}</h3>}
                      {Array.isArray(ctaTips) && ctaTips.length > 0 && (
                        <ul>
                          {ctaTips.map((tip, i) => (
                            <li key={i}>{tip}</li>
                          ))}
                        </ul>
                      )}

                      {closing && (
                        <p>
                          <strong>{closing}</strong>
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="post-author">
                  <div className="thumb">
                    <img src={authorThumb} alt="Author" />
                  </div>
                  <div className="info">
                    <h4>
                      <Link to="#" onClick={handleSmoothScroll}>
                        {author}
                      </Link>
                    </h4>
                    <p>{authorDesc}</p>
                  </div>
                </div>

                <div className="post-tags share">
                  <div className="tags">
                    <h4>Tags: </h4>
                    {Array.isArray(hashtags)
                      ? hashtags.map((tag, i) => (
                          <Link to="#" key={i}>
                            {tag}
                          </Link>
                        ))
                      : null}
                  </div>
                  <div className="social">
                    <h4>Share:</h4>
                    <ul>
                      <SocialShareV3 />
                    </ul>
                  </div>
                </div>

                <div className="post-pagi-area">
                  <div className="post-previous">
                    <Link
                      to={`/blog-single/${toBlogUrlFriendly(
                        previousBlog?.title2 || ""
                      )}`}
                    >
                      <div className="icon">
                        <i className="fa-angle-double-left fas"></i>
                      </div>
                      <div className="nav-title">
                        Previous Post{" "}
                        <h5>{getFirstTwoWords(previousBlog?.title)}</h5>
                      </div>
                    </Link>
                  </div>
                  <div className="post-next">
                    <Link
                      to={`/blog-single/${toBlogUrlFriendly(
                        nextBlog?.title2 || ""
                      )}`}
                    >
                      <div className="nav-title">
                        Next Post <h5>{getFirstTwoWords(nextBlog?.title)}</h5>
                      </div>
                      <div className="icon">
                        <i className="fa-angle-double-right fas"></i>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </Animate>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogSingleContent;
