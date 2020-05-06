import React from "react";
import {Button, ButtonGroup, Dropdown} from "react-bootstrap";
import * as Icon from "react-feather";
import styled from "styled-components";
import {useTranslation} from "react-i18next";

const StyledSharedRoute = styled.div`
    margin: 5px;
`;

export const SharedRoute = (props) => {
    const {routeWrapper} = props;
    
    const { t } = useTranslation();

    function showRoute(){
        routeWrapper.showRoute(routeWrapper);
    }

    function deleteRoute(){
        routeWrapper.deleteRoute(routeWrapper);
    }

    return (
        <StyledSharedRoute>
        <Dropdown as={ButtonGroup}>
            <Button variant="success" style={{borderBottomLeftRadius: "8px", borderTopLeftRadius: "8px"}}
                    onClick={showRoute}>{routeWrapper.route.name + " " + routeWrapper.name}</Button>

            <Dropdown.Toggle split variant="tog" id="dropdown-split-basic" />

            <Dropdown.Menu>
                <Dropdown.Item onClick={deleteRoute} href="#"><Icon.Trash/>{t("routes.delete")}</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
        </StyledSharedRoute>
    );
};