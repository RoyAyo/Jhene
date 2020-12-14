import React from 'react';
import ChatLoader from "../ChatLoader";
import {useSpring, animated} from 'react-spring';


const BotText = ({message}) => {
    return (
        <p className='bot-texts'>
            <span className='text'>
                {
                    message.loading ? (
                        <ChatLoader />
                    ) : (
                        message.message
                    )
                }    
            </span>
        </p>
    )
}


export default BotText;