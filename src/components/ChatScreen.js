import React from 'react';
import '../static/css/chatscreen.css';
import {connect} from 'react-redux';

const ChatScreen = () => {
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
            </div>
        </div>
    )
};

const MapStateToProps = state => {
    return {
        message : state.messages
    }
};

const MapDispatchToProps = dispatch => {
    return {
        sendMessage : () => {
            dispatch(sendMessage);
        }
    }
};

export default connect(MapStateToProps,MapDispatchToProps)(ChatScreen);