import React from 'react';
import ChatLoader from "../ChatLoader";
import {useSpring, animated} from 'react-spring';


const BotText = ({message}) => {

    const props = useSpring({position:'relative',right:'0px',from:{right:'100px'}});

    return (
        <animated.p className='bot-texts' style={props}>
            <span className='text'>
                {
                    message.loading ? (
                        <ChatLoader />
                    ) : (
                        message.message
                    )
                }    
            </span>
        </animated.p>
    )
}


export default BotText;