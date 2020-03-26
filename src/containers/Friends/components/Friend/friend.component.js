import React from "react";
import { useTranslation } from "react-i18next";

export const Friend = (props) => {
    const { friend } = props;
    const { t } = useTranslation();

    return (
        <li key={friend.webId}><img width="100px" src={friend.image} alt={t("alt.friend")}/><a href={friend.name}> {friend.name}</a></li>
    );
};