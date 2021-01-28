import React from 'react';
import ChatLoader from "../ChatLoader";
import {useSpring, animated} from 'react-spring';
import { useDispatch,useSelector } from 'react-redux';
import {clickButton} from '../../redux/actions/messages'; 
import copyImg from '../../static/copy.png';
import { toast,ToastContainer } from 'react-toastify';


const Button = ({option,answering}) => {

    const messages = useSelector(state => state.message);
    const {
        requirements,
        answers,
        questions,
        context
    } = messages
    const dispatch = useDispatch();

    const click_Button = () => {
        dispatch(clickButton({option,requirements,answers,questions,context,answering}));
    }

    const props = useSpring({position:'relative',right:'0px',from:{right:'100px'}});

    return (
        <animated.p className='bot-texts' style={props}>
            <span className='text-button' onClick={click_Button}>
                {
                    option
                }
            </span>
        </animated.p>
    )
}

const copyClickBoard = e => {
    var num = e.target.previousSibling.innerHTML;
    const elem = document.body.appendChild(document.createElement('input'));
    elem.value = num;
    elem.focus();
    elem.select();
    elem.setSelectionRange(0,99999);
    document.execCommand('copy');
    elem.parentNode.removeChild(elem);
    toast.success('Copied to ClickBoard',{
        position : toast.POSITION.TOP_RIGHT
    })
};

const BotText = ({message}) => {

    const props = useSpring({position:'relative',right:'0px',from:{right:'100px'}});

    return (
        <>
            <animated.p className='bot-texts' style={props}>
                <span className='text'>
                    {
                        message.loading ? (
                            <ChatLoader />
                        ) : (
                            message.vendor ? (
                                    <>
                                        <span className='vendor-blocks' style={{marginBottom:'0px'}}>
                                            <img className="vendor-logo" alt='' src={message.vendor.logo} />
                                            <span className="vendor-biz-name">{message.vendor.business_name}</span>
                                        </span>
                                        <span className='vendor-blocks'>
                                            Phone number : <span className="vendor-number">{message.vendor.phone_number}</span><img src={copyImg} alt=''  style={{width:'30px','height':'30px',position:'relative','top':'10px',cursor:'pointer' }} onClick={e => copyClickBoard(e)}/> 
                                        </span>
                                        <span className='vendor-blocks'>
                                            Email : <span className="vendor-email">{message.vendor.email}</span>
                                        </span>
                                        <span className='vendor-blocks'>
                                            Link : <a href={message.vendor.link} target="_blank" rel="noopener noreferrer" className='vendor-link'>{message.vendor.link}</a>
                                        </span>
                                    </>
                                ) : (
                                <>
                                    {
                                        message.recommendation ? (
                                            <>
                                                <span style={{display:'block',textAlign:'right', marginBottom:'5px',color:'',fontSize:'10px'}}>{message.recommendation.type}</span>
                                                 <span className='vendor-biz-name'>{message.recommendation.desc}</span>
                                                {
                                                    message.recommendation.type === 'Ad' ? (
                                                        <span className='vendor-blocks'>
                                                            Link : <a href={message.recommendation.link} target="_blank" rel="noopener noreferrer" className='vendor-link'>{message.recommendation.link}</a>
                                                        </span>
                                                    ) : (
                                                        <></>
                                                    )
                                                }
                                            </>
                                        ) : (
                                            <>
                                                {message.message}
                                            </>
                                        )
                                    }
                                 </>        
                            )
                        )
                    }
                </span>
            </animated.p>
            {
                message.with_option ? (
                    // console.log('we are here')
                    message.options.map((option,i) => <Button option={option} key={i} answering={message.answering}/>)
                ) : (
                    <></>
                )
            }
            <ToastContainer />
        </>
    )
}


export default BotText;