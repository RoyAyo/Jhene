import React, { useState } from 'react';
import '../static/css/chatscreen.css';
// import { useSelector } from 'react-redux';
import SendImg from '../static/send.png';

const ChatScreen = () => {
    // const messages = useSelector(state => state.send_messages);

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
                        <p className='bot-texts'> <span className='text'>Hello world sisi Hello world sisi Hello world sisiHello world sisiHello world sisiHello world sisiHello world sisiHello world sisi Hello world sisi Hello world sisiHello world sisiHello world sisiHello world sisi Hello world sisiHello world sisi</span></p>
                        <p className='user-texts'><span className='text'>Hello you too</span></p>
                        <p className='bot-texts'><span className='text'>I am good</span></p>
                        <p className='bot-texts'><span className='text'>How are you too</span></p>
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