import React, { useRef, useState } from 'react';
import BotImage from '../static/BotImage.png';
import Robot from '../static/robot 1.png';
import '../static/css/homescreen.css';

const HomeScreen = (props) => {
    return (
        <div className='App'>
            <div id='wrapper'>
                <div className='botImage'>
                    <img src={BotImage} alt='botImage'/>
                    <h3 className='introduction'>Hi there, I'm Jhene, <br></br> Let me be your assistant! </h3>
                    <button className='get-started' onClick={props.changeView}>
                        Get Started
                    </button>
                </div>
                <div className='robot-container'>
                    <img src={Robot} alt='flying-robot'  />
                </div>
            </div>
        </div>
    );
}

export default HomeScreen;