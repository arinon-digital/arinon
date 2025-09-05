import FooterSocial from '../social/FooterSocial';
import Link from "next/link";
import Image from "next/image";
import SidebarMenu from './SidebarMenu';
import useSidebarMenu from '../../hooks/useSidebarMenu';
import useStickyMenu from '../../hooks/useStickyMenu';
import useSidebarInfo from '../../hooks/useSidebarInfo';

interface DataType {
    lightMode?: boolean;
}

const HeaderV4 = ({ lightMode }: DataType) => {

    const { isOpen, openMenu, closeMenu } = useSidebarMenu();
    const isMenuSticky = useStickyMenu();
    const { isInfoOpen, openInfoBar, closeInfoBar } = useSidebarInfo();

    return (
        <>
            <header>
                <nav className={`navbar mobile-sidenav navbar-sticky navbar-default validnavs nav-full-width navbar-fixed ${isMenuSticky ? "sticked" : ""} ${isOpen ? "pause-sticked" : ""}`}>
                    <div className="container d-flex justify-content-between align-items-center">

                        <div className="col-xl-2 col-lg-3">
                            <div className="navbar-header">
                                <Link className="navbar-brand" href="/">
                                    <Image src={lightMode ? "/assets/img/logo.png" : "/assets/img/logo-light.png"} className="logo logo-scrolled" alt="Logo" width={160} height={40} priority />
                                </Link>
                            </div>
                        </div>
                        <div className="col-xl-7 col-lg-6">
                            <div className={`collapse navbar-collapse ${isOpen ? "show collapse-mobile" : "collapse-mobile"}`} id="navbar-menu">
                                <div className="left-info">
                                    <p><strong>Contact</strong> <a href="mailto:support@avrix.com">support@avrix.com</a></p>
                                </div>
                                <div className="right-info">
                                    <ul>
                                        <FooterSocial />
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <SidebarMenu openMenu={openMenu} isInfoOpen={isInfoOpen} openInfoBar={openInfoBar} closeInfoBar={closeInfoBar} />
                    </div>
                    <div className={`overlay-screen ${isOpen ? "opened" : ""}`} onClick={closeMenu} />
                </nav>
            </header>
        </>
    );
};

export default HeaderV4;