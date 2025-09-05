"use client";

import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import DarkClass from "../../components/classes/DarkClass";
import LayoutV1 from "../../components/layouts/LayoutV1";
import ProjectDetailsContent from "../../components/project/ProjectDetailsContent";
import PortfolioV4Data from "../../assets/jsonData/portfolio/PortfolioV4Data.json";
import { useParams } from "next/navigation";
import { fromUrlFriendly } from "../../utils/urlHelpers";

const ProjectDetailsPage = () => {
    const params = useParams();
    const client = Array.isArray(params.client) ? params.client[0] : params.client;
    const originalClientName = fromUrlFriendly(client || '');
    const data = PortfolioV4Data.find(portfolio => portfolio.client === originalClientName);

    return (
        <>
            <LayoutV1>
                <Breadcrumb title='Case Studies' breadCrumb='project-details' />
                {data && <ProjectDetailsContent projectInfo={data} totalProjects={PortfolioV4Data.length} />}
                <DarkClass />
            </LayoutV1>
        </>
    );
};

export default ProjectDetailsPage;