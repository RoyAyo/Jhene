import React, { useRef,useEffect } from 'react';
import '../static/css/chatscreen.css';
import { useSelector, useDispatch } from 'react-redux';
import SendImg from '../static/send.png';
import BotText from './component/BotText';
import UserText from './component/UserText';
import {sendMessage } from '../redux/actions/messages';


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
        console.log(messagesDiv.current.offsetHeight);
        console.log(messagesDiv.current.clientHeight);
        messagesDiv.current.scrollIntoView(false);
    }, [messages]);


    const handleClick = () => {
        // if(message_loading || userInput.current.value === ''){
        //     return false;
        // }
        const message = userInput.current.value;
        userInput.current.value = '';
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
        </div>
    )
};


export default ChatScreen;