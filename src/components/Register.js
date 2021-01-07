import React from 'react'
import Header from './component/Header';
import Footer from './component/Footer';
import Input from './component/Input';
import GoogleButton from './component/GoogleButton';
import Button from './component/Button';
import VisibilitySensor from "react-visibility-sensor";
import {Spring} from 'react-spring/renderprops';

import {
    Image
} from 'cloudinary-react';

import "../static/css/register.css";

const Register = () => {
    return (
        <div>
            <Header />
            <div className="wrapper">
                <h3 className="get-started">Get Started</h3>
                <div className="body">
                    <div className="form">
                        <h4>Can you give us some details to help us improve your experience?</h4>
                        <p className="or-skip">Or you can <a href="/chat">Skip</a></p>
                        <GoogleButton />
                        <p className="or-">or</p>
                        <form>
                            <Input name="Name" placeholder="Type Your Name" type="text"/>
                            <Input  name="Email" placeholder="Type Your Email" type="email"/>
                            <Input  name="Gender" placeholder="" type=""/>
                            <Button name="Let's Go"/>
                        </form>
                    </div>
                    <div className="nothing">
                    <VisibilitySensor partialVisibility>
                        {({isVisible}) => (
                            <Spring delay={200} to={{opacity:isVisible ? 1 : 0, transform : isVisible ? "rotate(0)" : "rotate(-40deg)"}}>
                                {props => (
                                    <div style={{...props}}>
                                        <Image cloudName="jhene" publicId="pose2_mikg5o"  />
                                    </div>
                                )}
                            </Spring>
                        )}
                </VisibilitySensor>
                    </div>
                </div>
            <Footer />
            </div>
        </div>
    )
};

export default Register;
