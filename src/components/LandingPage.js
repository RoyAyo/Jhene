import React from 'react'
import { Link } from 'react-router-dom';

import {
    hamburgerIcon,
    header,
    logo,
    pose
} from "../static/index";
import "../static/css/landingpage.css";

const LandingPage = () => {
    return (
        <div>
            <div className="header">
                <div className="lg">
                    <div>
                        <img  src={logo} alt=""/>
                    </div>
                    <div className="links">
                        <Link to="/contact" className="link">
                            Contact us
                        </Link>
                        <Link to="/about" className="link">
                            About
                        </Link>
                        <Link to="/requst" className="link link-btn">
                            Request Access
                        </Link>
                        <Link to="/register" className="link link-btn link-btn2">
                            Get Started
                        </Link>
                    </div>
                </div>
                <div className="sm-md">
                    <img  src={logo} alt=""/>
                    <img src={hamburgerIcon} alt="" />
                </div>
            </div>
            <div className="wrapper">
                <div className="top-desc">
                    <div className="imgs">
                        <img src={pose} alt="" />
                    </div>
                    <div className="desc">
                        <h4>Making the e-commerce experience better</h4>
                        <p>Jhene is a product designed to make online purchase seemless for Buyers, and market coverage wider for Vendors.</p>
                        <div>
                            <Link to="/register" className="link-btn">
                                Get Started
                            </Link>
                            <Link to="/request" className="link-btn link-btn2">
                                Request Vendor Access
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="vendor-desc-img">
                    <img src={header} alt="" />
                </div>
                <div>
                    <h4>About Us</h4>
                    <div className="about-us">
                        <div className="about-us-desc">
                            <h4>What is Jhene?</h4>
                            <p>Jhene is a product designed to give e-commerce a whole new experience for both buyers and sellers.
Thousands of internet users spend time searching for legitimate vendors and service providers on social media, websites and search engines everyday.
Vendors also budget a lot for marketing and promotion to reach their prospective buyers.
Jhene bridges the gaps between customers and sellers by requests from prospective buyers and providing a link to a legitimate vendor.
Customer buys with trust, seller makes more sales. Everybody wins!</p>
                        </div>
                        <div className="about-us-img">
                            <img src={pose} alt="" />
                        </div>
                    </div>
                    <div className="the-team">
                        <h4>The Team</h4>
                        <p>One Developer, One Designer. One Product.</p>
                        <div className="pics">
                            <div>
                                <img alt="" />
                                <p>Roy-Layinde Ayoola</p>
                                <p>Developer</p>
                            </div>
                            <div>
                                <img alt="" />
                                <p>Kolade Olufemi</p>
                                <p>Designer</p>
                            </div>
                        </div>
                    </div>
                    <div className="contact-us">
                        <h4>Contact us</h4>
                        <p>You want to speak with us? Send us an email on <a href="mailto:apig.bot@gmail.com">Jhene</a></p>
                        <p>Or visit us on twitter <a href="twitter.com/Jhenebot">Jhene</a></p>
                    </div>
                </div>
                <div className="footers">
                    <div>
                        <img src={logo} alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LandingPage