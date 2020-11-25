import React from 'react'

const UserText = message => {
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