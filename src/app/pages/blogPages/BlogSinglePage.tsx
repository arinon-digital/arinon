import LayoutV1 from '../../components/layouts/LayoutV1';
import Breadcrumb from '../../components/breadcrumb/Breadcrumb';
import BlogSingleContent from '../../components/blog/BlogSingleContent';
import DarkClass from '../../components/classes/DarkClass';
import { useParams } from 'react-router-dom';
import BlogV3Data from "../../assets/jsonData/blog/BlogV3Data.json";
import { toBlogUrlFriendly } from '../../utils/urlHelpers';

const BlogSinglePage = () => {

    const { title2 } = useParams();
    const urlTitle = title2 || '';
    
    // Try to find the blog by matching the URL-friendly version of title2
    const data = BlogV3Data.find(blog => {
        const blogUrlTitle = toBlogUrlFriendly(blog.title2 || '');
        return blogUrlTitle === urlTitle;
    });

    return (
        <>

            <LayoutV1>
                <Breadcrumb title={data?.title2} breadCrumb='blog' />
                {data && <BlogSingleContent sectionClass='default-padding-bottom' blogInfo={data} totalBlogs={BlogV3Data.length} />}
                <DarkClass />
            </LayoutV1>
        </>
    );
};

export default BlogSinglePage;