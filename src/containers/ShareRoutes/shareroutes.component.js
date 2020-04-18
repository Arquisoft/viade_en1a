import React from "react";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";

export const ShareRoutesPageContent = (props) => {

    const {friends, share} = props;
    const { t } = useTranslation();

    function shareRoute(friend){
        share.shareRoute(friend);
    }

    return (
        <div>
            <table>
                {
                    friends.map(
                        (friend) => (

                            <tr key={friend.webId}>
                                <td><img className="friend-img" width="100px" src={friend.image} alt="Friend"/></td>
                                <td><a href={friend.name}> {friend.name}</a></td>
                                <td><Button class= "shareClass" id={"btn"+friend.webId} onClick={shareRoute.bind(this, friend)} variant="primary" block>
                                    {t("routes.share")}
                                </Button></td>
                            </tr>
                        )
                    )
                }
            </table>
            <Button href="#/maps" variant="secondary" block >{t("routes.cancel")}</Button>
        </div>
    );
    
};