import React from 'react'
import { Link } from 'react-router-dom';
import VisibilitySensor from "react-visibility-sensor";
import {Spring} from 'react-spring/renderprops';

import Header from './component/Header';
import {
    Image
} from 'cloudinary-react';

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
                                          <Image cloudName="jhene" publicId="Iphone_djralv" />
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
                                        <h4>E-commerce you can trust.</h4>
                                        <p>Jhene cuts off the hassel and makes it easier for online shoppers to get legitimate and trusted vendors.<br></br>We increase the market coverage of vendors and help them make more sales..</p>
                                        <div>
                                            <Link to="/chat">
                                                <span className="link-btn">
                                                    Get Started
                                                </span>
                                            </Link>
                                            <Link to="/vendor-form">
                                                <span className="link-btn link-btn2">
                                                    I want to Join as a vendor
                                                </span>
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
                                        <Image cloudName="jhene" publicId="group2_musuvf"  />
                                    </div>
                                )}
                            </Spring>
                        )}
                    </VisibilitySensor>
                </div>
                <VisibilitySensor partialVisibility>
                    {({isVisible}) => (
                        <Spring to={{opacity: isVisible ? 1 : 0, transform :isVisible ? "translateY(0)" : "translateY(40px)"}} delay={250}>
                            {props => (
                                <div className="vendor-desc-img" style={{...props}}>
                                    <Image cloudName="jhene" publicId="header_1_2_vdokoa" className="header-lg-illustration"  />
                                </div>
                            )}
                        </Spring>
                    )}
                </VisibilitySensor>
                <Footer />
            </div>
        </div>
    );
};

export default LandingPage;