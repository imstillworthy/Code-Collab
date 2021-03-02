import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Projects from './components/Projects';
import Main from './components/Main';
import Info from './components/Info';
import Editor from './components/Editor';
import './App.css';

const io = require('socket.io-client')
var ENDPOINT = "http://localhost:5000";

if(process.env.NODE_ENV==="production"){
  ENDPOINT = `https://code-collaborator.herokuapp.com`
}

const socket = io(ENDPOINT);
function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/info">
            <Info />
          </Route>
          <Route path="/editor">
            <Editor socket={socket} />
          </Route>
          <Route path="/projects">
            <Projects />
          </Route>
          <Route path="/">
            <Main />
          </Route>
        </Switch>
      </div>
    </Router>

  );
}

export default App;
