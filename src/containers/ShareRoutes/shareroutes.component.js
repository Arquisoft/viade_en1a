import React from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from "react-i18next";

export const ShareRoutesPageContent = props => {

    const {friends, share} = props;
    const { t } = useTranslation();

    function shareRoute(friend){
        share.shareRoute(friend);
    }

    return (
        <div>
            <ul>
                {
                    friends.map(
                        friend =>(
                            <li key={friend.webId}><img width="100px" src={friend.image} alt="Friend"/><a href={friend.name}> {friend.name}</a> 
                            <Button id={"btn"+friend.webId} onClick={shareRoute.bind(this, friend)} variant="primary" block>{t("routes.share")}</Button></li>
                        )
                    )
                }
            </ul>
            <Button variant="secondary" block >{t("routes.cancel")}</Button>
        </div>
    );
    
}