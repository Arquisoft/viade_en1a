import React from "react";
import {Button, ButtonGroup, Dropdown} from "react-bootstrap";
import * as Icon from "react-feather";
import styled from "styled-components";
import {useTranslation} from "react-i18next";
import buttonStyle from "./route.module.css";
import { errorToaster, successToaster } from "@utils";

const StyledMapRoute = styled.div`
    margin: 5px;
`;

export const MapRoute = (props) => {
    const {routeWrapper} = props;
    const url = "#/share?route=" + routeWrapper.name;
    const {t} = useTranslation();

    function showRoute() {
        routeWrapper.showRoute(routeWrapper);
    }

    function deleteRoute() {
        routeWrapper.deleteRoute(routeWrapper);
    }

    function addMedia(event) {
        try{
            routeWrapper.addMediaToRoute(routeWrapper, event);
            successToaster(t("routes.uploadingMessage"), t("routes.uploading"));

        }
        catch{
            errorToaster("ay");
        }

    }


    return (
        <StyledMapRoute>
            <Dropdown as={ButtonGroup}>
            <style>
                {`
                    .btn-success {
                        background-color: #409214;
                        border-radius: 0px;
                        width:13em;
                    }
                    .btn-tog {
                        background-color: green;
                        color: white;
                        border-radius: 20px;
                        width:2em;
                    }
                `}
            </style>
                <Button variant="success" onClick={showRoute}>{routeWrapper.route.name}</Button>

                <Dropdown.Toggle split variant="tog" id="dropdown-split-basic"/>

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