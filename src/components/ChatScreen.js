import React, { useState } from 'react';
import '../static/css/chatscreen.css';
import { useSelector } from 'react-redux';

const ChatScreen = () => {

    const [input, setInput] = useState();
    const messages = useSelector(state => state.send_messages);

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
                <div className='chat-app-wrapper'>
                   
                </div>
                <div className='chat-inputs'>
                <input type='text' value={input} onChange={(e) => setInput(e.target.value)}/>
                <button>
                    
                </button>
            </div>
            </div>
        </div>
    )
};


export default ChatScreen;