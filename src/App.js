import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './Home.js';
import {LoginButton, LogoutButton, 
AuthButton, LoggedIn, LoggedOut} from '@solid/react';
import { useWebId } from '@solid/react';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <LoginButton popup="https://solid.community/common/popup.html" />
        <LogoutButton>Log me out</LogoutButton>
        <AuthButton popup="https://solid.community/common/popup.html" login="Login here!" logout="Log me out" /> 
        <Home/>
      </header>
    </div>
  );
}



export default App;
