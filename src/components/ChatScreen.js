import React, { useRef,useEffect,useState } from 'react';
import {Link, Redirect,withRouter} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import SendImg from '../static/send.svg';
import MicrophoneIcon from '../static/microphone.png';
import BotText from './component/BotText';
import UserText from './component/UserText';
import Screen from './component/Screen';
import { sendMessage,initialiseMessage,displayBotMessage,displayBotRecommendation } from '../redux/actions/messages';
import Div100vh from 'react-div-100vh'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

import {
    Image
} from 'cloudinary-react';

import '../static/css/chatscreen.css';

//code needs mad ass restructuring but then later


const ChatScreen = props => {

    const [loading,setLoading] = useState(true);
    const [auth,setAuth] = useState(false);
    const [displayModal, setDisplayModal] = useState('none');
    const [emailAvailable, setEmailAvailable] = useState(false);
    const [speechSupport, setSpeechSupport] = useState(false);

  const { finalTranscript,resetTranscript } = useSpeechRecognition();

    //refs
    const userInput = useRef();
    const messagesDiv = useRef();
    const chatWrapRef = useRef();


    //selectors....(map state to props)
    const messages = useSelector(state => state.message.messages);
    const message_loading = useSelector(state => state.message.message_loading);
    const ads = useSelector(state => state.message.ads);
    const tips = useSelector(state => state.message.tips);
    
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

    const userwelcome = (email) => {
        dispatch(initialiseMessage());
        var data = email ? JSON.stringify({email}) : JSON.stringify({email : ''});
        
        fetch(`https://jhene-node.herokuapp.com/api/recommend/getAd`,{
            method : "POST",
            body:data,
            headers : {
                'content-type' : 'application/json'
            }
        }).then(data => data.json())
        .then(data => {
            if(data.success){
                const name = email ? data.name.split(' ')[0] : 'there';
                const message = `Hi ${name}, how can I help you today?`;
                const context = '';
                const vendor = false;
                const payload = {
                    message,
                    context,
                    vendor
                };
                dispatch(displayBotMessage(payload));
                setLoading(false);
                chatWrapRef.current.addEventListener('click',() => {
                    setDisplayModal('none');
                });
                if(data.ads.length > 0 || data.tips.length > 0){
                    //pick a random choice out of four
                    const choice = ['tip','ad','tip','none','ad','none','ad','tip'];
                    var n = Math.floor(Math.random() * 8);
                    if(choice[n] !== 'none'){
                        if(choice[n] === 'ad' && data.ads.length === 0){
                            return
                        }
                        if(choice[n] === 'tip' && data.tips.length === 0){
                            return
                        }
                        dispatch(initialiseMessage());
                        const recommendation = choice[n] === 'ad' ? data.ads[0] : data.tips[0];
                        const ads = choice[n] === 'ad' ? data.ads.slice(1) : data.ads;
                        const tips = choice[n] === 'ad' ? data.tips :  data.tips.slice(1);
                        const payload = {
                            recommendation,
                            ads,
                            tips
                        };
                        dispatch(displayBotRecommendation(payload));
                    }
                }
            }else{
                const data = {message : 'Hola, how can I help you?'}
                dispatch(displayBotMessage(data));
                setLoading(false);
                chatWrapRef.current.addEventListener('click',() => {
                    setDisplayModal('none');
                });
            }
        }).catch(e => {
            const data = {message : 'Hi there, How can I be of help'}
            dispatch(displayBotMessage(data));
            setLoading(false);
            chatWrapRef.current.addEventListener('click',() => {
                setDisplayModal('none');
            });
        });
    }

    //component did mount
    useEffect(() => {
        if (SpeechRecognition.browserSupportsSpeechRecognition() && navigator.onLine) {
            setSpeechSupport(true);
        }
        const email = window.localStorage.getItem('email');
        const accessed = window.localStorage.getItem('accessed');
        if(email){
            setAuth(true);
            userwelcome(email);
            setEmailAvailable(true);
        }else if(accessed){
            if(accessed > 5){
                window.localStorage.setItem('accessed',1);
                props.history.push('/register');
            }
            setAuth(true);
            userwelcome(null);
        }else{
            setLoading(false);
        }
       // eslint-disable-next-line
    },[]);


    
    const handleClick = () => {
        if(message_loading || userInput.current.value === ''){
            return false;
        }
        const message = userInput.current.value;
        userInput.current.value = '';
        userInput.current.blur();
        resetTranscript();
        //make a search for the keyword around
        const location_keyword = 'around';
        const location_keyword2 = 'close';
        var message_arr = message.toLowerCase().split(" ");
        var check_loc_index = message_arr.indexOf(location_keyword);
        var check_loc2_index = message_arr.indexOf(location_keyword2);
        if(check_loc_index !== -1){
            //keyword directly beside it
            const next_word = message_arr[check_loc_index + 1];
            if(next_word === 'me' || next_word === 'here' || next_word === undefined){
                if(navigator.geolocation){
                    if(!navigator.geolocation.getCurrentPosition(position => console.log(position))){
                        var splice_by = next_word === undefined ? 1 : 2;
                        message_arr.splice(check_loc_index,splice_by);
                        return dispatch(sendMessage(message,ads,tips,'',message_arr.join(' ')));
                    }
                    navigator.geolocation.getCurrentPosition(position => {
                        console.log(1);
                        //convert lattitude and longetiude to loction
                        fetch(`https://api.opencagedata.com/geocode/v1/json?q=${position.coords.latitude}+${position.coords.longitude}&key=ab66adc894e64e35b7c3c55b7e92b091`)
                        .then(data => {
                            if(data.ok){
                                return data.json();
                            }else{
                                throw new Error('error getting location')
                            }
                        })
                        .then(data => {
                            var splice_by = next_word === undefined ? 1 : 2;
                            message_arr.splice(check_loc_index,splice_by);
                            const location = data.results[0].formatted;
                            dispatch(sendMessage(message,ads,tips,location,message_arr.join(' ')));
                        })
                        .catch(e => {
                            var splice_by = next_word === undefined ? 1 : 2;
                            message_arr.splice(check_loc_index,splice_by);
                            dispatch(sendMessage(message,ads,tips,'',message_arr.join(' ')));
                        });
                    });
                }else{
                    message_arr.splice(check_loc_index,2);
                    dispatch(sendMessage(message,ads,tips));
                }
            }else{
                message_arr.splice(check_loc_index,2);
                dispatch(sendMessage(message,ads,tips,next_word,message_arr.join(' ')));
            }
        }
        else if(check_loc2_index !== -1){
            const next_word = message_arr[check_loc2_index + 1];
            if(next_word === 'to'){
                const supposed_location = message_arr[check_loc2_index + 2];
                message_arr.splice(check_loc2_index,3);
                dispatch(sendMessage(message,ads,tips,supposed_location,message_arr.join(' ')));                  
            }
            else{
                if(navigator.geolocation){
                    if(!navigator.geolocation.getCurrentPosition(position => console.log(position))){
                        message_arr.splice(check_loc2_index,1);
                        return dispatch(sendMessage(message,ads,tips,'',message_arr.join(' ')));
                    }
                    navigator.geolocation.getCurrentPosition(position => {
                        //convert lattitude and longetiude to loction
                        fetch(`https://api.opencagedata.com/geocode/v1/json?q=${position.coords.latitude}+${position.coords.longitude}&key=ab66adc894e64e35b7c3c55b7e92b091`)
                        .then(data => {
                            if(data.ok){
                                return data.json();
                            }else{
                                throw new Error('error getting location')
                            }
                        })
                        .then(data => {
                            const location = data.results[0].formatted;
                            message_arr.splice(check_loc2_index,1);
                            dispatch(sendMessage(message,ads,tips,location,message_arr.join(' ')));
                        })
                        .catch(e => {
                            message_arr.splice(check_loc2_index,1);
                            dispatch(sendMessage(message,ads,tips,'',message_arr.join(' ')));
                        });
                    });
                }else{
                    message_arr.splice(check_loc_index,2);
                    dispatch(sendMessage(message,ads,tips,'',message_arr.join(' ')));
                }
            }
        }
        else{
            dispatch(sendMessage(message,ads,tips));
        }
    };

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