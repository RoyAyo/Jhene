import React from 'react'
import {useSpring, animated} from 'react-spring';


const UserText = ({message}) => {
    
    const props = useSpring({position:'relative',left:'0px',from:{left:'50px'}});
    
    return (
        <animated.p className='user-texts' style={props}>
            <span className='text'>
                {message.message}
            </span>
        </animated.p>
    )
}

export default UserText;