import React from 'react';
import "./message.scss";
import Pexel from "../../img/pexels-photo-7.jpeg";
import Pexel2 from "../../img/pexels-photo-8.jpeg"

const Message = () => {
    return (
        <div className='message owner'>
            <div className='messageInfo'>
                <img src={Pexel} alt=''/>
                <span>just now</span>
            </div>
            <div className='messageContent'>
                <p>hello</p>
                <img src={Pexel2} alt=''/>
            </div>
        </div>
    )
}

export default Message