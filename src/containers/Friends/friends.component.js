import React from 'react';
import { Uploader } from '@inrupt/solid-react-components';
import { Trans, useTranslation } from 'react-i18next';
import {
    FriendsWrapper,
    FriendsContainer
} from './friends.style';
import { Friend } from './components';


export const FriendsPageContent = props => {
    const { webId, friends } = props;
    const { t } = useTranslation();
    const limit = 2100000;

    return (
        <FriendsWrapper>
            <FriendsContainer className="card">
                <ul>
                    {
                        friends.map(
                            friend =>(
                                <Friend friend={friend}/>
                            )
                        )
                    }
                </ul>
            </FriendsContainer>
        </FriendsWrapper>
    );
}