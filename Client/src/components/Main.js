import React, { useState, useEffect } from 'react';
import { Link, useHistory } from "react-router-dom";
import Nav from "./Navbar";
import './Main.css';


const Main = () => {
    const history = useHistory()
     const char_list = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    const length = 12
    const [code, setCode] = useState("")
    const generateCode = () => {
        let text = ""
        for (let i = 0; i < length; i++) {
            text += char_list.charAt(Math.floor(Math.random() * char_list.length));
        }
        setCode(text)
    }
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"))
        console.log(user)
        if (!user) {
            history.push('/login');
        }
    }, [])
    useEffect(() => {
        if (code !== '') {
            history.push(`/editor/${code}`);
        }
    }, [code])
  

    return (
        <div>
            <Nav />
            <div className="joinOuterContainer">
                <div className="joinInnerContainer">
                    <h1 className="heading">Join</h1>
                    <button className="button mt-20" onClick={generateCode}>Join / Create</button>
                </div>
            </div>
        </div>
    );
}

export default Main
