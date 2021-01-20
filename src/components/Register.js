import React, { useState } from 'react'
import Header from './component/Header';
import Footer from './component/Footer';
import Input from './component/Input';
import GoogleButton from './component/GoogleButton';
import Button from './component/Button';
import {useGoogleLogin} from 'react-google-login';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import "../static/css/register.css";
import { withRouter } from 'react-router-dom';

const Register = props => {

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [loading,setLoading] = useState("Let's go");

    const clientId = "159251316458-etn77jocjneod804i772mqb9b5rn60hu.apps.googleusercontent.com";

    const onSuccess = res => {
        const {email,name} = res.profileObj;
        window.localStorage.setItem('email',email);
        const data = JSON.stringify({
            email,
            name
        })
        fetch('https://jhene-node.herokuapp.com/api/auth/register',{
            method : 'POST',
            headers :{
                'content-type' : 'application/json'
            },
            body:data
        }).then(data => data.json())
        .then(data => {
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
        toast.error('Unauthorized by google',{
            position : toast.POSITION.TOP_RIGHT
        });
    };

    const {signIn} = useGoogleLogin({
        onSuccess,
        onFailure,
        clientId,
        isSignedIn: true,
        accessType:'offline',
        cookiePolicy:"https://jhene.co"
    });

    const skip = e => {
        e.preventDefault();
        window.localStorage.setItem('accessed',true);
        props.history.push('/chat');
    }

    const saveEmail = () => {
        //save to the database
        
        if(email === ''){
            return toast.error('Please Input your email',{
                position : toast.POSITION.TOP_RIGHT
            });
        }
        setLoading('Loading...')
        const data = JSON.stringify({
            email,
            name
        });

        fetch('https://jhene-node.herokuapp.com/api/auth/register',{
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
            });
            setLoading("Let's go");
        });
    }

    return (
        <div>
            <Header />
            <div className="reg-wrapper">
                <h3 className="get-started">Get Started</h3>
                <div className="body">
                    <div className="form">
                        <h4>Can you give us some details to help us improve your experience?</h4>
                        <p className="or-skip">Or you can <a href="/chat" onClick={e => skip(e)}>Skip</a></p>
                        <GoogleButton onClick={signIn} />
                        <p className="or-">or</p>
                        <Input  name="Email" placeholder="Type Your Email" type="email" onChange={email => setEmail(email)} />
                        <Input name="Name" placeholder="Type Your Name" type="text" onChange={name => setName(name)}/>
                        <Button name={loading} onClick={saveEmail} />
                    </div>
                    <div className="nothing">
                    </div>
                </div>
            <Footer />
            </div>
            <ToastContainer />
        </div>
    )
};

export default withRouter(Register);
