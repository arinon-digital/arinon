"use client";
/* eslint-disable no-unused-vars */
import Link from "next/link";
import ModalVideo from "react-modal-video";
import { useState } from "react";
import { toUrlFriendly } from "../../utils/urlHelpers";
import ServicesV1Data from "../../assets/jsonData/services/ServicesV1Data.json";

interface DataType {
    navbarPlacement?: string;
    toggleSubMenu?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

const MainMenu = ({ navbarPlacement }: DataType) => {

    const [isOpen, setOpen] = useState(false);

    return (
        <>
            <ul className={`nav navbar-nav ${navbarPlacement ? navbarPlacement : ""}`} data-in="fadeInDown" data-out="fadeOutUp">
                <li className="dropdown megamenu-fw megamenu-style-two">

                    {/* onClick={toggleSubMenu} add in Link for dropdown  */}
                    <Link href="/" data-toggle="dropdown" >Home</Link>
                    {/* <Link href="#" onClick={toggleSubMenu} data-toggle="dropdown"></Link> */}
                                        {/* <ul className="dropdown-menu megamenu-content" role="menu">
                        <li>
                            <div className="col-menu-wrap">
                                <div className="menu-cal-items">
                                    <div className="col-menu">
                                        <h4>Homepage Dark</h4>
                                        <ul className="menu-col">
                                            <li><Link href="/">Home Main</Link></li>
                                            <li><Link href="/home-2">Creative Agency</Link></li>
                                            <li><Link href="/home-3">Startup Agency</Link></li>
                                            <li><Link href="/home-4">Showcase Carousel</Link></li>
                                            <li><Link href="/home-5">Showcase Slider</Link></li>
                                            <li><Link href="/home-6">Modern Agency</Link></li>
                                            <li><Link href="/home-7">Digital Agency</Link></li>
                                            <li><Link href="/home-8">Modern Startup</Link></li>
                                            <li><Link href="/home-9">Design Studio</Link></li>
                                        </ul>
                                    </div>
                                    <div className="col-menu">
                                        <h4>Homepage Light</h4>
                                        <ul className="menu-col">
                                            <li><Link href="/home-1-light">Home Main</Link></li>
                                            <li><Link href="/home-2-light">Creative Agency</Link></li>
                                            <li><Link href="/home-3-light">Startup Agency</Link></li>
                                            <li><Link href="/home-4-light">Showcase Carousel</Link></li>
                                            <li><Link href="/home-5-light">Showcase Slider</Link></li>
                                            <li><Link href="/home-6-light">Modern Agency</Link></li>
                                            <li><Link href="/home-7-light">Digital Agency</Link></li>
                                            <li><Link href="/home-8-light">Modern Startup</Link></li>
                                            <li><Link href="/home-9-light">Design Studio</Link></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="megamenu-banner">
                                    <div className="thumb">
                                        <img src={banner1} alt="Image Not Found" />
                                        <Link href="#" className="popup-youtube video-button" onClick={() => setOpen(true)}>
                                            <i className="fas fa-play" />
                                        </Link>
                                    </div>
                                    <h4>Intro Video</h4>
                                </div>
                            </div>
                        </li>
                    </ul> */}
                </li>
                <li className="dropdown">
                    <Link href="/about-us">About Us</Link>
                    {/* <ul className="dropdown-menu"> */}
                    {/* <li><Link href="/about-us">About Us</Link></li> */}
                    {/* <li><Link href="/about-2">About Style Two</Link></li> */}
                    {/* Nested dropdown removed to prevent <li> inside <li> hydration issues */}

                    {/* <li><Link href="/contact-us">Contact Us</Link></li> */}
                    {/* <li><Link href="/faq">Faq</Link></li> */}
                    {/* <li><Link href="/not-found">Error Page</Link></li> */}
                    {/* <li className="dropdown">
                            <Link href="#" data-toggle="dropdown" onClick={toggleSubMenu}>Pages Light Version</Link>
                            <ul className="dropdown-menu">
                                <li><Link href="/about-us-light">About Us</Link></li>
                                <li><Link href="/about-2-light">About Style Two</Link></li>
                                <li><Link href="/team-light">Team Style One</Link></li>
                                <li><Link href="/team-2-light">Team Style Two</Link></li>
                                <li><Link href="/team-details-light/1">Team Details</Link></li>
                                <li><Link href="/project-light">Project Showcase</Link></li>
                                <li><Link href="/project-2-light">Interactive Portfolio</Link></li>
                                <li><Link href="/project-3-light">Showcase Carousel</Link></li>
                                <li><Link href="/project-details-light/Musings-of-Aakanksha">Project Details</Link></li>
                                <li><Link href="/contact-us-light">Contact Us</Link></li>
                                <li><Link href="/faq-light">Faq</Link></li>
                            </ul>
                        </li> */}
                    {/* </ul> */}
                </li>
                <li className="dropdown">
                    <Link href="/project" > Projects</Link>
                    {/* <ul className="dropdown-menu">
                        <li><Link href="/project-details/Musings-of-Aakanksha">Project Showcase</Link></li>
                        <li><Link href="/project-2">Interactive Portfolio</Link></li>
                        <li><Link href="/project-3">Showcase Carousel</Link></li>
                        <li><Link href="/project-details/Musings-of-Aakanksha">Project Details</Link></li>
                    </ul> */}
                </li>
                <li className="dropdown">
                    <Link href="/services" data-toggle="dropdown">Services</Link>
                    <ul className="dropdown-menu">
                        {ServicesV1Data.map((service) => (
                            <li key={service.id}>
                                <Link href={`/service-details/${toUrlFriendly(service.title)}`}>
                                    {service.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </li>
                <li className="dropdown">
                    <Link href="/blog">Blog</Link>
                    {/* <ul className="dropdown-menu"> */}
                    {/* <li><Link href="/blog-standard">Blog Standard</Link></li>
                        <li><Link href="/blog-with-sidebar">Blog With Sidebar</Link></li>
                        <li><Link href="/blog-2-column">Blog Grid Two column</Link></li> */}
                    {/* <li><Link href="">Blog Grid Three column</Link></li>
                        <li><Link href="/blog-single/1">Blog Single</Link></li> */}
                    {/* <li><Link href="/blog-single-with-sidebar/1">Blog Single With Sidebar</Link></li> */}
                    {/* <li className="dropdown">
                            <Link href="#" data-toggle="dropdown" onClick={toggleSubMenu}>Blog Light Version</Link>
                            <ul className="dropdown-menu">
                                <li><Link href="/blog-standard-light">Blog Standard</Link></li>
                                <li><Link href="/blog-with-sidebar-light">Blog With Sidebar</Link></li>
                                <li><Link href="/blog-2-column-light">Blog Grid Two column</Link></li>
                                <li><Link href="/blog-3-column-light">Blog Grid Three column</Link></li>
                                <li><Link href="/blog-single-light/limited-creativity-is-the-killer">Blog Single</Link></li>
                                <li><Link href="/blog-single-with-sidebar-light/limited-creativity-is-the-killer">Blog Single With Sidebar</Link>
                                </li>
                            </ul>
                        </li> */}
                    {/* </ul> */}
                </li>
                <li ><Link href="/contact-us">contact</Link></li>
            </ul>

            <ModalVideo channel='youtube' isOpen={isOpen} videoId="35mvh-2oII8" onClose={() => setOpen(false)} />
        </>
    );
};

export default MainMenu;