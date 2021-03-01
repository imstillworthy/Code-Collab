import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Projects from './components/Projects';
import Main from './components/Main';
import Info from './components/Info';
import Editor from './components/Editor';
import Login from './components/Login';
import Register from './components/Register';
import './App.css';

const io = require('socket.io-client')
const ENDPOINT = "http://localhost:5000";
const socket = io(ENDPOINT);
function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/signup">
            <Register/>
          </Route>
          <Route exact path="/login">
            <Login/>
          </Route>
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
