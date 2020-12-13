import React from 'react'
import '../static/css/chatloader.css';

export default function ChatLoader() {
    return (
        <span className="spinner loading">
            <span className="bounce1 loading"></span>
            <span className="bounce2 loading"></span>
            <span className="bounce3 loading"></span>
        </span>
    )
};