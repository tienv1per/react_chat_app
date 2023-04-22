import React, {useContext, useState} from 'react';
import "./navbar.scss";
import Stanford from "../../img/stanford-university.webp";
import {auth} from "../../firebase";
import {signOut} from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
    const {currentUser} = useContext(AuthContext);
    const [err, setErr] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            await signOut(auth);
            navigate("/login");
        } catch (error) {
            setErr(true);
        }
    }

    return (
        <div className='navbar'>
            <span className='logo'>TheShy Chat</span>
            <div className='user'>
                <div className='userInfo'>
                    <img src={currentUser.photoURL} alt=''/>
                    <span>{currentUser.displayName}</span>
                </div>
                <button onClick={handleSubmit}>Log out</button>
            </div>
        </div>
    )
}

export default Navbar