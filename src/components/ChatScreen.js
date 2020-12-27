import React, { useRef,useEffect,useState } from 'react';
import '../static/css/chatscreen.css';
import { useSelector, useDispatch } from 'react-redux';
import SendImg from '../static/send.png';
import BotText from './component/BotText';
import UserText from './component/UserText';
import Screen from './component/Screen';
import {sendMessage } from '../redux/actions/messages';
import {initializeUser} from '../redux/actions/users';
import jheneImg from '../static/jhene.png'; 
import Div100vh from 'react-div-100vh'



const ChatScreen = () => {

    const [loading,setLoading] = useState(true);

    //refs
    const userInput = useRef();
    const messagesDiv = useRef();


    //selectors....(map state to props)
    const messages = useSelector(state => state.message.messages);
    const message_loading = useSelector(state => state.message.message_loading);

    //dispatch...
    const dispatch = useDispatch();

    // component did update messages..
    useEffect(() => {
        if(!loading){
            const scroll = messagesDiv.current.scrollHeight;
            const height = messagesDiv.current.clientHeight;
            if(scroll > height){
                messagesDiv.current.scrollTo(0,(scroll - height));
            }
        }
    }, [messages,loading]);

    //component did mount
    useEffect(() => {
       fetch(`http://52.86.178.184`).then(data => {
           console.log(data)
           if(data.ok){
               return data.json()
           }
           throw new Error('unable to can')
       })
       .then(data => {
           dispatch(initializeUser(data));
           setLoading(false);
       })
       .catch(e => {
           console.log(e);
           setLoading(false);
       });
       // eslint-disable-next-line
    },[]);


    const handleClick = () => {
        if(message_loading || userInput.current.value === ''){
            return false;
        }
        const message = userInput.current.value;
        userInput.current.value = '';
        userInput.current.blur();
        dispatch(sendMessage(message));
    };

    return (
        <Div100vh>
            {
                loading ? (
                <Screen />
                ) : (
                    <>
                        <div className='top-chat-screen'>
                            <div>
                                <img src={jheneImg} alt='' />
                            </div>
                            <div>
                                <p>Jhene</p>
                                <p>Your virtual plug</p>
                            </div>
                            <div>
                                <button>
                                    &#8942;
                                </button>
                            </div>
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
                    </>                       
                )
            }
        </Div100vh>
    )
};


export default ChatScreen;