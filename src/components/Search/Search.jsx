import React, { useState } from 'react';
import "./search.scss";
import {db} from "../../firebase";
import { getDocs, collection, where, query} from "firebase/firestore";

const Search = () => {
    const [username, setUsername] = useState("");
    const [user, setUser] = useState(null);
    const [err, setErr] = useState(false);

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

    const handleSelect = () => {

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