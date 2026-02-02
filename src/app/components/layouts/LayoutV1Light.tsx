import FooterV4 from "../footer/FooterV4";
import HeaderV6 from "../header/HeaderV6";

interface LayoutProps {
    children?: React.ReactNode;
}

const LayoutV1Light = ({ children }: LayoutProps) => {
    return (
        <>
            <div className="smooth-scroll-container">
                <HeaderV6 lightMode={true} />
                {children}
                <FooterV4 lightMode={true} sectionClass='bg-gray' />
            </div>
        </>
    );
};

export default LayoutV1Light;