import React from "react";
import { useTranslation } from "react-i18next";

export const Friend = (props) => {
    const { friend } = props;
    const { t } = useTranslation();

    return (
        <li id={friend.name} key={friend.webId}><img className="friend-img" width="100px" src={friend.image} alt={t("alt.friend")}/><a href={friend.name}> {friend.name}</a></li>
    );
};