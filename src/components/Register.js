import React, { useState } from 'react'
import Header from './component/Header';
import Footer from './component/Footer';
import Input from './component/Input';
import GoogleButton from './component/GoogleButton';
import Button from './component/Button';
import VisibilitySensor from "react-visibility-sensor";
import {Spring} from 'react-spring/renderprops';
import {useGoogleLogin} from 'react-google-login';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
    Image
} from 'cloudinary-react';

import "../static/css/register.css";
import { withRouter } from 'react-router-dom';

const Register = props => {

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');

    const clientId = "159251316458-etn77jocjneod804i772mqb9b5rn60hu.apps.googleusercontent.com";

    const onSuccess = res => {
        const {email,name} = res.profileObj;
        window.localStorage.setItem('email',email);
        const data = JSON.stringify({
            email,
            name
        })
        fetch('http://localhost:8080/api/auth/register',{
            method : 'POST',
            headers :{
                'content-type' : 'application/json'
            },
            body:data
        }).then(data => data.json())
        .then(data => {
            console.log(data)
            if(data.success){
                window.localStorage.setItem('email',email);
                props.history.push('/chat');
            }else{
                throw new Error(data.msg);
            }
        }).catch(e => {
            toast.error(e.message,{
                position : toast.POSITION.TOP_RIGHT
            })
        });
    };

    const onFailure = () => {
        console.log('Unable to login')
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

    const saveEmail = () => {
        //save to the database
        const data = JSON.stringify({
            email,
            name
        });
        console.log(data);
        fetch('http://localhost:8080/api/auth/register',{
            method : 'POST',
            headers :{
                'content-type' : 'application/json'
            },
            body:data
        }).then(data => data.json())
        .then(data => {
            console.log(data)
            if(data.success){
                window.localStorage.setItem('email',email);
                props.history.push('/chat');
            }else{
                throw new Error(data.msg);
            }
        }).catch(e => {
            //shouldn't happen but alert invalid login
            // console.log(e.message);
            toast.error(e.message,{
                position : toast.POSITION.TOP_RIGHT
            })
        });
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
                        <Input  name="Email" placeholder="Type Your Email" type="email" onChange={email => setEmail(email)} />
                        <Input name="Name" placeholder="Type Your Name" type="text" onChange={name => setName(name)}/>
                        <Button name="Let's Go" onClick={saveEmail} />
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
            <ToastContainer />
        </div>
    )
};

export default withRouter(Register);
