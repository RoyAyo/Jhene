import React from 'react';
import ChatLoader from "../ChatLoader";
import {useSpring, animated} from 'react-spring';
import { useDispatch } from 'react-redux';
import {Click_Button, Convert_Options} from '../../redux/actions/messages'; 


const Button = ({option}) => {

    const dispatch = useDispatch();

    const clickButton = () => {
        dispatch(Click_Button);
        dispatch(Convert_Options);
    }

    const props = useSpring({position:'relative',right:'0px',from:{right:'100px'},backgroundColor:'#FFFFFF'});

    return (
        <animated.p className='bot-texts' style={props}>
            <span className='text' onClick={clickButton}>
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
                    message.options.map(option => <Button option={option}/>)
                ) : (
                    <></>
                )
            }
        </>
    )
}


export default BotText;