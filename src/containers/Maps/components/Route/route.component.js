import React from "react";
import { Button, Dropdown, ButtonGroup } from "react-bootstrap";
import * as Icon from "react-feather";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const StyledMapRoute = styled.div`
  margin: 10px;
`;

export const MapRoute = (props) => {
    const { route } = props;
    const { t } = useTranslation();

    function showRoute(){
        route.showRoute(route);
    }

    function shareRoute(){
        route.shareRoute(route);
    }

    function deleteRoute(){
        route.deleteRoute(route);
    }

    return (
        <StyledMapRoute>
        <Dropdown as={ButtonGroup}>
            <Button variant="success" onClick={showRoute}>{route.name}</Button>

            <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />

            <Dropdown.Menu>
                <Dropdown.Item onClick={shareRoute} href="#"><Icon.Share2/>{t("routes.share")}</Dropdown.Item>
                <Dropdown.Item onClick={deleteRoute} href="#"><Icon.Trash/>{t("routes.delete")}</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
        </StyledMapRoute>
    );
};