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
                        <p className='texts'>Hello world sisi</p>
                        <p className='texts'>Hello world2</p>
                        <p className='texts'>Hello world2</p>
                        <p className='texts'>Hello world2</p>
                        <p className='texts'>Hello world2</p>
                        <p className='texts'>Hello world2</p>
                        <p className='texts'>Hello world2</p>
                        <p className='texts'>Hello world2</p>
                        <p className='texts'>Hello world2</p>
                        <p className='texts'>Hello world2</p>
                        <p className='texts'>Hello world2</p>
                        <p className='texts'>Hello world2</p>
                        <p className='texts'>Hello world2</p>
                        <p className='texts'>Hello world2</p>
                        <p className='texts'>Hello world2</p>
                        <p className='texts'>Hello world2</p>
                        <p className='texts'>Hello world2</p>
                        <p className='texts'>Hello world2</p>
                        <p className='texts'>Hello world2</p>
                        <p className='texts'>Hello world2</p>
                        <p className='texts'>Hello world2</p>
                        <p className='texts'>Hello world2</p>
                        <p className='texts'>Hello world2</p>
                        <p className='texts'>Hello world2</p>
                        <p className='texts'>Hello world2</p>
                        <p className='texts'>Hello world2</p>
                        <p className='texts'>Hello world2</p>
                        <p className='texts'>Hello world2</p>
                        <p className='texts'>Hello world2</p>
                        <p className='texts'>Hello world2</p>
                        <p className='texts'>Hello world2</p>
                        <p className='texts'>Hello world2</p>
                        <p className='texts'>Hello world2</p>
                        <p className='texts'>Hello world2</p>
                        <p className='texts'>Hello world2</p>
                        <p className='texts'>Hello world2</p>
                        <p className='texts'>Hello world2</p>
                        <p className='texts'>Hello world2</p>
                        <p className='texts'>Hello world2</p>
                        <p className='texts'>Hello world2</p>
                        <p className='texts'>Hello world2</p>
                        <p className='texts'>Hello world2</p>
                        <p className='texts'>Hello world2</p>
                        <p className='texts'>Hello world2</p>
                        <p className='texts'>Hello world2</p>
                        <p className='texts'>Hello world2</p>
                        <p className='texts'>Hello world2</p>
                        <p className='texts'>Hello world2</p>
                        <p className='texts'>Hello world2</p>
                        <p className='texts'>Hello world2</p>
                        <p className='texts'>Hello world2</p>
                        <p className='texts'>Hello world2</p>
                        <p className='texts'>Hello world2</p>
                        <p className='texts'>Hello world2</p>
                        <p className='texts'>Hello world2</p>
                        <p className='texts'>Hello world2</p>
                        <p className='texts'>Hello world2</p>
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