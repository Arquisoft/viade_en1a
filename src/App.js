import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './Home.js';
import {LoginButton, LoggedIn} from '@solid/react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';


function App() {
  
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Route exact path="/">
              <img src={logo} className="App-logo" alt="logo" />
              <h2>React app</h2>
              <LoginButton popup="https://solid.community/common/popup.html"/>
          </Route>
          <Route path="/home" component={Home}/>
          <LoggedIn>
              <Redirect to="/home"/>    
          </LoggedIn>
        </header>
      </div>
    </Router>
  );
}

export default App;
