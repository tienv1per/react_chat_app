import React, { useContext, useState } from 'react';
import "./search.scss";
import {db} from "../../firebase";
import { getDocs, getDoc, collection, where, query, setDoc, doc, updateDoc, serverTimestamp} from "firebase/firestore";
import { AuthContext } from '../../context/AuthContext';

const Search = () => {
    const [username, setUsername] = useState("");
    const [user, setUser] = useState(null);
    const [err, setErr] = useState(false);

    const {currentUser} = useContext(AuthContext);

    const handleSearch = async() => {
        const userRef = collection(db, "users");
        const q = query(userRef, where("displayName", "==", username));

        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setUser(doc.data());
            })
        } catch (error) {
            setErr(true);
        }

    }

    const handleEnter = (e) => {
        if(e.code === "Enter") {
            handleSearch();
        }
    }

    const handleSelect = async() => {
        const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;
        try {
            const res = await getDoc(doc(db, "chats", combinedId));
            if(!res.exists()) {
                // create a chat in collection
                await setDoc(doc(db, "chats", combinedId), {
                    messages: [],
                });

                // create userchats
                const userChatsRef = doc(db, "userChats", currentUser.uid);
                await updateDoc(userChatsRef, {
                    [combinedId+".userInfo"]: {
                        uid: user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL,
                    },
                    [combinedId+".date"]: serverTimestamp(),
                });

                const currentUserChatsRef = doc(db, "userChats", user.uid);
                await updateDoc(currentUserChatsRef, {
                    [combinedId+".userInfo"]: {
                        uid: currentUser.uid,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL,
                    },
                    [combinedId+".date"]: serverTimestamp(),
                });
            }
        } catch (error) {
            console.log(error.message);
        }
        setUser(null);
        setUsername("");
    }

    return (
        <div className='search'>
            <div className='searchForm'>
                <input 
                    placeholder='search' 
                    value={username}
                    onKeyDown={handleEnter}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            {err && <span>User not found</span>}
            {user && <div className='userChat' onClick={handleSelect}>
                <img src={user.photoURL} alt=''/>
                <div className='userChatInfo'>
                    <span>{user.displayName}</span>
                </div>
            </div>}
        </div>
    )
}

export default Search