import React, { useRef,useEffect,useState } from 'react';
import {Link, Redirect,withRouter} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import SendImg from '../static/send.svg';
import MicrophoneIcon from '../static/microphone.png';
import BotText from './component/BotText';
import UserText from './component/UserText';
import Screen from './component/Screen';
import { sendMessage,userWelcome } from '../redux/actions/messages';
import Div100vh from 'react-div-100vh'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

import {
    Image
} from 'cloudinary-react';

import '../static/css/chatscreen.css';


const ChatScreen = props => {

    const [loading,setLoading] = useState(true);
    const [auth,setAuth] = useState(false);
    const [displayModal, setDisplayModal] = useState('none');
    const [emailAvailable, setEmailAvailable] = useState(false);
    const [speechSupport, setSpeechSupport] = useState(false);

  const { finalTranscript } = useSpeechRecognition();

    //refs
    const userInput = useRef();
    const messagesDiv = useRef();
    const chatWrapRef = useRef();


    //selectors....(map state to props)
    const messages = useSelector(state => state.message.messages);
    const message_loading = useSelector(state => state.message.message_loading);
    const recommendations = useSelector(state => state.message.recommendations);
    
    //dispatch...
    const dispatch = useDispatch();

    // component did update messages..
    useEffect(() => {
        if(auth && !loading){
            const scroll = messagesDiv.current.scrollHeight;
            const height = messagesDiv.current.clientHeight;
            if(scroll > height){
                messagesDiv.current.scrollTo(0,(scroll - height));
            }
        }
    }, [messages,loading,auth]);

    //component did mount
    useEffect(() => {
        if (SpeechRecognition.browserSupportsSpeechRecognition()) {
            setSpeechSupport(true);
        }
        setTimeout(() => {
        const email = window.localStorage.getItem('email');
        const accessed = window.localStorage.getItem('accessed');
        if(email){
            setAuth(true);
            dispatch(userWelcome(email,true));
            setLoading(false);
            chatWrapRef.current.addEventListener('click',() => {
                setDisplayModal('none');
            });
            setEmailAvailable(true);
        }else if(accessed){
            if(accessed > 5){
                window.localStorage.setItem('accessed',1);
                props.history.push('/register');
            }
            setAuth(true);
            dispatch(userWelcome(undefined,true));
            setLoading(false);
            chatWrapRef.current.addEventListener('click',() => {
                setDisplayModal('none');
            });
        }else{
            setLoading(false);
        }
       }, 1000);
       // eslint-disable-next-line
    },[]);


    const handleClick = () => {
        if(message_loading || userInput.current.value === ''){
            return false;
        }
        const message = userInput.current.value;
        userInput.current.value = '';
        userInput.current.blur();
        dispatch(sendMessage(message,recommendations));
    };

    // finalTranscript.length > 0 ? userInput.current.value = finalTranscript : console.log(finalTranscript)
    // if(){

    // }
    if(finalTranscript.length > 0){
        userInput.current.value = finalTranscript;
    }

    return (
        <Div100vh>
            {
                loading ? (
                <Screen />
                ) : (
                    !auth ? (
                        <Redirect to='/register'/>
                    ) : (
                    <div className="full-body">
                        <div className='left-modal' style={{display : displayModal}}>
                            <h5>Weclome to Jhene</h5>
                            <Link to='/' className='modal-link'>
                                Landing Page
                            </Link>
                            <Link to='/' className='modal-link'>
                                Request Vendor Access
                            </Link>
                            {
                                !emailAvailable ? (
                                    <Link to='/register' className='modal-link'>
                                        Register
                                    </Link> 
                                ) : (
                                    <></>
                                )
                            }
                            <Link to='/' className='modal-link'>
                                Contact Us
                            </Link>
                            <hr style={{margin:'20px 0px',border:'0.5px solid #4F5665'}}></hr>
                            <p>Go to this browser's menu and click "Add to Home Screen" for ease of use.</p>
                        </div>
                        <div className="large-left-screen">
                            <div className="names">
                                <div>
                                    <Image publicId="jhene_tiny_avi_cahosa" cloudName="jhene" />
                                </div>
                                <div>
                                    <p>Jhene</p>
                                    <p>Your virtual plug</p>
                                </div>
                            </div>
                            <ul>
                                <li>
                                    <Link to="/" className="left-chat-link" >
                                        Landing Page
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/vendor-form" className="left-chat-link">
                                        Request Vendor Access
                                    </Link>
                                </li>
                                {
                                    !emailAvailable ? (
                                        <li>
                                            <Link to="/register" className="left-chat-link">
                                                Register
                                            </Link>
                                        </li>
                                    ) : (
                                        <></>
                                    )
                                }
                                <li>
                                    <Link to="https://www.gooogle.com" className="left-chat-link">
                                        Contact Us
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        {/* <div> */}
                            <div className='top-chat-screen'>
                                <div>
                                    <Image publicId="jhene_tiny_avi_cahosa" cloudName="jhene" />
                                </div>
                                <div>
                                    <p>Jhene</p>
                                    <p>Your virtual plug</p>
                                </div>
                                <div>
                                    <button onClick={() => setDisplayModal('block')}>
                                        &#8942;
                                    </button>
                                </div>
                            </div>
                            <div className='chatApp'>
                                <div className='wrap' ref={chatWrapRef}>
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
                                    <div className={speechSupport ? 'chat-inputs chat-inputs-pad':'chat-inputs'}>
                                        {speechSupport ? <img src={MicrophoneIcon} alt='' onClick={SpeechRecognition.startListening} className='microphone' /> : <></>}
                                        <img src={SendImg} alt='' onClick={handleClick} />
                                        <input 
                                            type='text' 
                                            placeholder='Type a Message...' 
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
                )
            }
        </Div100vh>
    )
};


export default withRouter(ChatScreen);