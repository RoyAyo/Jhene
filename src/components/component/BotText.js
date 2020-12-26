import React from 'react';
import ChatLoader from "../ChatLoader";
import {useSpring, animated} from 'react-spring';
import { useDispatch,useSelector } from 'react-redux';
import {clickButton} from '../../redux/actions/messages'; 


const Button = ({option}) => {

    const messages = useSelector(state => state.message);
    const {
        requirements,
        answers,
        final_questions,
        context
    } = messages
    const dispatch = useDispatch();

    const click_Button = () => {
        dispatch(clickButton({option,requirements,answers,final_questions,context}));
    }

    const props = useSpring({position:'relative',right:'0px',from:{right:'100px'},backgroundColor:'#FFFFFF'});

    return (
        <animated.p className='bot-texts' style={props}>
            <span className='text' onClick={click_Button}>
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
                            message.with_options ? (
                                <>
                                    Select One
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
                message.with_options ? (
                    message.options.map(option => <Button option={option} />)
                ) : (
                    <></>
                )
            }
        </>
    )
}


export default BotText;