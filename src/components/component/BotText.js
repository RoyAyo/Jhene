import React from 'react';
import BotTextWithButtons from './BotTextWithButtons';
import ChatLoader from "../ChatLoader";


const BotText = message => {
    return (
        <>
            {
                message.more_context ? (
                    <BotTextWithButtons />
                ) : (
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
        </>
    )
}


export default BotText;