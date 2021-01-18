import React from 'react'
import "../../static/css/footer.css";
import VisibilitySensor from "react-visibility-sensor";
import {Spring} from 'react-spring/renderprops';

import {
    twitterIcon,
    gmailIcon
} from '../../static/index';

import {
    Image
} from 'cloudinary-react';

const Footer = () => {
    return (
        <>
            <VisibilitySensor>
                {({isVisible}) => (
                    <Spring   delay={150} to={{position: "relative" , opacity:isVisible ? 1 : 0, transform : isVisible ? "translateY(0)" : "translateY(20px)" }}>
                        {props => (
                            <div className="footers" style={{...props}}>
                                <div className="icons">
                                    <div className="logo-footer">
                                        <Image cloudName="jhene" publicId="logo_blue_1_ptflze" />
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
                        )}
                    </Spring>
                )}
            </VisibilitySensor>
        </>
    )
}

export default Footer
