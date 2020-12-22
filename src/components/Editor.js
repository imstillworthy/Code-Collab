
import React, { useState, useRef } from "react";
import Editor from "@monaco-editor/react";
import { Dropdown, Button, Alert, Badge } from 'react-bootstrap';
import Nav from "./Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
function Area() {
  const theme = "dark";
  const [isEditorReady, setIsEditorReady] = useState("false");
  const [language, setLanguage] = useState("javascript");
  const [editorData, setData] = useState()
  const valueGetter = useRef();


  function handleEditorDidMount(_valueGetter) {
    setIsEditorReady(true);
    valueGetter.current = _valueGetter;
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
    reader.onload = e => setData(e.target.result)
    e.target.style.visibility = "hidden"
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

        <input button type="file" accept=".py , .cpp , .c , .java , .js, .txt" style={{
          marginTop: "1rem", marginBottom: "2rem", marginLeft: "auto", marginRight: "auto"
        }} name="file" onChange={e => fileUpload(e)} />

        <Editor
          height="75vh"
          theme={theme}
          language={language}
          editorDidMount={handleEditorDidMount}
          value={editorData}
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