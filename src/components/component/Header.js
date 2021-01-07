import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import VisibilitySensor from "react-visibility-sensor";
import {Spring} from 'react-spring/renderprops';

import {
    hamburgerIcon,
    logo
} from '../../static/index';
import '../../static/css/header.css';

const Header = () => {
    const [isHamburgerMenu,setIsHamburgerMenu] = useState(false);
    
    return (
        <>
            <VisibilitySensor>
            {({isVisible}) => (
                <Spring to={{display: isHamburgerMenu ? "" : "none", opacity:isVisible ? 1 : 0}}>
                    {props => (
                        <div className="fixed-header-sm" style={{...props}}>
                            <p onClick={() => setIsHamburgerMenu(false)}>
                                &#10005;
                            </p>
                            <ul>
                                <li>
                                    <Link to="#" className="sm-links">
                                        Get Started
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" className="sm-links">
                                        Request Vendor Access
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" className="sm-links">
                                        Contact Us
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" className="sm-links">
                                        About Us
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    )}
                </Spring>
            )}
        </VisibilitySensor>
            <div className="header">
                    <div className="lg">
                        <div>
                            <Link to="/" style={{textDecoration:"none",cursor:"pointer"}}>
                                <img  src={logo} alt=""/>
                            </Link>
                        </div>
                        <div className="links">
                            <Link to="/contact" className="link">
                                Contact us
                            </Link>
                            <Link to="/about" className="link">
                                About
                            </Link>
                            <Link to="/vendor-form" className="link link-btn">
                                Request Access
                            </Link>
                            <Link to="/chat" className="link link-btn link-btn2">
                                Get Started
                            </Link>
                        </div>
                    </div>
                    <div className="sm-md">
                        <div>
                            <img  src={logo} alt=""/>
                        </div>
                        <div onClick={() => setIsHamburgerMenu(true)}>
                            <img src={hamburgerIcon} alt="" className="hamburger-icon" />
                        </div>
                    </div>
                </div>
            </>
    )
}

export default Header
