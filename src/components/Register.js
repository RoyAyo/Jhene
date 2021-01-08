import React from 'react'
import Header from './component/Header';
import Footer from './component/Footer';
import Input from './component/Input';
import GoogleButton from './component/GoogleButton';
import Button from './component/Button';
import VisibilitySensor from "react-visibility-sensor";
import {Spring} from 'react-spring/renderprops';
import {useGoogleLogin} from 'react-google-login';

import {
    Image
} from 'cloudinary-react';

import "../static/css/register.css";
import { withRouter } from 'react-router-dom';

const Register = props => {

    const clientId = "159251316458-etn77jocjneod804i772mqb9b5rn60hu.apps.googleusercontent.com";

    const onSuccess = res => {
        console.log('res',res.profileObj);
        const {email} = res.profileObj;
        window.localStorage.setItem('email',email);
        props.history.push('/chat');
    };

    const onFailure = () => {
        console.log('Unable to login')
        //still move to home
    };

    const {signIn} = useGoogleLogin({
        onSuccess,
        onFailure,
        clientId,
        isSignedIn: true,
        accessType:'offline',
        cookiePolicy:"http://localhost:3000"
    });

    const skip = e => {
        e.preventDefault();
        window.localStorage.setItem('accessed',true);
        props.history.push('/chat');
    }

    return (
        <div>
            <Header />
            <div className="wrapper">
                <h3 className="get-started">Get Started</h3>
                <div className="body">
                    <div className="form">
                        <h4>Can you give us some details to help us improve your experience?</h4>
                        <p className="or-skip">Or you can <a href="/chat" onClick={e => skip(e)}>Skip</a></p>
                        <GoogleButton onClick={signIn} />
                        <p className="or-">or</p>
                        <form>
                            <Input name="Name" placeholder="Type Your Name" type="text"/>
                            <Input  name="Email" placeholder="Type Your Email" type="email"/>
                            <Button name="Let's Go"/>
                        </form>
                    </div>
                    <div className="nothing">
                    <VisibilitySensor partialVisibility>
                        {({isVisible}) => (
                            <Spring delay={200} to={{opacity:isVisible ? 1 : 0, transform : isVisible ? "rotate(0)" : "rotate(-40deg)"}}>
                                {props => (
                                    <div style={{...props}}>
                                        <Image cloudName="jhene" publicId="lady-stand_vucuvd"  />
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

export default withRouter(Register);
