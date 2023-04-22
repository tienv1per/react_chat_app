import React from 'react';
import "./navbar.scss";
import Stanford from "../../img/stanford-university.webp"

const Navbar = () => {
    return (
        <div className='navbar'>
            <span className='logo'>TheShy Chat</span>
            <div className='user'>
                <div className='userInfo'>
                    <img src={Stanford} alt=''/>
                    <span>Shy</span>
                </div>
                <button>Log out</button>
            </div>
        </div>
    )
}

export default Navbar