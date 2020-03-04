import React from 'react';
import {LogoutButton, LoggedOut} from '@solid/react';
import {Redirect, BrowserRouter as Router} from 'react-router-dom';

function Home() {

    return (
        <Router>
            <div>
                <p>Welcome back</p>
                <LogoutButton/>
                <LoggedOut>
                <Redirect to="/"/>    
                </LoggedOut>
            </div>
        </Router>
    );
}

export default Home;