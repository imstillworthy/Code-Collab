
import React, { useState, useRef, useEffect } from "react";
import { ControlledEditor } from "@monaco-editor/react";
import { Dropdown, Button, Alert, Badge, Container } from 'react-bootstrap';
import Nav from "./Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams, useLocation, useHistory } from "react-router-dom";
import { FacebookShareButton,WhatsappShareButton,LinkedinShareButton } from "react-share";
import { FacebookIcon,WhatsappIcon,LinkedinIcon} from "react-share";

let b = false, a = false

var ENDPOINT = "http://localhost:5000"; 

if(process.env.NODE_ENV==="production"){
  ENDPOINT = `https://ie-code-collaborator.herokuapp.com`
}

function Area(props) {
  const url=window.location.href
  const location = useLocation()
  const history = useHistory()
  console.log(location+`hello`)
  const socket = props.socket
  const theme = "dark";
  const [isEditorReady, setIsEditorReady] = useState(false);
  const [language, setLanguage] = useState("javascript");
  const [editorData, setData] = useState('')
  const valueGetter = useRef();
  const [message, setMessage] = useState('')
  let { room } = useParams()



  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    console.log(user)
    if (!user) {
      history.push('/login');
    }
    console.log(window.location.href);
    socket.emit('join-room', { room })

    console.log(room);
    socket.on('initial-language', data => {
      setLanguage(data)
    })
    socket.on('initial-value', data => {
      setData(data)
    })
    fetch(`${ENDPOINT}/addroom`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem('jwt')
      },
      body: JSON.stringify({
        room
      })
    }).then(res => res.json())
      .then(data => {
      })
  }, [])

  socket.on('language-change', data => {
    setLanguage(data)
  })
  socket.on('value-change', data => {
    setData(data)
  })
  useEffect(() => {
    if (b === true)
      socket.emit('language-change', { language, room })
    else b = true
  }, [language])

  useEffect(() => {
    if (a === true)
      socket.emit('value-change', { message, room })
    else a = true
    // console.log(editorData)
  }, [message])

  function handleEditorDidMount(_valueGetter) {
    setIsEditorReady(true);
    valueGetter.current = _valueGetter;
  }


  // socket.on('language-change',data=>{
  //   setLanguage(data)
  // })
  const handleEditorChange = (event, value) => {
    // console.log(value,'hii')
    setMessage(value)
  }

  function extension(language) {
    switch (language) {
      case 'cpp':
        return 'cpp'
      case 'java':
        return 'java'
      case 'javascript':
        return 'js'
      case 'python':
        return 'py'
      case 'c':
        return 'c'
      default:
        return 'txt'
    }
  }
  

  function handleDownload() {
    const element = document.createElement("a");
    const file = new Blob([valueGetter.current()],
      { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = "myFile." + extension(language);
    document.body.appendChild(element);
    element.click();
  }

  function fileUpload(e) {
    let file = e.target.files
    let reader = new FileReader()
    reader.readAsText(file[0])
    reader.onload = e => {
      setData(e.target.result)
      setMessage(e.target.result)
    }
  }

  return (
    <div>
      <Nav />
      <div className="container" style={{ marginBottom: "1rem" }}>
        {/* <h1 style={{ textAlign: "center" }}>Main Editor</h1> */}
        <div style={{ textAlign: "center" }}>
          <Badge pill variant="warning">
            Select Language
          </Badge>{' '}
          <Dropdown style={{ justifyContent: "center", alignItems: "center" }}>
            <Dropdown.Toggle id="dropdown-basic" variant="warning" style={{
              backgroundColor: "white", marginBottom: "1rem", marginLeft: "0"
            }}>
              {language === "cpp" ? "c++" : language}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => { setLanguage("c") }}>C</Dropdown.Item>
              <Dropdown.Item onClick={() => { setLanguage("cpp") }}>C++</Dropdown.Item>
              <Dropdown.Item onClick={() => { setLanguage("java") }}>Java</Dropdown.Item>
              <Dropdown.Item onClick={() => { setLanguage("javascript") }}>Javascript</Dropdown.Item>
              <Dropdown.Item onClick={() => { setLanguage("python") }}>Python</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <Alert variant='dark' style={{ fontSize: "75%", textAlign: "center" }}>You can either choose to upload a file and
        then work on it or directly start coding in the editor below!</Alert>
        <Container>
            <FacebookShareButton
              url={url}
            >
              <FacebookIcon logoFillColour="white" round={true}></FacebookIcon>
            </FacebookShareButton>
            <WhatsappShareButton
              url={url}
            >
              <WhatsappIcon logoFillColour="white" round={true}></WhatsappIcon>
            </WhatsappShareButton>
            <LinkedinShareButton
              url={url}
            >
              <LinkedinIcon logoFillColour="white" round={true}></LinkedinIcon>
            </LinkedinShareButton>
        </Container>

        <input button type="file" accept=".py , .cpp , .c , .java , .js, .txt" style={{
          marginTop: "1rem", marginBottom: "2rem", marginLeft: "auto", marginRight: "auto"
        }} name="file" onChange={e => fileUpload(e)} />

        <ControlledEditor 
          height="75vh"
          theme="dark"
          language={language}
          editorDidMount={handleEditorDidMount}
          value={editorData}
          onChange={handleEditorChange}
          options={{
            lineNumbers: "on",
            automaticLayout: "true",
          }} />

        <Button block variant="info" onClick={handleDownload} style={{ marginTop: "1rem", color: "white" }}>Download File</Button>
      </div>

    </div>

  );
}


export default Area;