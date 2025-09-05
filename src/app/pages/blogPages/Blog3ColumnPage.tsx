import Blog3ColumnContent from "../../components/blog/Blog3ColumnContent";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import DarkClass from "../../components/classes/DarkClass";
import LayoutV1 from "../../components/layouts/LayoutV1";

const Blog3ColumnPage = () => {
    return (
        <>
           
            <LayoutV1>
                <Breadcrumb title='Blogs' breadCrumb='Blog' />
                <Blog3ColumnContent sectionClass='default-padding-bottom' />
                <DarkClass />
            </LayoutV1>
        </>
    );
};

export default Blog3ColumnPage;