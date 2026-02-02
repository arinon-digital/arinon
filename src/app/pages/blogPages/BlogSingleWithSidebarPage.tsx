import BlogSingleWithSidebarContent from "../../components/blog/BlogSingleWithSidebarContent";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import DarkClass from "../../components/classes/DarkClass";
import LayoutV1 from "../../components/layouts/LayoutV1";
import BlogV3Data from "@/app/assets/jsonData/blog/BlogV3Data.json";
import { toBlogUrlFriendly } from "../../utils/urlHelpers";

type Props = {
  title2?: string;
};

const BlogSingleWithSidebarPage = ({ title2 }: Props) => {
  const urlTitle = title2 || "";

  const data = BlogV3Data.find((blog) => {
    const blogUrlTitle = toBlogUrlFriendly(blog.title2 || "");
    return blogUrlTitle === urlTitle;
  });

  return (
    <LayoutV1>
      <Breadcrumb title="Blog Grid" breadCrumb="blog-single-with-sidebar" />
      {data && (
        <BlogSingleWithSidebarContent
          sectionClass="default-padding-bottom"
          blogInfo={data}
          totalBlogs={BlogV3Data.length}
        />
      )}
      <DarkClass />
    </LayoutV1>
  );
};

export default BlogSingleWithSidebarPage;