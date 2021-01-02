import React from 'react';
import Div100vh from 'react-div-100vh';
import {useGoogleLogin} from 'react-google-login';

import { refreshTokenSetup } from "../utils/RefreshToken";

//import static files
import '../static/css/loginscreen.css';
import botStand from '../static/lady-stand.svg';
import vec1 from '../static/vec1.svg';
import vec2 from '../static/vec2.svg';
import Button from './component/Button';

const LoginScreen = () => {
    const clientId = "159251316458-etn77jocjneod804i772mqb9b5rn60hu.apps.googleusercontent.com";
    
    const skip = () => {
        //move to home
    };

    const onSuccess = res => {
        console.log('res',res.profileObj);
        refreshTokenSetup(res);
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

    return (
        <Div100vh>
            <div id="wrapper">
                <p className="skip" onClick={skip}>Skip</p>
                <div className="screen-images">
                    <div className="stand">
                        <img src={botStand} alt="Lady standing"/>
                    </div>
                    <div className="jhene-desc">
                        <p>
                            <img src={vec1} alt="vector" className="vector"/>
                        </p>
                        <p>
                            <img src={vec2} alt="vector" className="vector vector2"/>
                        </p>
                        <p>Hey there<span style={{color:"#E5E5E5"}}>!</span></p>
                        <p>I’m <b>Jhene</b>, and I can help you get to any Vendor.</p> 
                    </div>
                </div>
                <div className="reg-form">
                    <Button name="Login with Google" onClick={signIn}/>
                </div>
            </div>
        </Div100vh>
    );
}

export default LoginScreen;