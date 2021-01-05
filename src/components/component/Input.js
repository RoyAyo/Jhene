import React from 'react';

import "../../static/css/inputs.css";


const Input = ({name,placeholder,type}) => {
    return (
        <>
            <p className="input-label">{name}</p>
            <input className="form-input" placeholder={placeholder} type={type}/>
        </>
    )
}

export default Input;
