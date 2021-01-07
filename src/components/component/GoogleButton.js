import React from 'react';

import {
    googleIcon
} from '../../static/index';

const Styles = {
    buttonStyle : {
        width : "100%",
        background: "rgba(213, 75, 61, 0.1)",
        borderRadius: "5px",
        alignItems: "center",
        height : "60px",
        border : "1px solid transparent",
        cursor : "pointer"
    },
    imgStyle : {
        marginRight : "33.08px",
        width : "30px",
        height : "30px"
    },
    text : {
        color: "#D54B3D",
        fontWeight : "normal",
        fontSize : "16px",
        fontFamily : "DM Sans",
        position: "relative",
        verticalAlign : "top",
        top: "5px",
    }
};

const GoogleButton = () => {
    return (
        <div>
            <button style={Styles.buttonStyle}>
                <img alt="" src={googleIcon} style={Styles.imgStyle} />
                <span style={Styles.text}>
                    Login With Google
                </span>
            </button>
        </div>
    )
}

export default GoogleButton;
