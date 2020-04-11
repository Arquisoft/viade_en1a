import React from "react";
import { Button, Dropdown, ButtonGroup } from "react-bootstrap";
import * as Icon from "react-feather";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const StyledSharedRoute = styled.div`
  margin: 10px;
`;

export const SharedRoute = (props) => {
    const { route } = props;

    //console.log(route)
    // const url = "#/share?route="+route.name;
    
    const { t } = useTranslation();

    function showRoute(){
        route.showRoute(route);
    }

    function deleteRoute(){
        route.deleteRoute(route);
    }

    return (
        <StyledSharedRoute>
        <Dropdown as={ButtonGroup}>
            <Button variant="success" onClick={showRoute}>{route.name}</Button>

            <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />

            <Dropdown.Menu>
                <Dropdown.Item onClick={deleteRoute} href="#"><Icon.Trash/>{t("routes.delete")}</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
        </StyledSharedRoute>
    );
};