import React from 'react'
import { Link } from 'react-router-dom';
import VisibilitySensor from "react-visibility-sensor";
import { animated } from 'react-spring';
import {Spring} from 'react-spring/renderprops';

import Header from './component/Header';

import {
    header,
    pose,
    pose2,
    royPics,
    sixxPics,
} from "../static/index";
import "../static/css/landingpage.css";
import Footer from './component/Footer';

const LandingPage = () => {
    return (
        <div>
            <Header />
            <div className="wrapper">
                <div className="top-desc">
                    <VisibilitySensor partialVisibility>
                        {({isVisible}) => (
                            <Spring delay={150} to={{position: "relative" , opacity:isVisible ? 1 : 0 }}>
                                {props => (
                                    <div className="imgs" style={{...props}}>
                                          <img src={pose} alt="" />
                                    </div>
                                )}
                            </Spring>
                        )}
                    </VisibilitySensor>
                    <VisibilitySensor partialVisibility>
                        {({isVisible}) => (
                            <Spring delay={200} to={{opacity:isVisible ? 1 : 0, transform : isVisible ? "translateX(0)" : "translateX(20px)"}}>
                                {props => (
                                    <div className="desc" style={{...props}}>
                                        <h4>Making the e-commerce experience better</h4>
                                        <p>Jhene is a product designed to make online purchase seemless for Buyers, and market coverage wider for Vendors.</p>
                                        <div>
                                            <Link to="/register">
                                                <animated.span className="link-btn">
                                                    Get Started
                                                </animated.span>
                                            </Link>
                                            <Link to="/request">
                                                <animated.span className="link-btn link-btn2">
                                                    Request Access
                                                </animated.span>
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </Spring>
                        )}
                    </VisibilitySensor>
                    <VisibilitySensor partialVisibility>
                        {({isVisible}) => (
                            <Spring delay={150} to={{position: "relative" , opacity:isVisible ? 1 : 0, transform : isVisible ? "rotate(0)" : "rotate(-90deg)" }}>
                                {props => (
                                    <div className="imgs-sm" style={{...props}}>
                                        <img src={pose} alt="" />
                                    </div>
                                )}
                            </Spring>
                        )}
                    </VisibilitySensor>
                </div>
                <VisibilitySensor partialVisibility>
                    {({isVisible}) => (
                        <Spring to={{opacity: isVisible ? 1 : 0, transform :isVisible ? "translateX(0)" : "translateX(40px)"}} delay={250}>
                            {props => (
                                <div className="vendor-desc-img" style={{...props}}>
                                    <img src={header} alt="" />
                                </div>
                            )}
                        </Spring>
                    )}
                </VisibilitySensor>
                <div>
                <VisibilitySensor partialVisibility>
                        {({isVisible}) => (
                            <Spring delay={200} to={{opacity:isVisible ? 1 : 0, transform : isVisible ? "translateY(0)" : "translateY(40px)"}}>
                                {props => (
                                        <>
                                            <h4 className='about-us-text'>About Us</h4>
                                            <div className="about-us" style={{...props}}>
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
                                        </>
                                )}
                            </Spring>
                        )}
                </VisibilitySensor>
                    <div className="the-team">
                        <h4>The Team</h4>
                        <p>One Developer, One Designer. One Product.</p>
                        <div className="pics">
                            <VisibilitySensor partialVisibility>
                                    {({isVisible}) => (
                                        <Spring   delay={150} to={{position: "relative" , opacity:isVisible ? 1 : 0, transform : isVisible ? "rotate(0)" : "rotate(-40deg)" }}>
                                            {props => (
                                                <div style={{...props}}>
                                                    <img alt="" src={royPics} />
                                                    <h4>Roy-Layinde Ayoola</h4>
                                                    <p>Developer</p>
                                                </div>
                                            )}
                                        </Spring>
                                    )}
                            </VisibilitySensor>
                            <VisibilitySensor partialVisibility>
                                    {({isVisible}) => (
                                        <Spring   delay={150} to={{position: "relative" , opacity:isVisible ? 1 : 0, transform : isVisible ? "rotate(0)" : "rotate(20deg)" }}>
                                            {props => (
                                                <div style={{...props}}>
                                                    <img alt="" src={sixxPics} />
                                                    <h4>Kolade Olufemi</h4>
                                                    <p>Designer</p>
                                                </div>
                                            )}
                                        </Spring>
                                    )}
                            </VisibilitySensor>
                        </div>
                    </div>
                    <VisibilitySensor>
                        {({isVisible}) => (
                            <Spring delay={150} to={{position: "relative" , opacity:isVisible ? 1 : 0, transform : isVisible ? "translateY(0)" : "translateY(30px)" }}>
                                {props => (
                                    <div className="contact-us" style={{...props}}>
                                        <h4>Contact us</h4>
                                        <p>You want to speak oor partner with us? Send us an email on <a href="mailto:apig.bot@gmail.com">Jhene</a></p>
                                        <p>Or visit us on Twitter <a href="https://www.twitter.com/Jhenebot" className='twit' target='_blank' rel="noopener noreferrer">Jhene</a></p>
                                    </div>
                                )}
                            </Spring>
                        )}
                    </VisibilitySensor>
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default LandingPage