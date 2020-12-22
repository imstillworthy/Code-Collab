
import React, { useState, useRef } from "react";
import Editor from "@monaco-editor/react";
import { Dropdown, ButtonGroup, Button } from 'react-bootstrap';
import Nav from "./Navbar";

function Area() {
  const theme = "dark";
  const [isEditorReady, setIsEditorReady] = useState("false");
  const [language, setLanguage] = useState("javascript");
  const valueGetter = useRef();


  function handleEditorDidMount(_valueGetter) {
    setIsEditorReady(true);
    valueGetter.current = _valueGetter;
  }

  function extension(language){
    switch(language){
      case 'cpp':
        return 'cpp'
      case 'java' :
        return 'java'
      case 'javascript' :
        return 'js'
      case 'python' :
        return 'py'
      case 'c' :
        return 'c'
      default :
        return 'txt'
    }
  }

  function handleDownload(){
    const element = document.createElement("a");
    const file = new Blob([valueGetter.current()],    
                {type: 'text/plain;charset=utf-8'});
    element.href = URL.createObjectURL(file);
    element.download = "myFile."+extension(language);
    document.body.appendChild(element);
    element.click();
  }
  return (
    <div>
      <Nav />
      <div className="container" style={{ marginBottom: "1rem"}}>
        <h1 style={{ textAlign: "center" }}>Main Editor</h1>
        <Dropdown>
          <Dropdown.Toggle id="dropdown-basic" variant="warning" style={{ backgroundColor: "white", marginBottom: "1rem", marginLeft: "0" }}>
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

        <Editor
          height="75vh"
          theme={theme}
          language={language}
          editorDidMount={handleEditorDidMount}
          options={{ lineNumbers: "on",
          automaticLayout: "true",
          }} />

        <Button variant="Primary" onClick={handleDownload} style={{ marginTop: "1rem", backgroundColor: "blue", color: "white" }}>Download File</Button>
        <Button varaint="Primary" style={{ marginTop: "1rem", marginLeft: "1rem", backgroundColor: "black" }}>Open File</Button>
      </div>

    </div>

  );
}


export default Area;