import React from 'react';

import "../../static/css/inputs.css";


const Input = ({name,placeholder,type,onChange}) => {
    return (
        <>
            <p className="input-label">{name}</p>
            <input className="form-input" placeholder={placeholder} type={type} onChange={e => onChange(e.target.value)} />
        </>
    )
}

export default Input;