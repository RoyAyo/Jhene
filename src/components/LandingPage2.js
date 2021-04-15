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
import {
    vendorImg,
    customerImg,
    ntito
} from '../static/index';

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
                <VisibilitySensor>
                    {({isVisible}) => (
                        <Spring to={{opacity: isVisible ? 1 : 0, transform :isVisible ? "translateY(0)" : "translateY(40px)"}} delay={250}>
                            {props => (
                                <div style={{...props}} className='for-customers'>
                                    <div className='customers-desc'>
                                        <h4>Customers</h4>
                                        <ul>
                                            <li>Easily find service providers and vendors that sell what you need.</li>
                                            <li>We vet vendors before enlisting the so you can buy stuff with trust and peace of mind.</li>
                                            <li>Get a more personal and private shopping experience.</li>
                                            <Link to="/chat">
                                                <span className="link-btn-customers" style={{textDecoration:'none'}}>
                                                    Get Started
                                                </span>
                                            </Link>
                                        </ul>
                                    </div>
                                    <div className="customers-img">
                                        <img alt="" src={customerImg} />
                                    </div>
                                </div>
                            )}
                        </Spring>
                    )}
                </VisibilitySensor>
                <VisibilitySensor>
                    {({isVisible}) => (
                        <Spring to={{opacity: isVisible ? 1 : 0, transform :isVisible ? "translateY(0)" : "translateY(40px)"}} delay={250}>
                            {props => (
                                <div style={{...props}} className='for-vendors'>
                                    <div className="vendors-img">
                                        <img alt="" src={vendorImg}/>
                                    </div>                                    
                                    <div className='vendors-desc'>
                                        <h4>Vendors</h4>
                                        <ul>
                                            <li>Easily find service providers and vendors that sell what you need.</li>
                                            <li>We vet vendors before enlisting the so you can buy stuff with trust and peace of mind.</li>
                                            <li>Get a more personal and private shopping experience.</li>
                                            <Link to="/chat">
                                                <span className="link-btn-vendors">
                                                    Join as a vendor
                                                </span>
                                            </Link>
                                        </ul>
                                    </div>
                                </div>
                            )}
                        </Spring>
                    )}
                </VisibilitySensor>
                <VisibilitySensor>
                    {({isVisible}) => (
                        <Spring to={{opacity: isVisible ? 1 : 0, transform :isVisible ? "translateY(0)" : "translateY(40px)"}} delay={250}>
                            {props => (
                               <div className="reviews" style={{...props}}>
                                   <h4>People Love Us</h4>
                                   <p>We have spoken to many investors, vendors and customers. This is what people are saying about Jhene</p>
                                   <div className="all-review">
                                        <div className="review">
                                            <div className="review-header">
                                                <div className="dp">
                                                    <img src={ntito} alt="" />
                                                </div>
                                                <div className="name">
                                                    <h6>Ntito</h6>
                                                    <p>Customer</p>
                                                </div>
                                                <div className="icon">
                                                    <img src={ntito} alt="" />
                                                </div>
                                            </div>
                                            <div className="review-body">
                                                <p>The idea seems unique and different from regular e-commerce websites. I’ll definitely like that I can trust what I buy online.</p>
                                            </div>
                                        </div>
                                        <div className="review">
                                            <div className="review-header">
                                                <div className="dp">
                                                    <img src={ntito} alt="" />
                                                </div>
                                                <div className="name">
                                                    <h6>Ntito</h6>
                                                    <p>Customer</p>
                                                </div>
                                                <div className="icon">
                                                    <img src={ntito} alt="" />
                                                </div>
                                            </div>
                                            <div className="review-body">
                                                <p>The idea seems unique and different from regular e-commerce websites. I’ll definitely like that I can trust what I buy online.</p>
                                            </div>
                                        </div>
                                        <div className="review">
                                            <div className="review-header">
                                                <div className="dp">
                                                    <img src={ntito} alt="" />
                                                </div>
                                                <div className="name">
                                                    <h6>Ntito</h6>
                                                    <p>Customer</p>
                                                </div>
                                                <div className="icon">
                                                    <img src={ntito} alt="" />
                                                </div>
                                            </div>
                                            <div className="review-body">
                                                <p>The idea seems unique and different from regular e-commerce websites. I’ll definitely like that I can trust what I buy online.</p>
                                            </div>
                                        </div>
                                        <div className="review">
                                            <div className="review-header">
                                                <div className="dp">
                                                    <img src={ntito} alt="" />
                                                </div>
                                                <div className="name">
                                                    <h6>Ntito</h6>
                                                    <p>Customer</p>
                                                </div>
                                                <div className="icon">
                                                    <img src={ntito} alt="" />
                                                </div>
                                            </div>
                                            <div className="review-body">
                                                <p>The idea seems unique and different from regular e-commerce websites. I’ll definitely like that I can trust what I buy online.</p>
                                            </div>
                                        </div>
                                   </div>
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