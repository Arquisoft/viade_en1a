import React from 'react';
import {
    FriendsWrapper,
    FriendsContainer
} from './notifications.style';


export const FriendsPageContent = props => {
    

    return (
        <FriendsWrapper>
            <FriendsContainer className="card">
                <ul>
                    <p>No notifications to show</p>
                </ul>
            </FriendsContainer>
        </FriendsWrapper>
    );
}