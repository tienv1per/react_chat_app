import React from 'react';
import "./sidebar.scss";
import Navbar from '../Navbar/Navbar';
import Search from "../Search/Search";
import Chats from "../Chats/Chats";

const Sidebar = () => {
    return (
        <div className='sidebar'>
            <Navbar/>
            <Search/>
            <Chats/>
        </div>
    )
}

export default Sidebar