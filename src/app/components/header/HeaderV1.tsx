"use client";

import Link from "next/link";
import Image from "next/image";
import MainMenu from "./MainMenu";
import SidebarInfo from "./SidebarInfo";
import useSidebarMenu from "../../hooks/useSidebarMenu";
import useSubMenuToggle from "../../hooks/useSubMenuToggle";
import useSidebarInfo from "../../hooks/useSidebarInfo";
import useStickyMenu from "../../hooks/useStickyMenu";

interface HeaderV1Props {
  lightMode?: boolean;
}

const HeaderV1: React.FC<HeaderV1Props> = ({ lightMode }) => {
  const { isOpen, openMenu, closeMenu } = useSidebarMenu();
  const toggleSubMenu = useSubMenuToggle();
  const { isInfoOpen, openInfoBar, closeInfoBar } = useSidebarInfo();
  const isMenuSticky = useStickyMenu();

  return (
    <header>
      <nav
        className={`navbar mobile-sidenav navbar-sticky navbar-default validnavs navbar-fixed on menu-center ${
          isMenuSticky ? "sticked" : "no-background"
        } ${isOpen ? "navbar-responsive" : ""}`}
      >
        <div className="container d-flex justify-content-between align-items-center">
          {/* Logo + mobile toggle */}
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle"
              data-toggle="collapse"
              data-target="#navbar-menu"
              onClick={openMenu}
            >
              <i className="fa fa-bars" />
            </button>
            <Link href="/" className="navbar-brand">
              <Image
                src={lightMode ? "/assets/img/logo.png" : "/assets/img/logo-light.png"}
                className="logo logo-display"
                alt="Logo"
                width={160}
                height={40}
                style={{ height: "auto" }}
                priority
              />
              <Image
                src={lightMode ? "/assets/img/logo.png" : "/assets/img/logo-light.png"}
                className="logo logo-scrolled"
                alt="Logo"
                width={160}
                height={40}
                style={{ height: "auto" }}
              />
            </Link>
          </div>

          {/* Main menu */}
          <div
            className={`collapse navbar-collapse ${
              isOpen ? "show collapse-mobile" : "collapse-mobile"
            }`}
            id="navbar-menu"
          >
            <Image
              src={lightMode ? "/assets/img/logo.png" : "/assets/img/logo-light.png"}
              alt="Logo"
              className="mb-3"
              width={160}
              height={40}
              style={{ height: "auto" }}
            />
            <button
              type="button"
              className="navbar-toggle"
              data-toggle="collapse"
              data-target="#navbar-menu"
              onClick={closeMenu}
            >
              <i className="fa fa-times" />
            </button>
            <MainMenu toggleSubMenu={toggleSubMenu} navbarPlacement="navbar-center" />
          </div>

          {/* Sidebar info */}
          <SidebarInfo
            openInfoBar={openInfoBar}
            closeInfoBar={closeInfoBar}
            isInfoOpen={isInfoOpen}
          />
        </div>

        {/* Overlay */}
        <div
          className={`overlay-screen ${isOpen ? "opened" : ""}`}
          onClick={closeMenu}
        />
      </nav>
    </header>
  );
};

export default HeaderV1;
