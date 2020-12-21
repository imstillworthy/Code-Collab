
import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import {Dropdown,ButtonGroup,Button} from 'react-bootstrap';

function Area() {
  const theme="dark";
  const [isEditorReady,setIsEditorReady]=useState("false");
  const [language, setLanguage] = useState("javascript");

  function handleEditorDidMount() {
    setIsEditorReady(true);
  }
  return (
    <div className="container">
    <h1 style={{textAlign:"center"}}>Main Editor</h1>
    <Dropdown>
    <Dropdown.Toggle id="dropdown-basic" variant="warning" style={{backgroundColor:"white", marginBottom:"1rem" ,marginLeft:"0"}}>
      {language==="cpp"?"c++":language}
    </Dropdown.Toggle>
    <Dropdown.Menu>
      <Dropdown.Item onClick={()=>{setLanguage("c")}}>C</Dropdown.Item>
      <Dropdown.Item onClick={()=>{setLanguage("cpp")}}>C++</Dropdown.Item>
      <Dropdown.Item onClick={()=>{setLanguage("java")}}>Java</Dropdown.Item>
      <Dropdown.Item onClick={()=>{setLanguage("javascript")}}>Javascript</Dropdown.Item>
      <Dropdown.Item onClick={()=>{setLanguage("python")}}>Python</Dropdown.Item>

    </Dropdown.Menu>
    </Dropdown>
        <Editor
        height="75vh" 
        theme={theme}
        language={language}
        editorDidMount={handleEditorDidMount}
        options={{ lineNumbers: "on" ,automaticLayout:"true"}}/>
      <Button variant="Primary" style={{marginTop:"1rem", backgroundColor:"blue"}}>Download File</Button>
      <Button varaint="Primary" style={{marginTop:"1rem", marginLeft:"1rem", backgroundColor:"black"}}>Open File</Button>

     </div>
     
  );
}


export default Area;