import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Projects from './components/Projects';
import Main from './components/Main';
import Info from './components/Info';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
         <Route path="/info">
            <Info/>
         </Route>
         <Route path="/projects">
           <Projects/>
          </Route>
          <Route path="/">
            <Main/>
          </Route>
        </Switch>
     </div>
    </Router>

  );
}

export default App;
