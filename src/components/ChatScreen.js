import React, { useRef,useEffect } from 'react';
import '../static/css/chatscreen.css';
import { useSelector, useDispatch } from 'react-redux';
import SendImg from '../static/send.png';
import BotText from './component/BotText';
import UserText from './component/UserText';
import {sendMessage } from '../redux/actions/messages';
import Div100vh from 'react-div-100vh'


const ChatScreen = () => {    
    //refs
    const userInput = useRef();
    const messagesDiv = useRef();


    //selectors....(map state to props)
    const messages = useSelector(state => state.messages);
    const message_loading = useSelector(state => state.message_loading);

    //dispatch...
    const dispatch = useDispatch();

    //component did update    
    useEffect(() => {
        const scroll = messagesDiv.current.scrollHeight;
        const height = messagesDiv.current.clientHeight;
        if(scroll > height){
            messagesDiv.current.scrollTo(0,(scroll - height));
        }
    }, [messages]);


    const handleClick = () => {
        if(message_loading || userInput.current.value === ''){
            return false;
        }
        const message = userInput.current.value;
        userInput.current.value = '';
        dispatch(sendMessage(message));

    };

    return (
        <Div100vh>
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
                    <div className='chat-app-wrapper' ref={messagesDiv}>
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
                            onKeyPress={(e) => {
                                if(e.key === 'Enter'){
                                    handleClick();
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
        </Div100vh>
    )
};


export default ChatScreen;