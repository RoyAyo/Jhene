import React from 'react';
import ChatLoader from "../ChatLoader";
import {useSpring, animated} from 'react-spring';
import { useDispatch,useSelector } from 'react-redux';
import {clickButton} from '../../redux/actions/messages'; 


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
                                        <span className='vendor-blocks'>
                                            <img className="vendor-logo" alt='' src={message.vendor.logo} />
                                            <span className="vendor-biz-name">{message.vendor.business_name}</span>
                                        </span>
                                        <span className='vendor-blocks'>
                                            Phone number : <span className="vendor-number">{message.vendor.phone_number}</span>
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
                                    {message.message}
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
        </>
    )
}


export default BotText;