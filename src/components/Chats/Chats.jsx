import React from 'react';
import "../Search/search.scss";
import Pexel1 from "../../img/pexels-photo-1.jpeg";
import Pexel2 from "../../img/pexels-photo-2.webp";
import Pexel3 from "../../img/pexels-photo-3.jpeg";
import Pexel4 from "../../img/pexels-photo-4.jpeg";

const Chats = () => {
    return (
        <div className='chats'>
            <div className='userChat'>
                <img src={Pexel1} alt=''/>
                <div className='userChatInfo'>
                    <span>Jane</span>
                    <p>Hell you</p>
                </div>
            </div>
            <div className='userChat'>
                <img src={Pexel2} alt=''/>
                <div className='userChatInfo'>
                    <span>Jane</span>
                    <p>Hell you</p>
                </div>
            </div>
            <div className='userChat'>
                <img src={Pexel3} alt=''/>
                <div className='userChatInfo'>
                    <span>Jane</span>
                    <p>Hell you</p>
                </div>
            </div>
            <div className='userChat'>
                <img src={Pexel4} alt=''/>
                <div className='userChatInfo'>
                    <span>Jane</span>
                    <p>Hell you</p>
                </div>
            </div>
        </div>
    )
}

export default Chats