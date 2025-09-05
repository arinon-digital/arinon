import { useParams } from "react-router-dom";
import BlogSingleWithSidebarContent from "../../components/blog/BlogSingleWithSidebarContent";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import DarkClass from "../../components/classes/DarkClass";
import LayoutV1 from "../../components/layouts/LayoutV1";
import BlogV3Data from "../../../src/assets/jsonData/blog/BlogV3Data.json"
import { Helmet } from "react-helmet-async";
import { toBlogUrlFriendly } from '../../utils/urlHelpers';

const BlogSingleWithSidebarPage = () => {

    const { title2 } = useParams();
    const urlTitle = title2 || '';
    
    // Try to find the blog by matching the URL-friendly version of title2
    const data = BlogV3Data.find(blog => {
        const blogUrlTitle = toBlogUrlFriendly(blog.title2 || '');
        return blogUrlTitle === urlTitle;
    });

    return (
        <>
            <Helmet>
                <title>Dixor - Blog Single With Sidebar</title>
            </Helmet>

            <LayoutV1>
                <Breadcrumb title='Blog Grid' breadCrumb='blog-single-with-sidebar' />
                {data && <BlogSingleWithSidebarContent sectionClass='default-padding-bottom' blogInfo={data} totalBlogs={BlogV3Data.length} />}
                <DarkClass />
            </LayoutV1>
        </>
    );
};

export default BlogSingleWithSidebarPage;