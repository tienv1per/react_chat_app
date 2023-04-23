import React, { useContext, useEffect, useRef } from 'react';
import "./message.scss";
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';

const Message = ({message}) => {
    const {currentUser} = useContext(AuthContext);
    const {data} = useContext(ChatContext);

    const ref = useRef();

    useEffect(() => {
        ref.current?.scrollIntoView({behavior: "smooth"})
    }, [message]);

    return (
        <div className={`message ${message.senderId === currentUser.uid} && owner`} ref={ref}>
            <div className='messageInfo'>
                <img src={message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL} alt=''/>
                <span>just now</span>
            </div>
            <div className='messageContent'>
                <p>{message.text}</p>
                {message.image && <img src={message.image} alt=''/>}
            </div>
        </div>
    )
}

export default Message