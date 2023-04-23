import React, { useContext, useEffect, useState } from 'react';
import "../Search/search.scss";
import Pexel1 from "../../img/pexels-photo-1.jpeg";
import Pexel2 from "../../img/pexels-photo-2.webp";
import Pexel3 from "../../img/pexels-photo-3.jpeg";
import Pexel4 from "../../img/pexels-photo-4.jpeg";
import { db } from '../../firebase';
import { onSnapshot, doc } from 'firebase/firestore';
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';

const Chats = () => {
    const [chats, setChats] = useState([]);
    const {currentUser} = useContext(AuthContext);
    const {dispatch} = useContext(ChatContext);

    const handleSelect = (user) => {
        dispatch({type: "CHANGE_USER", payload: user});

    }

    useEffect(() => {
        const getChats = () => {
            const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
                setChats(doc.data());
            })
    
            return () => {
                unsub();
            }
        }
        currentUser.uid && getChats();
    }, [currentUser.uid]);
    console.log(chats);

    return (
        <div className='chats'>
            {Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date).map((chat) => {
                // console.log(chat[1]);
                return (
                    <div>
                        {chat[1].userInfo && <div className='userChat' key={chat[0]} onClick={() => handleSelect(chat[1].userInfo)}>
                        <img src={chat[1].userInfo.photoURL} alt=''/>
                            <div className='userChatInfo'>
                                <span>{chat[1].userInfo.displayName}</span>
                                <p>{chat[1].lastMessage?.text}</p>
                            </div>
                        </div>}
                    </div>
                   
                )
            })}
        </div>
    )
}

export default Chats