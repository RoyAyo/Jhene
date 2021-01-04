import React from 'react'
import { Link } from 'react-router-dom';

import {
    gmailIcon,
    hamburgerIcon,
    header,
    logo,
    pose,
    pose2,
    royPics,
    sixxPics,
    twitterIcon
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
                    <div>
                        <img  src={logo} alt=""/>
                    </div>
                    <div>
                        <img src={hamburgerIcon} alt="" className="hamburger-icon" />
                    </div>
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
                                Request Access
                            </Link>
                        </div>
                    </div>
                    <div className="imgs-sm">
                            <img src={pose} alt="" />
                    </div>
                </div>
                <div className="vendor-desc-img">
                    <img src={header} alt="" />
                </div>
                <div>
                    <h4 className='about-us-text'>About Us</h4>
                    <div className="about-us">
                        <div className="about-us-desc">
                            <h4>What is Jhene?</h4>
                            <p>Jhene is a product designed to give e-commerce a whole new experience for both buyers and sellers.</p>
                            <p>Thousands of internet users spend time searching for legitimate vendors and service providers on social media, websites and search engines everyday.</p>
                            <p>Vendors also budget a lot for marketing and promotion to reach their prospective buyers.</p>
                            <p>Jhene bridges the gaps between customers and sellers by requests from prospective buyers and providing a link to a legitimate vendor.</p>
                            <p>Customer buys with trust, seller makes more sales. Everybody wins!</p>
                        </div>
                        <div className="about-us-img">
                            <img src={pose2} alt="" />
                        </div>
                    </div>
                    <div className="the-team">
                        <h4>The Team</h4>
                        <p>One Developer, One Designer. One Product.</p>
                        <div className="pics">
                            <div>
                                <img alt="" src={royPics} />
                                <h4>Roy-Layinde Ayoola</h4>
                                <p>Developer</p>
                            </div>
                            <div>
                                <img alt="" src={sixxPics} />
                                <h4>Kolade Olufemi</h4>
                                <p>Designer</p>
                            </div>
                        </div>
                    </div>
                    <div className="contact-us">
                        <h4>Contact us</h4>
                        <p>You want to speak oor partner with us? Send us an email on <a href="mailto:apig.bot@gmail.com">Jhene</a></p>
                        <p>Or visit us on Twitter <a href="https://www.twitter.com/Jhenebot" className='twit' target='_blank' rel="noopener noreferrer">Jhene</a></p>
                    </div>
                </div>
                <div className="footers">
                    <div className="icons">
                        <div className="logo-footer">
                            <img src={logo} alt="" />
                        </div>
                        <div className='social-footer'>
                            <a href="https://www.twitter.com/Jhenebot" target='_blank' rel="noopener noreferrer">
                                <img src={twitterIcon} alt="" />
                            </a>
                            <a href="mailto:apig.bot@gmail.com">
                                <img src={gmailIcon} alt="" className="g-icon" />
                            </a>                        
                        </div>
                    </div>
                    <div className="contact-footer">
                        <h4>Contact</h4>
                        <p>apigbot@gmail.com</p>
                        <p>+234 816 572 3798, +234 708 996 1880</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LandingPage