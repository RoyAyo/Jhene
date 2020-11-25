import React, { useRef, useState } from 'react';
import '../static/css/chatscreen.css';
import { useSelector, useDispatch } from 'react-redux';
import SendImg from '../static/send.png';
import BotText from './component/BotText';
import UserText from './component/UserText';
import {sendMessage } from '../redux/actions/messages';


const ChatScreen = () => {
    const messages = useSelector(state => state.messages);

    const userInput = useRef();

    const dispatch = useDispatch()

    const handleClick = () => {
        userInput.current.disabled = true;
        const message = userInput.current.value;
        dispatch(sendMessage(message));
    };

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
                        <img src={SendImg} alt='' onClick={handleClick}/>
                        <input 
                            type='text' 
                            placeholder='Write Something...' 
                            ref={userInput} 
                            onKeyPress={
                                (e) => {
                                    if(e.keyCode === 13){
                                        handleClick();
                                    }
                                }
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
    )
};


export default ChatScreen;