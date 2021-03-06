import React, { useState, useEffect } from 'react';
import { Link, useHistory } from "react-router-dom";
import { Col, Row, Card } from 'react-bootstrap';
import Nav from "./Navbar";
import './Main.css';

var ENDPOINT = "http://localhost:5000";

if (process.env.NODE_ENV === "production") {
    ENDPOINT = `https://ie-code-collaborator.herokuapp.com`
}

const Main = () => {
    const history = useHistory()
    const char_list = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    const length = 12
    const [code, setCode] = useState("")
    const [myrooms, setmyRooms] = useState([])
    const generateCode = () => {
        let text = ""
        for (let i = 0; i < length; i++) {
            text += char_list.charAt(Math.floor(Math.random() * char_list.length));
        }
        setCode(text)
    }
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"))
        //console.log(user)
        if (!user) {
            history.push('/login');
        }
        else {
            fetch(`${ENDPOINT}/getrooms`, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem('jwt')
                }
            }).then(res => res.json())
                .then((result) => {
                    let arry = result.rooms
                    //console.log(arry)
                    setmyRooms(arry)
                    // console.log(myrooms)
                })
        }
    }, [])
    useEffect(() => {
        if (code !== '') {
            history.push(`/editor/${code}`);
        }
    }, [code])

    console.log(myrooms)
    return (
        <div>
            <Nav />
            <div className="joinOuterContainer">
                <div className="joinInnerContainer">
                    <h1 className="heading">Join</h1>
                    <button className="button mt-20" onClick={generateCode}>Create A New Room</button>
                </div>
                {
                    myrooms.length > 0 && (<div>
                        <h2 className="history">Your Previous Rooms</h2>
                        <Row lg={{ span: 3, offset: 1 }} >
                            {myrooms.map((item, index) => {
                                return (
                                    <Col>
                                        <Card class="myrooms" style={{ width: "100%" }}>
                                            <h5 className="card-header">Room {index}</h5>
                                            <div class="card-body">
                                                <h5 className="card-title">
                                                    <Link to={`/editor/${item}`}>{ENDPOINT}/editor/{item}</Link>
                                                </h5>
                                            </div>
                                        </Card>
                                    </Col>
                                );
                            })}
                        </Row>
                    </div>)
                }

            </div>
        </div>
    );
}

export default Main
