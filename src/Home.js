import React from 'react';
import { LoggedIn, LoggedOut, Image, Value, Link } from '@solid/react';

function Home(props) {

    //const actualName = props.name.split("//")[1].split(".")[0];

    return (
        <div>
            <LoggedIn>
                <p>Welcome back</p>
            </LoggedIn>
            <LoggedOut>
                <p>You are not logged in, and this is a members-only area!</p>
            </LoggedOut>
        </div>
    );
}

export default Home;