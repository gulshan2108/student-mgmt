import React from 'react'
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import MainContainer from './components/MainContainer'
import CreateStudent from './components/CreateStudent';
import StudentList from './components/StudentList';

function App() {
  
  return (
    <div className="App">
      <Router>
        <Switch>
              <MainContainer>
                <Route exact path="/" component={CreateStudent} />   
                <Route exact path="/create/:id" component={CreateStudent} />
                <Route path="/list" component={StudentList} />
              </MainContainer>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
