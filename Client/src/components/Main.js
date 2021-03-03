import React, { useState,useEffect } from 'react';
import {Link,useHistory} from "react-router-dom";
import Nav from "./Navbar";
import './Main.css';


const Main = () => {
    const history=useHistory()
    useEffect(() => {
        const user=JSON.parse(localStorage.getItem("user"))
        console.log(user)
        if(!user)
        {
            history.push('/login');
        }
    }, [])

    const [name,setName]=useState('');
    const [room,setRoom]=useState('');
    return (
        <div>
            <Nav />
            <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading">Join</h1>
                <div>
                    <input placeholder="Name" className="joinInput" type="text" onChange={(e)=>{setName(e.target.value)}}/>
                </div>
                <div>
                    <input placeholder="Room" className="joinInput mt-20" type="text" onChange={(e)=>{setRoom(e.target.value)}}/>
                </div>
                <Link onClick={e=>(!name||!room)?e.preventDefault():null} to={`/editor?name=${name.trim()}&room=${room.trim()}`}>
                    <button className="button mt-20" type="submit">Join / Create</button>
                </Link>
            </div>
        </div>
        </div>
    );
}

export default Main
