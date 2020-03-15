import React from 'react';
import { useTranslation } from 'react-i18next';

import {
    FriendsWrapper,
    FriendsContainer
} from './notifications.style';


export const FriendsPageContent = props => {
    
    const { t } = useTranslation();

    return (
        <FriendsWrapper>
            <FriendsContainer className="card">
                <ul>
                    <p>{t('notifications.noNotifications')}</p>
                </ul>
            </FriendsContainer>
        </FriendsWrapper>
    );
}