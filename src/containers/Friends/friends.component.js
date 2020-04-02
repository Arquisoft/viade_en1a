import React from 'react';
import {
    FriendsWrapper,
    FriendsContainer
} from './friends.style';
import { Friend } from './components';


export const FriendsPageContent = (props) => {
    const {friends} = props;

    return (
        <FriendsWrapper>
            <FriendsContainer className="card">
                <ul id="friendsList">
                    {
                        friends.map(
                            (friend) => (
                                <Friend friend={friend}/>
                            )
                        )
                    }
                </ul>
            </FriendsContainer>
        </FriendsWrapper>
    );
}