import React from 'react';
import "./chat.scss";
import Cam from "../../img/cam.png";
import Add from "../../img/add.png";
import More from "../../img/more.png";
import Messages from '../Messages/Messages';
import Input from "../Input/Input";

const Chat = () => {
    return (
        <div className='chat'>
            <div className='chatInfo'>
                <span>Jane</span>
                <div className='chatIcons'>
                    <img src={Cam} alt=''/>
                    <img src={Add} alt=''/>
                    <img src={More} alt=''/>
                </div>
            </div>
            <Messages/>
            <Input/>
        </div>
    )
}

export default Chat