import React from 'react';
import { Button } from 'react-bootstrap';

export const ShareRoutesPageContent = props => {

    const {friends, share} = props;

    function shareRoute(friend){
        share.shareRoute(friend);
    }

    return (
        <div>
            <ul>
                {
                    friends.map(
                        friend =>(
                            <li key={friend.webId}><img className="friend-img" width="100px" src={friend.image} alt="Friend"/><a href={friend.name}> {friend.name}</a> 
                            <Button id={"btn"+friend.webId} onClick={shareRoute.bind(this, friend)} variant="primary" block>Share</Button></li>
                        )
                    )
                }
            </ul>
            <Button href="#/maps" variant="secondary" block >Cancel</Button>
        </div>
    );
    
}