import React, { useContext, useState } from 'react';
import "./input.scss";
import Img from "../../img/img.png";
import Attach from "../../img/attach.png";
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';
import { updateDoc, doc, arrayUnion, Timestamp, serverTimestamp } from 'firebase/firestore';
import { db, storage } from '../../firebase';
import {v4 as uuid} from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

const Input = () => {
    const [text, setText] = useState("");
    const [image, setImage] = useState(null);

    const {currentUser} = useContext(AuthContext);
    const {data} = useContext(ChatContext);

    const handleSend = async() => {
        if(image) {
            const storageRef = ref(storage, uuid());
            await uploadBytesResumable(storageRef, image);

            getDownloadURL(storageRef).then(async(downloadURL) => {
                await updateDoc(doc(db, "chats", data.chatId), {
                    messages: arrayUnion({
                        id: uuid(),
                        text,
                        senderId: currentUser.uid,
                        date: Timestamp.now(),
                        image: downloadURL,
                    }),
                })
            });
        }
        else {
            await updateDoc(doc(db, "chats", data.chatId), {
                messages: arrayUnion({
                    id: uuid(),
                    text,
                    senderId: currentUser.uid,
                    date: Timestamp.now(),
                }),
            })
        }

        await updateDoc(doc(db, "userChats", currentUser.uid), {
            [data.chatId + ".lastMessage"]: {
                text: text,
            },
            [data.chatId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", data.user.uid), {
            [data.chatId + ".lastMessage"]: {
                text: text,
            },
            [data.chatId + ".date"]: serverTimestamp(),
        });

        setText("");
        setImage(null);
    }

    const handleEnter = (e) => {
        if(e.code === "Enter") {
            handleSend();
        }
    }

    return (
        <div className='input'>
            <input 
                placeholder='type something'
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleEnter}
            />
            <div className='send'>
                <img src={Attach} alt=''/>
                <input 
                    type='file' 
                    style={{display: "none"}} 
                    id='file' 
                    onChange={(e) => setImage(e.target.files[0])}
                />
                <label htmlFor='file'>
                    <img src={Img} alt=''/>
                </label>
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
    )
}

export default Input