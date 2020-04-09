import React from "react";
import {Button, ButtonGroup, Dropdown} from "react-bootstrap";
import * as Icon from "react-feather";
import styled from "styled-components";
import {useTranslation} from "react-i18next";
import buttonStyle from "./route.module.css";

const StyledMapRoute = styled.div`
  margin: 10px;
`;

export const MapRoute = (props) => {
    const {route} = props;
    const url = "#/share?route=" + route.name;
    const {t} = useTranslation();

    function showRoute() {
        route.showRoute(route);
    }

    function deleteRoute() {
        route.deleteRoute(route);
    }

    function addMedia(event) {
        route.addMediaToRoute(route, event);
    }


    return (
        <StyledMapRoute>
            <Dropdown as={ButtonGroup}>
                <Button variant="success" onClick={showRoute}>{route.route.name}</Button>

                <Dropdown.Toggle split variant="success" id="dropdown-split-basic"/>

                <Dropdown.Menu>
                    <Dropdown.Item href={url}><Icon.Share2/>{t("routes.share")}</Dropdown.Item>
                    <Dropdown.Item onClick={deleteRoute} href="#"><Icon.Trash/>{t("routes.delete")}</Dropdown.Item>
                    <Dropdown.Item>
                        <label htmlFor="mediaUpload"
                               onClick={(e) => e.stopPropagation()}><Icon.Image/>{t("routes.addMedia")}</label>
                        <input id="mediaUpload" accept="video/*,image/*" className={buttonStyle.mediaUpload} type="file"
                               onChange={addMedia}
                               onClick={(e) => e.stopPropagation()}/>
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </StyledMapRoute>
    );
};