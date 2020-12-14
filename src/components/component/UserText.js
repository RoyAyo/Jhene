import React from 'react'
import {useSpring, animated} from 'react-spring';


const UserText = ({message}) => {
    return (
        <>
            <p className='user-texts'>
                <span className='text'>
                    {message.message}
                </span>
            </p>
        </>
    )
}

export default UserText;