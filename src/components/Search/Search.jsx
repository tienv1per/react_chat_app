import React from 'react';
import "./search.scss";
import Pexel1 from "../../img/pexels-photo-10384486.webp";

const Search = () => {
    return (
        <div className='search'>
            <div className='searchForm'>
                <input placeholder='search'/>
            </div>
            <div className='userChat'>
                <img src={Pexel1} alt=''/>
                <div className='userChatInfo'>
                    <span>Jane</span>
                </div>
            </div>
        </div>
    )
}

export default Search