import React, { useEffect, useRef, useState } from 'react'
import { Button, FormControl, InputGroup } from 'react-bootstrap'

const user = JSON.parse(localStorage.getItem("user"))

const Chatbox = ({ socket, toggleChatbox, isChatboxOpen }) => {

    const [loaded, setLoaded] = useState(true)
    const [messages, setMessages] = useState([])

    const [message, setMessage] = useState("")

    const messagesEndRef = useRef(null)

    useEffect(() => {
        socket.on("create-message", data => {
            setLoaded(false)
            const temp_messages = messages;
            temp_messages.push({
                user: data.user,
                message: data.message
            })
            setMessages(temp_messages);
            setLoaded(true)
            scrollToBottom();
        })
    }, [])

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    }

    const handleSend = () => {
        if (message !== "") {
            socket.emit('message', {
                user: user.name,
                message: message
            });
            setMessage("")
        }
    }

    return (
        <div>
            <div className="chat_window bg-light" style={{ display: isChatboxOpen ? "block" : "none" }}>
                <div className="chat_header bg-dark text-center text-white">
                    <h3>Chat</h3>
                </div>
                <div className="chat_message_window p-3">
                    {loaded ?
                        <div className="messages">
                            {messages.map((item, index) => {
                                return (
                                    <div className="message">
                                        <div><strong>{item.user}</strong></div>
                                        <div>{item.message}</div>
                                    </div>
                                )
                            })}
                            <div ref={messagesEndRef} />
                        </div>
                        :
                        <div></div>
                    }

                </div>
                <div className="chat_input_container">
                    <InputGroup>
                        <FormControl
                            placeholder="Send a message to everyone"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <InputGroup.Append>
                            <Button onClick={handleSend} variant="dark">Send</Button>
                        </InputGroup.Append>
                    </InputGroup>
                    {/* <input id="chat_message" type="text" placeholder="Send a message to everyone" value={message} onChange={(e)=>setMessage(e.target.value)}/>
                    <Button onClick={handleSend} variant="dark">Send</Button> */}
                </div>
            </div>
            <div>
                <Button onClick={toggleChatbox} className="btn-chatBox" variant="success">Chat</Button>
            </div>
            {/* onClick={this.props.toggleChatbot} */}
        </div>
    )
}

export default Chatbox
