import React from 'react';
import { useTranslation } from 'react-i18next';

import {
    FriendsWrapper,
    FriendsContainer
} from './notifications.style';


export const NotificationsPageContent = (props) => {

    const { t } = useTranslation();
    const notifications = props.notifications;
    const getNotificationsFromInbox = props.getNotificationsFromInbox;
    console.log(notifications);

    return (
        <div className="card">
            <h3>Notificaciones</h3>

            <ul>
                <li>Holi</li>
            </ul>
        </div>
    );
}