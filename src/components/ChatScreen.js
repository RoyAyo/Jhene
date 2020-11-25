import React, { useState } from 'react';
import '../static/css/chatscreen.css';
import { useSelector } from 'react-redux';
import SendImg from '../static/send.png';
import BotText from './component/BotText';
import UserText from './component/UserText';

const ChatScreen = () => {
    const messages = useSelector(state => state.messages);

    return (
        <div id='chat-wrapper'>
            <div className='top-chat-screen'>
                <span>
                    Jhene
                </span>
                <button>
                    &#8942;
                </button>
            </div>
            <div className='chatApp'>
                <div className='wrap'>
                    <div className='chat-app-wrapper'>
                            {
                                messages.map((message,i) => {
                                    return message.bot ? (
                                        <BotText message={message} key={i} />
                                    ) : (
                                        <UserText message={message} key={i} />
                                    )                                    
                                })
                            }
                    </div>
                    <div className='chat-inputs'>
                        <img src={SendImg} alt='' />
                        <input type='text' placeholder='Write Something...' />
                    </div>
                </div>
            </div>
        </div>
    )
};


export default ChatScreen;