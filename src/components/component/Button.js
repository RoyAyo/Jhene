import React from 'react'

const Button = ({name,onClick}) => {
    return (
        <button style={{textAlign:"center",backgroundColor:"#3474E2",borderRadius:"5px",width:"100%",height:"45px",fontFamily:"DM SANS",color:"#fff",cursor:"pointer"}} onClick={onClick}>
            {name}
        </button>
    )
}

export default Button;
